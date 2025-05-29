// src/shared/utils/navigation.ts

import { authService } from "../services/authService";

/**
 * Navigation utility functions for handling authentication redirects
 */
export class NavigationUtils {
  /**
   * Navigate to a protected route, redirecting to login if not authenticated
   * @param path The path to navigate to
   * @param replace Whether to replace the current history entry
   */
  static navigateToProtectedRoute(
    path: string,
    replace: boolean = false
  ): void {
    if (!authService.isAuthenticated()) {
      // Store the intended destination and redirect to login
      const redirectPath = encodeURIComponent(path);
      if (replace) {
        window.location.replace(`/login?redirect=${redirectPath}`);
      } else {
        window.location.href = `/login?redirect=${redirectPath}`;
      }
    } else {
      // User is authenticated, navigate to the intended destination
      if (replace) {
        window.location.replace(path);
      } else {
        window.location.href = path;
      }
    }
  }

  /**
   * Get the current path including search parameters
   */
  static getCurrentPath(): string {
    return window.location.pathname + window.location.search;
  }

  /**
   * Check if a route requires authentication
   * @param path The path to check
   */
  static isProtectedRoute(path: string): boolean {
    const protectedRoutes = [
      "/survey",
      "/survey/",
      "/survey/analysis",
      "/profile",
      "/dashboard",
      // Add more protected routes here as needed
    ];

    return protectedRoutes.some((route) => path.startsWith(route));
  }

  /**
   * Redirect to previous page or default page after successful authentication
   * @param searchParams URL search parameters containing redirect info
   * @param defaultPath Default path if no redirect is specified
   */
  static redirectAfterAuth(
    searchParams: URLSearchParams,
    defaultPath: string = "/"
  ): void {
    const redirectTo = searchParams.get("redirect") || defaultPath;
    window.location.replace(redirectTo);
  }
}

// Convenience functions for common navigation patterns
export const navigateToSurvey = () =>
  NavigationUtils.navigateToProtectedRoute("/survey");
export const navigateToProfile = () =>
  NavigationUtils.navigateToProtectedRoute("/profile");
export const requireAuth = (callback: () => void) => {
  if (authService.isAuthenticated()) {
    callback();
  } else {
    NavigationUtils.navigateToProtectedRoute(NavigationUtils.getCurrentPath());
  }
};
