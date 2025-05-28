# Authentication System Documentation

## Overview

The application now includes a comprehensive authentication system with the following features:

1. **Google OAuth Login** - Users can sign in with their Google account
2. **Token Management** - Access tokens are securely stored and managed
3. **Automatic API Authentication** - All API requests automatically include authentication headers
4. **401 Error Handling** - Automatic logout when unauthorized responses are received
5. **Persistent Sessions** - Users remain logged in across browser sessions

## Components

### AuthService

A singleton service that manages authentication tokens and logout functionality.

**Key Methods:**

- `getAccessToken()` - Get the current access token
- `setAccessToken(token)` - Save a new access token
- `removeAccessToken()` - Remove the access token
- `isAuthenticated()` - Check if user is authenticated
- `handleLogout()` - Clear all auth data and redirect to login
- `handleUnauthorized()` - Handle 401 responses

### API Service

Enhanced API service with automatic authentication and error handling.

**Features:**

- Automatically includes Bearer token in Authorization header
- Handles 401 responses by triggering logout
- Generic request function with TypeScript support
- Predefined API endpoints for common operations

### AuthContext

React context that manages authentication state throughout the app.

**Features:**

- Provides authentication state to all components
- Listens for logout events from AuthService
- Manages loading states during authentication
- Validates token consistency on app startup

## Usage Examples

### Making Authenticated API Calls

```typescript
import { getUserProfile, updateUserProfile } from "../services/apiService";

// GET request with automatic authentication
const response = await getUserProfile();
if (response.error) {
  console.error("Error:", response.error.message);
} else {
  console.log("User profile:", response.data);
}

// POST request with automatic authentication
const updateResponse = await updateUserProfile({ name: "New Name" });
if (updateResponse.error) {
  console.error("Update failed:", updateResponse.error.message);
} else {
  console.log("Profile updated:", updateResponse.data);
}
```

### Using the Auth Context

```typescript
import { useAuth } from "../hooks/useAuth";

function MyComponent() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {auth.user?.name}!</p>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
}
```

### Testing Authentication

A test component (`ApiTestComponent`) is available to test API functionality:

```typescript
import { ApiTestComponent } from "../components/ApiTestComponent";

function TestPage() {
  return (
    <div>
      <h1>API Testing</h1>
      <ApiTestComponent />
    </div>
  );
}
```

## Authentication Flow

1. **User clicks "Login with Google"**
2. **Google OAuth popup appears**
3. **User grants permissions**
4. **App receives access token from Google**
5. **Token is saved to localStorage via AuthService**
6. **User info is fetched from Google API**
7. **User is logged into the app**
8. **All subsequent API calls include the token**

## 401 Error Handling

When any API request returns a 401 Unauthorized response:

1. **AuthService.handleUnauthorized() is called**
2. **All authentication data is cleared**
3. **Custom 'auth:logout' event is dispatched**
4. **AuthContext updates the UI state**
5. **User is redirected to login page**

## Security Considerations

- Access tokens are stored in localStorage (consider moving to httpOnly cookies for production)
- Tokens are automatically included in all API requests
- Invalid/expired tokens trigger automatic logout
- Google OAuth provides secure authentication flow

## Environment Variables

Make sure to set your Google Client ID in your environment variables:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_BASE_URL=your_api_base_url_here
```

## File Structure

```
src/
├── features/auth/
│   └── components/
│       └── LoginPage.tsx          # Login UI with Google OAuth
├── shared/
│   ├── contexts/
│   │   └── AuthContext.tsx        # Authentication context
│   ├── services/
│   │   ├── authService.ts         # Token management
│   │   └── apiService.ts          # API calls with auth
│   ├── hooks/
│   │   └── useAuth.ts             # Auth context hook
│   └── components/
│       └── ApiTestComponent.tsx   # Testing component
```

## Best Practices

1. **Always check authentication state** before rendering protected content
2. **Use the provided API service** instead of raw fetch calls
3. **Handle loading states** during authentication
4. **Test 401 scenarios** to ensure proper logout behavior
5. **Keep tokens secure** and never log them
