import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

// Define what user information you want to store
interface User {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
}

interface DecodedJwtToken {
  sub: string; // Subject (user ID)
  email: string;
  name: string;
  picture: string;
  exp?: number; // Expiration time
  iat?: number; // Issued at
  iss?: string; // Issuer
  aud?: string; // Audience
  // Add any other fields you expect in the token
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
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

  const login = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    if (credentialResponse.credential) {
      try {
        const idToken = credentialResponse.credential;

        // Use jwtDecode to decode the token
        const decodedToken: DecodedJwtToken = jwtDecode(idToken);

        const loggedInUser: User = {
          id: decodedToken.sub, // 'sub' is typically the user ID
          email: decodedToken.email,
          name: decodedToken.name,
          picture: decodedToken.picture,
        };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("isAuthenticated", "true"); // For router placeholder
      } catch (error) {
        console.error("Login error:", error);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
    } else {
      console.error("Login failed: No credential received.");
    }
    setIsLoading(false);
  };

  const logout = () => {
    googleLogout(); // Clears Google's session
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated"); // For router placeholder
    console.log("User logged out");
  };

  const isAuthenticated = !!user;

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
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};
