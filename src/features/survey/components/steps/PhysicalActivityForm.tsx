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

export interface PhysicalActivityFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const riskFactorsOptions = [
  {
    value: "earlyHysterectomyOrOophorectomy",
    label: "Cắt tử cung hoặc buồng trứng sớm (< 45 tuổi)",
    points: getPointDeduction(
      "step5.riskFactors",
      "earlyHysterectomyOrOophorectomy"
    ),
  },
  {
    value: "menopause",
    label: "Mãn kinh (12 tháng không có kinh)",
    points: getPointDeduction("step5.riskFactors", "menopause"),
  },
  {
    value: "nightShiftsOrChronicSleepDeprivation",
    label: "Làm việc ca đêm, thiếu ngủ thường xuyên",
    points: getPointDeduction(
      "step5.riskFactors",
      "nightShiftsOrChronicSleepDeprivation"
    ),
  },
  {
    value: "chronicStress",
    label: "Căng thẳng mạn tính hoặc stress vì công việc, cuộc sống, gia đình",
    points: getPointDeduction("step5.riskFactors", "chronicStress"),
  },
  {
    value: "extremeDietingOrRapidWeightLoss",
    label: "Ăn kiêng cực đoan, sụt cân nhanh",
    points: getPointDeduction(
      "step5.riskFactors",
      "extremeDietingOrRapidWeightLoss"
    ),
  },
  {
    value: "sedentaryLifestyle",
    label: "Không vận động thể chất thường xuyên",
    points: getPointDeduction("step5.riskFactors", "sedentaryLifestyle"),
  },
  {
    value: "smokingOrRegularAlcoholConsumption",
    label: "Hút thuốc lá hoặc uống rượu thường xuyên",
    points: getPointDeduction(
      "step5.riskFactors",
      "smokingOrRegularAlcoholConsumption"
    ),
  },
  {
    value: "Bình thường",
    label: "Bình thường",
    points: getPointDeduction("step5.riskFactors", "Bình thường"),
  },
  {
    value: "Khác",
    label: "Khác",
    points: getPointDeduction("step5.riskFactors", "Khác"),
  },
];

const PhysicalActivityForm: React.FC<PhysicalActivityFormProps> = ({
  handleNext,
  handleBack,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateForm, setTouched, values, setFieldValue } =
    useFormikContext<SurveyFormData>();
  const { triggerMinusPointAtElement } = useMinusPointContext();

  // Point deduction handler for risk factors
  const handlePointDeduction = (
    points: number,
    option: string,
    element: HTMLElement
  ) => {
    if (points > 0) {
      triggerMinusPointAtElement(points, element, "step5.riskFactors", option);
    }
  };
  // Check if "other" is selected in risk factors
  const isOtherRiskFactorSelected = values.step5?.riskFactors?.includes("Khác");
  // Custom change handler for risk factors
  const handleRiskFactorsChange = (
    value: string,
    currentValues: string[]
  ): string[] => {
    if (value === "Bình thường") {
      if (currentValues.includes("Bình thường")) {
        // If "Bình thường" is already selected, deselect it
        return currentValues.filter((item) => item !== "Bình thường");
      } else {
        // If "Bình thường" is being selected, clear all other values and set only "Bình thường"
        setFieldValue("step5.otherRiskFactors", ""); // Clear description field
        return ["Bình thường"];
      }
    } else if (value === "Khác") {
      if (currentValues.includes("Khác")) {
        // If "Khác" is already selected, deselect it
        setFieldValue("step5.otherRiskFactors", ""); // Clear description
        return currentValues.filter((item) => item !== "Khác");
      } else {
        // If "Khác" is being selected, clear "Bình thường" and other values, set only "Khác"
        setFieldValue("step5.otherRiskFactors", ""); // Clear description
        return ["Khác"];
      }
    } else {
      // If any other option is selected, remove "Bình thường" and "Khác"
      let newValues = [...currentValues].filter(
        (item) => item !== "Khác" && item !== "Bình thường"
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
        setFieldValue("step5.otherRiskFactors", "");
      }
      return newValues;
    }
  };

  const handleNextWithValidation = async () => {
    return handleNext();
    setIsValidating(true);
    try {
      // Mark all fields for step 5 as touched to trigger validation
      const step5Fields = {
        step5: {
          riskFactors: true,
          otherRiskFactors: true,
        },
      };

      // First set touched without validation
      await setTouched(step5Fields, false);

      // Then validate explicitly
      const validationErrors = await validateForm();
      console.log("Validation errors for Step 5:", validationErrors);

      // Check if there are any errors in step5
      const hasStep5Errors = validationErrors.step5;

      if (!hasStep5Errors) {
        // If no errors, proceed to the next step
        handleNext();
      } else {
        console.log(
          "Validation failed for Step 5. Please check the form for errors."
        );
      }
    } catch (error) {
      console.error("Form validation error on Step 5:", error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <div className="space-y-6 mt-8">
        <FormikCheckboxGroupField
          label="Các yếu tố tiền sử và nguy cơ khác nếu có?"
          name="step5.riskFactors"
          options={riskFactorsOptions}
          onCustomChange={handleRiskFactorsChange}
          onPointDeduction={handlePointDeduction}
        />
        {isOtherRiskFactorSelected && (
          <FormikInputField
            label="Vui lòng mô tả cụ thể yếu tố nguy cơ khác"
            name="step5.otherRiskFactors"
            placeholder="Nhập yếu tố nguy cơ khác..."
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

export default PhysicalActivityForm;
