import React from "react";
import { Outlet } from "@tanstack/react-router";
import { ResponsiveNavBar } from "../../shared/components";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full box-border overflow-x-hidden">
      {/* Responsive Navigation Bar */}
      <ResponsiveNavBar />

      {/* Main Content - Full width with top padding for navbar */}
      <main className="flex-grow w-full box-border">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
