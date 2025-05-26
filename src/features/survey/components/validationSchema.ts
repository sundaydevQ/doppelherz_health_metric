import * as Yup from "yup";

// Step 1: Basic Information validation schema
export const basicInfoSchema = Yup.object({
  step1: Yup.object({
    fullName: Yup.string().required("Vui lòng nhập họ và tên của bạn"),
    gender: Yup.string().required("Vui lòng chọn giới tính của bạn"),
    occupation: Yup.string().required("Vui lòng nhập nghề nghiệp của bạn"),
    phoneNumber: Yup.string()
      .required("Vui lòng nhập số điện thoại của bạn")
      .matches(/^[0-9]+$/, "Số điện thoại chỉ bao gồm các chữ số"),
    email: Yup.string().nullable().email("Email không hợp lệ"), // Optional
    address: Yup.string().required("Vui lòng nhập địa chỉ của bạn"),
  }),
});

// Step 2: Survey Questions validation schema
export const surveyQuestionsSchema = Yup.object({
  step2: Yup.object({
    age: Yup.string()
      .required("Vui lòng chọn độ tuổi của bạn")
      .oneOf(
        ["under30", "30-34", "35-39", "40-44", "45-49", "50-54", "55plus"],
        "Vui lòng chọn một độ tuổi hợp lệ từ danh sách"
      ),
    question1: Yup.string().required(
      "Vui lòng cho biết bạn ngủ bao nhiêu giờ mỗi ngày"
    ),
    question2: Yup.string().required(
      "Vui lòng cho biết tần suất tập thể dục của bạn"
    ),
    question3: Yup.string().required(
      "Vui lòng cho biết bạn uống bao nhiêu nước mỗi ngày"
    ),
  }),
});

// Step 3: Health Information validation schema
export const healthInfoSchema = Yup.object({
  step3: Yup.object({
    height: Yup.string().required("Chiều cao là bắt buộc"),
    weight: Yup.string().required("Cân nặng là bắt buộc"),
    bloodPressure: Yup.string().required("Huyết áp là bắt buộc"),
    chronicConditions: Yup.string(), // Optional field
  }),
});

// Step 4: Diet Assessment validation schema
export const dietAssessmentSchema = Yup.object({
  step4: Yup.object({
    mealsPerDay: Yup.string().required("Số bữa ăn là bắt buộc"),
    waterIntake: Yup.string().required("Lượng nước là bắt buộc"),
    dietaryRestrictions: Yup.string(), // Optional field
  }),
});

// Step 5: Physical Activity validation schema
export const physicalActivitySchema = Yup.object({
  step5: Yup.object({
    exerciseFrequency: Yup.string().required(
      "Tần suất tập thể dục là bắt buộc"
    ),
    exerciseType: Yup.string().required("Loại bài tập là bắt buộc"),
    activityLevel: Yup.string().required("Mức độ hoạt động là bắt buộc"),
  }),
});

// Combined validation schema for the entire form
export const combinedSchema = Yup.object({
  ...basicInfoSchema.fields,
  ...surveyQuestionsSchema.fields,
  ...healthInfoSchema.fields,
  ...dietAssessmentSchema.fields,
  ...physicalActivitySchema.fields,
  step6: Yup.object().default({}),
});

// Get validation schema by step index
export const getValidationSchemaByStep = (stepIndex: number) => {
  switch (stepIndex) {
    case 0:
      return basicInfoSchema;
    case 1:
      return surveyQuestionsSchema;
    case 2:
      return healthInfoSchema;
    case 3:
      return dietAssessmentSchema;
    case 4:
      return physicalActivitySchema;
    case 5: // Results page, no validation needed
      return Yup.object();
    default:
      return Yup.object(); // Default empty schema
  }
};
