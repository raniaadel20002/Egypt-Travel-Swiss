"use client";

import { FiAward, FiCreditCard, FiFileText, FiTrendingUp } from "react-icons/fi";
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
  const totalBookings = report?.totalBookings ?? 0;
  const totalRevenue = report?.totalRevenue ?? 0;
  const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  const topTripsCount = report?.topTrips?.length ?? 0;
  const firstTopTripTitle = report?.topTrips?.[0]?.tripTitle || "None";

  const metrics = [
    {
      label: "Total Bookings",
      value: numberFormat.format(totalBookings),
      subtext: "Confirmed reservations in period",
      icon: FiFileText,
      iconColor: "text-[#013E51]",
      iconBg: "bg-[#e8f5f9]",
    },
    {
      label: "Total Revenue",
      value: currencyFormat.format(totalRevenue),
      subtext: "Gross revenue generated",
      icon: FiTrendingUp,
      iconColor: "text-emerald-700",
      iconBg: "bg-emerald-50",
    },
    {
      label: "Avg. Booking Value",
      value: currencyFormat.format(avgBookingValue),
      subtext: "Revenue per reservation",
      icon: FiCreditCard,
      iconColor: "text-amber-700",
      iconBg: "bg-amber-50",
    },
    {
      label: "Top Performer",
      value: topTripsCount > 0 ? firstTopTripTitle : "No data",
      subtext:
        topTripsCount > 0
          ? `${report?.topTrips?.[0]?.bookingCount ?? 0} bookings recorded`
          : "Ranked by booking volume",
      icon: FiAward,
      iconColor: "text-indigo-700",
      iconBg: "bg-indigo-50",
      isTruncated: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="bg-white rounded-[20px] p-5 sm:p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#888888]">
                  {metric.label}
                </p>
                <p
                  title={metric.value}
                  className={`font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mt-2.5 ${
                    metric.isTruncated ? "truncate" : ""
                  }`}
                >
                  {isLoading ? "..." : metric.value}
                </p>
                <p className="text-[11px] text-[#888888] mt-1 truncate">
                  {metric.subtext}
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
