import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { apiClient, API_BASE_URL } from "./apiConfig";
import { isJwtExpired } from "@/shared/utils/jwt";
import { ApiResponse } from "@/models/api";
import {
  AuthTokenData,
  ForgotPasswordRequestDto,
  LoginRequestDto,
  RefreshTokenRequestDto,
  ResetPasswordRequestDto,
  UpdatePasswordRequestDto,
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
  const payload: ForgotPasswordRequestDto = { email };
  const response = await apiClient.post<ApiResponse<null>>(
    "/api/Auth/forgot-password",
    payload
  );
  return response.data;
}

export async function resetPasswordAdmin(
  payload: ResetPasswordRequestDto
): Promise<ApiResponse<null>> {
  const response = await apiClient.post<ApiResponse<null>>(
    "/api/Auth/reset-password",
    payload
  );
  return response.data;
}

export async function updateAdminPassword(
  adminId: number | string,
  payload: UpdatePasswordRequestDto
): Promise<ApiResponse<string>> {
  const response = await apiClient.put<ApiResponse<string>>(
    `/api/Auth/updatepassword/${adminId}`,
    payload
  );
  return response.data;
}

export async function logoutAdmin(
  refreshToken: string
): Promise<{ message?: string }> {
  const response = await apiClient.post<{ message?: string }>(
    "/api/Auth/logout",
    { refreshToken },
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
  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const isAuthEndpoint =
      config.url?.includes("/api/Auth/login") ||
      config.url?.includes("/api/Auth/refresh") ||
      config.url?.includes("/api/Auth/logout") ||
      config.url?.includes("/api/Auth/forgot-password") ||
      config.url?.includes("/api/Auth/reset-password");

    if (isAuthEndpoint) {
      return config;
    }

    const isAdminRoute =
      typeof window !== "undefined"
        ? window.location.pathname.startsWith("/admin")
        : false;

    // Do not attach admin tokens or block public client requests
    if (typeof window !== "undefined" && !isAdminRoute && !config.headers?.Authorization) {
      return config;
    }

    let token = options.getAccessToken();
    const refreshToken = options.getRefreshToken();

    // Check if access token is expired before sending to avoid CORS 401 network errors
    if (token && isJwtExpired(token)) {
      if (refreshToken && !isJwtExpired(refreshToken)) {
        try {
          const newToken = await refreshAdminToken({ refreshToken });
          if (newToken) {
            options.onTokenRefreshed(newToken);
            token = newToken;
          } else {
            options.onAuthFailed();
            return Promise.reject(new AxiosError("Session expired", "ERR_UNAUTHORIZED", config));
          }
        } catch {
          options.onAuthFailed();
          return Promise.reject(new AxiosError("Session expired", "ERR_UNAUTHORIZED", config));
        }
      } else {
        options.onAuthFailed();
        return Promise.reject(new AxiosError("Session expired", "ERR_UNAUTHORIZED", config));
      }
    }

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
        requestUrl.includes("/api/Auth/logout") ||
        requestUrl.includes("/api/Auth/forgot-password") ||
        requestUrl.includes("/api/Auth/reset-password");

      const isAdminRoute =
        typeof window !== "undefined"
          ? window.location.pathname.startsWith("/admin")
          : false;

      const hasAuthHeader = Boolean(
        originalRequest?.headers?.Authorization ||
        originalRequest?.headers?.authorization
      );

      // Never attempt admin auth refresh or trigger auth failure for public client requests
      if (!isAdminRoute && !hasAuthHeader) {
        return Promise.reject(error);
      }

      const is401 = error.response?.status === 401;
      const isCorsAuthNetworkError =
        !error.response &&
        error.message === "Network Error" &&
        (hasAuthHeader || isAdminRoute);

      if (
        (is401 || isCorsAuthNetworkError) &&
        originalRequest &&
        !originalRequest._retry &&
        !isAuthEndpoint
      ) {
        const refreshToken = options.getRefreshToken();
        if (!refreshToken || isJwtExpired(refreshToken)) {
          options.onAuthFailed();
          return Promise.reject(error);
        }

        originalRequest._retry = true;

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
