import { useEffect, useRef } from "react";
import { useGoogleAuth } from "../hooks";

const GoogleLoginButton = () => {
  const {
    user,
    isLoading,
    error,
    loginWithGoogle,
    logout,
    renderGoogleButton,
  } = useGoogleAuth();
  const buttonRef = useRef(null);

  // Render Google button when component mounts
  useEffect(() => {
    if (!user && buttonRef.current) {
      const timer = setTimeout(() => {
        renderGoogleButton("google-signin-button");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [user, renderGoogleButton]);

  // Handle manual login for Safari mobile fallback
  const handleManualLogin = () => {
    if (!isLoading) {
      loginWithGoogle();
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4 p-4 max-w-sm mx-auto">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg w-full">
          <img
            src={user.picture}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png"; // Fallback image
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          disabled={isLoading}
          className="w-full max-w-xs px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isLoading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-sm mx-auto">
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center text-sm">
          {error}
        </div>
      )}

      {/* Google Sign-In Button Container */}
      <div
        id="google-signin-button"
        ref={buttonRef}
        className="w-full flex justify-center [&>div]:!w-full [&>div]:!max-w-xs"
      />

      {/* Fallback button for Safari mobile issues */}
      <button
        onClick={handleManualLogin}
        disabled={isLoading}
        className="hidden w-full max-w-xs px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 safari-fallback"
      >
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </button>

      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
