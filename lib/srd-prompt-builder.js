// lib/srd-prompt-builder.js
import { SRD_SECTION_LIBRARY } from './srd-section-library.js';

// Промпты для разных языков
const systemPrompts = {
  en: `Act as a Principal IT Business Analyst with 15+ years of experience in enterprise systems. Your task is to meticulously analyze the user's request and transform it into a comprehensive, high-quality Lean SRD (Software Requirements Document) in English.

**Core Principles:**
1.  **Clarity over Brevity:** Fill each section with meaningful, specific details. Avoid vague statements.
2.  **Structure is Key:** Strictly follow the provided JSON schema and instructions. The order of keys is critical.
3.  **Think Like an Architect:** Anticipate potential issues. Define non-functional requirements, edge cases, and risks proactively.
4.  **Example-Driven:** When describing requirements, use concrete examples where possible (e.g., for data validation, provide a regex or a value range).`,
  
  ru: `Действуй как Главный IT-бизнес-аналитик с 15+ летним опытом в enterprise-системах. Твоя задача — скрупулезно проанализировать запрос пользователя и превратить его во всеобъемлющий, высококачественный Lean SRD (Software Requirements Document) на русском языке.

**Ключевые принципы:**
1.  **Ясность важнее краткости:** Заполняй каждую секцию значимыми, конкретными деталями. Избегай расплывчатых формулировок.
2.  **Структура — это главное:** Строго следуй предоставленной JSON-схеме и инструкциям. Порядок ключей критически важен.
3.  **Мысли как архитектор:** Предугадывай потенциальные проблемы. Проактивно определяй нефункциональные требования, крайние случаи и риски.
4.  **Приводи примеры:** При описании требований используй конкретные примеры, где это возможно (например, для валидации данных укажи regex или диапазон значений).`,
  
  az: `Enterprise sistemlərdə 15 ildən çox təcrübəsi olan Baş İT Biznes Analitik kimi fəaliyyət göstər. Vəzifən istifadəçi sorğusunu dəqiqliklə təhlil etmək və onu Azərbaycan dilində hərtərəfli, yüksək keyfiyyətli Lean SRD (Proqram Təminatı Tələbləri Sənədi) sənədinə çevirməkdir.

**Əsas Prinsiplər:**
1.  **Aydınlıq Qısalıqdan Üstündür:** Hər bölməni mənalı, konkret detallarla doldur. Qeyri-müəyyən ifadələrdən çəkin.
2.  **Struktur Əsasdır:** Təqdim edilmiş JSON sxeminə və təlimatlara ciddi əməl et. Açar sözlərin ardıcıllığı çox vacibdir.
3.  **Memar Kimi Düşün:** Potensial problemləri əvvəlcədən təxmin et. Qeyri-funksional tələbləri, istisna hallarını və riskləri proaktiv şəkildə müəyyən et.
4.  **Nümunələrlə İzah Et:** Tələbləri təsvir edərkən, mümkün olan yerlərdə konkret nümunələrdən istifadə et (məsələn, məlumatların yoxlanılması üçün bir regex və ya dəyər aralığı göstər).`
};

export function buildDynamicSrdPrompt(userInput, sectionKeys, locale = 'en') {
  const finalJsonSchema = {};
  for (const key of sectionKeys) {
    if (SRD_SECTION_LIBRARY[key]) {
      finalJsonSchema[key] = SRD_SECTION_LIBRARY[key].jsonSchema;
    }
  }

  const finalInstructions = sectionKeys
    .map((key, index) => {
        const section = SRD_SECTION_LIBRARY[key];
        return section ? `${index + 1}. **${section.title}:** ${section.instruction}` : '';
    })
    .filter(Boolean)
    .join('\n');

  const systemPrompt = systemPrompts[locale] || systemPrompts['en'];

  return `
    ${systemPrompt}

    Based on the principles above, analyze the user's request below and generate the complete SRD.

    **User's initial request is:** "${userInput}"

    Your response **MUST** be a single, valid JSON object that strictly adheres to the following schema. Do **NOT** include any text, explanations, or markdown formatting before or after the JSON object.

    The order of keys in your final JSON object **MUST** exactly match the order in this schema.

    ### JSON Schema to follow:
    \`\`\`json
    ${JSON.stringify(finalJsonSchema, null, 2)}
    \`\`\`

    ### Instructions for filling out the schema:
    ${finalInstructions}
  `;
}