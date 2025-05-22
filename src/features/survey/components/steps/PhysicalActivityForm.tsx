import React from "react";
import InputField from "../InputField";
import { Button } from "../../../../shared";

export interface PhysicalActivityFormProps {
  formData: {
    exerciseFrequency: string;
    exerciseType: string;
    activityLevel: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const PhysicalActivityForm: React.FC<PhysicalActivityFormProps> = ({
  formData,
  handleChange,
  handleNext,
  handleBack,
}) => {
  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Hoạt động thể chất
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Hãy cho chúng tôi biết về mức độ hoạt động thể chất của bạn.
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
          label="Tần suất tập thể dục (lần/tuần)"
          id="exerciseFrequency"
          placeholder="Ví dụ: 3"
          value={formData.exerciseFrequency}
          onChange={handleChange}
        />
        <InputField
          label="Loại bài tập thường xuyên"
          id="exerciseType"
          placeholder="Ví dụ: Chạy bộ, yoga, bơi lội"
          value={formData.exerciseType}
          onChange={handleChange}
        />
        <InputField
          label="Mức độ hoạt động hàng ngày"
          id="activityLevel"
          placeholder="Ví dụ: Ít vận động, trung bình, rất năng động"
          value={formData.activityLevel}
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

export default PhysicalActivityForm;
