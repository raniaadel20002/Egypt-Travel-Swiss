"use client";

import { FiCalendar, FiClock } from "react-icons/fi";

interface TransferScheduleFormProps {
  tripDate: string;
  tripTime: string;
  returnDate: string;
  returnTime: string;
  isRoundTrip: boolean;
  onTripDateChange: (val: string) => void;
  onTripTimeChange: (val: string) => void;
  onReturnDateChange: (val: string) => void;
  onReturnTimeChange: (val: string) => void;
}

export default function TransferScheduleForm({
  tripDate,
  tripTime,
  returnDate,
  returnTime,
  isRoundTrip,
  onTripDateChange,
  onTripTimeChange,
  onReturnDateChange,
  onReturnTimeChange,
}: TransferScheduleFormProps) {
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10">
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] pb-4 mb-6 border-b border-gray-100">
        Trip Schedule
      </h2>

      <div className="space-y-5">
        {/* Departure Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Trip Date <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                min={todayStr}
                value={tripDate}
                onChange={(e) => onTripDateChange(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiCalendar className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Trip Time <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                value={tripTime}
                onChange={(e) => onTripTimeChange(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiClock className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Return Schedule (shown only if Round Trip) */}
        {isRoundTrip && (
          <div className="pt-4 border-t border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8B34A] block mb-3">
              Return Journey Schedule
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
                  Return Date <span className="text-[#E8B34A]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={tripDate || todayStr}
                    value={returnDate}
                    onChange={(e) => onReturnDateChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                  />
                  <FiCalendar className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
                  Return Time <span className="text-[#E8B34A]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => onReturnTimeChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                  />
                  <FiClock className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
