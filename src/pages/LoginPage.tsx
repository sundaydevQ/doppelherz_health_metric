import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import { Card } from "@heroui/react"; // Import HeroUI components

// Define an interface for expected search params on the login route
interface LoginSearch {
  redirect?: string;
}

const LoginPage: React.FC = () => {
  const authContext = useAuth(); // Get the whole context
  const navigate = useNavigate();
  // Apply the interface, and ensure it's understood this route is /login
  const search = useSearch({ from: "/login" }) as LoginSearch;
  const routerIsLoading = useRouterState({
    select: (s) => s.status === "pending",
  });

  React.useEffect(() => {
    if (authContext && authContext.isAuthenticated) {
      const redirectTo = search.redirect || "/";
      navigate({ to: redirectTo, replace: true });
    }
  }, [authContext, navigate, search.redirect]);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (authContext) {
      authContext.login(credentialResponse);
    }
    // Redirect is handled by the useEffect above once isAuthenticated updates
  };

  const handleLoginError = () => {
    console.error("Login Failed");
    // You could show an error message to the user here
  };

  // Wait for router to be ready and auth context to be available
  if (routerIsLoading || !authContext) {
    return <p className="text-center p-10">Initializing...</p>;
  }

  // Auth context is available, now check its loading state
  if (authContext.isLoading) {
    return <p className="text-center p-10">Loading authentication...</p>;
  }

  // If already authenticated (and auth is loaded), the useEffect will redirect.
  if (authContext.isAuthenticated) {
    return (
      <p className="text-center p-10">Already logged in. Redirecting...</p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Sign in with your Google account to access the survey.
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap // You can keep or remove this based on preference
            shape="rectangular"
            logo_alignment="center"
            // It's generally better to let the button size itself or use Tailwind for sizing
            // width="300px"
          />
        </div>
        <p className="mt-6 text-xs text-gray-500 text-center">
          By signing in, you acknowledge our terms and conditions.
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
