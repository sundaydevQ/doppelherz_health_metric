import React from "react";
import type { MinusPointAnimation } from "../hooks/useMinusPointEffect";

interface MinusPointEffectProps {
  animations: MinusPointAnimation[];
  className?: string;
}

export const MinusPointEffect: React.FC<MinusPointEffectProps> = ({
  animations,
  className = "",
}) => {
  if (animations.length === 0) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      {animations.map((animation) => (
        <div
          key={animation.id}
          className="absolute animate-minus-point"
          style={{
            left: animation.position?.x || "50%",
            top: animation.position?.y || "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full shadow-lg font-semibold text-sm">
            <span className="text-lg">−</span>
            <span>{animation.points}</span>
            <span className="text-xs">điểm</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Floating animation for score display area
interface ScoreMinusPointEffectProps {
  animations: MinusPointAnimation[];
  containerRef?: React.RefObject<HTMLElement>;
}

export const ScoreMinusPointEffect: React.FC<ScoreMinusPointEffectProps> = ({
  animations,
}) => {
  if (animations.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {animations.map((animation, index) => (
        <div
          key={animation.id}
          className="absolute animate-score-minus-point"
          style={{
            left: "50%",
            top: "20%",
            transform: "translate(-50%, -50%)",
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full shadow-lg font-bold text-xs">
            <span>−{animation.points}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
