import React from "react";

interface ProgressReportsIllustrationProps {
  className?: string;
}

const ProgressReportsIllustration: React.FC<
  ProgressReportsIllustrationProps
> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Clipboard Background */}
        <rect x="100" y="80" width="200" height="280" rx="10" fill="#F9FAFB" />
        <rect x="100" y="80" width="200" height="40" rx="10" fill="#6942AF" />
        <rect x="185" y="80" width="30" height="15" fill="#6942AF" />

        {/* Clipboard Content */}
        <rect x="120" y="140" width="160" height="20" rx="4" fill="#E2E8F0" />
        <rect x="120" y="140" width="100" height="20" rx="4" fill="#6942AF" />
        <text
          x="130"
          y="155"
          fill="white"
          fontSize="12"
          fontFamily="sans-serif"
        >
          70% Complete
        </text>

        {/* Bar Chart */}
        <rect x="120" y="180" width="20" height="80" rx="2" fill="#E2E8F0" />
        <rect x="120" y="220" width="20" height="40" rx="2" fill="#6942AF" />

        <rect x="150" y="180" width="20" height="80" rx="2" fill="#E2E8F0" />
        <rect x="150" y="200" width="20" height="60" rx="2" fill="#6942AF" />

        <rect x="180" y="180" width="20" height="80" rx="2" fill="#E2E8F0" />
        <rect x="180" y="190" width="20" height="70" rx="2" fill="#6942AF" />

        <rect x="210" y="180" width="20" height="80" rx="2" fill="#E2E8F0" />
        <rect x="210" y="210" width="20" height="50" rx="2" fill="#6942AF" />

        <rect x="240" y="180" width="20" height="80" rx="2" fill="#E2E8F0" />
        <rect x="240" y="180" width="20" height="80" rx="2" fill="#6942AF" />

        {/* Line chart */}
        <path
          d="M120 300 L160 290 L200 310 L240 280 L260 270"
          stroke="#6942AF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="120" cy="300" r="4" fill="#6942AF" />
        <circle cx="160" cy="290" r="4" fill="#6942AF" />
        <circle cx="200" cy="310" r="4" fill="#6942AF" />
        <circle cx="240" cy="280" r="4" fill="#6942AF" />
        <circle cx="260" cy="270" r="4" fill="#6942AF" />

        {/* Achievement Badge */}
        <circle cx="300" cy="120" r="30" fill="#FFD700" />
        <path
          d="M300 100 L305 110 L315 112 L307.5 120 L310 130 L300 125 L290 130 L292.5 120 L285 112 L295 110 Z"
          fill="#FFFFFF"
        />

        {/* Trophy */}
        <path d="M290 330 L310 330 L305 310 L295 310 Z" fill="#FFD700" />
        <rect x="295" y="330" width="10" height="15" fill="#FFD700" />
        <rect x="292" y="345" width="16" height="5" rx="2" fill="#FFD700" />
      </svg>
    </div>
  );
};

export default ProgressReportsIllustration;
