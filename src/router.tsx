import { RootRoute, Route, Router, redirect } from "@tanstack/react-router";

// Import your page components using barrel files
import { RootLayout } from "./shared/layouts";
import { HomePage } from "./features/home";
import { LoginPage } from "./features/auth";
import {
  SurveyPage,
  SurveyAnalysisPage,
  ThankYouPage,
} from "./features/survey";
import { authService } from "./shared/services/authService";

// Create a root route
const rootRoute = new RootRoute({
  component: RootLayout,
});

// Create route for the home page
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// Create route for the login page
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    return {
      redirect: search.redirect as string | undefined,
    };
  },
  beforeLoad: ({ search }) => {
    // If user is already authenticated, redirect them to the intended page or home
    if (authService.isAuthenticated()) {
      const redirectTo = search.redirect || "/";
      throw redirect({
        to: redirectTo,
        replace: true,
      });
    }
  },
  component: LoginPage,
});

// Create route for the survey page
const surveyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/survey",
  beforeLoad: () => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      // Store the current path to redirect back after login
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
  component: SurveyPage,
});

// Create route for the survey analysis page
const surveyAnalysisRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/survey/analysis/$score", // Changed to use $score for param
  parseParams: (params: { score: string }) => ({
    score: parseInt(params.score, 10),
  }),
  validateSearch: (search: Record<string, unknown>): { score?: number } => {
    // This is a basic example; you might want more robust validation
    return {
      score: search.score as number | undefined,
    };
  },
  beforeLoad: () => {
    // Check if user is authenticated first
    if (!authService.isAuthenticated()) {
      // Store the current path to redirect back after login
      throw redirect({
        to: "/",
        replace: true,
      });
    }

    // Check if survey is completed in localStorage
    const isCompleteSurvey = localStorage.getItem("isCompleteSurvey");

    if (isCompleteSurvey !== "true") {
      // If survey is not completed, redirect to survey page
      throw redirect({
        to: "/survey",
        replace: true,
      });
    }
  },
  component: SurveyAnalysisPage,
});

// Create route for the thank you page
const thankYouRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/survey/thank-you",
  component: ThankYouPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  surveyRoute,
  surveyAnalysisRoute, // Added surveyAnalysisRoute
  thankYouRoute, // Added thankYouRoute
]);

// Create the router instance
const router = new Router({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
