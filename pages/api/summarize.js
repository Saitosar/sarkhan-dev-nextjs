// pages/api/summarize.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Хранилище промптов для разных языков
const prompts = {
  ru: `
      Ты — экспертный IT бизнес-аналитик, который умеет быстро выделять главное.
      Твоя задача — прочитать текст статьи и сделать из него краткую выжимку (саммари) на русском языке.
      Саммари должно быть:
      1. Краткое (не более 3-4 предложений).
      2. Четкое и по делу, без "воды".
      3. Передавать основную суть и пользу для читателя-аналитика.
      Вот текст статьи: --- {articleText} --- Сделай саммари:`,
  en: `
      You are an expert IT Business Analyst who excels at quickly identifying the main points.
      Your task is to read the article text and create a concise summary in English.
      The summary must be:
      1. Brief (no more than 3-4 sentences).
      2. Clear and to the point, without fluff.
      3. Convey the main essence and value for the reader, who is also an analyst.
      Here is the article text: --- {articleText} --- Create the summary:`,
  az: `
      Sən əsas məqamları sürətlə müəyyən etməyi bacaran ekspert IT Biznes Analitikisən.
      Sənin vəzifən məqalənin mətnini oxumaq və Azərbaycan dilində qısa bir xülasə (summary) hazırlamaqdır.
      Xülasə belə olmalıdır:
      1. Qısa (ən çox 3-4 cümlə).
      2. Dəqiq və konkret, artıq sözlər olmadan.
      3. Oxucu-analitik üçün məqalənin əsas mahiyyətini və faydasını çatdırmalıdır.
      Məqalənin mətni budur: --- {articleText} --- Xülasəni hazırla:`,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API ключ не настроен.' });
  }

  // Получаем locale из запроса, по умолчанию ставим 'ru' для безопасности
  const { articleText, locale = 'ru' } = req.body;

  if (!articleText) {
    return res.status(400).json({ error: 'Текст статьи обязателен' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    
    // Выбираем нужный промпт по locale и вставляем в него текст статьи
    const promptTemplate = prompts[locale] || prompts['ru'];
    const prompt = promptTemplate.replace('{articleText}', articleText);

    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Не удалось сгенерировать саммари.' });
  }
}