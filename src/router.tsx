import { RootRoute, Route, Router, redirect } from "@tanstack/react-router";

// Import your page components
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SurveyPage from "./pages/SurveyPage";

// Placeholder for authentication check
// We will replace this with actual auth logic later
const isAuthenticated = () => {
  // For now, let's assume the user is not authenticated
  // In a real app, you'd check a token, context, etc.
  console.log(
    "Current auth state (placeholder):",
    localStorage.getItem("isAuthenticated") === "true"
  );
  return localStorage.getItem("isAuthenticated") === "true";
};

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

// Create route for the survey page (protected)
const surveyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/survey",
  component: SurveyPage,
  beforeLoad: ({ location }) => {
    // We can enhance this later with auth context if needed
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
        search: {
          // Optionally pass the original destination to redirect back after login
          redirect: location.href,
        },
      });
    }
  },
});

// Create the route tree
const routeTree = rootRoute.addChildren([homeRoute, loginRoute, surveyRoute]);

// Create the router instance
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
