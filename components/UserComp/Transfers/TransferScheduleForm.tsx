"use client";

import { FiCalendar, FiClock, FiMinus, FiPlus } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface TransferScheduleFormProps {
  tripDate: string;
  tripTime: string;
  returnDate: string;
  returnTime: string;
  isRoundTrip: boolean;
  additionalHours: number;
  onTripDateChange: (val: string) => void;
  onTripTimeChange: (val: string) => void;
  onReturnDateChange: (val: string) => void;
  onReturnTimeChange: (val: string) => void;
  onAdditionalHoursChange: (val: number) => void;
}

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function TransferScheduleForm({
  tripDate,
  tripTime,
  returnDate,
  returnTime,
  isRoundTrip,
  additionalHours,
  onTripDateChange,
  onTripTimeChange,
  onReturnDateChange,
  onReturnTimeChange,
  onAdditionalHoursChange,
}: TransferScheduleFormProps) {
  const { dictionary: dict } = useLocale();
  const t = dict.transfers.schedule;
  const tomorrowStr = getTomorrowDateString();

  const hoursText =
    additionalHours === 0
      ? t.noExtraHours
      : additionalHours === 1
      ? t.oneHour
      : t.hours.replace("{count}", String(additionalHours));

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10">
      {/* Step Header */}
      <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-gray-100">
        <span className="w-7 h-7 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center font-mono text-xs font-bold">
          3
        </span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {t.heading}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Departure Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.tripDate} <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                min={tomorrowStr}
                value={tripDate}
                onChange={(e) => onTripDateChange(e.target.value)}
                onClick={(e) => e.currentTarget.showPicker?.()}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
              />
              <FiCalendar className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.tripTime} <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                value={tripTime}
                onChange={(e) => onTripTimeChange(e.target.value)}
                onClick={(e) => e.currentTarget.showPicker?.()}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
              />
              <FiClock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Return Schedule (shown only if Round Trip) */}
        {isRoundTrip && (
          <div className="pt-4 border-t border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8B34A] block mb-3">
              {t.returnSection}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
                  {t.returnDate} <span className="text-[#E8B34A]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={tripDate || tomorrowStr}
                    value={returnDate}
                    onChange={(e) => onReturnDateChange(e.target.value)}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    required={isRoundTrip}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
                  />
                  <FiCalendar className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
                  {t.returnTime} <span className="text-[#E8B34A]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => onReturnTimeChange(e.target.value)}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    required={isRoundTrip}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
                  />
                  <FiClock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Waiting / Standby Hours Stepper (Only for Round Trip) */}
        {isRoundTrip && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
                  {t.additionalHours}
                </label>
                <p className="text-xs text-[#888888] mt-0.5">
                  {t.additionalHoursHelp}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onAdditionalHoursChange(Math.max(0, additionalHours - 1))}
                  disabled={additionalHours <= 0}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#FAF7F2] border border-gray-200 text-sm font-bold text-[#013E51] disabled:opacity-40 cursor-pointer hover:bg-gray-100 transition"
                >
                  <FiMinus className="w-3.5 h-3.5" />
                </button>
                <span className="min-w-28 text-center text-xs sm:text-sm font-bold text-[#013E51] px-2 py-1.5 rounded-lg bg-[#FAF7F2]">
                  {hoursText}
                </span>
                <button
                  type="button"
                  onClick={() => onAdditionalHoursChange(Math.min(12, additionalHours + 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#FAF7F2] border border-gray-200 text-sm font-bold text-[#013E51] cursor-pointer hover:bg-gray-100 transition"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
