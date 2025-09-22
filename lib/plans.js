// lib/plans.js

export const PLANS = {
  free: {
    monthlyDocs: 5,
    features: ['lean_srd'],
  },
  pro: {
    monthlyDocs: 15,
    features: ['lean_srd', 'extra_templates'],
  },
  expert: {
    monthlyDocs: 50,
    features: ['lean_srd', 'extra_templates', 'lego_templates', 'auto_bundle'],
  },
};