import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

// Define what user information you want to store
interface User {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loggedInUser: User) => void; // Changed to accept User object
  logout: () => void;
  setIsLoading: (loading: boolean) => void; // Added setIsLoading
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (loggedInUser: User) => {
    // No longer expecting CredentialResponse or decoding JWT here
    // The User object is now passed directly from LoginPage
    setIsLoading(true);
    try {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("isAuthenticated", "true");
      console.log("User logged in:", loggedInUser);
    } catch (error) {
      console.error("Error in login function:", error);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    googleLogout(); // Clears Google's session
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated"); // For router placeholder
    console.log("User logged out");
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
        logout,
        setIsLoading: contextSetIsLoading,
      }}
    >
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};
