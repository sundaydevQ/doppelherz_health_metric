// Step status type
export type StepStatus = "complete" | "current" | "upcoming";

// Step interface
export interface Step {
  id: string;
  name: string;
  status: StepStatus;
}

// Form data types for TypeScript
export interface SurveyFormData {
  step1: {
    fullName: string;
    gender: string;
    occupation: string;
    phoneNumber: string;
    email: string;
    address: string;
  };
  step2: {
    age: string;
  };
  step3: {
    physicalSigns?: string[]; // Added for checkbox group, optional array of strings
    otherPhysicalSigns?: string; // Additional field for custom input when "other" is selected
  };
  step4: {
    psychologicalSigns?: string[]; // Added for psychological signs checkbox group
    otherPsychologicalSigns?: string; // Additional field for custom input when "other" is selected
  };
  step5: {
    riskFactors?: string[]; // Added for risk factors checkbox group
    otherRiskFactors?: string; // Additional field for custom input when "other" is selected
  };
  step6: {
    medications?: string[]; // Added for medications checkbox group
    otherMedications?: string; // Additional field for custom input when "other" is selected
  };
  step7: Record<string, never>;
}
