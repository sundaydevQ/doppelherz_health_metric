import React, { useState } from "react";
import {
  FormikCheckboxGroupField,
  FormikInputField,
} from "../../../../shared/components";
import { Button } from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";
import { getPointDeduction } from "../scoringConfig";
import { useMinusPointContext } from "../MinusPointProvider";

export interface MedicationFormProps {
  handleBack: () => void;
}

const medicationOptions = [
  {
    value: "combinedHormonalContraceptives",
    label: "Thuốc tránh thai nội tiết kết hợp (dùng liên tục từ 2 năm trở lên)",
    points: getPointDeduction(
      "step6.medications",
      "combinedHormonalContraceptives"
    ),
  },
  {
    value: "corticosteroids",
    label: "Các thuốc corticoid (Prednisolone, Dexamethasone...)",
    points: getPointDeduction("step6.medications", "corticosteroids"),
  },
  {
    value: "cancerTreatmentMeds",
    label: "Thuốc điều trị ung thư (hóa xạ trị, kháng hormone...)",
    points: getPointDeduction("step6.medications", "cancerTreatmentMeds"),
  },
  {
    value: "antidepressantsAntipsychotics",
    label: "Thuốc chống trầm cảm hoặc an thần kinh (SSRI, antipsychotics)",
    points: getPointDeduction(
      "step6.medications",
      "antidepressantsAntipsychotics"
    ),
  },
  {
    value: "thyroidMeds",
    label: "Thuốc điều trị cường giáp hoặc suy giáp",
    points: getPointDeduction("step6.medications", "thyroidMeds"),
  },
  {
    value: "fertilityMeds",
    label: "Sử dụng thuốc điều trị hiếm muộn / hỗ trợ sinh sản",
    points: getPointDeduction("step6.medications", "fertilityMeds"),
  },
  {
    value: "anticonvulsants",
    label: "Sử dụng thuốc chống co giật (như phenytoin, carbamazepin)",
    points: getPointDeduction("step6.medications", "anticonvulsants"),
  },
  {
    value: "Không sử dụng",
    label: "Không sử dụng",
    points: getPointDeduction("step6.medications", "Không sử dụng"),
  },
  {
    value: "Khác",
    label: "Khác",
    points: getPointDeduction("step6.medications", "Khác"),
  },
];

const MedicationForm: React.FC<MedicationFormProps> = ({ handleBack }) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched, values, setFieldValue, submitForm } =
    useFormikContext<SurveyFormData>();
  const { triggerMinusPointAtElement } = useMinusPointContext();

  // Point deduction handler for medications
  const handlePointDeduction = (
    points: number,
    option: string,
    element: HTMLElement
  ) => {
    if (points > 0) {
      triggerMinusPointAtElement(points, element, "step6.medications", option);
    }
  };
  // Check if "other" is selected in medications
  const isOtherMedicationSelected = values.step6?.medications?.includes("Khác");
  // Custom change handler for medications
  const handleMedicationsChange = (
    value: string,
    currentValues: string[]
  ): string[] => {
    if (value === "Không sử dụng") {
      if (currentValues.includes("Không sử dụng")) {
        // If "Không sử dụng" is already selected, deselect it
        return currentValues.filter((item) => item !== "Không sử dụng");
      } else {
        // If "Không sử dụng" is being selected, clear all other values and set only "Không sử dụng"
        setFieldValue("step6.otherMedications", ""); // Clear description field
        return ["Không sử dụng"];
      }
    } else if (value === "Khác") {
      if (currentValues.includes("Khác")) {
        // If "Khác" is already selected, deselect it
        setFieldValue("step6.otherMedications", ""); // Clear description
        return currentValues.filter((item) => item !== "Khác");
      } else {
        // If "Khác" is being selected, clear "Không sử dụng" and other values, set only "Khác"
        setFieldValue("step6.otherMedications", ""); // Clear description
        return ["Khác"];
      }
    } else {
      // If any other option is selected, remove "Không sử dụng" and "Khác"
      let newValues = [...currentValues].filter(
        (item) => item !== "Khác" && item !== "Không sử dụng"
      );

      if (currentValues.includes(value)) {
        // If the option is already selected, deselect it
        newValues = newValues.filter((item) => item !== value);
      } else {
        // If the option is not selected, select it
        newValues.push(value);
      }

      // Clear description field if switching away from "Khác"
      if (currentValues.includes("Khác")) {
        setFieldValue("step6.otherMedications", "");
      }
      return newValues;
    }
  };
  const handleNextWithValidation = async () => {
    // return await submitForm();
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

      // Check if there are any validation errors for step 6
      const step6ErrorKeys = Object.keys(validationErrors.step6 ?? {});

      if (step6ErrorKeys.length === 0) {
        console.log("No validation errors for Step 6, submitting form...");
        // If no errors, call submitForm which will trigger SurveyPage's handleSubmit
        await submitForm();
      } else {
        console.log(
          "Validation errors found for Step 6, not submitting:",
          validationErrors.step6
        );
        // Optionally, focus on the first error field or display a general error message
      }
    } catch (error) {
      console.error("Error during validation or submission:", error);
      // Handle any unexpected errors during the process
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">
        Bước 6: Thông tin về thuốc và thực phẩm chức năng
      </h2>
      {/* Medications */}
      <FormikCheckboxGroupField
        label="Các loại thuốc bạn đã hoặc đang sử dụng?"
        name="step6.medications"
        options={medicationOptions}
        onCustomChange={handleMedicationsChange}
        onPointDeduction={handlePointDeduction}
      />
      {isOtherMedicationSelected && (
        <FormikInputField
          label="Vui lòng mô tả cụ thể loại thuốc khác"
          name="step6.otherMedications"
          placeholder="Nhập loại thuốc khác..."
          required
        />
      )}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onPress={handleBack}
          variant="bordered"
          className="w-32"
        >
          Quay lại
        </Button>
        <Button
          type="button"
          onPress={handleNextWithValidation}
          className="w-48" // Adjusted width for longer text
          disabled={isValidating}
        >
          {isValidating ? "Đang kiểm tra..." : "Hoàn thành khảo sát"}
        </Button>
      </div>
    </div>
  );
};

export default MedicationForm;
