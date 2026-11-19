"use client";

import { FiCalendar } from "react-icons/fi";
import { ReportData, ReportPeriod } from "@/models/report";

interface DashboardReportSummaryProps {
  report?: ReportData;
  activePeriod: ReportPeriod;
  isLoading: boolean;
}

const numberFormat = new Intl.NumberFormat("en-US");
const decimalFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export default function DashboardReportSummary({
  report,
  activePeriod,
  isLoading,
}: DashboardReportSummaryProps) {
  const periodLabel =
    activePeriod === "daily"
      ? "Daily Report"
      : activePeriod === "monthly"
      ? "Monthly Report"
      : "Yearly Report";

  const rows = [
    {
      label: "Total bookings",
      value: numberFormat.format(report?.totalBookings ?? 0),
    },
    {
      label: "Total revenue",
      value: decimalFormat.format(report?.totalRevenue ?? 0),
    },
    {
      label: "New customers",
      value: numberFormat.format(report?.newCustomers ?? 0),
    },
  ];

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] border border-[#013E51]/10 flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div>
            <p className="text-xs font-semibold text-[#888888]">
              Current report
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mt-0.5">
              {periodLabel}
            </h2>
          </div>
          <span className="w-10 h-10 rounded-xl bg-[#e8f5f9] text-[#013E51] flex items-center justify-center shrink-0">
            <FiCalendar className="w-5 h-5 text-[#013E51]" />
          </span>
        </div>

        {/* Breakdown List */}
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between bg-[#f7fbfd] px-4 py-3 rounded-lg text-sm border border-black/5"
            >
              <span className="text-sm font-semibold text-[#888888]">
                {row.label}
              </span>
              <span className="text-base font-bold text-[#013E51]">
                {isLoading ? "-" : row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
