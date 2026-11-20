"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiCompass,
  FiHome,
  FiSend,
} from "react-icons/fi";
import { ReportData, ReportPeriod } from "@/models/report";

interface DashboardReportSummaryProps {
  report?: ReportData;
  activePeriod: ReportPeriod;
  isLoading: boolean;
}

const numberFormat = new Intl.NumberFormat("en-US");
const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function DashboardReportSummary({
  report,
  activePeriod,
  isLoading,
}: DashboardReportSummaryProps) {
  const periodLabel =
    activePeriod === "daily"
      ? "Daily Summary"
      : activePeriod === "monthly"
      ? "Monthly Summary"
      : "Yearly Summary";

  const totalBookings = report?.totalBookings ?? 0;
  const totalRevenue = report?.totalRevenue ?? 0;
  const avgBooking = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  const topTripName = report?.topTrips?.[0]?.tripTitle || "N/A";

  const rows = [
    {
      label: "Selected Period",
      value:
        activePeriod === "daily"
          ? "Today"
          : activePeriod === "monthly"
          ? "This Month"
          : "This Year",
    },
    {
      label: "Total Bookings",
      value: numberFormat.format(totalBookings),
    },
    {
      label: "Gross Revenue",
      value: currencyFormat.format(totalRevenue),
    },
    {
      label: "Average Order Value",
      value: currencyFormat.format(avgBooking),
    },
    {
      label: "Best Performing Tour",
      value: topTripName,
    },
  ];

  const quickLinks = [
    {
      label: "Tour Bookings",
      href: "/admin/bookings",
      icon: FiCalendar,
    },
    {
      label: "Hotel Bookings",
      href: "/admin/hotel-bookings",
      icon: FiHome,
    },
    {
      label: "Flight Bookings",
      href: "/admin/flight-bookings",
      icon: FiSend,
    },
    {
      label: "Manage Trips",
      href: "/admin/trips",
      icon: FiCompass,
    },
  ];

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] border border-[#013E51]/10 flex flex-col justify-between h-full">
      <div className="space-y-6">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#888888]">
              Executive Overview
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
        <div className="space-y-2.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between bg-[#FAF7F2]/60 px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-[#013E51]/5"
            >
              <span className="font-semibold text-[#888888]">{row.label}</span>
              <span className="font-bold text-[#013E51] truncate max-w-[180px] text-right">
                {isLoading ? "..." : row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Operational Links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-2.5">
            Quick Navigation
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-[#013E51]/10 bg-[#FAF7F2]/40 hover:bg-[#FAF7F2] text-xs font-bold text-[#013E51] transition"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Icon className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </span>
                  <FiArrowRight className="w-3 h-3 text-[#888888] shrink-0 ml-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
