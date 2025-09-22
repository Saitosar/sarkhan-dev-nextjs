// lib/srd-section-library.js
export const SRD_SECTION_LIBRARY = {
  // --- Базовый набор (6 секций) ---
  stakeholders: {
    title: "Stakeholders",
    instruction: "Stakeholders: Identify the Requester and End Users.",
    jsonSchema: { requester: "", endUsers: "" }
  },
  titlePurpose: {
    title: "Title & Purpose",
    instruction: "Title & Purpose: Create a concise title and a brief purpose statement.",
    jsonSchema: { title: "", purpose: "" }
  },
  scopeContext: {
    title: "Scope / Context",
    instruction: "Scope / Context: Define what is In scope, Out of scope, and list related systems.",
    jsonSchema: { inScope: [], outOfScope: [], relatedSystems: [] }
  },
  businessRequirement: {
    title: "Business Requirement",
    instruction: "Business Requirement: Describe the Current state, Future state, and the business Value.",
    jsonSchema: { currentState: "", futureState: "", value: "" }
  },
  functionalRequirements: {
    title: "Functional Requirements",
    instruction: "Functional Requirements: List numbered requirements (e.g., 'FR-1: The system shall...').",
    jsonSchema: [{ id: "FR-1", text: "" }]
  },
  acceptanceCriteria: {
    title: "Acceptance Criteria",
    instruction: "Acceptance Criteria: Provide a checklist or Given/When/Then scenarios.",
    jsonSchema: [{ type: "check", text: "" }]
  },
  // --- Дополняемые «кубики» (8 секций) ---
  nonFunctionalConstraints: {
    title: "Non-Functional Constraints",
    instruction: "Non-Functional Constraints: List critical performance, security, or availability requirements.",
    jsonSchema: [{ category: "performance", requirement: "" }]
  },
  dataAndFields: {
    title: "Data & Fields",
    instruction: "Data & Fields: Detail new data fields, their types, and validation rules.",
    jsonSchema: [{ fieldName: "", type: "", validation: "" }]
  },
  businessRules: {
    title: "Business Rules",
    instruction: "Business Rules: List key business rules, priorities, or limits.",
    jsonSchema: [{ ruleId: "BR-1", description: "" }]
  },
  interfacesApiContract: {
    title: "Interfaces / API Contract",
    instruction: "Interfaces / API Contract: Describe endpoints, request/response formats, and error codes.",
    jsonSchema: { endpoint: "", method: "", request: {}, response: {} }
  },
  dependenciesAndRisks: {
    title: "Dependencies & Risks",
    instruction: "Dependencies & Risks: List dependencies on other teams/systems and potential risks.",
    jsonSchema: { dependencies: [], risks: [] }
  },
  rolloutFeatureFlag: {
    title: "Rollout / Feature Flag",
    instruction: "Rollout / Feature Flag: Describe the rollout plan, feature flag strategy, and monitoring plan.",
    jsonSchema: { strategy: "", monitoring: "" }
  },
  edgeCasesErrorHandling: {
    title: "Edge Cases & Error Handling",
    instruction: "Edge Cases & Error Handling: Describe 3-5 non-trivial scenarios and expected system behavior.",
    jsonSchema: [{ scenario: "", expectedBehavior: "" }]
  },
  notesOpenPoints: {
    title: "Notes & Open Points",
    instruction: "Notes & Open Points: List any open questions or assumptions that need clarification.",
    jsonSchema: { points: [] }
  }
};