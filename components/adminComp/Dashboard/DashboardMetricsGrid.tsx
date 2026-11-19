"use client";

import { FiFileText, FiTrendingUp, FiUsers } from "react-icons/fi";
import { ReportData } from "@/models/report";

interface DashboardMetricsGridProps {
  report?: ReportData;
  isLoading: boolean;
}

const numberFormat = new Intl.NumberFormat("en-US");
const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function DashboardMetricsGrid({
  report,
  isLoading,
}: DashboardMetricsGridProps) {
  const metrics = [
    {
      label: "Total bookings",
      value: numberFormat.format(report?.totalBookings ?? 0),
      icon: FiFileText,
      iconColor: "text-[#013E51]",
      iconBg: "bg-[#e8f5f9]",
    },
    {
      label: "Total revenue",
      value: currencyFormat.format(report?.totalRevenue ?? 0),
      icon: FiTrendingUp,
      iconColor: "text-[#1f8f45]",
      iconBg: "bg-[#eff8ee]",
    },
    {
      label: "New customers",
      value: numberFormat.format(report?.newCustomers ?? 0),
      icon: FiUsers,
      iconColor: "text-[#a86300]",
      iconBg: "bg-[#fff4e4]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="bg-white rounded-[20px] p-5 sm:p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#888888]">
                  {metric.label}
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51] mt-3">
                  {isLoading ? "..." : metric.value}
                </p>
              </div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${metric.iconBg}`}
              >
                <Icon className={`w-5 h-5 ${metric.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
