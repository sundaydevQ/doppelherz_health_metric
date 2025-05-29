// src/shared/components/ApiTestComponent.tsx
import React, { useState } from "react";
import Button from "./Button";
import {
  getUserProfile,
  updateUserProfile,
  getHealthMetrics,
} from "../services/apiService";

interface ApiTestComponentProps {
  className?: string;
}

export const ApiTestComponent: React.FC<ApiTestComponentProps> = ({
  className,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const testGetProfile = async () => {
    setLoading(true);
    setResult("Loading user profile...");

    const response = await getUserProfile();

    if (response.error) {
      setResult(
        `Error: ${response.error.message} (Status: ${response.error.status})`
      );
    } else {
      setResult(`Success: ${JSON.stringify(response.data, null, 2)}`);
    }
    setLoading(false);
  };

  const testUpdateProfile = async () => {
    setLoading(true);
    setResult("Updating user profile...");

    const response = await updateUserProfile({ name: "Updated Name" });

    if (response.error) {
      setResult(
        `Error: ${response.error.message} (Status: ${response.error.status})`
      );
    } else {
      setResult(`Success: ${JSON.stringify(response.data, null, 2)}`);
    }
    setLoading(false);
  };

  const testGetHealthMetrics = async () => {
    setLoading(true);
    setResult("Loading health metrics...");

    const response = await getHealthMetrics();

    if (response.error) {
      setResult(
        `Error: ${response.error.message} (Status: ${response.error.status})`
      );
    } else {
      setResult(`Success: ${JSON.stringify(response.data, null, 2)}`);
    }
    setLoading(false);
  };

  const testUnauthorized = async () => {
    setLoading(true);
    setResult("Testing unauthorized endpoint...");

    // This should trigger a 401 and automatic logout
    const response = await fetch("/api/unauthorized-endpoint", {
      headers: {
        Authorization: "Bearer invalid-token",
      },
    });

    if (response.status === 401) {
      setResult("401 Unauthorized - should have triggered logout");
    } else {
      setResult(`Unexpected response: ${response.status}`);
    }
    setLoading(false);
  };

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className || ""}`}>
      <h3 className="text-lg font-semibold mb-4">API Test Component</h3>
      <p className="text-sm text-gray-600 mb-4">
        Test the API service with authentication. Make sure you're logged in
        first.
      </p>

      <div className="space-y-3 mb-4">
        <Button
          onPress={testGetProfile}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Test Get Profile
        </Button>

        <Button
          onPress={testUpdateProfile}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          Test Update Profile
        </Button>

        <Button
          onPress={testGetHealthMetrics}
          disabled={loading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white"
        >
          Test Get Health Metrics
        </Button>

        <Button
          onPress={testUnauthorized}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Test 401 (Will Logout)
        </Button>
      </div>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded border">
          <h4 className="font-medium mb-2">Result:</h4>
          <pre className="text-xs overflow-auto whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTestComponent;
