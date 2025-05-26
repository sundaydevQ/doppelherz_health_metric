import React, { useState } from "react";
import { FormikInputField } from "../../../../shared/components";
import { Button, FormikCheckboxGroupField } from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface DietAssessmentFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const psychologicalSignsOptions = [
  { value: "sleepProblems", label: "Khó ngủ, mất ngủ, ngủ không sâu giấc" },
  { value: "moodSwings", label: "Tâm trạng thất thường, dễ cáu gắt" },
  {
    value: "memoryConcentration",
    label: "Giảm trí nhớ ngắn hạn, khó tập trung",
  },
  { value: "anxiety", label: "Cảm giác lo âu vô cớ" },
  { value: "Bình thường", label: "Bình thường" },
  { value: "other", label: "Khác" },
];

const DietAssessmentForm: React.FC<DietAssessmentFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched, values, setFieldValue } =
    useFormikContext<SurveyFormData>();

  // Check if "other" is selected in psychological signs
  const isOtherSelected = values.step4?.psychologicalSigns?.includes("other");

  // Custom change handler for psychological signs
  const handlePsychologicalSignsChange = (
    value: string,
    currentValues: string[]
  ): string[] => {
    if (value === "other") {
      if (currentValues.includes("other")) {
        // If "other" is already selected, deselect it
        return currentValues.filter((item) => item !== "other");
      } else {
        // If "other" is being selected, clear all other values and set only "other"
        // Also clear the other description field when "other" is selected
        setFieldValue("step4.otherPsychologicalSigns", "");
        return ["other"];
      }
    } else {
      // If any other option is selected while "other" is already selected,
      // remove "other" and add the new selection
      let newValues = currentValues.filter((item) => item !== "other");

      if (currentValues.includes(value)) {
        // Remove the value if it's already selected
        newValues = newValues.filter((item) => item !== value);
      } else {
        // Add the value if it's not already selected
        newValues = [...newValues, value];
      }

      // Clear the other description field when "other" is deselected
      if (currentValues.includes("other")) {
        setFieldValue("step4.otherPsychologicalSigns", "");
      }

      return newValues;
    }
  };

  const handleNextWithValidation = async () => {
    setIsValidating(true);
    try {
      // Mark all fields for step 4 as touched to trigger validation
      const step4Fields = {
        step4: {
          psychologicalSigns: true,
          otherPsychologicalSigns: true,
        },
      };

      // First set touched without validation
      await setTouched(step4Fields, false);

      // Then validate explicitly
      const validationErrors = await validateForm();
      console.log("Validation errors for Step 4:", validationErrors);

      // Check if there are any errors in step4
      const hasStep4Errors = validationErrors.step4;

      if (!hasStep4Errors) {
        // If no errors, proceed to the next step
        handleNext();
      } else {
        console.log(
          "Validation failed for Step 4. Please check the form for errors."
        );
      }
    } catch (error) {
      console.error("Form validation error on Step 4:", error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Đánh giá tâm lý
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Vui lòng chia sẻ thông tin về tình trạng tâm lý của bạn.
        </p>
      </div>
      <div className="space-y-6 mt-8">
        {" "}
        <FormikCheckboxGroupField
          label="Các dấu hiệu tâm lý nếu có?"
          name="step4.psychologicalSigns"
          options={psychologicalSignsOptions}
          onCustomChange={handlePsychologicalSignsChange}
        />
        {/* Conditional input field for "Other" option */}
        {isOtherSelected && (
          <FormikInputField
            label="Vui lòng mô tả cụ thể"
            name="step4.otherPsychologicalSigns"
            placeholder="Nhập dấu hiệu tâm lý khác..."
            required
          />
        )}
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

export default DietAssessmentForm;
