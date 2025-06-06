import { useEffect, useRef, useState } from "react";
import { authService } from "../services/authService";

const GoogleLoginButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Auth and render button when component mounts
  useEffect(() => {
    let mounted = true;

    const initializeAndRender = async () => {
      try {
        // Initialize Google Auth
        await authService.initializeGoogleAuth();
        
        // Wait a bit for the script to load, then render button
        setTimeout(() => {
          if (mounted && buttonRef.current) {
            try {
              authService.renderGoogleButton("google-signin-button");
              setShowFallback(false);
            } catch (error) {
              console.warn("Failed to render Google button, showing fallback:", error);
              if (mounted) {
                setShowFallback(true);
              }
            }
          }
        }, 500);

        // Show fallback after 3 seconds if Google button doesn't load
        const fallbackTimer = setTimeout(() => {
          if (mounted) {
            setShowFallback(true);
          }
        }, 3000);

        return () => {
          clearTimeout(fallbackTimer);
        };
      } catch (error) {
        console.error("Failed to initialize Google Auth:", error);
        if (mounted) {
          setShowFallback(true);
        }
      }
    };

    initializeAndRender();

    return () => {
      mounted = false;
    };
  }, []);

  // Handle manual login for Safari mobile fallback
  const handleManualLogin = () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        authService.loginWithGoogle();
      } catch (error) {
        console.error("Manual login failed:", error);
      } finally {
        // Reset loading state after a delay
        setTimeout(() => setIsLoading(false), 2000);
      }
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-sm mx-auto">
      {/* Google Sign-In Button Container */}
      <div
        id="google-signin-button"
        ref={buttonRef}
        className="w-full flex justify-center [&>div]:!w-full [&>div]:!max-w-xs min-h-[44px]"
      />

      {/* Fallback button for when Google button fails to load */}
      {showFallback && (
        <button
          onClick={handleManualLogin}
          disabled={isLoading}
          className="w-full max-w-xs px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>
      )}

      {/* Loading indicator when initializing */}
      {isLoading && !showFallback && (
        <div className="flex justify-center items-center p-4">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
