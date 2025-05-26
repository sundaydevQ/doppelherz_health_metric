import React, { useState } from "react";
import type { Step, SurveyFormData } from "./types";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import StepProgress from "./StepProgress";
import BasicInfoForm from "./steps/BasicInfoForm";
import SurveyQuestionsForm from "./steps/SurveyQuestionsForm";
import HealthInfoForm from "./steps/HealthInfoForm";
import DietAssessmentForm from "./steps/DietAssessmentForm";
import PhysicalActivityForm from "./steps/PhysicalActivityForm";
import SurveyResults from "./steps/SurveyResults";
import { getValidationSchemaByStep } from "./validationSchema";

// Initial steps data
const initialSteps: Step[] = [
  { id: "01", name: "Thông tin cơ bản", status: "current" },
  { id: "02", name: "Thực hiện khảo sát", status: "upcoming" },
  { id: "03", name: "Thông tin sức khỏe", status: "upcoming" },
  { id: "04", name: "Đánh giá chế độ ăn", status: "upcoming" },
  { id: "05", name: "Hoạt động thể chất", status: "upcoming" },
  { id: "06", name: "Xem kết quả", status: "upcoming" },
];

// Initial form values that match the SurveyFormData structure
const initialFormValues: SurveyFormData = {
  // Step 1: Basic information
  step1: {
    fullName: "",
    gender: "",
    occupation: "",
    phoneNumber: "",
    email: "",
    address: "",
  },
  // Step 2: Survey
  step2: {
    age: "",
    question1: "",
    question2: "",
    question3: "",
  },
  // Step 3: Health information
  step3: {
    height: "",
    weight: "",
    bloodPressure: "",
    chronicConditions: "",
  },
  // Step 4: Diet assessment
  step4: {
    mealsPerDay: "",
    waterIntake: "",
    dietaryRestrictions: "",
  },
  // Step 5: Physical activity
  step5: {
    exerciseFrequency: "",
    exerciseType: "",
    activityLevel: "",
  },
  // Step 6: Review (no form inputs)
  step6: {},
};

const SurveyPage: React.FC = () => {
  // State for steps
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  // Track the current step index (0-based)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Get the validation schema for the current step
  const currentValidationSchema = getValidationSchemaByStep(currentStepIndex); // Handle next step
  const handleNext = () => {
    // Only proceed if we're not at the last step
    if (currentStepIndex < steps.length - 1) {
      // Update step statuses
      const updatedSteps = [...steps];
      updatedSteps[currentStepIndex].status = "complete";
      updatedSteps[currentStepIndex + 1].status = "current";

      setSteps(updatedSteps);
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    if (currentStepIndex > 0) {
      // Update step statuses
      const updatedSteps = [...steps];
      updatedSteps[currentStepIndex].status = "upcoming";
      updatedSteps[currentStepIndex - 1].status = "current";

      setSteps(updatedSteps);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Handle navigation to a specific step
  const goToStep = (stepIndex: number) => {
    if (stepIndex < currentStepIndex && stepIndex >= 0) {
      // Only allow going back to previous completed steps, not forward
      const updatedSteps = [...steps];

      // Mark the current step as 'upcoming'
      updatedSteps[currentStepIndex].status = "upcoming";

      // Mark all steps after the target as 'upcoming'
      for (let i = stepIndex + 1; i < steps.length; i++) {
        if (i !== currentStepIndex) {
          // Skip current step as we already updated it
          updatedSteps[i].status = "upcoming";
        }
      }

      // Mark the target step as 'current'
      updatedSteps[stepIndex].status = "current";

      setSteps(updatedSteps);
      setCurrentStepIndex(stepIndex);
    }
  };
  // Handle form submission
  const handleSubmit = (
    values: SurveyFormData,
    actions: FormikHelpers<SurveyFormData>
  ) => {
    console.log("Form submitted with values:", values);
    // Here you would typically submit the data to your backend
    // For example: api.submitSurvey(values);

    // Show success message or redirect user
    alert("Cảm ơn bạn đã hoàn thành khảo sát!");
    actions.setSubmitting(false);
  };
  // Render form based on current step
  const renderCurrentStepForm = (
    formikProps: FormikHelpers<SurveyFormData> & { values: SurveyFormData }
  ) => {
    const { values } = formikProps;

    switch (currentStepIndex) {
      case 0:
        return <BasicInfoForm handleNext={handleNext} />;
      case 1:
        return (
          <SurveyQuestionsForm
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <HealthInfoForm handleNext={handleNext} handleBack={handleBack} />
        );
      case 3:
        return (
          <DietAssessmentForm handleNext={handleNext} handleBack={handleBack} />
        );
      case 4:
        return (
          <PhysicalActivityForm
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 5:
        return <SurveyResults formData={values} handleBack={handleBack} />;
      default:
        return null;
    }
  };
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={currentValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={true}
      validateOnMount={false}
    >
      {(formikProps) => (
        <Form>
          <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
            <StepProgress
              steps={steps}
              currentStepIndex={currentStepIndex}
              handleBack={handleBack}
              goToStep={goToStep}
            />

            {/* Main Content Area */}
            <main className="w-full lg:w-2/3 p-4 sm:p-6 lg:p-8">
              {/* Render the current step form */}
              <div className="max-w-lg mx-auto lg:mx-0">
                {renderCurrentStepForm(formikProps)}
              </div>
            </main>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SurveyPage;
