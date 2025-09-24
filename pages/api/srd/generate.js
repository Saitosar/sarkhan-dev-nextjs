// pages/api/srd/generate.js (ФИНАЛЬНАЯ ВЕРСЯ ДЛЯ АНОНИМНЫХ ПОЛЬЗОВАТЕЛЕЙ)

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

// Функция для конвертации JSON в Markdown
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
        stakeholders: d => `## Stakeholders\n- **Requester:** ${d.requester || 'N/A'}\n- **End Users:** ${d.endUsers || 'N/A'}\n\n`,
        scopeContext: d => `## Scope / Context\n**In Scope:**\n${(d.inScope || []).map(item => `- ${item}`).join('\n')}\n\n**Out of Scope:**\n${(d.outOfScope || []).map(item => `- ${item}`).join('\n')}\n\n`,
        businessRequirement: d => `## Business Requirement\n**Current State:**\n${d.currentState || 'N/A'}\n\n**Future State:**\n${d.futureState || 'N/A'}\n\n**Value:**\n${d.value || 'N/A'}\n\n`,
        functionalRequirements: d => `## Functional Requirements\n${(d || []).map(item => `- **${item.id}:** ${item.text}`).join('\n')}\n\n`,
        acceptanceCriteria: d => `## Acceptance Criteria\n${(d || []).map(item => `- [ ] ${item.text}`).join('\n')}\n\n`,
        // ... (остальные обработчики)
    };

    // Проходим по секциям в правильном порядке
    sectionOrder.forEach(key => {
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

    const sectionsToGenerate = PLANS['free'].srdTemplate;
    const prompt = buildDynamicSrdPrompt(promptText, sectionsToGenerate, locale);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
    
    const result = await model.generateContent(prompt);
    const rawResponse = result.response.text();
    
    const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
    if (!jsonMatch || !jsonMatch[1]) {
        throw new Error("AI did not return a valid JSON block.");
    }
    const cleanedJsonString = jsonMatch[1].trim();
    const contentJson = JSON.parse(cleanedJsonString);
    const contentMd = convertJsonToMarkdown(contentJson);
    
    // --- ПРАВИЛЬНОЕ ПОДКЛЮЧЕНИЕ К БД С СЕРТИФИКАТОМ ---
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
            ownerId: '00000000-0000-0000-0000-000000000000',
            createdBy: 'anonymous',
            visibility: 'public',
        };

    const [newDocument] = await db.insert(schema.documents).values({
        title: contentJson.titlePurpose?.title || 'Untitled SRD',
        type: 'SRD',
        promptText: promptText,
        content_json: contentJson,
        content_md: contentMd,
        ...ownerData // Используем определенные выше данные
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