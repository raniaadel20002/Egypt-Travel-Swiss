import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  AuthTokenData,
  LoginRequestDto,
  RefreshTokenRequestDto,
} from "@/models/auth";

export async function loginAdmin(
  payload: LoginRequestDto
): Promise<ApiResponse<AuthTokenData>> {
  const response = await apiClient.post<ApiResponse<AuthTokenData>>(
    "/api/Auth/login",
    payload
  );
  return response.data;
}

export async function forgotPasswordAdmin(
  email: string
): Promise<ApiResponse<null>> {
  const response = await apiClient.post<ApiResponse<null>>(
    "/api/Auth/forgot-password",
    { email }
  );
  return response.data;
}

export async function logoutAdmin(
  refreshToken: string
): Promise<ApiResponse<null>> {
  const response = await apiClient.post<ApiResponse<null>>(
    "/api/Auth/logout",
    JSON.stringify(refreshToken),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function refreshAdminToken(
  payload: RefreshTokenRequestDto
): Promise<string> {
  const response = await axios.post(
    `${API_BASE_URL}/api/Auth/refresh`,
    { refreshToken: payload.refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const raw = response.data;
  const data = (raw?.data || raw?.Data || raw) as Record<string, unknown>;

  const token = (data?.accesstoken ||
    data?.accessToken ||
    data?.AccessToken ||
    raw?.accesstoken ||
    raw?.accessToken) as string | undefined;

  if (!token) {
    throw new Error(raw?.Message || raw?.message || "Failed to refresh token.");
  }

  return token;
}

export interface AuthInterceptorOptions {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  onTokenRefreshed: (newToken: string) => void;
  onAuthFailed: () => void;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

export function attachAuthInterceptors(
  instance: AxiosInstance,
  options: AuthInterceptorOptions
): void {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = options.getAccessToken();
    if (token && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      const requestUrl = originalRequest?.url || "";
      const isAuthEndpoint =
        requestUrl.includes("/api/Auth/login") ||
        requestUrl.includes("/api/Auth/refresh") ||
        requestUrl.includes("/api/Auth/logout");

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isAuthEndpoint
      ) {
        const refreshToken = options.getRefreshToken();
        if (!refreshToken) {
          options.onAuthFailed();
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        // If the request was not yet sent with refreshToken, use refreshToken directly as access token
        const currentAuth = String(originalRequest.headers?.Authorization || "");
        if (refreshToken && !currentAuth.includes(refreshToken)) {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
          }
          options.onTokenRefreshed(refreshToken);
          return instance(originalRequest);
        }

        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return instance(originalRequest);
            })
            .catch((queuedErr) => {
              return Promise.reject(queuedErr);
            });
        }

        isRefreshing = true;

        try {
          const newAccessToken = await refreshAdminToken({ refreshToken });

          if (newAccessToken) {
            options.onTokenRefreshed(newAccessToken);
            processQueue(null, newAccessToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return instance(originalRequest);
          } else {
            options.onAuthFailed();
            processQueue(error, null);
            return Promise.reject(error);
          }
        } catch {
          // Both accessToken and refreshToken attempts failed
          options.onAuthFailed();
          processQueue(error, null);
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}
