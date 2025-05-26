import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { Step } from "./types";

interface StepProgressProps {
  steps: Step[];
  currentStepIndex: number;
  handleBack: () => void;
  goToStep: (stepIndex: number) => void;
}

const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStepIndex,
  handleBack,
  goToStep,
}) => {
  const [showStepsModal, setShowStepsModal] = useState(false);
  return (
    <>
      {" "}
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-1/3 bg-white p-8 border-r border-gray-200 shadow-md">
        <div className="mb-12">
          <img
            src="/src/assets/images/logo.png"
            alt="Doppelherz"
            className="h-20"
          />
        </div>
        <nav aria-label="Progress">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Health Assessment Progress
          </h2>
          <ol role="list" className="space-y-8">
            {steps.map((step, stepIdx) => (
              <li
                key={`${step.id}-${step.name}`}
                className={`relative flex items-start ${
                  step.status === "complete"
                    ? "cursor-pointer hover:bg-gray-50 rounded-md transition-colors p-2 -mx-2 group"
                    : ""
                }`}
                onClick={() => {
                  if (step.status === "complete") {
                    goToStep(stepIdx);
                  }
                }}
                title={
                  step.status === "complete" ? "Nhấp để quay lại bước này" : ""
                }
              >
                <div
                  className={`absolute left-4 top-4 -ml-px mt-4 h-full w-0.5 ${
                    stepIdx !== steps.length - 1 ? "bg-gray-300" : ""
                  }`}
                  aria-hidden="true"
                />
                {step.status === "complete" ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 group-hover:ring-2 group-hover:ring-green-400 transition-all shadow-sm">
                    <svg
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : step.status === "current" ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-600 bg-white shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 bg-white">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                  </div>
                )}
                <div className="ml-4 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      step.status === "current"
                        ? "text-green-600"
                        : step.status === "complete"
                        ? "text-gray-900 group-hover:text-green-600"
                        : "text-gray-900"
                    }`}
                  >
                    Bước {step.id}
                  </p>
                  <p
                    className={`text-sm ${
                      step.status === "current"
                        ? "text-green-600"
                        : step.status === "complete"
                        ? "text-gray-600 group-hover:text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </p>
                  <p
                    className={`text-xs ${
                      step.status === "complete"
                        ? "text-green-600"
                        : step.status === "current"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.status === "complete"
                      ? "Hoàn thành"
                      : step.status === "current"
                      ? "Đang tiến hành"
                      : ""}
                  </p>
                </div>
                {step.status === "complete" && (
                  <div className="ml-2 text-green-600 hidden group-hover:block">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between my-6">
        <button
          type="button"
          onClick={handleBack}
          className={`p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors ${
            currentStepIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentStepIndex === 0}
        >
          <ChevronLeftIcon className="h-6 w-6" />
          <span className="sr-only">Quay lại</span>
        </button>
        <button
          type="button"
          onClick={() => setShowStepsModal(true)}
          className="text-sm font-medium text-gray-700 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-1.5 hover:bg-gray-100 transition-colors shadow-sm border border-gray-200 mr-4"
          aria-label="View progress steps"
        >
          <span className="text-green-600">
            Bước {currentStepIndex + 1}/{steps.length}
          </span>
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {/* Steps Modal for Mobile */}
      {showStepsModal && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center lg:hidden animate-fade-in">
          <div className="bg-white w-11/12 max-w-md rounded-xl overflow-hidden shadow-xl mx-auto my-auto animate-slide-up">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="font-semibold text-lg text-gray-800">
                Tiến trình Đánh giá Sức khỏe
              </div>
              <button
                type="button"
                onClick={() => setShowStepsModal(false)}
                className="text-gray-400 hover:text-gray-500 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-6">
                Bạn chỉ còn vài bước nữa là hoàn thành bài đánh giá sức khỏe của
                mình
              </p>

              {/* Timeline with improved styling */}
              <div className="space-y-8 relative before:absolute before:left-3.5 before:top-1 before:h-[calc(100%-24px)] before:w-0.5 before:bg-gray-200 before:content-['']">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start relative ${
                      step.status === "complete"
                        ? "cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors"
                        : ""
                    }`}
                    onClick={() => {
                      if (step.status === "complete") {
                        goToStep(index);
                        setShowStepsModal(false);
                      }
                    }}
                  >
                    {/* Step status icon with improved styling */}
                    <div className="flex-shrink-0 mr-4 relative z-10">
                      {step.status === "complete" ? (
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white shadow-sm">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : step.status === "current" ? (
                        <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-green-600 bg-white shadow-sm">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-gray-300 bg-white">
                          <div className="h-2.5 w-2.5 rounded-full bg-transparent"></div>
                        </div>
                      )}
                    </div>

                    {/* Step information with improved styling */}
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-500">
                        Bước {step.id}
                      </div>
                      <div
                        className={`font-medium ${
                          step.status === "current"
                            ? "text-green-600"
                            : step.status === "complete"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </div>
                      <div
                        className={`text-xs ${
                          step.status === "complete"
                            ? "text-green-600"
                            : step.status === "current"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.status === "complete"
                          ? "Hoàn thành"
                          : step.status === "current"
                          ? "Đang tiến hành"
                          : ""}
                      </div>
                    </div>

                    {/* Add visual indicator for completed steps */}
                    {step.status === "complete" && (
                      <div className="ml-2 text-green-600 flex-shrink-0">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add a button to return to the current step */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowStepsModal(false)}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {/* Green progress bar for mobile */}
      <div className="lg:hidden my-4">
        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
          <div
            className="bg-green-600 h-2 rounded-full shadow-sm transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default StepProgress;
