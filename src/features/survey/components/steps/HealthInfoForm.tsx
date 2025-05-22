import React from "react";
import InputField from "../InputField";
import { Button } from "../../../../shared";

export interface HealthInfoFormProps {
  formData: {
    height: string;
    weight: string;
    bloodPressure: string;
    chronicConditions: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const HealthInfoForm: React.FC<HealthInfoFormProps> = ({
  formData,
  handleChange,
  handleNext,
  handleBack,
}) => {
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="space-y-6 mt-8"
      >
        <InputField
          label="Chiều cao (cm)"
          id="height"
          placeholder="Ví dụ: 170"
          value={formData.height}
          onChange={handleChange}
        />
        <InputField
          label="Cân nặng (kg)"
          id="weight"
          placeholder="Ví dụ: 65"
          value={formData.weight}
          onChange={handleChange}
        />
        <InputField
          label="Huyết áp"
          id="bloodPressure"
          placeholder="Ví dụ: 120/80"
          value={formData.bloodPressure}
          onChange={handleChange}
        />
        <InputField
          label="Bệnh mãn tính (nếu có)"
          id="chronicConditions"
          placeholder="Ví dụ: Tiểu đường, cao huyết áp"
          value={formData.chronicConditions}
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <Button type="button" onPress={handleBack} variant="bordered">
            Quay lại
          </Button>
          <Button type="submit" className="">
            Tiếp theo
          </Button>
        </div>
      </form>
    </>
  );
};

export default HealthInfoForm;
