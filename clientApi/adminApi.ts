import { apiClient } from "./apiConfig";
import {
  ApiResponse,
  AuthTokenData,
  LoginRequestDto,
  RefreshTokenRequestDto,
} from "@/models/admin";
import { ReportApiResponse, ReportPeriod } from "@/models/report";

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
): Promise<ApiResponse<AuthTokenData>> {
  const response = await apiClient.post<ApiResponse<AuthTokenData>>(
    "/api/Auth/refresh",
    payload
  );
  return response.data;
}

export async function getAdminReport(
  period: ReportPeriod
): Promise<ReportApiResponse> {
  const response = await apiClient.get<ReportApiResponse>(
    `/api/Reports/${period}`
  );
  return response.data;
}
