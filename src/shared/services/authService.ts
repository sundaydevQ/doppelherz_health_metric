// src/shared/services/authService.ts

/**
 * Authentication service for managing tokens and logout functionality
 */
export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
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
