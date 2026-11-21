import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  AdminRecord,
  AdminsQueryParams,
  CreateAdminPayload,
  UpdateAdminPayload,
} from "@/models/admin";

export async function getAdmins(
  params?: AdminsQueryParams
): Promise<ApiResponse<AdminRecord[]>> {
  const response = await apiClient.get<ApiResponse<AdminRecord[]>>(
    "/api/Admins",
    { params }
  );
  return response.data;
}

export async function getAdminById(
  id: number | string
): Promise<ApiResponse<AdminRecord>> {
  const response = await apiClient.get<ApiResponse<AdminRecord>>(
    `/api/Admins/${id}`
  );
  return response.data;
}

export async function createAdmin(
  payload: CreateAdminPayload
): Promise<ApiResponse<string>> {
  const response = await apiClient.post<ApiResponse<string>>(
    "/api/Admins",
    payload
  );
  return response.data;
}

export async function updateAdmin(
  payload: UpdateAdminPayload
): Promise<ApiResponse<AdminRecord>> {
  const response = await apiClient.put<ApiResponse<AdminRecord>>(
    "/api/Admins",
    payload
  );
  return response.data;
}

export async function deleteAdmin(
  id: number | string
): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/Admins/${id}`
  );
  return response.data;
}
