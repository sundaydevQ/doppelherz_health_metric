import React, { useState } from "react";
import { Button, FormikRadioGroupField } from "../../../../shared"; // Adjusted import path if necessary
import type { SurveyFormData } from "../types";
import { useFormikContext } from "formik";

export interface SurveyQuestionsFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

// Define ageOptions as requested
const ageOptions = [
  { value: "under30", label: "Dưới 30 tuổi" },
  { value: "30-34", label: "30 - 34 tuổi" },
  { value: "35-39", label: "35 - 39 tuổi" },
  { value: "40-44", label: "40 - 44 tuổi" },
  { value: "45-49", label: "45 - 49 tuổi" },
  { value: "50-54", label: "50 - 54 tuổi" },
  { value: "55plus", label: "Từ 55 tuổi trở lên" },
];

const SurveyQuestionsForm: React.FC<SurveyQuestionsFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched } = useFormikContext<SurveyFormData>();

  const handleNextWithValidation = async () => {
    setIsValidating(true);
    try {
      // Mark all fields for step 2 as touched to trigger validation
      const step2Fields = {
        step2: {
          age: true,
        },
      };

      // First set touched without validation
      await setTouched(step2Fields, false);

      // Then validate explicitly
      const validationErrors = await validateForm();
      console.log("Validation errors for Step 2:", validationErrors);

      // Check if there are any errors in step2
      const hasStep2Errors = validationErrors.step2;

      if (!hasStep2Errors) {
        // If no errors, proceed to the next step
        handleNext();
      } else {
        console.log(
          "Validation failed for Step 2. Please check the form for errors."
        );
      }
    } catch (error) {
      console.error("Form validation error on Step 2:", error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Thông tin về độ tuổi
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Vui lòng trả lời câu hỏi về độ tuổi của bạn.
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <FormikRadioGroupField
          label="Độ tuổi của bạn"
          name="step2.age" // Changed name to step2.age
          options={ageOptions} // Use the new ageOptions
          required
          // horizontal // Removed horizontal if not desired for age options
        />
        <div className="flex justify-between">
          <Button type="button" onPress={handleBack} variant="bordered">
            Quay lại
          </Button>
          <Button
            type="button"
            className=""
            onPress={handleNextWithValidation}
            disabled={isValidating}
          >
            {isValidating ? "Đang xác thực..." : "Tiếp theo"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SurveyQuestionsForm;
