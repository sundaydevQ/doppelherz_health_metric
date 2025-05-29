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
        [
          "Dưới 30 tuổi",
          "30 - 34 tuổi",
          "35 - 39 tuổi",
          "40 - 44 tuổi",
          "45 - 49 tuổi",
          "50 - 54 tuổi",
          "55 tuổi trở lên",
        ],
        "Vui lòng chọn một độ tuổi hợp lệ từ danh sách"
      ),
  }),
});

// Step 3: Health Information validation schema
export const healthInfoSchema = Yup.object({
  step3: Yup.object({
    physicalSigns: Yup.array()
      .min(1, "Vui lòng chọn ít nhất một dấu hiệu sức khỏe")
      .of(Yup.string()), // Validate as an array of strings
    otherPhysicalSigns: Yup.string().when("physicalSigns", {
      is: (physicalSigns: string[]) =>
        physicalSigns && physicalSigns.includes("other"),
      then: (schema) => schema.required("Vui lòng mô tả dấu hiệu khác"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

// Step 4: Diet Assessment validation schema
export const dietAssessmentSchema = Yup.object({
  step4: Yup.object({
    psychologicalSigns: Yup.array()
      .min(1, "Vui lòng chọn ít nhất một dấu hiệu tâm lý")
      .of(Yup.string()), // Optional array for psychological signs
    otherPsychologicalSigns: Yup.string().when("psychologicalSigns", {
      is: (psychologicalSigns: string[]) =>
        psychologicalSigns && psychologicalSigns.includes("other"),
      then: (schema) => schema.required("Vui lòng mô tả dấu hiệu tâm lý khác"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

// Step 5: Physical Activity validation schema
export const physicalActivitySchema = Yup.object({
  step5: Yup.object({
    riskFactors: Yup.array()
      .min(1, "Vui lòng chọn ít nhất một yếu tố nguy cơ")
      .of(Yup.string()), // Optional array for risk factors
    otherRiskFactors: Yup.string().when("riskFactors", {
      is: (riskFactors: string[]) =>
        riskFactors && riskFactors.includes("other"),
      then: (schema) => schema.required("Vui lòng mô tả yếu tố nguy cơ khác"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

// Step 6: Medication validation schema
export const medicationSchema = Yup.object({
  step6: Yup.object({
    medications: Yup.array()
      .min(1, "Vui lòng chọn ít nhất một loại thuốc")
      .of(Yup.string()), // Optional array for medications
    otherMedications: Yup.string().when("medications", {
      is: (medications: string[]) =>
        medications && medications.includes("other"),
      then: (schema) => schema.required("Vui lòng mô tả loại thuốc khác"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

// Combined validation schema for the entire form
export const combinedSchema = Yup.object({
  ...basicInfoSchema.fields,
  ...surveyQuestionsSchema.fields,
  ...healthInfoSchema.fields,
  ...dietAssessmentSchema.fields,
  ...physicalActivitySchema.fields,
  ...medicationSchema.fields,
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
    case 5:
      return medicationSchema;
    default:
      return Yup.object(); // Default empty schema
  }
};
