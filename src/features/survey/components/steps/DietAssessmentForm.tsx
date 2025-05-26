import React from "react";
import { FormikInputField } from "../../../../shared/components";
import { Button } from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface DietAssessmentFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const DietAssessmentForm: React.FC<DietAssessmentFormProps> = ({
  handleNext,
  handleBack,
}) => {
  // No need to directly use context since FormikInputField handles it
  useFormikContext<SurveyFormData>();

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
        <FormikInputField
          label="Số bữa ăn mỗi ngày"
          name="step4.mealsPerDay"
          placeholder="Ví dụ: 3"
          required
        />
        <FormikInputField
          label="Lượng nước uống mỗi ngày (lít)"
          name="step4.waterIntake"
          placeholder="Ví dụ: 2"
          required
        />
        <FormikInputField
          label="Hạn chế ăn uống (nếu có)"
          name="step4.dietaryRestrictions"
          placeholder="Ví dụ: Không ăn gluten, chay"
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
