import React, { useState } from "react";
import { Button } from "../../../shared/components";

const SurveyPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert("Survey submitted successfully!");
    // Here you would typically send the survey data to your backend
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Health Assessment Survey</h1>
      <p className="mb-8">
        Please complete the survey to get personalized health insights.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl font-semibold">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-purple-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Survey content - changes based on current step */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Age</label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  placeholder="Your age"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Biological Sex
                </label>
                <select className="w-full border rounded-md p-2">
                  <option value="">Select option</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Lifestyle Assessment</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Exercise Frequency (days per week)
                </label>
                <input
                  type="number"
                  min="0"
                  max="7"
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Sleep Duration (hours per night)
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Health Concerns</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Primary Health Concerns
                </label>
                <textarea
                  className="w-full border rounded-md p-2"
                  rows={3}
                  placeholder="Describe any health issues you're experiencing"
                ></textarea>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="consent" className="mr-2" />
                <label htmlFor="consent" className="text-sm">
                  I consent to my data being used for health assessment purposes
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons using our custom Button component */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="bordered"
            className={currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}
          >
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} variant="solid">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} variant="solid">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
