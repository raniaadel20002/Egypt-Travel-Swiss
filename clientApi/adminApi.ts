import { apiClient } from "./apiConfig";
import { ReportApiResponse, ReportPeriod } from "@/models/report";

export * from "./authApi";
export * from "./adminsApi";

export async function getAdminReport(
  period: ReportPeriod
): Promise<ReportApiResponse> {
  const response = await apiClient.get<ReportApiResponse>(
    `/api/Reports/${period}`
  );
  return response.data;
}
