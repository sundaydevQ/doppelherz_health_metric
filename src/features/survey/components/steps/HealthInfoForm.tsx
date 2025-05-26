import React, { useState } from "react";
import {
  Button,
  FormikCheckboxGroupField,
  FormikInputField,
} from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface HealthInfoFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const physicalSignsOptions = [
  {
    value: "menstrualDisorders",
    label:
      "Rối loạn kinh nguyệt (chu kỳ không đều, kéo dài, vô kinh, ra ít, ...)",
  },
  { value: "hotFlashesNightSweats", label: "Bốc hỏa, đổ mồ hôi đêm" },
  {
    value: "vaginalDrynessPainfulIntercourse",
    label: "Khô âm đạo, đau khi quan hệ",
  },
  { value: "decreasedLibido", label: "Giảm ham muốn tình dục" },
  {
    value: "prolongedUnexplainedFatigue",
    label: "Mệt mỏi kéo dài không rõ nguyên nhân",
  },
  { value: "hairLossDrySkin", label: "Rụng tóc, da khô hơn rõ rệt" },
  {
    value: "abdominalWeightGain",
    label: "Tăng cân vùng bụng dù không ăn nhiều",
  },
  { value: "Bình thường", label: "Bình thường" },
  { value: "other", label: "Khác" },
];

const HealthInfoForm: React.FC<HealthInfoFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched, values, setFieldValue } =
    useFormikContext<SurveyFormData>();

  // Check if "other" is selected in physical signs
  const isOtherSelected = values.step3?.physicalSigns?.includes("other");

  // Custom change handler for physical signs
  const handlePhysicalSignsChange = (
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
        setFieldValue("step3.otherPhysicalSigns", "");
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
        setFieldValue("step3.otherPhysicalSigns", "");
      }

      return newValues;
    }
  };

  const handleNextWithValidation = async () => {
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
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Thông tin sức khỏe
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Vui lòng cung cấp thông tin sức khỏe cơ bản của bạn.
        </p>
      </div>{" "}
      <div className="space-y-6 mt-8">
        {" "}
        <FormikCheckboxGroupField
          label="Các dấu hiệu thể chất nếu có?"
          name="step3.physicalSigns"
          options={physicalSignsOptions}
          onCustomChange={handlePhysicalSignsChange}
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
