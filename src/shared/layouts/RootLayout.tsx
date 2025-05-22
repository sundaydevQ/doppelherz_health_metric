import React from "react";
import { Outlet, useMatchRoute } from "@tanstack/react-router";
import { ResponsiveNavBar } from "../../shared/components";

const RootLayout: React.FC = () => {
  const matchSurvey = useMatchRoute()({ to: "/survey" });

  return (
    <div className="min-h-screen flex flex-col w-full box-border overflow-x-hidden">
      {/* Responsive Navigation Bar */}
      {!matchSurvey && <ResponsiveNavBar />}

      {/* Main Content - Full width with top padding for navbar */}
      <main className="flex-grow w-full box-border">
        {!matchSurvey && <div className="h-16 lg:h-[72px]"></div>}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
