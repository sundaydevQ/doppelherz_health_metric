import React, { useEffect } from "react";
import { Outlet, useMatchRoute } from "@tanstack/react-router";
import { ResponsiveNavBar } from "../../shared/components";
import { getUserInfo } from "../services";

const RootLayout: React.FC = () => {
  const matchSurvey = useMatchRoute()({ to: "/survey" });
  const matchLogin = useMatchRoute()({ to: "/login" });

  const fetchUserInfo = async () => {
    try {
      // Fetch user information if needed
      // This can be replaced with actual API call
      const response = await getUserInfo();

      console.log("User Info:", response);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (!matchLogin) fetchUserInfo();
  }, [matchLogin]);

  return (
    <div className="relative min-h-screen flex flex-col w-full box-border overflow-x-hidden">
      {/* Background for top 2/5 - Mobile only */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-br from-[#A07FEA] to-[#805AD5] lg:hidden rounded-bl-3xl rounded-br-3xl"></div>

      {/* Responsive Navigation Bar */}
      {!matchSurvey && !matchLogin && <ResponsiveNavBar />}

      {/* Main Content - Full width with top padding for navbar */}
      <main className="flex-grow w-full box-border z-0">
        {" "}
        {/* Ensure content is above the background */}
        {!matchSurvey && !matchLogin && (
          <div className="h-16 lg:h-[72px]"></div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
