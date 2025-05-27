import React, { useEffect, useRef, useState } from "react";
import { getScoreRange } from "./scoringConfig";
import type { SurveyScore } from "./types";

interface ScoreDisplayProps {
  score: SurveyScore;
  className?: string;
  showMinusPointAnimations?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  className = "",
}) => {
  const { currentScore, maxScore } = score;
  const scoreRange = getScoreRange(currentScore);
  const percentage = Math.round((currentScore / maxScore) * 100);
  const [previousScore, setPreviousScore] = useState(currentScore);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect score drops and trigger animation
  useEffect(() => {
    setPreviousScore(currentScore);
  }, [currentScore, previousScore]);

  // Get border color based on score range
  const getBorderColor = () => {
    if (percentage >= 85) return "border-green-500";
    if (percentage >= 65) return "border-yellow-500";
    if (percentage >= 40) return "border-orange-500";
    return "border-red-500";
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getBorderColor()}${className} relative`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Điểm Nội Tiết Tố
        </h3>
        <div className="text-right">
          <div
            className={`text-2xl font-bold ${scoreRange.color} transition-all duration-300`}
          >
            {currentScore}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Tình trạng:</span>
          <span className={scoreRange.color}>{scoreRange.label}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
              percentage >= 85
                ? "bg-green-500"
                : percentage >= 65
                ? "bg-yellow-500"
                : percentage >= 40
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Score Range Badge */}
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${scoreRange.bgColor} ${scoreRange.color}`}
      >
        <div
          className={`w-2 h-2 rounded-full mr-2 ${
            percentage >= 85
              ? "bg-green-500"
              : percentage >= 65
              ? "bg-yellow-500"
              : percentage >= 40
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
        />
        {scoreRange.label}
      </div>

      {/* Mobile responsive text */}
      <div className="mt-2 text-xs text-gray-600 sm:text-sm">
        Điểm số được tính dựa trên các thông tin bạn cung cấp
      </div>
    </div>
  );
};
