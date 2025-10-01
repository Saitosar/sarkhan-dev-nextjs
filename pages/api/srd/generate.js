// pages/api/srd/generate.js

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../../db/schema";
import { PLANS } from "../../../lib/plans";
import { buildDynamicSrdPrompt } from "../../../lib/srd-prompt-builder";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// Функция для конвертации JSON в Markdown (ВЕРСИЯ 2.0)
function convertJsonToMarkdown(jsonData) {
    let md = '';
    const data = jsonData;
    
    // Определяем строгий порядок секций
    const sectionOrder = [
        'titlePurpose', 'stakeholders', 'scopeContext', 'businessRequirement', 
        'functionalRequirements', 'acceptanceCriteria', 'nonFunctionalConstraints', 
        'dataAndFields', 'businessRules', 'interfacesApiContract', 'dependenciesAndRisks', 
        'rolloutFeatureFlag', 'edgeCasesErrorHandling', 'notesOpenPoints'
    ];

    const sectionHandlers = {
        titlePurpose: d => `# ${d.title || 'Untitled SRD'}\n\n**Purpose:** ${d.purpose || 'Not specified'}\n\n`,
        stakeholders: d => `## 2. Stakeholders & Roles\n- **Requester:** ${d.requester || 'N/A'}\n- **End Users:** ${d.endUsers || 'N/A'}\n\n`,
        scopeContext: d => `## 3. Scope / Context\n**In Scope:**\n${(d.inScope || []).map(item => `- ${item}`).join('\n')}\n\n**Out of Scope:**\n${(d.outOfScope || []).map(item => `- ${item}`).join('\n')}\n\n**Related Systems:**\n${(d.relatedSystems || []).map(item => `- ${item}`).join('\n')}\n\n`,
        businessRequirement: d => `## 4. Business Requirement\n**Current State (AS-IS):**\n${d.currentState || 'N/A'}\n\n**Future State (TO-BE):**\n${d.futureState || 'N/A'}\n\n**Value:**\n${d.value || 'N/A'}\n\n`,
        functionalRequirements: d => `## 5. Functional Requirements (FR)\n${(d || []).map(item => `- **${item.id}:** ${item.text}`).join('\n')}\n\n`,
        acceptanceCriteria: d => `## 6. Acceptance Criteria (AC)\n${(d || []).map(item => `- **For ${item.for_fr}:** (${item.type}) ${item.text}`).join('\n')}\n\n`,
        nonFunctionalConstraints: d => `## 7. Non-Functional Constraints\n${(d || []).map(item => `- **${item.category}:** ${item.requirement}`).join('\n')}\n\n`,
        dataAndFields: d => `## 8. Data & Fields\n| Field Name | Type | Validation | Note |\n|---|---|---|---|\n${(d || []).map(item => `| ${item.fieldName} | ${item.type} | ${item.validation} | ${item.integrationNote} |`).join('\n')}\n\n`,
        businessRules: d => `## 9. Business Rules\n${(d || []).map(item => `- **${item.ruleId}:** ${item.description}`).join('\n')}\n\n`,
        interfacesApiContract: d => `## 10. Interfaces / API Contract\n- **Endpoint:** \`${d.endpoint}\`\n- **Method:** \`${d.method}\`\n- **Request:** \`\`\`json\n${JSON.stringify(d.request, null, 2)}\n\`\`\`\n- **Response:** \`\`\`json\n${JSON.stringify(d.response, null, 2)}\n\`\`\`\n\n`,
        dependenciesAndRisks: d => `## 11. Dependencies & Risks\n**Dependencies:**\n${(d.dependencies || []).map(item => `- ${item.item} (Mitigation: ${item.mitigation})`).join('\n')}\n\n**Risks:**\n${(d.risks || []).map(item => `- ${item.item} (Mitigation: ${item.mitigation})`).join('\n')}\n\n`,
        rolloutFeatureFlag: d => `## 12. Rollout / Feature Flag\n- **Strategy:** ${d.strategy || 'N/A'}\n- **Feature Flag:** \`${d.featureFlag || 'N/A'}\`\n- **Monitoring:** ${d.monitoring || 'N/A'}\n\n`,
        edgeCasesErrorHandling: d => `## 13. Edge Cases & Error Handling\n${(d || []).map(item => `- **Scenario:** ${item.scenario}\n  - **Expected Behavior:** ${item.expectedBehavior}`).join('\n')}\n\n`,
        notesOpenPoints: d => `## 14. Notes & Open Points\n${(d.points || []).map(item => `- ${item}`).join('\n')}\n\n`
    };

    md += sectionHandlers.titlePurpose(data.titlePurpose || {});

    sectionOrder.slice(1).forEach(key => {
        if (data[key] && sectionHandlers[key]) {
            md += sectionHandlers[key](data[key]);
        }
    });

    return md;
}


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  try {
    const { promptText, locale } = req.body;
    if (!promptText) {
      return res.status(400).json({ error: 'promptText is required.' });
    }

    // Вне зависимости от пользователя, всегда берем полный шаблон
    const sectionsToGenerate = PLANS['free'].srdTemplate; 
    const prompt = buildDynamicSrdPrompt(promptText, sectionsToGenerate, locale);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Используем новую модель
    
    const result = await model.generateContent(prompt);
    const rawResponse = result.response.text();
    
    // Улучшенный парсинг JSON, который более устойчив к "мусору" до и после
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch || !jsonMatch[0]) {
        console.error("AI Response (raw):", rawResponse);
        throw new Error("AI did not return a valid JSON object.");
    }
    const cleanedJsonString = jsonMatch[0];
    const contentJson = JSON.parse(cleanedJsonString);
    const contentMd = convertJsonToMarkdown(contentJson);
    
    const certPath = path.resolve(process.cwd(), 'certs', 'supabase.crt');
    const caCert = await fs.readFile(certPath, 'utf-8');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: true,
          ca: caCert,
        }
    });
    const db = drizzle(pool, { schema });

    const ownerData = session?.user
        ? {
            ownerType: 'user',
            ownerId: session.user.id,
            createdBy: session.user.id,
            visibility: 'private',
        }
        : {
            ownerType: 'user',
            ownerId: '00000000-0000-0000-0000-000000000000', // Анонимный UUID
            createdBy: 'anonymous',
            visibility: 'public',
        };

    const [newDocument] = await db.insert(schema.documents).values({
        title: contentJson.titlePurpose?.title || 'Untitled SRD',
        type: 'SRD',
        promptText: promptText,
        content_json: contentJson,
        content_md: contentMd,
        ...ownerData
    }).returning({ id: schema.documents.id });

    if (!newDocument || !newDocument.id) {
        throw new Error("Failed to save the document to the database.");
    }
    
    res.status(200).json({ docId: newDocument.id });

  } catch (error) {
    console.error("!!! SRD Generation Error:", error);
    res.status(500).json({ 
        error: 'Internal Server Error. Check server logs.',
        details: error.message 
    });
  }
}