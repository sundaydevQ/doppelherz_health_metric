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
    question1: string;
    question2: string;
    question3: string;
  };
  step3: {
    height: string;
    weight: string;
    bloodPressure: string;
    chronicConditions: string;
  };
  step4: {
    mealsPerDay: string;
    waterIntake: string;
    dietaryRestrictions: string;
  };
  step5: {
    exerciseFrequency: string;
    exerciseType: string;
    activityLevel: string;
  };
  step6: Record<string, never>;
}
