// pages/api/srd/generate.js (МАКСИМАЛЬНО УПРОЩЕННАЯ ВЕРСИЯ)

import { buildDynamicSrdPrompt } from "../../../lib/srd-prompt-builder";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PLANS } from "../../../lib/plans";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { promptText } = req.body;
    if (!promptText) {
      return res.status(400).json({ error: 'promptText is required.' });
    }

    // Используем самый простой шаблон из бесплатного плана
    const sectionsToGenerate = PLANS['free'].srdTemplate;
    const prompt = buildDynamicSrdPrompt(promptText, sectionsToGenerate);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);
    const rawResponse = result.response.text();

    // Просто возвращаем сырой ответ от ИИ
    res.status(200).json({ generatedSrd: rawResponse });

  } catch (error) {
    console.error("!!! SRD Generation Error:", error);
    res.status(500).json({ error: 'Failed to generate SRD from AI.' });
  }
}