import { RootRoute, Route, Router, redirect } from "@tanstack/react-router";

// Import your page components using barrel files
import { RootLayout } from "./shared/layouts";
import { HomePage } from "./features/home";
import { LoginPage } from "./features/auth";
import { SurveyPage } from "./features/survey";
import { SurveyAnalysisPage } from "./features/survey";

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
  component: LoginPage,
});

// Create route for the survey page
const surveyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/survey",
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
    // Check if survey is completed in localStorage
    const isComplete = localStorage.getItem("isComplete");

    if (isComplete !== "true") {
      // If survey is not completed, redirect to survey page
      throw redirect({
        to: "/survey",
        replace: true,
      });
    }
  },
  component: SurveyAnalysisPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  surveyRoute,
  surveyAnalysisRoute, // Added surveyAnalysisRoute
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
