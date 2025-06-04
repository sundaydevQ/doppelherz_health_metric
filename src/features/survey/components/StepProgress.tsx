import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@tanstack/react-router";
import type { Step } from "./types";
import LogoImage from "../../../assets/images/logo.png"; // Adjust the path as needed

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
  const navigate = useNavigate();
  const [showStepsModal, setShowStepsModal] = useState(false);

  const handleLogoClick = () => {
    navigate({ to: "/" });
  };
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-1/3 bg-white p-8 border-r border-gray-200 shadow-md">
        {" "}
        <div className="mb-12">
          <button
            onClick={handleLogoClick}
            className="block hover:opacity-80 transition-opacity duration-200"
            aria-label="Go to home page"
          >
            <img
              src={LogoImage}
              alt="Doppelherz"
              className="h-20 cursor-pointer"
            />
          </button>
        </div>
        <nav aria-label="Progress">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Tiến trình đánh giá sức khỏe
          </h2>
          <ol role="list" className="space-y-8">
            {steps.map((step, stepIdx) => (
              <li
                key={`${step.id}-${step.name}`}
                className={`relative flex items-start ${
                  step.status === "complete"
                    ? "cursor-pointer hover:bg-green-50 rounded-md p-2 -mx-2 group"
                    : step.status === "current"
                    ? "step-current"
                    : "step-upcoming"
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
                    stepIdx !== steps.length - 1
                      ? step.status === "complete" ||
                        (step.status === "current" &&
                          stepIdx < currentStepIndex)
                        ? "step-connecting-line-complete connecting-line-animated"
                        : step.status === "current"
                        ? "step-connecting-line-partial"
                        : "step-connecting-line-upcoming"
                      : ""
                  }`}
                  aria-hidden="true"
                />
                {step.status === "complete" ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 group-hover:ring-4 group-hover:ring-green-200 transition-all shadow-lg step-complete relative">
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
                    <div className="absolute inset-0 rounded-full bg-green-600 opacity-20 scale-150 group-hover:animate-ping"></div>
                  </div>
                ) : step.status === "current" ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-600 bg-white shadow-lg step-current-pulse step-complete-glow relative ring-2 ring-green-200">
                    <span className="h-3 w-3 rounded-full bg-green-600 step-current" />
                    <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-40 scale-125 animate-ping"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 bg-white shadow-sm hover:border-gray-400 transition-colors step-upcoming">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  </div>
                )}
                <div className="ml-4 flex-1">
                  <p
                    className={`text-sm font-medium transition-colors ${
                      step.status === "current"
                        ? "text-green-600 font-semibold"
                        : step.status === "complete"
                        ? "text-green-700 group-hover:text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    Bước {step.id}
                  </p>
                  <p
                    className={`text-sm transition-colors ${
                      step.status === "current"
                        ? "text-green-600 font-medium"
                        : step.status === "complete"
                        ? "text-gray-700 group-hover:text-green-600 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </p>
                  <p
                    className={`text-xs transition-colors ${
                      step.status === "complete"
                        ? "text-green-600 font-medium"
                        : step.status === "current"
                        ? "text-green-600 font-medium animate-pulse"
                        : "text-gray-300"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <span className="status-badge status-badge-complete">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Hoàn thành
                      </span>
                    ) : step.status === "current" ? (
                      <span className="status-badge status-badge-current">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        Đang tiến hành
                      </span>
                    ) : (
                      ""
                    )}
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
      {/* Enhanced Mobile Header */}
      <div className="lg:hidden flex items-center justify-between my-4 px-2 sm:px-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4">
        <button
          type="button"
          onClick={handleBack}
          className={`p-2 sm:p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all mobile-step-enhancedhover:shadow-md active:scale-95`}
        >
          <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Quay lại</span>
        </button>
        {/* Current step indicator for very small screens */}
        <button
          type="button"
          onClick={() => setShowStepsModal(true)}
          className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full px-3 py-1.5 sm:px-4 hover:from-green-50 hover:to-green-100 hover:text-green-700 transition-all shadow-sm border border-gray-200 hover:border-green-200 mobile-step-enhanced active:scale-95"
          aria-label="View progress steps"
        >
          <span className="text-green-600 hidden sm:inline">
            Bước {currentStepIndex + 1}/{steps.length}
          </span>
          <span className="text-green-600 sm:hidden">Tiến trình</span>
          <svg
            className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500"
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
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center lg:hidden animate-fade-in p-4">
          <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl overflow-hidden shadow-xl mx-auto my-auto animate-slide-up max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b flex-shrink-0">
              <div className="font-semibold text-base sm:text-lg text-gray-800">
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
            <div className="p-4 sm:p-5 overflow-y-auto flex-1">
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                {currentStepIndex === steps.length - 1
                  ? "Chúc mừng! Bạn đã hoàn thành bài đánh giá sức khỏe. Hãy xem kết quả của bạn."
                  : "Bạn chỉ còn vài bước nữa là hoàn thành bài đánh giá sức khỏe của mình"}
              </p>

              {/* Timeline with improved mobile styling */}
              <div className="space-y-4 sm:space-y-6 relative before:absolute before:left-3 sm:before:left-3.5 before:top-1 before:h-[calc(100%-16px)] sm:before:h-[calc(100%-24px)] before:w-0.5 before:bg-gray-200 before:content-['']">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start relative transition-all duration-200 ${
                      step.status === "complete"
                        ? "cursor-pointer hover:bg-green-50 -mx-2 px-2 py-1 rounded-lg hover:shadow-sm border border-transparent hover:border-green-100"
                        : step.status === "current"
                        ? "bg-green-50 -mx-2 px-2 py-1 rounded-lg border border-green-100"
                        : "opacity-60"
                    }`}
                    onClick={() => {
                      if (step.status === "complete") {
                        goToStep(index);
                        setShowStepsModal(false);
                      }
                    }}
                  >
                    {/* Step status icon with responsive sizing */}
                    <div
                      className={`flex-shrink-0 mr-3 sm:mr-4 relative z-10 mobile-step-indicator ${
                        step.status === "complete"
                          ? "step-complete"
                          : step.status === "current"
                          ? "step-current"
                          : "step-upcoming"
                      }`}
                    >
                      {step.status === "complete" ? (
                        <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white shadow-lg relative">
                          <svg
                            className="h-3 w-3 sm:h-4 sm:w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div className="absolute inset-0 rounded-full bg-green-600 opacity-20 scale-150"></div>
                        </div>
                      ) : step.status === "current" ? (
                        <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-green-600 bg-white shadow-lg relative">
                          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-600 step-current-pulse"></div>
                          <div className="absolute inset-0 rounded-full border border-green-400 opacity-40 scale-125 animate-ping"></div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-gray-300 bg-white shadow-sm">
                          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gray-300"></div>
                        </div>
                      )}
                    </div>
                    {/* Step information with responsive text sizes */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-medium transition-colors ${
                          step.status === "current"
                            ? "text-green-600"
                            : step.status === "complete"
                            ? "text-green-700"
                            : "text-gray-400"
                        }`}
                      >
                        Bước {step.id}
                      </div>
                      <div
                        className={`text-sm sm:text-base font-medium transition-colors ${
                          step.status === "current"
                            ? "text-green-600 font-semibold"
                            : step.status === "complete"
                            ? "text-gray-800 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {step.name}
                      </div>
                      <div
                        className={`text-xs transition-colors ${
                          step.status === "complete"
                            ? "text-green-600 font-medium"
                            : step.status === "current"
                            ? "text-green-600 font-medium animate-pulse"
                            : "text-gray-300"
                        }`}
                      >
                        {step.status === "complete"
                          ? "✓ Hoàn thành"
                          : step.status === "current"
                          ? "⚬ Đang tiến hành"
                          : ""}
                      </div>
                    </div>
                    {/* Visual indicator for completed steps */}
                    {step.status === "complete" && (
                      <div className="ml-2 text-green-600 flex-shrink-0">
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
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

              {/* Close button with responsive spacing */}
              <div className="mt-6 sm:mt-8 flex justify-end">
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
      )}
      {/* Enhanced progress bar for mobile */}
      <div className="lg:hidden my-4 px-2 sm:px-4">
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-sm step-progress-bar relative overflow-hidden"
              style={{
                width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span className="font-medium">
              Bước {currentStepIndex + 1} / {steps.length}
            </span>
            <span className="text-green-600 font-medium">
              {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepProgress;
