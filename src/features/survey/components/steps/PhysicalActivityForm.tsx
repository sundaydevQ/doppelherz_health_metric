import React from "react";
import { FormikInputField } from "../../../../shared/components";
import { Button } from "../../../../shared";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface PhysicalActivityFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const PhysicalActivityForm: React.FC<PhysicalActivityFormProps> = ({
  handleNext,
  handleBack,
}) => {
  // No need to directly use context since FormikInputField handles it
  useFormikContext<SurveyFormData>();

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
        <FormikInputField
          label="Tần suất tập thể dục (lần/tuần)"
          name="step5.exerciseFrequency"
          placeholder="Ví dụ: 3"
          required
        />
        <FormikInputField
          label="Loại bài tập thường xuyên"
          name="step5.exerciseType"
          placeholder="Ví dụ: Chạy bộ, yoga, bơi lội"
          required
        />
        <FormikInputField
          label="Mức độ hoạt động hàng ngày"
          name="step5.activityLevel"
          placeholder="Ví dụ: Ít vận động, trung bình, rất năng động"
          required
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
