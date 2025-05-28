import React, { useState, useEffect } from "react";
import type { Step, SurveyFormData, SurveyScore } from "./types";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { useNavigate } from "@tanstack/react-router"; // Changed import
import StepProgress from "./StepProgress";
import BasicInfoForm from "./steps/BasicInfoForm";
import SurveyQuestionsForm from "./steps/SurveyQuestionsForm";
import HealthInfoForm from "./steps/HealthInfoForm";
import DietAssessmentForm from "./steps/DietAssessmentForm";
import PhysicalActivityForm from "./steps/PhysicalActivityForm";
import MedicationForm from "./steps/MedicationForm";
import { ScoreDisplay } from "./ScoreDisplay";
import { ScoringProvider } from "./ScoringProvider";
import { MinusPointProvider } from "./MinusPointProvider";
import { getValidationSchemaByStep } from "./validationSchema";
import { INITIAL_SCORE } from "./scoringConfig";
import SurveyCompletionPopup from "./SurveyCompletionPopup"; // Added import
import { addSurveyData } from "../../../shared";

// Initial steps data
const initialSteps: Step[] = [
  { id: "01", name: "Thông tin cơ bản", status: "current" },
  { id: "02", name: "Thông tin về độ tuổi", status: "upcoming" },
  { id: "03", name: "Thông tin sức khỏe", status: "upcoming" },
  { id: "04", name: "Đánh giá tâm lý", status: "upcoming" },
  { id: "05", name: "Yếu tố tiền sử và nguy cơ khác", status: "upcoming" },
  { id: "06", name: "Thông tin thuốc", status: "upcoming" },
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
  }, // Step 3: Health information
  step3: {
    physicalSigns: [],
    otherPhysicalSigns: "",
  }, // Step 4: Diet assessment
  step4: {
    psychologicalSigns: [],
    otherPsychologicalSigns: "",
  }, // Step 5: Physical activity
  step5: {
    riskFactors: [],
    otherRiskFactors: "",
  },
  // Step 6: Medications
  step6: {
    medications: [],
    otherMedications: "",
  },
};

const SurveyPage: React.FC = () => {
  const navigate = useNavigate(); // Correct hook for @tanstack/react-router
  // State for steps
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [isSurveyComplete, setIsSurveyComplete] = useState(false); // Added state for survey completion
  // Track the current step index (0-based)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Reset survey completion status when survey page loads
  useEffect(() => {
    localStorage.setItem("isComplete", "false");
  }, []);

  // State for current score
  const [currentScore, setCurrentScore] = useState<SurveyScore>({
    currentScore: INITIAL_SCORE,
    maxScore: INITIAL_SCORE,
    deductions: [],
  });
  // Get the validation schema for the current step
  const currentValidationSchema = getValidationSchemaByStep(currentStepIndex);
  // Handle score updates
  const handleScoreUpdate = (score: SurveyScore) => {
    setCurrentScore(score);
  };

  // Handle score deductions for minus point animations
  const handleScoreDeduction = (
    points: number,
    field: string,
    option: string
  ) => {
    console.log(`Score deduction: -${points} points for ${field}:${option}`);
  }; // Handle next step
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
  const handleClose = async () => {
    try {
      await addSurveyData();
      // setIsSurveyComplete(false);
      // // Save completion state to localStorage
      // localStorage.setItem("isComplete", "true");
      // // Navigate to the analysis page with the score
      // navigate({
      //   to: "/survey/analysis/$score",
      //   params: { score: currentScore.currentScore },
      // });
    } catch (error) {
      console.error("Error handling survey completion:", error);
    }
  };
  // Handle form submission
  const handleSubmit = (
    values: SurveyFormData,
    actions: FormikHelpers<SurveyFormData>
  ) => {
    console.log("Form submitted with values:", values);
    setIsSurveyComplete(true); // Set survey as complete
    actions.setSubmitting(false);
  }; // Render form based on current step
  const renderCurrentStepForm = () => {
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
        return <MedicationForm handleBack={handleBack} />;
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
      {() => (
        <Form>
          <MinusPointProvider>
            <ScoringProvider
              onScoreUpdate={handleScoreUpdate}
              onScoreDeduction={handleScoreDeduction}
            >
              <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-doppelherz-light/20">
                <StepProgress
                  steps={steps}
                  currentStepIndex={currentStepIndex}
                  handleBack={handleBack}
                  goToStep={goToStep}
                />
                {/* Main Content Area with Beautiful Design */}
                <main className="w-full lg:w-2/3 p-3 sm:p-4 md:p-6 lg:p-8 relative">
                  {/* Background decoration */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-doppelherz-primary/5 to-doppelherz-accent/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-health-excellent/5 to-doppelherz-primary/5 rounded-full blur-3xl"></div>
                  </div>

                  {/* Score Display with Enhanced Styling */}
                  {currentStepIndex > 0 && (
                    <div className="mb-6 sm:mb-8 relative z-10">
                      <ScoreDisplay
                        score={currentScore}
                        className="glass-effect shadow-colored"
                        showMinusPointAnimations={true}
                      />
                    </div>
                  )}

                  {/* Form Container with Beautiful Card Design */}
                  <div className="max-w-full mx-auto lg:mx-0 relative z-10">
                    <div className="card-elevated p-6 sm:p-8 animate-scale-in">
                      {/* Form Title with Gradient Text */}
                      <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                          {steps[currentStepIndex]?.name}
                        </h1>
                        <p className="text-surface-600 text-sm sm:text-base">
                          Vui lòng điền thông tin chính xác để nhận được kết quả
                          đánh giá tốt nhất
                        </p>
                      </div>

                      {/* Render Form */}
                      <div className="animate-fade-in">
                        {renderCurrentStepForm()}
                      </div>
                    </div>
                  </div>
                </main>
              </div>{" "}
              <SurveyCompletionPopup
                isOpen={isSurveyComplete}
                onClose={handleClose}
                title="Khảo sát hoàn tất!"
                message="Cảm ơn bạn đã hoàn thành khảo sát. Kết quả của bạn đã được ghi nhận."
                buttonText="Xem kết quả phân tích"
              />
            </ScoringProvider>
          </MinusPointProvider>
        </Form>
      )}
    </Formik>
  );
};

export default SurveyPage;
