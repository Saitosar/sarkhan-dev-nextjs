// pages/api/summarize.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY не найден на сервере.");
    return res.status(500).json({ error: 'API ключ не настроен.' });
  }

  const { articleText } = req.body;
  if (!articleText) {
    return res.status(400).json({ error: 'Текст статьи обязателен' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Используем быструю и экономичную модель
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
      Ты — экспертный IT бизнес-аналитик, который умеет быстро выделять главное.
      Твоя задача — прочитать текст статьи и сделать из него краткую выжимку (саммари) на том же языке, на котором написана статья.
      Саммари должно быть:
      1.  Краткое (не более 3-4 предложений).
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
    res.status(200).json({ summary });

  } catch (error) {
    console.error("Ошибка при обращении к Gemini API:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: 'Не удалось сгенерировать саммари.' });
  }
}