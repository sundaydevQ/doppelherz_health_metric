import React from "react";
// import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Card } from "@heroui/react";
// import Button from "../../../shared/components/Button";
// import { useAuth } from "../../../shared/hooks";
import { authService } from "../../../shared/services/authService"; // Import authService
// Assuming you might want a Google icon, e.g., from heroicons
// import { DeviceTabletIcon } from "@heroicons/react/24/outline"; // Placeholder for a Google-like icon
import LogoImage from "../../../assets/images/logo.png"; // Adjust the path as needed
import GoogleLoginButton from "../../../shared/components/GoogleButton";

// const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const LoginPage: React.FC = () => {
  // const authContext = useAuth();
  const navigate = useNavigate();
  const routerIsLoading = useRouterState({
    select: (s) => s.status === "pending",
  });
  React.useEffect(() => {
    // If user is already authenticated, redirect them to home page
    if (authService.isAuthenticated()) {
      console.log("User already authenticated, redirecting to home page");

      // Always redirect to home page after successful login
      navigate({ to: "/", replace: true });
    }
  }, [navigate]);

  // Wait for router to be ready
  if (routerIsLoading) {
    return <p className="text-center p-10">Initializing...</p>;
  }
  // If already authenticated, show loading while redirect happens
  if (authService.isAuthenticated()) {
    return (
      <p className="text-center p-10">
        Already logged in. Redirecting to home...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 md:p-12 text-center">
        <img
          src={LogoImage}
          alt="Doppelherz Logo"
          className="w-32 h-auto mx-auto mb-8"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Đăng nhập
        </h1>
        <p className="text-gray-600 mb-8 md:mb-10">
          Đăng nhập để sử dụng các tính năng của ứng dụng
        </p>
        <div className="space-y-4">
          <GoogleLoginButton />
        </div>
        <p className="mt-10 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Doppelherz Health Metric. All rights
          reserved.
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
