import React from "react";
import { Outlet } from "@tanstack/react-router";
import ResponsiveNavBar from "../common/ResponsiveNavBar";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Responsive Navigation Bar */}
      <ResponsiveNavBar />

      {/* Main Content - Adjusted top padding to account for fixed navbar */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
