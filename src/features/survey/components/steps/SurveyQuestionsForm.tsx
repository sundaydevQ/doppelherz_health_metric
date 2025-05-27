import React, { useState } from "react";
import { Button, FormikRadioGroupField } from "../../../../shared"; // Adjusted import path if necessary
import type { SurveyFormData } from "../types";
import { useFormikContext } from "formik";
import { getPointDeduction } from "../scoringConfig";
import { useMinusPointContext } from "../MinusPointProvider";

export interface SurveyQuestionsFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

// Define ageOptions as requested
const ageOptions = [
  {
    value: "under30",
    label: "Dưới 30 tuổi",
    score: -0,
    points: getPointDeduction("step2.age", "under30"),
  },
  {
    value: "30-34",
    label: "30 - 34 tuổi",
    score: -3,
    points: getPointDeduction("step2.age", "30-34"),
  },
  {
    value: "35-39",
    label: "35 - 39 tuổi",
    score: -7,
    points: getPointDeduction("step2.age", "35-39"),
  },
  {
    value: "40-44",
    label: "40 - 44 tuổi",
    score: -12,
    points: getPointDeduction("step2.age", "40-44"),
  },
  {
    value: "45-49",
    label: "45 - 49 tuổi",
    score: -20,
    points: getPointDeduction("step2.age", "45-49"),
  },
  {
    value: "50-54",
    label: "50 - 54 tuổi",
    score: -30,
    points: getPointDeduction("step2.age", "50-54"),
  },
  {
    value: "55plus",
    label: "Từ 55 tuổi trở lên",
    score: -40,
    points: getPointDeduction("step2.age", "55plus"),
  },
];

const SurveyQuestionsForm: React.FC<SurveyQuestionsFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched } = useFormikContext<SurveyFormData>();
  const { triggerMinusPointAtElement } = useMinusPointContext();

  // Point deduction handler for age selection
  const handlePointDeduction = (
    points: number,
    option: string,
    element: HTMLElement
  ) => {
    if (points > 0) {
      triggerMinusPointAtElement(points, element, "step2.age", option);
    }
  };

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
      <div className="space-y-6 mt-8">
        <FormikRadioGroupField
          label="Độ tuổi của bạn"
          name="step2.age" // Changed name to step2.age
          options={ageOptions} // Use the new ageOptions
          required
          onPointDeduction={handlePointDeduction}
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
