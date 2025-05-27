import { useState, useCallback } from "react";
import type { SurveyScore, SurveyFormData } from "../components/types";
import {
  INITIAL_SCORE,
  calculateScoreDeduction,
} from "../components/scoringConfig";

export const useSurveyScoring = () => {
  const [score, setScore] = useState<SurveyScore>({
    currentScore: INITIAL_SCORE,
    maxScore: INITIAL_SCORE,
    deductions: [],
  });

  const calculateTotalScore = useCallback(
    (formData: SurveyFormData): SurveyScore => {
      let currentScore = INITIAL_SCORE;
      const deductions: SurveyScore["deductions"] = [];

      // Calculate deductions for each step
      const calculations = [
        { step: "step2", field: "step2.age", value: formData.step2?.age },
        {
          step: "step3",
          field: "step3.physicalSigns",
          value: formData.step3?.physicalSigns,
        },
        {
          step: "step4",
          field: "step4.psychologicalSigns",
          value: formData.step4?.psychologicalSigns,
        },
        {
          step: "step5",
          field: "step5.riskFactors",
          value: formData.step5?.riskFactors,
        },
        {
          step: "step6",
          field: "step6.medications",
          value: formData.step6?.medications,
        },
      ];

      calculations.forEach(({ step, field, value }) => {
        if (
          value &&
          (typeof value === "string" ? value.trim() !== "" : value.length > 0)
        ) {
          const deduction = calculateScoreDeduction(field, value);
          if (deduction > 0) {
            currentScore -= deduction;
            deductions.push({
              step,
              option: Array.isArray(value) ? value.join(", ") : value,
              points: deduction,
              timestamp: new Date(),
            });
          }
        }
      });

      // Ensure score doesn't go below 0
      currentScore = Math.max(0, currentScore);

      return {
        currentScore,
        maxScore: INITIAL_SCORE,
        deductions,
      };
    },
    []
  );
  const updateScore = useCallback(
    (formData: SurveyFormData) => {
      const newScore = calculateTotalScore(formData);

      // Only update state if the score actually changed
      setScore((prevScore) => {
        // Check if score or number of deductions changed
        if (
          prevScore.currentScore !== newScore.currentScore ||
          prevScore.deductions.length !== newScore.deductions.length
        ) {
          return newScore;
        }

        // Deep compare deductions if same length
        const deductionsChanged = prevScore.deductions.some(
          (deduction, index) => {
            const newDeduction = newScore.deductions[index];
            return (
              deduction.step !== newDeduction.step ||
              deduction.option !== newDeduction.option ||
              deduction.points !== newDeduction.points
            );
          }
        );

        if (deductionsChanged) {
          return newScore;
        }

        return prevScore;
      });

      return newScore;
    },
    [calculateTotalScore]
  );

  const resetScore = useCallback(() => {
    setScore({
      currentScore: INITIAL_SCORE,
      maxScore: INITIAL_SCORE,
      deductions: [],
    });
  }, []);

  return {
    score,
    updateScore,
    resetScore,
    calculateTotalScore,
  };
};
