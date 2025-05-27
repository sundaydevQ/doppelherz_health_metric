import React, { useState } from "react";
import { FormikInputField } from "../../../../shared/components";
import { Button, FormikCheckboxGroupField } from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";
import { getPointDeduction } from "../scoringConfig";
import { useMinusPointContext } from "../MinusPointProvider";

export interface DietAssessmentFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const psychologicalSignsOptions = [
  {
    value: "sleepProblems",
    label: "Khó ngủ, mất ngủ, ngủ không sâu giấc",
    points: getPointDeduction("step4.psychologicalSigns", "sleepProblems"),
  },
  {
    value: "moodSwings",
    label: "Tâm trạng thất thường, dễ cáu gắt",
    points: getPointDeduction("step4.psychologicalSigns", "moodSwings"),
  },
  {
    value: "memoryConcentration",
    label: "Giảm trí nhớ ngắn hạn, khó tập trung",
    points: getPointDeduction(
      "step4.psychologicalSigns",
      "memoryConcentration"
    ),
  },
  {
    value: "anxiety",
    label: "Cảm giác lo âu vô cớ",
    points: getPointDeduction("step4.psychologicalSigns", "anxiety"),
  },
  {
    value: "Bình thường",
    label: "Bình thường",
    points: getPointDeduction("step4.psychologicalSigns", "Bình thường"),
  },
  {
    value: "Khác",
    label: "Khác",
    points: getPointDeduction("step4.psychologicalSigns", "other"),
  },
];

const DietAssessmentForm: React.FC<DietAssessmentFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched, values, setFieldValue } =
    useFormikContext<SurveyFormData>();
  const { triggerMinusPointAtElement } = useMinusPointContext();
  // Check if "other" is selected in psychological signs
  const isOtherSelected = values.step4?.psychologicalSigns?.includes("Khác");

  // Handler for point deduction animations
  const handlePointDeduction = (
    points: number,
    option: string,
    element: HTMLElement
  ) => {
    if (points > 0) {
      triggerMinusPointAtElement(
        points,
        element,
        "step4.psychologicalSigns",
        option
      );
    }
  }; // Custom change handler for psychological signs
  const handlePsychologicalSignsChange = (
    value: string,
    currentValues: string[]
  ): string[] => {
    if (value === "Bình thường") {
      if (currentValues.includes("Bình thường")) {
        // If "Bình thường" is already selected, deselect it
        return currentValues.filter((item) => item !== "Bình thường");
      } else {
        // If "Bình thường" is being selected, clear all other values and set only "Bình thường"
        setFieldValue("step4.otherPsychologicalSigns", ""); // Clear description field
        return ["Bình thường"];
      }
    } else if (value === "Khác") {
      if (currentValues.includes("Khác")) {
        // If "Khác" is already selected, deselect it
        setFieldValue("step4.otherPsychologicalSigns", "");
        return currentValues.filter((item) => item !== "Khác");
      } else {
        // If "Khác" is being selected, clear "Bình thường" and other values, set only "Khác"
        setFieldValue("step4.otherPsychologicalSigns", "");
        return ["Khác"];
      }
    } else {
      // If any other option is selected, remove "Bình thường" and "Khác"
      let newValues = currentValues.filter(
        (item) => item !== "Khác" && item !== "Bình thường"
      );

      if (currentValues.includes(value)) {
        // Remove the value if it's already selected
        newValues = newValues.filter((item) => item !== value);
      } else {
        // Add the value if it's not already selected
        newValues = [...newValues, value];
      }

      // Clear the other description field when switching away from "Khác"
      if (currentValues.includes("Khác")) {
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
      <div className="space-y-6 mt-8">
        <FormikCheckboxGroupField
          label="Các dấu hiệu tâm lý nếu có?"
          name="step4.psychologicalSigns"
          options={psychologicalSignsOptions}
          onCustomChange={handlePsychologicalSignsChange}
          onPointDeduction={handlePointDeduction}
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
