import React, { type ReactNode } from "react";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = "",
  fullWidth = false,
}) => {
  return (
    <div
      className={`w-full ${
        !fullWidth ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = "",
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  gap = "gap-6",
}) => {
  // Create the column classes based on the props
  const getGridColsClass = () => {
    const cols = [];
    if (columns.sm) cols.push(`grid-cols-${columns.sm}`);
    if (columns.md) cols.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) cols.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) cols.push(`xl:grid-cols-${columns.xl}`);
    return cols.join(" ");
  };

  return (
    <div className={`grid ${getGridColsClass()} ${gap} ${className}`}>
      {children}
    </div>
  );
};

interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
