import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { router } from "./router";
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider
import { HeroUIProvider } from "@heroui/react";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <HeroUIProvider>
        {/* Wrap RouterProvider with HeroUIProvider */}
        <AuthProvider>
          {/* Wrap RouterProvider with AuthProvider */}
          <RouterProvider router={router} />
        </AuthProvider>
      </HeroUIProvider>
    </StrictMode>
  );
}
