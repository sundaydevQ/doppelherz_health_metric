import React, { createContext, useContext } from "react";
import {
  useMinusPointEffect,
  type MinusPointAnimation,
} from "../hooks/useMinusPointEffect";
import { MinusPointEffect } from "./MinusPointEffect";

interface MinusPointContextValue {
  activeAnimations: MinusPointAnimation[];
  triggerMinusPoint: (
    points: number,
    fieldName?: string,
    option?: string,
    position?: { x: number; y: number }
  ) => void;
  clearAnimation: (id: string) => void;
  clearAllAnimations: () => void;
  triggerMinusPointAtElement: (
    points: number,
    element: HTMLElement,
    fieldName?: string,
    option?: string
  ) => void;
}

const MinusPointContext = createContext<MinusPointContextValue | undefined>(
  undefined
);

export const useMinusPointContext = () => {
  const context = useContext(MinusPointContext);
  if (!context) {
    throw new Error(
      "useMinusPointContext must be used within a MinusPointProvider"
    );
  }
  return context;
};

interface MinusPointProviderProps {
  children: React.ReactNode;
}

export const MinusPointProvider: React.FC<MinusPointProviderProps> = ({
  children,
}) => {
  const {
    activeAnimations,
    triggerMinusPoint,
    clearAnimation,
    clearAllAnimations,
  } = useMinusPointEffect();

  const triggerMinusPointAtElement = (
    points: number,
    element: HTMLElement,
    fieldName?: string,
    option?: string
  ) => {
    const rect = element.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    triggerMinusPoint(points, fieldName, option, position);
  };

  const contextValue: MinusPointContextValue = {
    activeAnimations,
    triggerMinusPoint,
    clearAnimation,
    clearAllAnimations,
    triggerMinusPointAtElement,
  };

  return (
    <MinusPointContext.Provider value={contextValue}>
      {children}
      <MinusPointEffect animations={activeAnimations} />
      {/* <ScoreMinusPointEffect animations={activeAnimations} /> */}
    </MinusPointContext.Provider>
  );
};
