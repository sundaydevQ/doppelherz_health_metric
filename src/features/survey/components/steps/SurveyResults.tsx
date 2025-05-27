import React from "react";
import { useFormikContext } from "formik";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Avatar,
  Progress,
} from "@heroui/react";
import {
  UserIcon,
  DocumentTextIcon,
  HeartIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  BeakerIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import type { SurveyFormData } from "../types";

export interface SurveyResultsProps {
  handleBack: () => void;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ handleBack }) => {
  const { submitForm, isSubmitting, values } =
    useFormikContext<SurveyFormData>();

  // Helper function to format age display
  const formatAge = (age: string) => {
    const ageMap: { [key: string]: string } = {
      "Dưới 30 tuổi": "Dưới 30 tuổi",
      "30 - 34 tuổi": "30 - 34 tuổi",
      "35 - 39 tuổi": "35 - 39 tuổi",
      "40 - 44 tuổi": "40 - 44 tuổi",
      "45 - 49 tuổi": "45 - 49 tuổi",
      "50 - 54 tuổi": "50 - 54 tuổi",
      "Từ 55 tuổi trở lên": "Từ 55 tuổi trở lên",
    };
    return ageMap[age] || age;
  };

  // Helper function to format gender display
  const formatGender = (gender: string) => {
    const genderMap: { [key: string]: string } = {
      male: "Nam",
      female: "Nữ",
      other: "Khác",
    };
    return genderMap[gender] || gender;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-blue-700">
          <CardHeader className="text-center py-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white/20 p-4 rounded-full">
                <CheckCircleIcon className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Khảo sát hoàn thành!
                </h1>
                <p className="text-blue-100 text-lg">
                  Dưới đây là tóm tắt thông tin bạn đã cung cấp
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
        {/* Personal Information Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <UserIcon className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Thông tin cá nhân</h3>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Avatar
                    name={values.step1.fullName || "U"}
                    className="bg-blue-100 text-blue-700"
                    size="sm"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium text-gray-900">
                      {values.step1.fullName || "Chưa cung cấp"}
                    </p>
                  </div>
                </div>{" "}
                <div>
                  <p className="text-sm text-gray-500">Giới tính</p>
                  <Chip
                    color={values.step1.gender ? "primary" : "default"}
                    variant="flat"
                    className="mt-1"
                  >
                    {formatGender(values.step1.gender) || "Chưa cung cấp"}
                  </Chip>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nghề nghiệp</p>
                  <p className="font-medium text-gray-900">
                    {values.step1.occupation || "Chưa cung cấp"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium text-gray-900">
                    {values.step1.phoneNumber || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900 break-all">
                    {values.step1.email || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium text-gray-900">
                    {values.step1.address || "Chưa cung cấp"}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>{" "}
        {/* Age Information Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gray-600 text-white">
            <div className="flex items-center space-x-3">
              <ClockIcon className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Thông tin độ tuổi</h3>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <UserIcon className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nhóm tuổi</p>
                <Chip
                  color={values.step2.age ? "primary" : "default"}
                  variant="flat"
                  size="lg"
                  className="mt-1"
                >
                  {formatAge(values.step2.age) || "Chưa cung cấp"}
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>
        {/* Health Information Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center space-x-3">
              <HeartIcon className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                Thông tin sức khỏe thể chất
              </h3>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div>
              <p className="text-sm text-gray-500 mb-3">
                Các dấu hiệu thể chất
              </p>{" "}
              {values.step3.physicalSigns &&
              values.step3.physicalSigns.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {values.step3.physicalSigns.map((sign, index) => (
                    <Chip
                      key={index}
                      color={sign === "Bình thường" ? "success" : "primary"}
                      variant="flat"
                      className="text-sm"
                    >
                      {sign}
                    </Chip>
                  ))}
                </div>
              ) : (
                <Chip color="default" variant="flat">
                  Chưa cung cấp
                </Chip>
              )}
              {values.step3.otherPhysicalSigns && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Chi tiết thêm:</p>
                  <p className="text-gray-900">
                    {values.step3.otherPhysicalSigns}
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>{" "}
        {/* Psychological Information Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gray-600 text-white">
            <div className="flex items-center space-x-3">
              <CpuChipIcon className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Thông tin tâm lý</h3>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div>
              <p className="text-sm text-gray-500 mb-3">Các dấu hiệu tâm lý</p>
              {values.step4.psychologicalSigns &&
              values.step4.psychologicalSigns.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {values.step4.psychologicalSigns.map((sign, index) => (
                    <Chip
                      key={index}
                      color={sign === "Bình thường" ? "success" : "primary"}
                      variant="flat"
                      className="text-sm"
                    >
                      {sign}
                    </Chip>
                  ))}
                </div>
              ) : (
                <Chip color="default" variant="flat">
                  Chưa cung cấp
                </Chip>
              )}
              {values.step4.otherPsychologicalSigns && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Chi tiết thêm:</p>
                  <p className="text-gray-900">
                    {values.step4.otherPsychologicalSigns}
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>{" "}
        {/* Risk Factors Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Yếu tố nguy cơ</h3>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div>
              <p className="text-sm text-gray-500 mb-3">
                Các yếu tố tiền sử và nguy cơ
              </p>
              {values.step5.riskFactors &&
              values.step5.riskFactors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {values.step5.riskFactors.map((factor, index) => (
                    <Chip
                      key={index}
                      color={factor === "Bình thường" ? "success" : "primary"}
                      variant="flat"
                      className="text-sm"
                    >
                      {factor}
                    </Chip>
                  ))}
                </div>
              ) : (
                <Chip color="default" variant="flat">
                  Chưa cung cấp
                </Chip>
              )}
              {values.step5.otherRiskFactors && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Chi tiết thêm:</p>
                  <p className="text-gray-900">
                    {values.step5.otherRiskFactors}
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>{" "}
        {/* Medication Information Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gray-600 text-white">
            <div className="flex items-center space-x-3">
              <BeakerIcon className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Thông tin thuốc</h3>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div>
              <p className="text-sm text-gray-500 mb-3">
                Các loại thuốc đang sử dụng
              </p>
              {values.step6.medications &&
              values.step6.medications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {values.step6.medications.map((medication, index) => (
                    <Chip
                      key={index}
                      color={
                        medication === "Không sử dụng" ? "success" : "primary"
                      }
                      variant="flat"
                      className="text-sm"
                    >
                      {medication}
                    </Chip>
                  ))}
                </div>
              ) : (
                <Chip color="default" variant="flat">
                  Chưa cung cấp
                </Chip>
              )}
              {values.step6.otherMedications && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Chi tiết thêm:</p>
                  <p className="text-gray-900">
                    {values.step6.otherMedications}
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
        {/* Progress Indicator */}
        <Card className="shadow-lg">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Tiến độ khảo sát
              </h4>
              <Chip color="success" variant="flat" size="lg">
                Hoàn thành 100%
              </Chip>
            </div>
            <Progress value={100} color="success" className="mb-2" size="lg" />
            <p className="text-sm text-gray-600 text-center">
              Cảm ơn bạn đã hoàn thành khảo sát sức khỏe!
            </p>
          </CardBody>
        </Card>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
          <Button
            variant="bordered"
            size="lg"
            onPress={handleBack}
            className="flex-1 sm:flex-none border-gray-300 text-gray-700 hover:bg-gray-50"
            startContent={<DocumentTextIcon className="w-5 h-5" />}
          >
            Quay lại
          </Button>{" "}
          <Button
            color="primary"
            size="lg"
            onPress={submitForm}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
            isLoading={isSubmitting}
            startContent={
              !isSubmitting && <CheckCircleIcon className="w-5 h-5" />
            }
          >
            {isSubmitting ? "Đang xử lý..." : "Hoàn thành khảo sát"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyResults;
