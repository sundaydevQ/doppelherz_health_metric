import React from "react";

interface PersonalInsightsIllustrationProps {
  className?: string;
}

const PersonalInsightsIllustration: React.FC<
  PersonalInsightsIllustrationProps
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
        {/* Brain Background */}
        <path
          d="M200 100 C240 80 280 100 290 140 C300 180 280 220 260 240 C240 260 220 270 200 270 C180 270 160 260 140 240 C120 220 100 180 110 140 C120 100 160 80 200 100 Z"
          fill="#FFE0EB"
        />

        {/* Brain Details */}
        <path
          d="M200 100 C220 95 240 100 250 120"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M200 100 C180 95 160 100 150 120"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M290 140 C285 160 270 180 250 190"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M110 140 C115 160 130 180 150 190"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M250 190 C240 210 220 225 200 225"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M150 190 C160 210 180 225 200 225"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M200 225 C200 240 200 255 200 270"
          stroke="#F56565"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Magnifying Glass */}
        <circle
          cx="280"
          cy="180"
          r="40"
          stroke="#6942AF"
          strokeWidth="6"
          fill="white"
          fillOpacity="0.6"
        />
        <line
          x1="310"
          y1="210"
          x2="340"
          y2="240"
          stroke="#6942AF"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Data Points/Connections */}
        <circle cx="180" cy="140" r="8" fill="#6942AF" />
        <circle cx="220" cy="140" r="8" fill="#6942AF" />
        <circle cx="150" cy="180" r="8" fill="#6942AF" />
        <circle cx="200" cy="180" r="8" fill="#6942AF" />
        <circle cx="250" cy="180" r="8" fill="#6942AF" />
        <circle cx="180" cy="220" r="8" fill="#6942AF" />
        <circle cx="220" cy="220" r="8" fill="#6942AF" />

        {/* Connections */}
        <line
          x1="180"
          y1="140"
          x2="220"
          y2="140"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="180"
          y1="140"
          x2="150"
          y2="180"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="180"
          y1="140"
          x2="200"
          y2="180"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="220"
          y1="140"
          x2="200"
          y2="180"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="220"
          y1="140"
          x2="250"
          y2="180"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="180"
          x2="180"
          y2="220"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="180"
          x2="180"
          y2="220"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="180"
          x2="220"
          y2="220"
          stroke="#6942AF"
          strokeWidth="2"
        />
        <line
          x1="250"
          y1="180"
          x2="220"
          y2="220"
          stroke="#6942AF"
          strokeWidth="2"
        />

        {/* Personalized Sparkles */}
        <path
          d="M140 120 L145 130 L155 130 L147 137 L150 147 L140 142 L130 147 L133 137 L125 130 L135 130 Z"
          fill="#FFD700"
        />
        <path
          d="M260 120 L265 130 L275 130 L267 137 L270 147 L260 142 L250 147 L253 137 L245 130 L255 130 Z"
          fill="#FFD700"
        />
        <path
          d="M200 80 L205 90 L215 90 L207 97 L210 107 L200 102 L190 107 L193 97 L185 90 L195 90 Z"
          fill="#FFD700"
        />
      </svg>
    </div>
  );
};

export default PersonalInsightsIllustration;
