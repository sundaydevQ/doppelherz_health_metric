import React from "react";

export interface SurveyResultsProps {
  formData: {
    step1: {
      name: string;
      firstName: string;
      lastName: string;
      dob: string;
      email: string;
      income: string;
    };
    step3: {
      height: string;
      weight: string;
      bloodPressure: string;
      chronicConditions: string;
    };
    step4: {
      mealsPerDay: string;
      waterIntake: string;
      dietaryRestrictions: string;
    };
    step5: {
      exerciseFrequency: string;
      exerciseType: string;
      activityLevel: string;
    };
  };
  handleBack: () => void;
  handleComplete: () => void;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({
  formData,
  handleBack,
  handleComplete,
}) => {
  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Xem kết quả
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Cảm ơn bạn đã hoàn thành khảo sát. Dưới đây là thông tin bạn đã cung
          cấp.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Tóm tắt thông tin</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Thông tin cá nhân</h3>
              <p>
                Tên: {formData.step1.name} {formData.step1.firstName}{" "}
                {formData.step1.lastName}
              </p>
              <p>Ngày sinh: {formData.step1.dob || "Chưa cung cấp"}</p>
              <p>Email: {formData.step1.email || "Chưa cung cấp"}</p>
            </div>

            <div>
              <h3 className="font-medium">Thông tin sức khỏe</h3>
              <p>Chiều cao: {formData.step3.height || "Chưa cung cấp"} cm</p>
              <p>Cân nặng: {formData.step3.weight || "Chưa cung cấp"} kg</p>
              <p>Huyết áp: {formData.step3.bloodPressure || "Chưa cung cấp"}</p>
            </div>

            <div>
              <h3 className="font-medium">Chế độ ăn uống</h3>
              <p>
                Số bữa ăn mỗi ngày:{" "}
                {formData.step4.mealsPerDay || "Chưa cung cấp"}
              </p>
              <p>
                Lượng nước uống: {formData.step4.waterIntake || "Chưa cung cấp"}{" "}
                lít
              </p>
            </div>

            <div>
              <h3 className="font-medium">Hoạt động thể chất</h3>
              <p>
                Tần suất tập thể dục:{" "}
                {formData.step5.exerciseFrequency || "Chưa cung cấp"} lần/tuần
              </p>
              <p>
                Loại bài tập: {formData.step5.exerciseType || "Chưa cung cấp"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={handleComplete}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Hoàn thành
          </button>
        </div>
      </div>
    </>
  );
};

export default SurveyResults;
