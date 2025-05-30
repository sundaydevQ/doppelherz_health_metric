import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import { Card } from "@heroui/react";
import Button from "../../../shared/components/Button"; // Import Button
import { useAuth } from "../../../shared/hooks"; // Added import for useAuth
import { authService } from "../../../shared/services/authService"; // Import authService
// Assuming you might want a Google icon, e.g., from heroicons
// import { DeviceTabletIcon } from "@heroicons/react/24/outline"; // Placeholder for a Google-like icon
import LogoImage from "../../../assets/images/logo.png"; // Adjust the path as needed

// Define an interface for expected search params on the login route
interface LoginSearch {
  redirect?: string;
}

// Define User interface matching AuthContext (or import it if shared)
interface User {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
}

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const LoginPage: React.FC = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" }) as LoginSearch;
  const routerIsLoading = useRouterState({
    select: (s) => s.status === "pending",
  });

  const googleLogin = useGoogleLogin({
    scope: SCOPES,
    onSuccess: async (tokenResponse) => {
      if (authContext) {
        authContext.setIsLoading(true); // Explicitly set loading in context
        try {
          const userInfoResponse = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            }
          );

          if (!userInfoResponse.ok) {
            const errorData = await userInfoResponse.json().catch(() => ({
              message:
                "Failed to fetch user info, and error response was not JSON.",
            }));
            console.error(
              "Failed to fetch user info:",
              userInfoResponse.status,
              errorData
            );
            throw new Error(
              `Failed to fetch user info: ${userInfoResponse.status} ${
                errorData.message || ""
              }`.trim()
            );
          }

          const userInfo = await userInfoResponse.json();
          const loggedInUser: User = {
            id: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          }; // Save the access token using authService
          authService.setAccessToken(tokenResponse.access_token);

          // Pass the fetched user object directly to the login function
          authContext.login(loggedInUser);
        } catch (error) {
          console.error("Error during Google login process:", error);
          // Ensure logout or error state is properly handled in AuthContext if login fails
          authContext.logout(); // Or a specific error handling function
        } finally {
          // setIsLoading will be handled by the login/logout functions in AuthContext
        }
      }
    },

    onError: (errorResponse: {
      error?: string;
      error_description?: string;
      error_uri?: string;
    }) => {
      // Typed errorResponse
      console.error("Login Failed (hook):", errorResponse);
      if (authContext) {
        authContext.logout(); // Or handle error state
      }
    },
    // flow: 'auth-code', // If you need to get an auth code for your backend
  });

  React.useEffect(() => {
    if (authContext && authContext.isAuthenticated) {
      const redirectTo = search.redirect || "/"; // Default redirect to home page
      navigate({ to: redirectTo, replace: true });
    }
  }, [authContext, navigate, search.redirect]);

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

  const handleGoogleLogin = () => {
    googleLogin(); // Call the function from the hook
  };

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
          <Button
            onPress={handleGoogleLogin}
            className="w-full  text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center justify-center"
          >
            {/* Placeholder for Google Icon SVG or from heroicons */}
            <svg
              className="w-5 h-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l0.007-0.002l6.19,5.238C39.908,34.438,44,29.865,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Tiếp tục với Google
          </Button>
        </div>

        <p className="mt-10 text-xs text-gray-500">
          &copy; ${new Date().getFullYear()} Doppelherz Health Metric. All
          rights reserved.
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
