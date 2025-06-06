// src/shared/services/authService.ts

// Extend Window interface to include Google API
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleInitConfig) => void;
          renderButton: (
            element: HTMLElement,
            config: GoogleButtonConfig
          ) => void;
          prompt: (
            callback?: (notification: GooglePromptNotification) => void
          ) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

// Types for Google authentication
interface GoogleInitConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleButtonConfig {
  theme?: string;
  size?: string;
  type?: string;
  shape?: string;
  logo_alignment?: string;
  width?: string;
  text?: string;
  click_listener?: () => void;
}

interface GooglePromptNotification {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
}

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

/**
 * Authentication service for managing tokens and Google authentication
 */
export class AuthService {
  private static instance: AuthService;
  private static readonly GOOGLE_CLIENT_ID =
    import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initialize Google Authentication
   */
  public async initializeGoogleAuth(): Promise<void> {
    try {
      if (!window.google) {
        await this.loadGoogleScript();
      }

      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: AuthService.GOOGLE_CLIENT_ID,
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    } catch (err) {
      console.error("Failed to initialize Google Auth:", err);
    }
  }

  /**
   * Load Google Identity Services script
   */
  private loadGoogleScript(): Promise<void> {
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
  }

  /**
   * Handle Google credential response
   */
  private async handleCredentialResponse(
    response: GoogleCredentialResponse
  ): Promise<void> {
    try {
      const userInfo: GoogleUserInfo = this.parseJwt(response.credential);

      // Store authentication data
      this.setAccessToken(response.credential);
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("isAuthenticated", "true");

      console.log("Login successful, redirecting to home page");
      window.location.href = "/";
    } catch (err) {
      console.error("Error handling Google credential:", err);
    }
  }

  /**
   * Parse JWT token
   */
  private parseJwt(token: string): GoogleUserInfo {
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
  }

  /**
   * Initiate Google login
   */
  public loginWithGoogle(): void {
    try {
      const isSafariMobile =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        /Safari/.test(navigator.userAgent) &&
        !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);

      if (isSafariMobile) {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt((notification) => {
            if (
              notification.isNotDisplayed() ||
              notification.isSkippedMoment()
            ) {
              console.log(
                "Google Sign-In prompt not displayed on Safari mobile"
              );
            }
          });
        }
      } else {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt();
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  /**
   * Render Google Sign-In button
   */
  public renderGoogleButton(elementId = "google-signin-button"): void {
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
          click_listener: () => {
            if (window.navigator.vibrate) {
              window.navigator.vibrate(50);
            }
          },
        });
      }
    }
  }

  /**
   * Get the current access token from localStorage
   */
  public getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  /**
   * Save access token to localStorage
   */
  public setAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }

  /**
   * Remove access token from localStorage
   */
  public removeAccessToken(): void {
    localStorage.removeItem("accessToken");
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  public isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const user = localStorage.getItem("user");
    return !!(token && user);
  }
  /**
   * Handle logout - clear all auth data and redirect to login
   */
  public handleLogout(currentPath?: string): void {
    // Clear all authentication data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    // Revoke Google session if available
    if (window.google && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    // Trigger a custom event that the AuthContext can listen to
    window.dispatchEvent(new CustomEvent("auth:logout"));

    // Redirect to login page with optional redirect parameter
    if (currentPath && !["/", "login"].includes(currentPath))
      window.location.href = "/";
  }

  /**
   * Handle 401 unauthorized responses
   */
  public handleUnauthorized(): void {
    console.warn("Unauthorized access detected. Logging out user.");
    // Get current path to redirect back after re-authentication
    const currentPath = window.location.pathname;
    this.handleLogout(currentPath);
  }
}

// Export a singleton instance
export const authService = AuthService.getInstance();
