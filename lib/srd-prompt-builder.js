// lib/srd-prompt-builder.js
import { SRD_SECTION_LIBRARY } from './srd-section-library.js';

export function buildDynamicSrdPrompt(userInput, sectionKeys) {
  const finalJsonSchema = {};
  for (const key of sectionKeys) {
    if (SRD_SECTION_LIBRARY[key]) {
      finalJsonSchema[key] = SRD_SECTION_LIBRARY[key].jsonSchema;
    }
  }

  const finalInstructions = sectionKeys
    .map((key, index) => {
        const section = SRD_SECTION_LIBRARY[key];
        return section ? `${index + 1}. ${section.instruction}` : '';
    })
    .filter(Boolean)
    .join('\n');

  return `
    Act as a senior IT Business Analyst. Your task is to analyze the user's request and fill out a Lean SRD (Software Requirements Document) template.

    The user's initial request is: "${userInput}"

    Your response MUST be a single, valid JSON object that strictly adheres to the following schema. Do NOT include any text, explanations, or markdown formatting before or after the JSON object.

    The order of keys in your final JSON object MUST exactly match the order in this schema.

    JSON Schema to follow:
    \`\`\`json
    ${JSON.stringify(finalJsonSchema, null, 2)}
    \`\`\`

    Instructions for filling out the schema:
    ${finalInstructions}
  `;
}