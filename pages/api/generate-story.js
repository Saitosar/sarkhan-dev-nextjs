// pages/api/generate-story.js (ВЕРСИЯ С УЛУЧШЕННЫМ ЛОГИРОВАНИЕМ)
import { GoogleGenerativeAI } from '@google/generative-ai';

const prompts = {
  ru: `Ты — элитный IT бизнес-аналитик с 10-летним опытом. Твоя задача — не просто сгенерировать текст, а провести полноценный анализ запроса пользователя.

**АЛГОРИТМ ДЕЙСТВИЙ:**

1.  **ДЕКОМПОЗИЦИЯ:** Внимательно прочитай запрос. Определи в нем от 2 до 4 атомарных, независимых бизнес-возможностей. Это основа для будущих User Stories. Не создавай одну гигантскую историю (Epic).

2.  **ГЕНЕРАЦИЯ USER STORIES (US):** Для каждой выделенной возможности, напиши ОДНУ четкую User Story в строгом формате: "Как <Роль>, я хочу <Действие>, чтобы <Ценность>".

3.  **ГЕНЕРАЦИЯ ACCEPTANCE CRITERIA (AC):** Для КАЖДОЙ User Story, напиши полный набор критериев приемки в формате Gherkin. Этот набор ОБЯЗАТЕЛЬНО должен включать:
    - Один "Happy Path" (успешный сценарий).
    - Минимум два негативных сценария (ошибки, неверные данные).
    - Хотя бы один граничный случай (пустые значения, максимальные значения и т.д.), если это применимо.

4.  **ФОРМАТИРОВАНИЕ ВЫВОДА:** Весь ответ должен быть одной строкой. Используй следующие разделители:
    - \`---STORY_START---\` перед каждой новой User Story.
    - \`---AC_START---\` перед блоком критериев приемки для этой User Story.
    - Каждый сценарий в AC должен начинаться с новой строки.

**ЗАПРОС ПОЛЬЗОВАТЕЛЯ:** "{userInput}"

**ТВОЙ АНАЛИЗ И РЕЗУЛЬТАТ:**`,
  en: `You are an elite IT Business Analyst with 10 years of experience. Your task is not just to generate text, but to conduct a full analysis of the user's request.

**ALGORITHM:**

1.  **DECOMPOSITION:** Read the request carefully. Identify 2 to 4 atomic, independent business capabilities. This is the basis for the User Stories. Do not create one giant story (Epic).

2.  **USER STORIES (US) GENERATION:** For each identified capability, write ONE clear User Story in the strict format: "As a <Role>, I want <Action>, so that <Value>".

3.  **ACCEPTANCE CRITERIA (AC) GENERATION:** For EACH User Story, write a comprehensive set of acceptance criteria in Gherkin format. This set MUST include:
    - One "Happy Path" scenario.
    - At least two negative scenarios (errors, invalid data).
    - At least one boundary case (empty values, max values, etc.), if applicable.

4.  **OUTPUT FORMATTING:** The entire response must be a single string. Use the following delimiters:
    - \`---STORY_START---\` before each new User Story.
    - \`---AC_START---\` before the block of acceptance criteria for that User Story.
    - Each AC scenario must start on a new line.

**USER REQUEST:** "{userInput}"

**YOUR ANALYSIS AND RESULT:**`,
  az: `Sən 10 illik təcrübəyə malik elit IT Biznes Analitiksən. Vəzifən sadəcə mətn yaratmaq deyil, istifadəçi sorğusunun tam təhlilini aparmaqdır.

**HƏRƏKƏT ALQORİTMİ:**

1.  **DEKOMPOZİSİYA:** Sorğunu diqqətlə oxu. Orada 2-dən 4-ə qədər atomar, müstəqil biznes imkanı müyyən et. Bu, gələcək User Story-lər üçün əsasdır. Bir nəhəng hekayə (Epic) yaratma.

2.  **USER STORY (US) YARADILMASI:** Müəyyən edilmiş hər bir imkan üçün, ciddi formatda BİR aydın User Story yaz: "Bir <Rol> olqaraq, <Hərəkət> etmək istəyirəm ki, <Dəyər> əldə edim".

3.  **ACCEPTANCE CRITERIA (AC) YARADILMASI:** HƏR BİR User Story üçün, Gherkin formatında tam qəbul meyarları dəsti yaz. Bu dəstə MÜTLƏQ daxil olmalıdır:
    - Bir "Uğurlu Ssenari" (Happy Path).
    - Ən azı iki neqativ ssenari (səhvlər, yanlış məlumatlar).
    - Mümkünsə, ən azı bir sərhəd vəziyyəti (boş dəyərlər, maksimum dəyərlər və s.).

4.  **ÇIXIŞIN FORMATLANMASI:** Bütün cavab tək bir sətir olmalıdır. Aşağıdakı ayırıcılardan istifadə et:
    - \`---STORY_START---\` hər yeni User Story-dən əvvəl.
    - \`---AC_START---\` həmin User Story üçün qəbul meyarları blokundan əvvəl.
    - AC-dəki hər bir ssenari yeni bir sətirdən başlamalıdır.

**İSTİFADƏÇİ SORĞUSU:** "{userInput}"

**SƏNİN TƏHLİLİN VƏ NƏTİCƏ:**`
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Server Error: GEMINI_API_KEY is not configured.");
    return res.status(500).json({ error: 'API key not configured.' });
  }

  const { userInput, locale = 'ru' } = req.body;
  if (!userInput) {
    return res.status(400).json({ error: 'User input is required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const promptTemplate = prompts[locale] || prompts['ru'];
    const prompt = promptTemplate.replace('{userInput}', userInput);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const stories = text.split('---STORY_START---').filter(Boolean).map(storyBlock => {
        const parts = storyBlock.split('---AC_START---');
        const userStory = parts[0] ? parts[0].trim() : '';
        const acceptanceCriteria = parts[1] ? parts[1].trim() : '';
        return { userStory, acceptanceCriteria };
    });

    res.status(200).json({ stories });
  } catch (error) {
    // === УЛУЧШЕННОЕ ЛОГИРОВАНИЕ ОШИБКИ ===
    console.error('Detailed API Error:', error); 
    // =======================================
    res.status(500).json({ error: 'Failed to generate response from AI.' });
  }
}