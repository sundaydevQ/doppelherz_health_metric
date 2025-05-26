import React from "react";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface SurveyResultsProps {
  handleBack: () => void;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ handleBack }) => {
  const { submitForm, isSubmitting, values } =
    useFormikContext<SurveyFormData>();

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
            {" "}
            <div>
              <h3 className="font-medium">Thông tin cá nhân</h3>
              <p>Họ và tên: {values.step1.fullName || "Chưa cung cấp"}</p>
              <p>
                Giới tính:{" "}
                {values.step1.gender === "male"
                  ? "Nam"
                  : values.step1.gender === "female"
                  ? "Nữ"
                  : values.step1.gender === "other"
                  ? "Khác"
                  : "Chưa cung cấp"}
              </p>
              <p>Nghề nghiệp: {values.step1.occupation || "Chưa cung cấp"}</p>
              <p>
                Số điện thoại: {values.step1.phoneNumber || "Chưa cung cấp"}
              </p>
              <p>Email: {values.step1.email || "Chưa cung cấp"}</p>{" "}
              <p>Địa chỉ: {values.step1.address || "Chưa cung cấp"}</p>
            </div>
            <div>
              <h3 className="font-medium">Thông tin khảo sát</h3>{" "}
              <p>
                Độ tuổi:{" "}
                {values.step2.age
                  ? values.step2.age === "under30"
                    ? "Dưới 30 tuổi"
                    : values.step2.age === "30-34"
                    ? "30 - 34 tuổi"
                    : values.step2.age === "35-39"
                    ? "35 - 39 tuổi"
                    : values.step2.age === "40-44"
                    ? "40 - 44 tuổi"
                    : values.step2.age === "45-49"
                    ? "45 - 49 tuổi"
                    : values.step2.age === "50-54"
                    ? "50 - 54 tuổi"
                    : values.step2.age === "55plus"
                    ? "Từ 55 tuổi trở lên"
                    : "Chưa cung cấp"
                  : "Chưa cung cấp"}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Thông tin sức khỏe</h3>
              <p>
                Dấu hiệu thể chất:{" "}
                {values.step3.physicalSigns &&
                values.step3.physicalSigns.length > 0
                  ? values.step3.physicalSigns.join(", ")
                  : "Chưa cung cấp"}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Chế độ ăn uống</h3>
              <p>
                Số bữa ăn mỗi ngày:{" "}
                {values.step4.mealsPerDay || "Chưa cung cấp"}
              </p>
              <p>
                Lượng nước uống: {values.step4.waterIntake || "Chưa cung cấp"}{" "}
                lít
              </p>
            </div>
            <div>
              <h3 className="font-medium">Hoạt động thể chất</h3>
              <p>
                Tần suất tập thể dục:{" "}
                {values.step5.exerciseFrequency || "Chưa cung cấp"} lần/tuần
              </p>
              <p>
                Loại bài tập: {values.step5.exerciseType || "Chưa cung cấp"}
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
          </button>{" "}
          <button
            type="button"
            onClick={submitForm}
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75"
          >
            {isSubmitting ? "Đang xử lý..." : "Hoàn thành"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SurveyResults;
