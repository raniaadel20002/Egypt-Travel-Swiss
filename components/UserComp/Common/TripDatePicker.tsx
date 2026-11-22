"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  isDateAvailableForTrip,
  getAvailableDaysText,
  getDayNameForDate,
  getNextAvailableDate,
} from "@/shared/utils/tripAvailability";

interface TripDatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (date: string) => void;
  availableDays?: (string | number)[] | null;
  minDate?: string;
  className?: string;
  placeholder?: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatIso(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export default function TripDatePicker({
  value,
  onChange,
  availableDays,
  minDate,
  className = "",
  placeholder = "Select operating date",
}: TripDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const todayIso = useMemo(() => new Date().toISOString().split("T")[0], []);
  const effectiveMinIso = minDate || todayIso;

  // Initial view year and month based on selected value or today
  const [viewDate, setViewDate] = useState(() => {
    if (value && value.includes("-")) {
      const [y, m] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date();
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // If initial value is invalid for operating days, auto-snap to next valid date
  useEffect(() => {
    if (value && !isDateAvailableForTrip(value, availableDays)) {
      const nextValid = getNextAvailableDate(new Date(), availableDays);
      onChange(nextValid);
    }
  }, [value, availableDays, onChange]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Calendar calculations
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const selectedIso = formatIso(viewYear, viewMonth, day);
    if (!isDateAvailableForTrip(selectedIso, availableDays)) return;
    if (selectedIso < effectiveMinIso) return;
    onChange(selectedIso);
    setIsOpen(false);
  };

  const availableDaysText = getAvailableDaysText(availableDays);
  const selectedDayName = getDayNameForDate(value);

  // Determine if previous month is before minimum date
  const isPrevMonthDisabled = useMemo(() => {
    const currentViewStart = formatIso(viewYear, viewMonth, 1);
    const minStart = effectiveMinIso.slice(0, 7) + "-01";
    return currentViewStart <= minStart;
  }, [viewYear, viewMonth, effectiveMinIso]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Date Input Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] hover:bg-white text-sm text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] focus:border-[#E8B34A] transition-all flex items-center justify-between text-left cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          <FiCalendar className="w-4 h-4 text-[#E8B34A] shrink-0" />
          {value ? (
            <span className="font-semibold">
              {value} {selectedDayName ? `(${selectedDayName})` : ""}
            </span>
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </span>
        <span className="text-[11px] font-bold text-[#E8B34A] bg-[#E8B34A]/10 px-2 py-0.5 rounded-md shrink-0">
          {availableDaysText === "Daily" ? "Daily" : availableDaysText}
        </span>
      </button>

      {/* Calendar Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[290px] sm:min-w-[320px] bg-white rounded-2xl p-4 shadow-[0px_16px_40px_0px_#013E5124] border border-[#E8B34A]/35 space-y-3 font-[family-name:var(--font-lato)]">
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <button
              type="button"
              disabled={isPrevMonthDisabled}
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-1.5 rounded-lg text-[#013E51] hover:bg-slate-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-bold text-sm text-[#013E51]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1.5 rounded-lg text-[#013E51] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAY_NAMES.map((wd) => (
              <span
                key={wd}
                className="text-[11px] font-bold text-slate-400 uppercase py-0.5"
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank leading slots */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="h-8 w-8" />
            ))}

            {/* Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const iso = formatIso(viewYear, viewMonth, day);
              const isPast = iso < effectiveMinIso;
              const isOperating = isDateAvailableForTrip(iso, availableDays);
              const isSelectable = !isPast && isOperating;
              const isSelected = iso === value;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!isSelectable}
                  onClick={() => handleSelectDay(day)}
                  title={
                    !isOperating
                      ? `Not operating on ${getDayNameForDate(iso)}`
                      : isPast
                      ? "Past date"
                      : `Select ${iso}`
                  }
                  className={`h-8 w-8 mx-auto text-xs font-semibold rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#013E51] text-[#E8B34A] font-bold shadow-xs scale-105"
                      : isSelectable
                      ? "text-[#013E51] hover:bg-[#E8B34A]/20 cursor-pointer"
                      : "text-slate-300 cursor-not-allowed opacity-35 bg-transparent"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer Schedule Note */}
          <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Operating schedule:</span>
            <span className="font-bold text-[#013E51]">
              {availableDaysText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
