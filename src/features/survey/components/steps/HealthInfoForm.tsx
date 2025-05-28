import React, { useState } from "react";
import {
  Button,
  FormikCheckboxGroupField,
  FormikInputField,
} from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";
import { getPointDeduction } from "../scoringConfig";
import { useMinusPointContext } from "../MinusPointProvider";

export interface HealthInfoFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const physicalSignsOptions = [
  {
    value: "menstrualDisorders",
    label:
      "Rối loạn kinh nguyệt (chu kỳ không đều, kéo dài, vô kinh, ra ít, ...)",
    points: getPointDeduction("step3.physicalSigns", "menstrualDisorders"),
  },
  {
    value: "hotFlashesNightSweats",
    label: "Bốc hỏa, đổ mồ hôi đêm",
    points: getPointDeduction("step3.physicalSigns", "hotFlashesNightSweats"),
  },
  {
    value: "vaginalDrynessPainfulIntercourse",
    label: "Khô âm đạo, đau khi quan hệ",
    points: getPointDeduction(
      "step3.physicalSigns",
      "vaginalDrynessPainfulIntercourse"
    ),
  },
  {
    value: "decreasedLibido",
    label: "Giảm ham muốn tình dục",
    points: getPointDeduction("step3.physicalSigns", "decreasedLibido"),
  },
  {
    value: "prolongedUnexplainedFatigue",
    label: "Mệt mỏi kéo dài không rõ nguyên nhân",
    points: getPointDeduction(
      "step3.physicalSigns",
      "prolongedUnexplainedFatigue"
    ),
  },
  {
    value: "hairLossDrySkin",
    label: "Rụng tóc, da khô hơn rõ rệt",
    points: getPointDeduction("step3.physicalSigns", "hairLossDrySkin"),
  },
  {
    value: "abdominalWeightGain",
    label: "Tăng cân vùng bụng dù không ăn nhiều",
    points: getPointDeduction("step3.physicalSigns", "abdominalWeightGain"),
  },
  {
    value: "Bình thường",
    label: "Bình thường",
    points: getPointDeduction("step3.physicalSigns", "Bình thường"),
  },
  {
    value: "Khác",
    label: "Khác",
    points: getPointDeduction("step3.physicalSigns", "Khác"),
  },
];

const HealthInfoForm: React.FC<HealthInfoFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched, values, setFieldValue } =
    useFormikContext<SurveyFormData>();
  const { triggerMinusPointAtElement } = useMinusPointContext();
  // Check if "other" is selected in physical signs
  const isOtherSelected = values.step3?.physicalSigns?.includes("Khác");

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
        "step3.physicalSigns",
        option
      );
    }
  }; // Custom change handler for physical signs
  const handlePhysicalSignsChange = (
    value: string,
    currentValues: string[]
  ): string[] => {
    if (value === "Bình thường") {
      if (currentValues.includes("Bình thường")) {
        // If "Bình thường" is already selected, deselect it
        return currentValues.filter((item) => item !== "Bình thường");
      } else {
        // If "Bình thường" is being selected, clear all other values and set only "Bình thường"
        setFieldValue("step3.otherPhysicalSigns", ""); // Clear description field
        return ["Bình thường"];
      }
    } else if (value === "Khác") {
      if (currentValues.includes("Khác")) {
        // If "Khác" is already selected, deselect it
        setFieldValue("step3.otherPhysicalSigns", "");
        return currentValues.filter((item) => item !== "Khác");
      } else {
        // If "Khác" is being selected, clear "Bình thường" and other values, set only "Khác"
        setFieldValue("step3.otherPhysicalSigns", "");
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
        setFieldValue("step3.otherPhysicalSigns", "");
      }

      return newValues;
    }
  };

  const handleNextWithValidation = async () => {
    return handleNext();
    setIsValidating(true);
    try {
      // Mark all fields for step 3 as touched to trigger validation
      const step3Fields = {
        step3: {
          physicalSigns: true,
          otherPhysicalSigns: true,
        },
      };

      // First set touched without validation
      await setTouched(step3Fields, false);

      // Then validate explicitly
      const validationErrors = await validateForm();
      console.log("Validation errors for Step 3:", validationErrors);

      // Check if there are any errors in step3
      const hasStep3Errors = validationErrors.step3;

      if (!hasStep3Errors) {
        // If no errors, proceed to the next step
        handleNext();
      } else {
        console.log(
          "Validation failed for Step 3. Please check the form for errors."
        );
      }
    } catch (error) {
      console.error("Form validation error on Step 3:", error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <div className="space-y-6 mt-8">
        <FormikCheckboxGroupField
          label="Các dấu hiệu thể chất nếu có?"
          name="step3.physicalSigns"
          options={physicalSignsOptions}
          onCustomChange={handlePhysicalSignsChange}
          onPointDeduction={handlePointDeduction}
          required
        />
        {/* Conditional input field for "Other" option */}
        {isOtherSelected && (
          <FormikInputField
            label="Vui lòng mô tả cụ thể"
            name="step3.otherPhysicalSigns"
            placeholder="Nhập dấu hiệu khác..."
            required
          />
        )}
        <div className="flex justify-between">
          <Button type="button" onPress={handleBack} variant="bordered">
            Quay lại
          </Button>
          <Button
            type="button"
            onPress={handleNextWithValidation}
            className=""
            disabled={isValidating}
          >
            {isValidating ? "Đang xác thực..." : "Tiếp theo"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default HealthInfoForm;
