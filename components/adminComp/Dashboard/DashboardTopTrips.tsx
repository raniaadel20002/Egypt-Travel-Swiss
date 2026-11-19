"use client";

import { FiAward, FiBarChart2, FiLoader } from "react-icons/fi";
import { TripReportItem, ReportPeriod } from "@/models/report";

interface DashboardTopTripsProps {
  topTrips?: TripReportItem[];
  activePeriod: ReportPeriod;
  isLoading: boolean;
}

export default function DashboardTopTrips({
  topTrips = [],
  activePeriod,
  isLoading,
}: DashboardTopTripsProps) {
  const maxBookings = Math.max(
    ...topTrips.map((t) => t.bookingCount).filter((c) => c > 0),
    1
  );

  const periodLabel =
    activePeriod === "daily"
      ? "Daily"
      : activePeriod === "monthly"
      ? "Monthly"
      : "Yearly";

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] border border-[#013E51]/10 flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div>
            <p className="text-xs font-semibold text-[#888888]">
              Top trips
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mt-0.5">
              Booking leaders
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e8f5f9] text-[#013E51] text-xs font-semibold">
            <FiAward className="w-3.5 h-3.5 text-[#013E51]" />
            <span>{periodLabel}</span>
          </span>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex h-56 items-center justify-center gap-3 text-sm font-semibold text-[#888888]">
            <FiLoader className="w-5 h-5 animate-spin text-[#013E51]" />
            <span>Loading report</span>
          </div>
        ) : topTrips.length > 0 ? (
          <div className="space-y-4">
            {topTrips.map((trip, idx) => {
              const title = trip.tripTitle?.trim() || "Excursion Tour";
              const percent = Math.min(
                100,
                Math.max(8, (trip.bookingCount / maxBookings) * 100)
              );

              return (
                <div
                  key={`${title}-${idx}`}
                  className="p-4 rounded-xl bg-[#FAF7F2]/60 border border-[#013E51]/5 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-bold text-[#013E51] truncate">
                      {idx + 1}. {title}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
                      {trip.bookingCount} {trip.bookingCount === 1 ? "booking" : "bookings"}
                    </span>
                  </div>

                  {/* Relative Performance Bar */}
                  <div className="w-full h-2 rounded-full bg-[#e8eef4] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#013E51] transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#fbfdff] p-6 text-center">
            <FiBarChart2 className="w-9 h-9 text-[#013E51]" strokeWidth={1.8} />
            <p className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#013E51] mt-3">
              No top trips yet
            </p>
            <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] max-w-[320px] mt-1.5 leading-relaxed">
              Top trips will appear after bookings are recorded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
