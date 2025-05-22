import React from "react";
import InputField from "../InputField";
import { Button } from "../../../../shared";

export interface BasicInfoFormProps {
  formData: {
    name: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    income: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  formData,
  handleChange,
  handleNext,
}) => {
  return (
    <>
      <div className="text-center lg:text-left mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Thông tin cơ bản
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Chúng tôi cần xác thực thông tin của bạn, vì vậy chúng tôi cần một số
          dữ liệu cá nhân.
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
          label="Tên"
          id="name"
          placeholder="Andrés Alberto"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Họ"
          id="firstName"
          placeholder="Avalos"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Tên đệm"
          id="lastName"
          placeholder="Aguilar"
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Ngày sinh"
          id="dob"
          placeholder="DD / MM / YYYY"
          value={formData.dob}
          onChange={handleChange}
          hasIcon={true}
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="E.g. sample@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Thu nhập hàng tháng"
          id="income"
          placeholder="E.g. 15,000,000 VND"
          value={formData.income}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full">
          Tiếp theo
        </Button>
      </form>
    </>
  );
};

export default BasicInfoForm;
