// lib/plans.js
import { SRD_SECTION_LIBRARY } from './srd-section-library.js';

// --- Каталог предопределенных шаблонов SRD ---
export const SRD_TEMPLATES = {
  // Базовый шаблон (оставляем для истории или будущих нужд)
  basic: [
    'stakeholders', 
    'titlePurpose', 
    'scopeContext',
    'businessRequirement', 
    'functionalRequirements', 
    'acceptanceCriteria'
  ],
  // ПОЛНЫЙ ШАБЛОН ИЗ 14 СЕКЦИЙ
  full_srd: [
    'titlePurpose',
    'stakeholders',
    'scopeContext',
    'businessRequirement',
    'functionalRequirements',
    'acceptanceCriteria',
    'nonFunctionalConstraints',
    'dataAndFields',
    'businessRules',
    'interfacesApiContract',
    'dependenciesAndRisks',
    'rolloutFeatureFlag',
    'edgeCasesErrorHandling',
    'notesOpenPoints'
  ]
};

// --- Описание тарифных планов ---
export const PLANS = {
  free: {
    monthlyDocs: 10,
    srdTemplate: SRD_TEMPLATES.full_srd, // Используем ПОЛНЫЙ шаблон
    features: ['full_srd'],
  },
  pro: {
    monthlyDocs: 30,
    srdTemplate: SRD_TEMPLATES.full_srd, // Используем ПОЛНЫЙ шаблон
    features: ['full_srd'],
  },
  expert: {
    monthlyDocs: 70,
    srdTemplate: SRD_TEMPLATES.full_srd, // Используем ПОЛНЫЙ шаблон
    features: ['full_srd'],
  },
};