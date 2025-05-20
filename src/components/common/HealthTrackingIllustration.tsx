import React from "react";

interface HealthTrackingIllustrationProps {
  className?: string;
}

const HealthTrackingIllustration: React.FC<HealthTrackingIllustrationProps> = ({
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle cx="200" cy="200" r="150" fill="#F0F4FF" />

        {/* Chart Grid Lines */}
        <line
          x1="100"
          y1="300"
          x2="300"
          y2="300"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="250"
          x2="300"
          y2="250"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="200"
          x2="300"
          y2="200"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="150"
          x2="300"
          y2="150"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="100"
          x2="300"
          y2="100"
          stroke="#E2E8F0"
          strokeWidth="2"
        />

        {/* Vertical Grid Lines */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="300"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="100"
          x2="150"
          y2="300"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="100"
          x2="200"
          y2="300"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="250"
          y1="100"
          x2="250"
          y2="300"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        <line
          x1="300"
          y1="100"
          x2="300"
          y2="300"
          stroke="#E2E8F0"
          strokeWidth="2"
        />

        {/* Chart Lines */}
        <path
          d="M100 250 L150 230 L200 260 L250 180 L300 120"
          stroke="#6942AF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Line Data Points */}
        <circle cx="100" cy="250" r="8" fill="#6942AF" />
        <circle cx="150" cy="230" r="8" fill="#6942AF" />
        <circle cx="200" cy="260" r="8" fill="#6942AF" />
        <circle cx="250" cy="180" r="8" fill="#6942AF" />
        <circle cx="300" cy="120" r="8" fill="#6942AF" />

        {/* Heart Rate Line */}
        <path
          d="M100 220 L120 220 L130 180 L140 260 L150 220 L170 220"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Chart Axes */}
        <line
          x1="100"
          y1="300"
          x2="300"
          y2="300"
          stroke="#4A5568"
          strokeWidth="3"
        />
        <line
          x1="100"
          y1="300"
          x2="100"
          y2="100"
          stroke="#4A5568"
          strokeWidth="3"
        />

        {/* Magnifying Glass */}
        <circle
          cx="280"
          cy="150"
          r="25"
          stroke="#4A5568"
          strokeWidth="5"
          fill="white"
          fillOpacity="0.7"
        />
        <line
          x1="295"
          y1="170"
          x2="315"
          y2="190"
          stroke="#4A5568"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default HealthTrackingIllustration;
