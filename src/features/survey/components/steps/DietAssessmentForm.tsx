import React from "react";
import InputField from "../InputField";
import { Button } from "../../../../shared";

export interface DietAssessmentFormProps {
  formData: {
    mealsPerDay: string;
    waterIntake: string;
    dietaryRestrictions: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const DietAssessmentForm: React.FC<DietAssessmentFormProps> = ({
  formData,
  handleChange,
  handleNext,
  handleBack,
}) => {
  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Đánh giá chế độ ăn
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Vui lòng chia sẻ thông tin về chế độ ăn của bạn.
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
          label="Số bữa ăn mỗi ngày"
          id="mealsPerDay"
          placeholder="Ví dụ: 3"
          value={formData.mealsPerDay}
          onChange={handleChange}
        />
        <InputField
          label="Lượng nước uống mỗi ngày (lít)"
          id="waterIntake"
          placeholder="Ví dụ: 2"
          value={formData.waterIntake}
          onChange={handleChange}
        />
        <InputField
          label="Hạn chế ăn uống (nếu có)"
          id="dietaryRestrictions"
          placeholder="Ví dụ: Không ăn gluten, chay"
          value={formData.dietaryRestrictions}
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

export default DietAssessmentForm;
