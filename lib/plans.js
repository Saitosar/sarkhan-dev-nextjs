// lib/plans.js
import { SRD_SECTION_LIBRARY } from './srd-section-library.js';

// --- Каталог предопределенных шаблонов SRD ---
export const SRD_TEMPLATES = {
  basic: [
    'stakeholders', 
    'titlePurpose', 
    'scopeContext',
    'businessRequirement', 
    'functionalRequirements', 
    'acceptanceCriteria'
  ],
  standard: [
    'stakeholders', 
    'titlePurpose', 
    'scopeContext',
    'businessRequirement', 
    'functionalRequirements', 
    'acceptanceCriteria',
    'nonFunctionalConstraints',
    'dataAndFields',
    'businessRules',
    'dependenciesAndRisks'
  ]
};

// --- Описание тарифных планов ---
export const PLANS = {
  free: {
    monthlyDocs: 5,
    srdTemplate: SRD_TEMPLATES.basic, 
    features: ['lean_srd'],
  },
  pro: {
    monthlyDocs: 15,
    srdTemplate: SRD_TEMPLATES.standard,
    features: ['lean_srd', 'extra_templates'],
  },
  expert: {
    monthlyDocs: 50,
    maxTemplates: 15, // Добавляем лимит на кастомные шаблоны
    isCustom: true,
    availableSections: Object.keys(SRD_SECTION_LIBRARY),
    features: ['lean_srd', 'extra_templates', 'lego_templates', 'auto_bundle'],
  },
};