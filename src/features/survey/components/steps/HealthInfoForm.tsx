import React from "react";
import { FormikInputField } from "../../../../shared/components";
import { Button } from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface HealthInfoFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const HealthInfoForm: React.FC<HealthInfoFormProps> = ({
  handleNext,
  handleBack,
}) => {
  // No need to directly use context since FormikInputField handles it
  useFormikContext<SurveyFormData>();

  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Thông tin sức khỏe
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Vui lòng cung cấp thông tin sức khỏe cơ bản của bạn.
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <FormikInputField
          label="Chiều cao (cm)"
          name="step3.height"
          placeholder="Ví dụ: 170"
          required
        />
        <FormikInputField
          label="Cân nặng (kg)"
          name="step3.weight"
          placeholder="Ví dụ: 65"
          required
        />
        <FormikInputField
          label="Huyết áp"
          name="step3.bloodPressure"
          placeholder="Ví dụ: 120/80"
          required
        />
        <FormikInputField
          label="Bệnh mãn tính (nếu có)"
          name="step3.chronicConditions"
          placeholder="Ví dụ: Tiểu đường, cao huyết áp"
        />

        <div className="flex justify-between">
          <Button type="button" onPress={handleBack} variant="bordered">
            Quay lại
          </Button>
          <Button type="button" onPress={handleNext} className="">
            Tiếp theo
          </Button>
        </div>
      </div>
    </>
  );
};

export default HealthInfoForm;
