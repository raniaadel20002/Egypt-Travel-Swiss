"use client";

import { FiAlertCircle } from "react-icons/fi";
import { TRIP_DAYS_OF_WEEK } from "@/models/trip";

interface TripAvailableDaysSelectorProps {
  availabilityDayNo: number[];
  onAvailabilityDayToggle: (dayNo: number) => void;
  onSelectAllDaysToggle: (selectAll: boolean) => void;
  daysError?: string | null;
}

export default function TripAvailableDaysSelector({
  availabilityDayNo,
  onAvailabilityDayToggle,
  onSelectAllDaysToggle,
  daysError,
}: TripAvailableDaysSelectorProps) {
  const isAllDaysSelected =
    TRIP_DAYS_OF_WEEK.length > 0 &&
    TRIP_DAYS_OF_WEEK.every((d) => availabilityDayNo.includes(d.dayNo));

  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Available Days of Week <span className="text-red-500">*</span>
        </label>
        <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-xs font-semibold text-[#013E51] hover:text-[#025670] transition">
          <input
            type="checkbox"
            checked={isAllDaysSelected}
            onChange={(e) => onSelectAllDaysToggle(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-[#013E51] focus:ring-[#013E51] cursor-pointer"
          />
          <span>Select All Days</span>
        </label>
      </div>
      <div
        className={`flex flex-wrap items-center gap-1.5 p-2 rounded-xl transition-colors ${
          daysError ? "border border-red-300 bg-red-50/40" : ""
        }`}
      >
        {TRIP_DAYS_OF_WEEK.map((d) => {
          const isSelected = availabilityDayNo.includes(d.dayNo);
          return (
            <button
              key={d.dayNo}
              type="button"
              onClick={() => onAvailabilityDayToggle(d.dayNo)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer border ${
                isSelected
                  ? "bg-[#013E51] text-white border-[#013E51]"
                  : "bg-[#FAF7F2] text-[#013E51]/70 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {d.short}
            </button>
          );
        })}
      </div>
      {daysError && (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
          <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{daysError}</span>
        </p>
      )}
    </div>
  );
}
