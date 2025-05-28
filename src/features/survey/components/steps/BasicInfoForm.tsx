import React, { useState } from "react";
import {
  Button,
  FormikInputField,
  FormikRadioGroupField,
} from "../../../../shared/components";
import { useFormikContext } from "formik";
import type { SurveyFormData } from "../types";

export interface BasicInfoFormProps {
  handleNext: () => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ handleNext }) => {
  const [isValidating, setIsValidating] = useState(false);
  // Get validation and submission functions from Formik context
  const { validateForm, setTouched } = useFormikContext<SurveyFormData>(); // Handler for the next button that validates the form before proceeding
  const handleNextWithValidation = async () => {
    return handleNext();
    setIsValidating(true);

    try {
      // Mark all fields as touched to trigger validation
      const step1Fields = {
        step1: {
          fullName: true,
          gender: true,
          occupation: true,
          phoneNumber: true,
          email: true,
          address: true,
        },
      };

      // First set touched without validation
      await setTouched(step1Fields, false);

      // Then validate explicitly
      const validationErrors = await validateForm();
      console.log("Validation errors:", validationErrors);

      // Check if there are any errors in step1
      const hasStep1Errors = validationErrors.step1;

      if (!hasStep1Errors) {
        // If no errors, proceed to the next step
        handleNext();
      } else {
        console.log("Validation failed. Please check the form for errors.");
      }
    } catch (error) {
      console.error("Form validation error:", error);
    } finally {
      setIsValidating(false);
    }
  };

  const genderOptions = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];

  return (
    <>
      <div className="space-y-6 mt-8">
        <FormikInputField
          label="Họ và tên"
          name="step1.fullName"
          placeholder="Mai Ngọc A"
          required
        />
        <FormikRadioGroupField
          label="Giới tính"
          name="step1.gender"
          options={genderOptions}
          required
          horizontal
        />
        <FormikInputField
          label="Nghề nghiệp"
          name="step1.occupation"
          placeholder="Kỹ sư, Bác sĩ, Giáo viên, ..."
          required
        />
        <FormikInputField
          label="Số điện thoại"
          name="step1.phoneNumber"
          placeholder="0912345678"
          required
        />
        <FormikInputField
          label="Email"
          name="step1.email"
          type="email"
          placeholder="example@email.com"
        />
        <FormikInputField
          label="Địa chỉ"
          name="step1.address"
          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
          required
        />
        <Button
          type="button"
          onPress={handleNextWithValidation}
          className="w-full"
          disabled={isValidating}
        >
          {isValidating ? "Đang xác thực..." : "Tiếp theo"}
        </Button>
      </div>
    </>
  );
};

export default BasicInfoForm;
