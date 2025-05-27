import React, { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import type { SurveyFormData, SurveyScore } from "./types";
import { useSurveyScoring } from "../hooks/useSurveyScoring";

interface ScoringProviderProps {
  children: React.ReactNode;
  onScoreUpdate?: (score: SurveyScore) => void;
  onScoreDeduction?: (points: number, field: string, option: string) => void;
}

export const ScoringProvider: React.FC<ScoringProviderProps> = ({
  children,
  onScoreUpdate,
  onScoreDeduction,
}) => {
  const { values } = useFormikContext<SurveyFormData>();
  const { updateScore } = useSurveyScoring();
  const onScoreUpdateRef = useRef(onScoreUpdate);
  const onScoreDeductionRef = useRef(onScoreDeduction);
  const previousScoreRef = useRef<SurveyScore | null>(null);

  // Keep the callback refs updated
  useEffect(() => {
    onScoreUpdateRef.current = onScoreUpdate;
    onScoreDeductionRef.current = onScoreDeduction;
  });

  useEffect(() => {
    const newScore = updateScore(values);

    // Detect new deductions and trigger animations
    if (previousScoreRef.current && onScoreDeductionRef.current) {
      const newDeductions = newScore.deductions.filter(
        (newDeduction) =>
          !previousScoreRef.current!.deductions.some(
            (prevDeduction) =>
              prevDeduction.step === newDeduction.step &&
              prevDeduction.option === newDeduction.option &&
              prevDeduction.points === newDeduction.points
          )
      );

      // Trigger animations for new deductions
      newDeductions.forEach((deduction) => {
        onScoreDeductionRef.current!(
          deduction.points,
          deduction.step,
          deduction.option
        );
      });
    }

    previousScoreRef.current = newScore;

    if (onScoreUpdateRef.current) {
      onScoreUpdateRef.current(newScore);
    }
  }, [values, updateScore]);

  return <>{children}</>;
};
