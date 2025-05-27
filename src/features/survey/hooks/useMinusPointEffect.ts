import { useState, useCallback, useRef, useEffect } from "react";

export interface MinusPointAnimation {
  id: string;
  points: number;
  timestamp: number;
  position?: { x: number; y: number };
  fieldName?: string;
  option?: string;
}

interface UseMinusPointEffectReturn {
  activeAnimations: MinusPointAnimation[];
  triggerMinusPoint: (
    points: number,
    fieldName?: string,
    option?: string,
    position?: { x: number; y: number }
  ) => void;
  clearAnimation: (id: string) => void;
  clearAllAnimations: () => void;
}

export const useMinusPointEffect = (): UseMinusPointEffectReturn => {
  const [activeAnimations, setActiveAnimations] = useState<
    MinusPointAnimation[]
  >([]);
  const timeoutRefs = useRef<Map<string, number>>(new Map());

  const triggerMinusPoint = useCallback(
    (
      points: number,
      fieldName?: string,
      option?: string,
      position?: { x: number; y: number }
    ) => {
      if (points <= 0) return; // Only show for actual point deductions

      const id = `minus-${Date.now()}-${Math.random()}`;
      const animation: MinusPointAnimation = {
        id,
        points,
        timestamp: Date.now(),
        position,
        fieldName,
        option,
      };

      setActiveAnimations((prev) => [...prev, animation]);

      // Auto-remove animation after 2 seconds
      const timeout = setTimeout(() => {
        setActiveAnimations((prev) => prev.filter((anim) => anim.id !== id));
        timeoutRefs.current.delete(id);
      }, 2000);

      timeoutRefs.current.set(id, timeout);
    },
    []
  );

  const clearAnimation = useCallback((id: string) => {
    setActiveAnimations((prev) => prev.filter((anim) => anim.id !== id));
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }
  }, []);

  const clearAllAnimations = useCallback(() => {
    setActiveAnimations([]);
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current.clear();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  return {
    activeAnimations,
    triggerMinusPoint,
    clearAnimation,
    clearAllAnimations,
  };
};
