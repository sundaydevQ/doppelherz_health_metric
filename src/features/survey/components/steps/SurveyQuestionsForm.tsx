import React from "react";
import InputField from "../InputField";
import { Button } from "../../../../shared";

export interface SurveyQuestionsFormProps {
  formData: {
    question1: string;
    question2: string;
    question3: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const SurveyQuestionsForm: React.FC<SurveyQuestionsFormProps> = ({
  formData,
  handleChange,
  handleNext,
  handleBack,
}) => {
  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Thực hiện khảo sát
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Vui lòng trả lời các câu hỏi về thói quen hàng ngày của bạn.
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
          label="Bạn ngủ bao nhiêu giờ mỗi ngày?"
          id="question1"
          placeholder="Ví dụ: 8 giờ"
          value={formData.question1}
          onChange={handleChange}
        />
        <InputField
          label="Bạn có thường xuyên tập thể dục không?"
          id="question2"
          placeholder="Ví dụ: 3 lần/tuần"
          value={formData.question2}
          onChange={handleChange}
        />
        <InputField
          label="Bạn uống bao nhiêu nước mỗi ngày?"
          id="question3"
          placeholder="Ví dụ: 2 lít"
          value={formData.question3}
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

export default SurveyQuestionsForm;
