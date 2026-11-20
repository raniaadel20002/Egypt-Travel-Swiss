"use client";

import { FiAward, FiBarChart2, FiLoader } from "react-icons/fi";
import { ReportPeriod, TripReportItem } from "@/models/report";

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
            <p className="text-xs font-bold uppercase tracking-wider text-[#888888]">
              Top Excursions
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mt-0.5">
              Booking Leaders
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e8f5f9] text-[#013E51] text-xs font-semibold">
            <FiAward className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>{periodLabel} Leaderboard</span>
          </span>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex h-56 items-center justify-center gap-3 text-sm font-semibold text-[#888888]">
            <FiLoader className="w-5 h-5 animate-spin text-[#013E51]" />
            <span>Loading top excursions...</span>
          </div>
        ) : topTrips.length > 0 ? (
          <div className="space-y-3.5">
            {topTrips.map((trip, idx) => {
              const title = trip.tripTitle?.trim() || "Excursion Tour";
              const percent = Math.min(
                100,
                Math.max(10, (trip.bookingCount / maxBookings) * 100)
              );

              return (
                <div
                  key={`${title}-${idx}`}
                  className="p-4 rounded-xl bg-[#FAF7F2]/60 border border-[#013E51]/10 space-y-2 hover:bg-[#FAF7F2] transition"
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-md bg-[#013E51] text-[#E8B34A] text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-[#013E51] truncate">
                        {title}
                      </span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#013E51] shrink-0 bg-white px-2.5 py-1 rounded-lg border border-[#013E51]/10">
                      {trip.bookingCount}{" "}
                      {trip.bookingCount === 1 ? "booking" : "bookings"}
                    </span>
                  </div>

                  {/* Relative Performance Bar */}
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
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
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#FAF7F2]/30 p-6 text-center">
            <FiBarChart2 className="w-9 h-9 text-[#013E51]/40" strokeWidth={1.8} />
            <p className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#013E51] mt-3">
              No Top Excursions Yet
            </p>
            <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] max-w-[320px] mt-1.5 leading-relaxed">
              Top excursions will appear automatically once bookings are registered in the selected period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
