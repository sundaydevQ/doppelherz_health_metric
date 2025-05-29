import type { ScoringConfig } from "./types";

// Scoring configuration - points to deduct for each option
export const SCORING_CONFIG: ScoringConfig = {
  // Step 2: Age - points to deduct based on age ranges
  "step2.age": {
    "Dưới 30 tuổi": 0, // Dưới 30 tuổi
    "30 - 34 tuổi": 3, // 30 - 34 tuổi
    "35 - 39 tuổi": 7, // 35 - 39 tuổi
    "40 - 44 tuổi": 12, // 40 - 44 tuổi
    "45 - 49 tuổi": 20, // 45 - 49 tuổi
    "50 - 54 tuổi": 30, // 50 - 54 tuổi
    "55 tuổi trở lên": 40, // Từ 55 tuổi trở lên
  },
  // Step 3: Physical Signs - each symptom deducts points
  "step3.physicalSigns": {
    "Rối loạn kinh nguyệt (chu kỳ không đều, kéo dài, vô kinh, ra ít, ...)": 10,
    "Bốc hỏa, đổ mồ hôi đêm": 10,
    "Khô âm đạo, đau khi quan hệ": 10,
    "Giảm ham muốn tình dục": 7,
    "Mệt mỏi kéo dài không rõ nguyên nhân": 5,
    "Rụng tóc, da khô hơn rõ rệt": 5,
    "Tăng cân vùng bụng dù không ăn nhiều": 5,
    "Bình thường": 0,
    Khác: 5,
  },

  // Step 4: Psychological Signs - mental health impacts score
  "step4.psychologicalSigns": {
    "Khó ngủ, mất ngủ, ngủ không sâu giấc": 5,
    "Tâm trạng thất thường, dễ cáu gắt": 5,
    "Giảm trí nhớ ngắn hạn, khó tập trung": 5,
    "Lo âu vô cớ": 5,
    "Bình thường": 0,
    Khác: 5,
  },

  // Step 5: Risk Factors - existing conditions are serious
  "step5.riskFactors": {
    "Cắt tử cung hoặc buồng trứng sớm (< 45 tuổi)": 20,
    "Mãn kinh (12 tháng không có kinh)": 30,
    "Làm việc ca đêm, thiếu ngủ thường xuyên": 5,
    "Căng thẳng mạn tính hoặc stress vì công việc, cuộc sống, gia đình": 5,
    "Ăn kiêng cực đoan, sụt cân nhanh": 5,
    "Không vận động thể chất thường xuyên": 3,
    "Hút thuốc lá hoặc uống rượu thường xuyên": 5,
    "Bình thường": 0,
    Khác: 5,
  },

  // Step 6: Medications - some medications indicate health issues
  "step6.medications": {
    "Thuốc tránh thai nội tiết kết hợp (dùng liên tục từ 2 năm trở lên)": 2,
    "Các thuốc corticoid (Prednisolone, Dexamethasone...)": 3,
    "Thuốc điều trị ung thư (hóa xạ trị, kháng hormone...)": 10,
    "Thuốc chống trầm cảm hoặc an thần kinh (SSRI, antipsychotics)": 2,
    "Thuốc điều trị cường giáp hoặc suy giáp": 2,
    "Sử dụng thuốc điều trị hiếm muộn / hỗ trợ sinh sản": 2,
    "Sử dụng thuốc chống co giật (như phenytoin, carbamazepin)": 3,
    "Không sử dụng": 0,
    Khác: 5,
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
