// src/shared/components/BackButton.tsx
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import Button from "./Button";

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
  children?: React.ReactNode;
}

export const BackButton: React.FC<BackButtonProps> = ({
  fallbackPath = "/",
  className,
  children = "Back",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // No history, navigate to fallback path
      navigate({ to: fallbackPath });
    }
  };

  return (
    <Button
      onPress={handleBack}
      className={`flex items-center gap-2 ${className || ""}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {children}
    </Button>
  );
};

export default BackButton;
