// pages/api/srd/generate.js

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../../db/schema";
import { PLANS } from "../../../lib/plans";
import { buildDynamicSrdPrompt } from "../../../lib/srd-prompt-builder"; // <-- 1. Импортируем наш новый конструктор промптов
import { GoogleGenerativeAI } from '@google/generative-ai'; // <-- 2. Импортируем Gemini
import { sql, and, gte, eq } from "drizzle-orm";

// Подключение к БД
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});
const db = drizzle(pool, { schema });

// --- НОВАЯ ФУНКЦИЯ-ПОМОЩНИК ---
// Эта функция будет преобразовывать JSON от ИИ в красивый Markdown
function convertJsonToMarkdown(jsonData) {
    let md = '';
    // Нет необходимости парсить jsonData, так как contentJson уже является объектом
    const data = jsonData; 

    const sectionHandlers = {
        titlePurpose: d => `# ${d.title || 'Untitled SRD'}\n\n**Purpose:** ${d.purpose || 'Not specified'}\n\n`,
        stakeholders: d => `## Stakeholders\n- **Requester:** ${d.requester || 'N/A'}\n- **End Users:** ${d.endUsers || 'N/A'}\n\n`,
        scopeContext: d => `## Scope / Context\n**In Scope:**\n${(d.inScope || []).map(item => `- ${item}`).join('\n')}\n\n**Out of Scope:**\n${(d.outOfScope || []).map(item => `- ${item}`).join('\n')}\n\n`,
        businessRequirement: d => `## Business Requirement\n**Current State:**\n${d.currentState || 'N/A'}\n\n**Future State:**\n${d.futureState || 'N/A'}\n\n**Value:**\n${d.value || 'N/A'}\n\n`,
        functionalRequirements: d => `## Functional Requirements\n${(d || []).map(item => `- **${item.id}:** ${item.text}`).join('\n')}\n\n`,
        acceptanceCriteria: d => `## Acceptance Criteria\n${(d || []).map(item => `- [ ] ${item.text}`).join('\n')}\n\n`,
        nonFunctionalConstraints: d => `## Non-Functional Constraints\n${(d || []).map(item => `- **${item.category}:** ${item.requirement}`).join('\n')}\n\n`,
        dataAndFields: d => `## Data & Fields\n| Field Name | Type | Validation |\n|------------|------|------------|\n${(d || []).map(item => `| ${item.fieldName} | ${item.type} | ${item.validation} |`).join('\n')}\n\n`,
        businessRules: d => `## Business Rules\n${(d || []).map(item => `- **${item.ruleId}:** ${item.description}`).join('\n')}\n\n`,
        interfacesApiContract: d => `## Interfaces / API Contract\n**Endpoint:** \`${d.endpoint || 'N/A'}\`\n**Method:** \`${d.method || 'N/A'}\`\n\n`,
        dependenciesAndRisks: d => `## Dependencies & Risks\n**Dependencies:**\n${(d.dependencies || []).map(item => `- ${item}`).join('\n')}\n\n**Risks:**\n${(d.risks || []).map(item => `- ${item}`).join('\n')}\n\n`,
        rolloutFeatureFlag: d => `## Rollout / Feature Flag\n**Strategy:** ${d.strategy || 'N/A'}\n**Monitoring:** ${d.monitoring || 'N/A'}\n\n`,
        edgeCasesErrorHandling: d => `## Edge Cases & Error Handling\n${(d || []).map(item => `**Scenario:** ${item.scenario}\n**Expected Behavior:** ${item.expectedBehavior}\n`).join('\n')}\n\n`,
        notesOpenPoints: d => `## Notes & Open Points\n${(d.points || []).map(item => `- ${item}`).join('\n')}\n\n`
    };

    for (const key in data) {
        if (sectionHandlers[key]) {
            md += sectionHandlers[key](data[key]);
        }
    }
    return md;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Получаем текст от пользователя из тела запроса
  const { promptText } = req.body;
  if (!promptText) {
    return res.status(400).json({ error: 'promptText is required.' });
  }

  const userId = session.user.id;

  try {
    const user = await db.query.users.findFirst({ where: eq(schema.users.id, userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const plan = user.plan || 'free';
    const planConfig = PLANS[plan];

    // Проверка квоты (как и раньше)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const docCountResult = await db.select({ count: sql`count(*)::int` }).from(schema.documents).where(and(eq(schema.documents.createdBy, userId), eq(schema.documents.type, 'SRD'), gte(schema.documents.createdAt, startOfMonth)));
    const count = docCountResult[0].count;

    if (count >= planConfig.monthlyDocs) {
      return res.status(429).json({ error: `Monthly limit reached for the '${plan}' plan.` });
    }

    // --- НАЧАЛО ИНТЕГРАЦИИ С ИИ ---

    // 3. Определяем, какой шаблон использовать
    const sectionsToGenerate = planConfig.srdTemplate;

    // 4. Собираем промпт с помощью нашего конструктора
    const prompt = buildDynamicSrdPrompt(promptText, sectionsToGenerate);
    
    // 5. Вызываем Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Используем быструю модель
    
    const result = await model.generateContent(prompt);
    const rawResponse = result.response.text();
    
    // Очищаем ответ от возможных "артефактов"
    const cleanedJsonString = rawResponse.replace(/^```json\n|```$/g, "").trim();

    // 6. Парсим JSON и создаем Markdown
    const contentJson = JSON.parse(cleanedJsonString);
    const contentMd = convertJsonToMarkdown(contentJson);

    // 7. Сохраняем новый документ в базу данных
    const [newDocument] = await db.insert(schema.documents).values({
        title: contentJson.titlePurpose?.title || 'Untitled SRD',
        type: 'SRD',
        status: 'draft',
        content_json: contentJson, // Сохраняем JSON
        content_md: contentMd,     // Сохраняем Markdown
        ownerType: 'user',
        ownerId: userId,
        createdBy: userId,
        visibility: 'private',
    }).returning({ id: schema.documents.id });

    // --- КОНЕЦ ИНТЕГРАЦИИ С ИИ ---

    // Возвращаем ID созданного документа
    res.status(200).json({ 
      message: `SRD document created successfully!`,
      docId: newDocument.id,
      usage: `${count + 1} / ${planConfig.monthlyDocs}`
    });

  } catch (error) {
    console.error("Error in SRD generation endpoint:", error);
    // Добавим более детальное логирование ошибки от ИИ
    if (error.response) {
        console.error("AI API Response Error:", error.response.data);
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}