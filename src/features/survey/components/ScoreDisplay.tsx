import React, { useEffect, useRef, useState } from "react";
import { getScoreRange } from "./scoringConfig";
import type { SurveyScore } from "./types";
import GaugeChart from "./GaugeChart";

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
      {/* Gauge Chart Component */}
      <div>
        <GaugeChart
          score={currentScore}
          maxScore={maxScore}
          minScore={0}
          scoreLabel={scoreRange.label}
        />
      </div>

      {/* Mobile responsive text */}
      <div className="mt-2 text-xs text-gray-600 sm:text-sm">
        Điểm số được tính dựa trên các thông tin bạn cung cấp
      </div>
    </div>
  );
};
