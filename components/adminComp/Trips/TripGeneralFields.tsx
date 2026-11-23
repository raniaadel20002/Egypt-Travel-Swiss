"use client";

import { DestinationApiItem } from "@/models/destination";
import { TripTypeItem } from "@/models/tripType";
import { FaCar } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import {
  DurationTypeEnum,
  DURATION_TYPE_OPTIONS,
  TripCategoryEnum,
  TRIP_CATEGORY_OPTIONS,
  TRIP_DAYS_OF_WEEK,
} from "@/models/trip";

interface TripGeneralFieldsProps {
  destinationId: number;
  onDestinationChange: (val: number) => void;
  tripTypeId: number;
  onTripTypeChange: (val: number) => void;
  category: TripCategoryEnum;
  onCategoryChange: (val: TripCategoryEnum) => void;
  timeFrom: string;
  onTimeFromChange: (val: string) => void;
  durationValue: number;
  onDurationValueChange: (val: number) => void;
  durationType: DurationTypeEnum;
  onDurationTypeChange: (val: DurationTypeEnum) => void;
  adultPrice: number;
  onAdultPriceChange: (val: number) => void;
  childPrice: number;
  onChildPriceChange: (val: number) => void;
  infPrice: number;
  onInfPriceChange: (val: number) => void;
  availabilityDayNo: number[];
  onAvailabilityDayToggle: (dayNo: number) => void;
  onSelectAllDaysToggle: (selectAll: boolean) => void;
  destinations: DestinationApiItem[];
  tripTypes: TripTypeItem[];
  timeFromError?: string | null;
  daysError?: string | null;
}

export default function TripGeneralFields({
  destinationId,
  onDestinationChange,
  tripTypeId,
  onTripTypeChange,
  category,
  onCategoryChange,
  timeFrom,
  onTimeFromChange,
  durationValue,
  onDurationValueChange,
  durationType,
  onDurationTypeChange,
  adultPrice,
  onAdultPriceChange,
  childPrice,
  onChildPriceChange,
  infPrice,
  onInfPriceChange,
  availabilityDayNo,
  onAvailabilityDayToggle,
  onSelectAllDaysToggle,
  destinations,
  tripTypes,
  timeFromError,
  daysError,
}: TripGeneralFieldsProps) {
  const isAllDaysSelected =
    TRIP_DAYS_OF_WEEK.length > 0 &&
    TRIP_DAYS_OF_WEEK.every((d) => availabilityDayNo.includes(d.dayNo));

  return (
    <div className="space-y-4">
      {/* Destination & Trip Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Destination *
          </label>
          <select
            required
            value={destinationId || ""}
            onChange={(e) => onDestinationChange(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
          >
            <option value="" disabled>Select Destination</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Trip Type *
          </label>
          <select
            required
            value={tripTypeId || ""}
            onChange={(e) => onTripTypeChange(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
          >
            <option value="" disabled>Select Trip Type</option>
            {tripTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category & Time From */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TRIP_CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onCategoryChange(opt.value)}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition border cursor-pointer ${
                  category === opt.value
                    ? "bg-[#013E51] text-white border-[#013E51]"
                    : "bg-[#FAF7F2]/60 text-[#013E51] border-gray-200 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Time From <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            required
            value={timeFrom}
            onChange={(e) => onTimeFromChange(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 ${
              timeFromError
                ? "border-red-400 bg-red-50/50 focus:ring-red-200 focus:border-red-500"
                : "border-gray-200 bg-[#FAF7F2]/50 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            }`}
          />
          {timeFromError && (
            <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
              <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{timeFromError}</span>
            </p>
          )}
        </div>
      </div>

      {/* Duration Value & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Duration Value *
          </label>
          <input
            type="number"
            min="1"
            required
            value={durationValue || ""}
            onChange={(e) => onDurationValueChange(Number(e.target.value))}
            placeholder="e.g. 8 or 2"
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Duration Unit
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DURATION_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onDurationTypeChange(opt.value)}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition border cursor-pointer ${
                  durationType === opt.value
                    ? "bg-[#013E51] text-white border-[#013E51]"
                    : "bg-[#FAF7F2]/60 text-[#013E51] border-gray-200 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing (Adult, Child, Infant) */}
      {category === TripCategoryEnum.Private ? (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-[#013E51] space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <FaCar className="w-4 h-4 text-[#E8B34A]" />
            <span>Private Excursion Base Pricing (€0)</span>
          </div>
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            Base adult, child, and infant prices are automatically set to €0. The total booking price for private excursions is calculated from attached Services plus Private Vehicle Transfer pricing based on passenger count.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
              Adult (€) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={adultPrice}
              onChange={(e) => onAdultPriceChange(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-bold focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
              Child (€)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={childPrice}
              onChange={(e) => onChildPriceChange(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
              Infant (€)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={infPrice}
              onChange={(e) => onInfPriceChange(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>
        </div>
      )}

      {/* Available Days */}
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
    </div>
  );
}
