import React from "react";
import GaugeComponent from "react-gauge-component";

interface GaugeChartProps {
  score: number;
  minScore: number;
  maxScore: number;
  scoreLabel: string; // e.g., "Good", "Excellent"
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  score,
  minScore,
  maxScore,
}) => {
  // Calculate percentage for the gauge
  const percentage = ((score - minScore) / (maxScore - minScore)) * 100;

  return (
    <div className="flex flex-col items-center px-6 bg-white rounded-lg font-sans">
      {/* Gauge Component */}
      <div className="w-80 h-48">
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            // Define color ranges using your styling logic
            subArcs: [
              {
                limit: 40,
                color: "#ef4444", // red-500
                showTick: true,
              },
              {
                limit: 65,
                color: "#f97316", // orange-500
                showTick: true,
              },
              {
                limit: 85,
                color: "#eab308", // yellow-500
                showTick: true,
              },
              {
                limit: 100,
                color: "#22c55e", // green-500
                showTick: true,
              },
            ],
          }}
          pointer={{
            color: "#374151", // gray-700
            length: 0.8,
            width: 15,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) => value,
              hide: true,
            },
            tickLabels: {
              type: "outer",
              ticks: [{ value: minScore }, { value: maxScore }],
              defaultTickValueConfig: {
                formatTextValue: (value) => value,
              },
            },
          }}
          value={percentage}
          minValue={0}
          maxValue={100}
        />
      </div>
    </div>
  );
};

export default GaugeChart;
