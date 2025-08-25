// pages/api/summarize.js

import { GoogleGenerativeAI } from '@google/generative-ai';

// Инициализируем Gemini API-ключом.
// ВАЖНО: Никогда не храните ключ прямо в коде. Используйте переменные окружения!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Принимаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { articleText } = req.body;

  // Проверяем, что текст статьи был передан
  if (!articleText) {
    return res.status(400).json({ error: 'Article text is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Это наш промпт - инструкция для ИИ.
    // Мы просим его выступить в роли эксперта и сделать выжимку.
    const prompt = `
      Ты — экспертный IT бизнес-аналитик, который умеет быстро выделять главное.
      Твоя задача — прочитать текст статьи и сделать из него краткую выжимку (саммари) на том же языке, на котором написана статья.
      Саммари должно быть:
      1.  Краткое (не более 5-6 предложений).
      2.  Четкое и по делу, без "воды".
      3.  Передавать основную суть и пользу для читателя-аналитика.

      Вот текст статьи:
      ---
      ${articleText}
      ---
      Сделай саммари:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    // Отправляем сгенерированное саммари обратно на фронтенд
    res.status(200).json({ summary });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
}