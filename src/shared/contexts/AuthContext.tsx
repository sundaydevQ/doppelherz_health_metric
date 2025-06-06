import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { authService } from "../services/authService";

// Define what user information you want to store
interface User {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
}

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

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loggedInUser: User) => void; // Changed to accept User object
  setIsLoading: (loading: boolean) => void; // Added setIsLoading
  loginWithGoogle: () => void; // Function to initiate Google login
  renderGoogleButton: (elementId?: string) => void; // Function to render Google button
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

// IMPORTANT: Replace with your actual Google Client ID
// const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // <--- REPLACE THIS!
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_FALLBACK";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
  interface GoogleCredentialResponse {
    credential: string;
    select_by?: string;
    client_id?: string;
  }

  interface GoogleUserInfo {
    sub: string;
    email: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    email_verified: boolean;
  }
  const handleCredentialResponse = async (
    response: GoogleCredentialResponse
  ): Promise<void> => {
    try {
      setIsLoading(true);

      // Decode JWT token to get user info
      const userInfo: GoogleUserInfo = parseJwt(response.credential);

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
      localStorage.setItem("accessToken", response.credential);
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("isAuthenticated", "true");

      // Always redirect to home page after successful login
      console.log("Login successful, redirecting to home page");
      window.location.href = "/";
    } catch (err) {
      console.error("Error handling Google credential:", err);
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

  const login = (loggedInUser: User) => {
    // No longer expecting CredentialResponse or decoding JWT here
    // The User object is now passed directly from LoginPage
    setIsLoading(true);
    try {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("isAuthenticated", "true");
      console.log("User logged in:", loggedInUser);
    } catch (error) {
      console.error("Error in login function:", error);
      authService.handleLogout(); // Clear auth data on error
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  // Function to allow LoginPage to set loading state
  const contextSetIsLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  if (
    !GOOGLE_CLIENT_ID ||
    GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_FALLBACK"
  ) {
    console.warn(
      "IMPORTANT: Google Client ID is not set in AuthContext.tsx. Google Sign-In will not work."
    );
    return (
      <div>
        <p
          style={{
            color: "red",
            padding: "20px",
            border: "1px solid red",
            backgroundColor: "#ffeeee",
          }}
        >
          <strong>Configuration Error:</strong> Google Client ID is not set.
          Please update <code>src/contexts/AuthContext.tsx</code> with your
          actual Google Client ID.
        </p>
        {children}
        {/* Render children so the app is still somewhat usable for other navigation */}
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        setIsLoading: contextSetIsLoading,
        loginWithGoogle,
        renderGoogleButton,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
