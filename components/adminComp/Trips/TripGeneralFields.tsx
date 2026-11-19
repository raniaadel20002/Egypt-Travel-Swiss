"use client";

import { DestinationApiItem } from "@/models/destination";
import { TripTypeItem } from "@/models/tripType";
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
  destinations: DestinationApiItem[];
  tripTypes: TripTypeItem[];
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
  destinations,
  tripTypes,
}: TripGeneralFieldsProps) {
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
            <option value="" disabled>
              Select Destination
            </option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
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
            <option value="" disabled>
              Select Trip Type
            </option>
            {tripTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
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
            Start Time
          </label>
          <input
            type="time"
            value={timeFrom}
            onChange={(e) => onTimeFromChange(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
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

      {/* Available Days */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Available Days of Week
        </label>
        <div className="flex flex-wrap items-center gap-1.5">
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
      </div>
    </div>
  );
}
