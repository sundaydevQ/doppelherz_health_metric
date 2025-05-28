// src/services/apiService.ts
import { authService } from "./authService";

interface ApiError {
  message: string;
  status?: number;
  response?: unknown;
}

interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; // Example: http://localhost:3001/api

/**
 * A generic function to make API requests with automatic token handling and 401 error handling.
 * @param endpoint The API endpoint to call (e.g., '/users')
 * @param method The HTTP method (e.g., 'GET', 'POST')
 * @param body The request body for POST/PUT requests
 * @param headers Custom headers
 * @returns A promise that resolves to an ApiResponse object
 */
export async function request<T = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: unknown,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };
  // Add authentication token if available
  const token = authService.getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        authService.handleUnauthorized();
        return {
          data: null,
          error: {
            message: "Unauthorized access. Please log in again.",
            status: response.status,
            response: "Unauthorized",
          },
        };
      }
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        // If response is not JSON, use text
        errorData = await response.text();
      }
      return {
        data: null,
        error: {
          message: `API Error: ${response.statusText} (Status: ${response.status})`,
          status: response.status,
          response: errorData,
        },
      };
    }

    // Handle cases where the response might be empty (e.g., 204 No Content)
    if (response.status === 204) {
      return { data: null, error: null };
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (networkError) {
    // Handle network errors or other issues with the fetch call itself
    console.error("Network or fetch error:", networkError);
    return {
      data: null,
      error: {
        message:
          networkError instanceof Error
            ? networkError.message
            : "An unexpected network error occurred.",
      },
    };
  }
}

// Example usage for a GET request:
export async function getSomeData(
  id: string
): Promise<ApiResponse<{ id: string; name: string; value: number }>> {
  return request<{ id: string; name: string; value: number }>(
    `/some-data/${id}`
  );
}

// Example usage for a POST request:
interface CreateDataPayload {
  name: string;
  value: number;
}
interface CreatedDataResponse {
  id: string;
  name: string;
  value: number;
  createdAt: string;
}
export async function createSomeData(
  payload: CreateDataPayload
): Promise<ApiResponse<CreatedDataResponse>> {
  return request<CreatedDataResponse>("/some-data", "POST", payload);
}

// Common API endpoints that might be used in the app
export async function getUserProfile(): Promise<
  ApiResponse<{ id: string; email: string; name: string; picture?: string }>
> {
  return request<{ id: string; email: string; name: string; picture?: string }>(
    "/user/profile"
  );
}

export async function updateUserProfile(profile: {
  name?: string;
  email?: string;
}): Promise<
  ApiResponse<{ id: string; email: string; name: string; picture?: string }>
> {
  return request<{ id: string; email: string; name: string; picture?: string }>(
    "/user/profile",
    "PUT",
    profile
  );
}

export async function addSurveyData(
  body?: unknown
): Promise<ApiResponse<unknown>> {
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
  return request<{ id: string; email: string; name: string; picture?: string }>(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Doppelherz Health Metric Application:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&alt=json`,
    "POST",
    {
      values: [
        [
          "Sample Name",
          new Date().toLocaleDateString(),
          "sample@email.com",
          "123-456-7890",
          "Computer Science",
        ],
      ],
    }
  );
}

// Health tracking related endpoints
export async function getHealthMetrics(): Promise<ApiResponse<unknown[]>> {
  return request<unknown[]>("/health/metrics");
}

export async function submitSurveyData(
  surveyData: unknown
): Promise<ApiResponse<{ id: string; submitted: boolean }>> {
  return request<{ id: string; submitted: boolean }>(
    "/survey",
    "POST",
    surveyData
  );
}
