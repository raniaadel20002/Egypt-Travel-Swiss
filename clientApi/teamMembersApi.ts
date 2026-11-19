import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CreateTeamMemberPayload,
  TeamMemberApiItem,
  TeamMembersQueryParams,
  UpdateTeamMemberPayload,
} from "@/models/teamMember";

export async function getTeamMembers(
  params?: TeamMembersQueryParams
): Promise<TeamMemberApiItem[]> {
  const queryParams: Record<string, number> = {};

  if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
  if (params?.PageSize) queryParams.PageSize = params.PageSize;

  const response = await apiClient.get<ApiResponse<TeamMemberApiItem[]>>(
    "/api/team-members",
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
    }
  );

  return response.data?.data || [];
}

export async function getTeamMemberById(
  id: string
): Promise<TeamMemberApiItem> {
  const response = await apiClient.get<ApiResponse<TeamMemberApiItem>>(
    `/api/team-members/${id}`
  );

  return response.data?.data;
}

export async function createTeamMember(
  payload: CreateTeamMemberPayload
): Promise<TeamMemberApiItem> {
  const formData = new FormData();
  formData.append("Name", payload.name.trim());
  formData.append("JobTitle", payload.jobTitle.trim());
  formData.append("Image", payload.imageFile);

  const response = await apiClient.post<ApiResponse<TeamMemberApiItem>>(
    "/api/team-members",
    formData
  );

  return response.data?.data;
}

export async function updateTeamMember(
  payload: UpdateTeamMemberPayload
): Promise<TeamMemberApiItem> {
  const formData = new FormData();
  formData.append("Name", payload.name.trim());
  formData.append("JobTitle", payload.jobTitle.trim());
  if (payload.imageFile) {
    formData.append("Image", payload.imageFile);
  }

  const response = await apiClient.put<ApiResponse<TeamMemberApiItem>>(
    `/api/team-members/${payload.id}`,
    formData
  );

  return response.data?.data;
}

export async function deleteTeamMember(id: string): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/team-members/${id}`);
}
