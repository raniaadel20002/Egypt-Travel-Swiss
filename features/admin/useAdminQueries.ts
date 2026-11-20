import { useQuery } from "@tanstack/react-query";
import { getAdminReport } from "@/clientApi/adminApi";
import { ReportPeriod } from "@/models/report";

export const ADMIN_QUERY_KEYS = {
  all: ["admin"] as const,
  reports: ["admin", "reports"] as const,
  report: (period: ReportPeriod) => ["admin", "reports", period] as const,
};

export function useAdminReportQuery(period: ReportPeriod) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.report(period),
    queryFn: () => getAdminReport(period),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
