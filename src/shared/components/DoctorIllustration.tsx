import React from "react";

interface DoctorIllustrationProps {
  className?: string;
}

const DoctorIllustration: React.FC<DoctorIllustrationProps> = ({
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
        {/* Body */}
        <rect x="130" y="200" width="140" height="180" fill="#FFFFFF" />

        {/* Head */}
        <circle cx="200" cy="150" r="70" fill="#FFE0C2" />

        {/* Hair */}
        <path
          d="M200 80C166 80 140 106 140 140C140 158 148 174 160 185C160 145 180 130 200 130C220 130 240 145 240 185C252 174 260 158 260 140C260 106 234 80 200 80Z"
          fill="#6B3E2E"
        />

        {/* Eyes */}
        <circle cx="175" cy="140" r="10" fill="#FFFFFF" />
        <circle cx="225" cy="140" r="10" fill="#FFFFFF" />
        <circle cx="175" cy="140" r="5" fill="#3E2723" />
        <circle cx="225" cy="140" r="5" fill="#3E2723" />

        {/* Smile */}
        <path
          d="M180 170C190 180 210 180 220 170"
          stroke="#3E2723"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Lab Coat */}
        <path d="M130 200V380H270V200H250V300H150V200H130Z" fill="#FFFFFF" />
        <rect x="150" y="200" width="100" height="100" fill="#6942AF" />

        {/* Stethoscope */}
        <path
          d="M160 220C160 220 140 240 140 260C140 270 150 280 160 280"
          stroke="#4A5568"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="280" r="8" fill="#4A5568" />

        {/* Name Tag */}
        <rect x="180" y="220" width="40" height="20" fill="#F56565" />

        {/* Clipboard */}
        <rect x="230" y="240" width="30" height="40" fill="#EDF2F7" />
        <rect x="230" y="240" width="30" height="5" fill="#A0AEC0" />
        <line
          x1="235"
          y1="250"
          x2="255"
          y2="250"
          stroke="#A0AEC0"
          strokeWidth="2"
        />
        <line
          x1="235"
          y1="260"
          x2="255"
          y2="260"
          stroke="#A0AEC0"
          strokeWidth="2"
        />
        <line
          x1="235"
          y1="270"
          x2="255"
          y2="270"
          stroke="#A0AEC0"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default DoctorIllustration;
