import { Outlet, useMatchRoute } from "@tanstack/react-router";
import React from "react";
import { ResponsiveNavBar } from "../../shared/components";

const RootLayout: React.FC = () => {
  const matchSurvey = useMatchRoute()({ to: "/survey" });
  const matchLogin = useMatchRoute()({ to: "/login" });

  return (
    <div className="min-h-screen flex flex-col w-full box-border overflow-x-hidden">
      {/* Responsive Navigation Bar */}
      {!matchSurvey && !matchLogin && <ResponsiveNavBar />}

      {/* Main Content - Full width with top padding for navbar */}
      <main className="flex-grow w-full box-border">
        {!matchSurvey && !matchLogin && (
          <div className="h-16 lg:h-[72px]"></div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
