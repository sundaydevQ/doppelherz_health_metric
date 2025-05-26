import React, { useState } from "react";
import {
  FormikCheckboxGroupField,
  FormikInputField,
} from "../../../../shared/components";
import { Button } from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface MedicationFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const medicationOptions = [
  {
    value: "combinedHormonalContraceptives",
    label: "Thuốc tránh thai nội tiết kết hợp (dùng liên tục từ 2 năm trở lên)",
  },
  {
    value: "corticosteroids",
    label: "Các thuốc corticoid (Prednisolone, Dexamethasone...)",
  },
  {
    value: "cancerTreatmentMeds",
    label: "Thuốc điều trị ung thư (hóa xạ trị, kháng hormone...)",
  },
  {
    value: "antidepressantsAntipsychotics",
    label: "Thuốc chống trầm cảm hoặc an thần kinh (SSRI, antipsychotics)",
  },
  {
    value: "thyroidMeds",
    label: "Thuốc điều trị cường giáp hoặc suy giáp",
  },
  {
    value: "fertilityMeds",
    label: "Sử dụng thuốc điều trị hiếm muộn / hỗ trợ sinh sản",
  },
  {
    value: "anticonvulsants",
    label: "Sử dụng thuốc chống co giật (như phenytoin, carbamazepin)",
  },
  { value: "Bình thường", label: "Bình thường" },
  { value: "other", label: "Khác" },
];

const MedicationForm: React.FC<MedicationFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched, values, setFieldValue } =
    useFormikContext<SurveyFormData>();

  // Check if "other" is selected in medications
  const isOtherMedicationSelected =
    values.step6?.medications?.includes("other");

  // Custom change handler for medications
  const handleMedicationsChange = (
    value: string,
    currentValues: string[]
  ): string[] => {
    if (value === "other") {
      if (currentValues.includes("other")) {
        // If "other" is already selected, deselect it
        setFieldValue("step6.otherMedications", ""); // Clear description
        return currentValues.filter((item) => item !== "other");
      } else {
        // If "other" is being selected, clear all other values and set only "other"
        setFieldValue("step6.otherMedications", ""); // Clear description
        return ["other"];
      }
    } else {
      // If any other option is selected
      let newValues = [...currentValues].filter((item) => item !== "other"); // Ensure 'other' is not carried over if a non-other option is clicked

      if (currentValues.includes(value)) {
        // If the option is already selected (and it's not 'other'), deselect it
        newValues = newValues.filter((item) => item !== value);
      } else {
        // If the option is not selected (and it's not 'other'), select it
        newValues.push(value);
      }

      // If 'other' was in currentValues, it means we are switching from 'other' to a specific option
      // or deselecting 'other' by clicking it again (handled above).
      // We need to ensure the description field is cleared if 'other' is no longer the sole selection or part of the selection.
      if (currentValues.includes("other")) {
        setFieldValue("step6.otherMedications", "");
      }
      return newValues;
    }
  };

  const handleNextWithValidation = async () => {
    setIsValidating(true);
    try {
      // Mark all fields for step 6 as touched to trigger validation
      const step6Fields = {
        step6: {
          medications: true,
          otherMedications: true,
        },
      };

      // First set touched without validation
      await setTouched(step6Fields, false);

      // Then validate explicitly
      const validationErrors = await validateForm();
      console.log("Validation errors for Step 6:", validationErrors);

      // Check if there are any errors in step6
      const hasStep6Errors = validationErrors.step6;

      if (!hasStep6Errors) {
        // If no errors, proceed to the next step
        handleNext();
      } else {
        console.log(
          "Validation failed for Step 6. Please check the form for errors."
        );
      }
    } catch (error) {
      console.error("Form validation error on Step 6:", error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Các loại thuốc bạn đã hoặc đang sử dụng
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Vui lòng cung cấp thông tin về các loại thuốc bạn đã hoặc đang sử dụng
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <FormikCheckboxGroupField
          label="Các loại thuốc bạn đã hoặc đang sử dụng?"
          name="step6.medications"
          options={medicationOptions}
          onCustomChange={handleMedicationsChange}
        />

        {isOtherMedicationSelected && (
          <FormikInputField
            label="Vui lòng mô tả cụ thể loại thuốc khác"
            name="step6.otherMedications"
            placeholder="Nhập loại thuốc khác..."
            required
          />
        )}

        <div className="flex justify-between">
          <Button type="button" onPress={handleBack} variant="bordered">
            Quay lại
          </Button>
          <Button
            type="button" // Changed to button to prevent form submission
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

export default MedicationForm;
