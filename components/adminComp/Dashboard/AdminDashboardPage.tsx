"use client";

import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useAdminReportQuery } from "@/features/admin/useAdminQueries";
import { ReportPeriod } from "@/models/report";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import DashboardMetricsGrid from "./DashboardMetricsGrid";
import DashboardTopTrips from "./DashboardTopTrips";
import DashboardReportSummary from "./DashboardReportSummary";

const reportPeriods: Array<{ label: string; value: ReportPeriod }> = [
  { label: "Daily", value: "daily" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export default function AdminDashboardPage() {
  const [activePeriod, setActivePeriod] = useState<ReportPeriod>("daily");

  const reportQuery = useAdminReportQuery(activePeriod);
  const report = reportQuery.data?.data;

  return (
    <AdminShell
      eyebrow="Admin Dashboard"
      title="Dashboard"
      subtitle="Track booking activity, revenue, customers, and the trips that are getting the most attention."
      action={
        <div className="flex items-center gap-2.5">
          <div className="inline-flex rounded-xl p-1 bg-white border border-[#013E51]/10 shadow-xs">
            {reportPeriods.map((period) => {
              const isActive = activePeriod === period.value;
              return (
                <button
                  key={period.value}
                  type="button"
                  onClick={() => setActivePeriod(period.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#013E51] text-white shadow-xs"
                      : "text-[#013E51]/70 hover:bg-[#FAF7F2] hover:text-[#013E51]"
                  }`}
                >
                  {period.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => reportQuery.refetch()}
            disabled={reportQuery.isFetching}
            aria-label="Refresh report"
            className="w-10 h-10 rounded-xl bg-white border border-[#013E51]/10 flex items-center justify-center text-[#013E51] hover:bg-[#FAF7F2] shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <FiRefreshCw
              className={`w-4 h-4 ${
                reportQuery.isFetching ? "animate-spin text-[#E8B34A]" : ""
              }`}
            />
          </button>
        </div>
      }
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Error Banner if API fails */}
        {reportQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {reportQuery.error instanceof Error
              ? reportQuery.error.message
              : "Unable to load report from Touristy reporting service."}
          </div>
        )}

        {/* 1. Statistics Cards */}
        <DashboardMetricsGrid
          report={report}
          isLoading={reportQuery.isLoading}
        />

        {/* 2. Bottom Grid: Top Trips & Current Report */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <DashboardTopTrips
              topTrips={report?.topTrips}
              activePeriod={activePeriod}
              isLoading={reportQuery.isLoading}
            />
          </div>

          <div className="lg:col-span-5">
            <DashboardReportSummary
              report={report}
              activePeriod={activePeriod}
              isLoading={reportQuery.isLoading}
            />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
