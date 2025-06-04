/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { AuthContext } from "../contexts";
import { useEffect, useState } from "react";

// Google Identity Services type declarations
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: (notification: any) => void) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// User type definition
interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
  token: string;
}

// Google Auth Hook
export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google Auth
  useEffect(() => {
    const initializeGoogleAuth = async () => {
      try {
        // Load Google Identity Services script
        if (!window.google) {
          await loadGoogleScript();
        }

        // Initialize Google Identity Services
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id:
              import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
        }
      } catch (err) {
        console.error("Failed to initialize Google Auth:", err);
        setError("Failed to initialize Google authentication");
      }
    };

    initializeGoogleAuth();
  }, []);

  // Load Google Identity Services script
  const loadGoogleScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (document.getElementById("google-identity-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "google-identity-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Google Identity Services script"));
      document.head.appendChild(script);
    });
  };

  // Handle Google credential response
  const handleCredentialResponse = async (response: any) => {
    try {
      setIsLoading(true);
      setError(null);

      // Decode JWT token to get user info
      const userInfo = parseJwt(response.credential);

      // Set user data
      setUser({
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        given_name: userInfo.given_name,
        family_name: userInfo.family_name,
        email_verified: userInfo.email_verified,
        token: response.credential,
      });

      // Store token in localStorage for persistence
      localStorage.setItem("google_auth_token", response.credential);
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    } catch (err) {
      console.error("Error handling Google credential:", err);
      setError("Failed to process Google authentication");
    } finally {
      setIsLoading(false);
    }
  };

  // Parse JWT token
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      throw new Error("Invalid token format");
    }
  };

  // Login function - optimized for Safari mobile
  const loginWithGoogle = () => {
    try {
      setError(null);
      setIsLoading(true);

      // Check if we're on Safari mobile
      const isSafariMobile =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        /Safari/.test(navigator.userAgent) &&
        !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);

      if (isSafariMobile) {
        // For Safari mobile, use popup method with specific configurations
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt((notification) => {
            if (
              notification.isNotDisplayed() ||
              notification.isSkippedMoment()
            ) {
              // Fallback to custom button click for Safari mobile
              renderGoogleButton();
            }
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      } else {
        // For other browsers, use standard prompt
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt();
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to initiate Google login");
      setIsLoading(false);
    }
  };

  // Render Google Sign-In button
  const renderGoogleButton = (elementId = "google-signin-button") => {
    if (window.google && window.google.accounts) {
      const element = document.getElementById(elementId);
      if (element) {
        window.google.accounts.id.renderButton(element, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "rectangular",
          logo_alignment: "left",
          width: "100%",
          text: "signin_with",
          // Safari mobile specific optimizations
          click_listener: () => {
            // Add haptic feedback for iOS
            if (window.navigator.vibrate) {
              window.navigator.vibrate(50);
            }
          },
        });
      }
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear user data
      setUser(null);
      setError(null);

      // Clear stored data
      localStorage.removeItem("google_auth_token");
      localStorage.removeItem("user_info");

      // Revoke Google session if available
      if (window.google && window.google.accounts.id) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const storedToken = localStorage.getItem("google_auth_token");
        const storedUserInfo = localStorage.getItem("user_info");

        if (storedToken && storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          // Check if token is still valid (basic check)
          const tokenPayload = parseJwt(storedToken);
          const currentTime = Date.now() / 1000;

          if (tokenPayload.exp > currentTime) {
            setUser({
              ...userInfo,
              token: storedToken,
            });
          } else {
            // Token expired, clear storage
            logout();
          }
        }
      } catch (err) {
        console.error("Error checking existing session:", err);
        logout();
      }
    };

    checkExistingSession();
  }, []);

  return {
    user,
    isLoading,
    error,
    loginWithGoogle,
    logout,
    renderGoogleButton,
  };
};
