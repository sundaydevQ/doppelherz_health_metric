// src/services/apiService.ts

interface ApiError {
  message: string;
  status?: number;
  response?: any;
}

interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"; // Example: http://localhost:3001/api

/**
 * A generic function to make API requests.
 * @param endpoint The API endpoint to call (e.g., '/users')
 * @param method The HTTP method (e.g., 'GET', 'POST')
 * @param body The request body for POST/PUT requests
 * @param headers Custom headers
 * @returns A promise that resolves to an ApiResponse object
 */
export async function request<T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  // If you have an auth token, you would add it here:
  // const token = localStorage.getItem('authToken');
  // if (token) {
  //   headers['Authorization'] = `Bearer ${token}`;
  // }

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
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
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
