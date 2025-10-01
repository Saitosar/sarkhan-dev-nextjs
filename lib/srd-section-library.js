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
    instruction: "Acceptance Criteria: Provide a checklist or Given/When/Then scenarios for each functional requirement.",
    jsonSchema: [{ for_fr: "FR-1", type: "check", text: "" }]
  },
  // --- Дополняемые «кубики» (8 секций) ---
  nonFunctionalConstraints: {
    title: "Non-Functional Constraints",
    instruction: "Non-Functional Constraints: List critical performance, security, availability and compliance requirements.",
    jsonSchema: [
        { category: "Performance", requirement: "" },
        { category: "Security", requirement: "" },
        { category: "Usability", requirement: "" },
        { category: "Compliance", requirement: "" },
    ]
  },
  dataAndFields: {
    title: "Data & Fields",
    instruction: "Data & Fields: Detail new data fields, their types, validation rules, and integration points.",
    jsonSchema: [{ fieldName: "", type: "", validation: "", integrationNote: "" }]
  },
  businessRules: {
    title: "Business Rules",
    instruction: "Business Rules: List key business rules, priorities, or limits (e.g., 'BR-1: Max login attempts is 5').",
    jsonSchema: [{ ruleId: "BR-1", description: "" }]
  },
  interfacesApiContract: {
    title: "Interfaces / API Contract",
    instruction: "Interfaces / API Contract: Describe endpoints, methods, request/response formats, and error codes.",
    jsonSchema: { endpoint: "/api/example", method: "POST", request: {}, response: {}, errors: [] }
  },
  dependenciesAndRisks: {
    title: "Dependencies & Risks",
    instruction: "Dependencies & Risks: List dependencies on other teams/systems and potential risks with mitigation ideas.",
    jsonSchema: { dependencies: [{ item: "", mitigation: "" }], risks: [{ item: "", mitigation: "" }] }
  },
  rolloutFeatureFlag: {
    title: "Rollout / Feature Flag",
    instruction: "Rollout / Feature Flag: Describe the rollout plan, feature flag strategy, and monitoring plan.",
    jsonSchema: { strategy: "e.g., Canary release to 10% of users", featureFlag: "e.g., 'enableNewDashboard'", monitoring: "e.g., Monitor error rates in Datadog" }
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