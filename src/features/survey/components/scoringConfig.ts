import type { ScoringConfig } from "./types";

// Scoring configuration - points to deduct for each option
export const SCORING_CONFIG: ScoringConfig = {
  // Step 2: Age - points to deduct based on age ranges
  "step2.age": {
    under30: 0, // Dưới 30 tuổi
    "30-34": 3, // 30 - 34 tuổi
    "35-39": 7, // 35 - 39 tuổi
    "40-44": 12, // 40 - 44 tuổi
    "45-49": 20, // 45 - 49 tuổi
    "50-54": 30, // 50 - 54 tuổi
    "55plus": 40, // Từ 55 tuổi trở lên
  },
  // Step 3: Physical Signs - each symptom deducts points
  "step3.physicalSigns": {
    menstrualDisorders: 10,
    hotFlashesNightSweats: 10,
    vaginalDrynessPainfulIntercourse: 10,
    decreasedLibido: 7,
    prolongedUnexplainedFatigue: 5,
    hairLossDrySkin: 5,
    abdominalWeightGain: 5,
    "Bình thường": 0,
    other: 5,
  },

  // Step 4: Psychological Signs - mental health impacts score
  "step4.psychologicalSigns": {
    sleepProblems: 5,
    moodSwings: 5,
    memoryConcentration: 5,
    anxiety: 5,
    "Bình thường": 0,
    other: 5,
  },

  // Step 5: Risk Factors - existing conditions are serious
  "step5.riskFactors": {
    earlyHysterectomyOrOophorectomy: 20,
    menopause: 30,
    nightShiftsOrChronicSleepDeprivation: 5,
    chronicStress: 5,
    extremeDietingOrRapidWeightLoss: 5,
    sedentaryLifestyle: 3,
    smokingOrRegularAlcoholConsumption: 5,
    "Bình thường": 0,
    other: 5,
  },

  // Step 6: Medications - some medications indicate health issues
  "step6.medications": {
    combinedHormonalContraceptives: 2,
    corticosteroids: 3,
    cancerTreatmentMeds: 10,
    antidepressantsAntipsychotics: 2,
    thyroidMeds: 2,
    fertilityMeds: 2,
    anticonvulsants: 3,
    "Không sử dụng": 0,
    other: 5,
  },
};

// Initial score
export const INITIAL_SCORE = 100;

// Score ranges and their meanings
export const SCORE_RANGES = {
  excellent: {
    min: 85,
    max: 100,
    label: "Nội tiết tố ổn định",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  //   good: {
  //     min: 65,
  //     max: 84,
  //     label: "Tốt",
  //     color: "text-green-500",
  //     bgColor: "bg-green-50",
  //   },
  fair: {
    min: 65,
    max: 84,
    label: "Nguy cơ thiếu hụt trung bình",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  poor: {
    min: 40,
    max: 64,
    label: "Nguy cơ thiếu hụt cao",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  critical: {
    min: 0,
    max: 39,
    label: "Nguy cơ thiếu hụt nghiêm trọng",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
};

// Function to get score range information
export function getScoreRange(score: number) {
  for (const [key, range] of Object.entries(SCORE_RANGES)) {
    if (score >= range.min && score <= range.max) {
      return { key, ...range };
    }
  }
  return SCORE_RANGES.critical;
}

// Function to calculate score deduction for a field
export function calculateScoreDeduction(
  fieldName: string,
  value: string | string[]
): number {
  const config = SCORING_CONFIG[fieldName];
  if (!config) return 0;

  if (Array.isArray(value)) {
    // For checkbox arrays, sum up all deductions
    return value.reduce((total, item) => {
      return total + (config[item] || 0);
    }, 0);
  } else {
    // For single values
    return config[value] || 0;
  }
}

// Helper function to get point deduction for a specific field and option
export const getPointDeduction = (
  fieldName: string,
  optionValue: string
): number => {
  const fieldConfig = SCORING_CONFIG[fieldName as keyof ScoringConfig];
  if (!fieldConfig) return 0;

  return fieldConfig[optionValue] || 0;
};

// Helper function to get all options with their point deductions for a field
export const getFieldOptions = (
  fieldName: string
): Array<{ value: string; points: number }> => {
  const fieldConfig = SCORING_CONFIG[fieldName as keyof ScoringConfig];
  if (!fieldConfig) return [];

  return Object.entries(fieldConfig).map(([value, points]) => ({
    value,
    points,
  }));
};
