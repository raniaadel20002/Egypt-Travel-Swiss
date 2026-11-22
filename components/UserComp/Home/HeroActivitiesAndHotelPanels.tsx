"use client";

import React from "react";
import { FiCalendar, FiChevronDown, FiMapPin, FiSearch, FiTag, FiUsers } from "react-icons/fi";
import { DestinationApiItem } from "@/models/destination";
import { TripTypeItem } from "@/models/tripType";

interface HeroActivitiesFieldsProps {
  destId?: number;
  onDestChange: (val?: number) => void;
  typeId?: number;
  onTypeChange: (val?: number) => void;
  cat?: number;
  onCatChange: (val?: number) => void;
  keyword: string;
  onKeywordChange: (val: string) => void;
  destinations: DestinationApiItem[];
  tripTypes: TripTypeItem[];
  t: any;
}

export function HeroActivitiesFields({
  destId,
  onDestChange,
  typeId,
  onTypeChange,
  cat,
  onCatChange,
  keyword,
  onKeywordChange,
  destinations,
  tripTypes,
  t,
}: HeroActivitiesFieldsProps) {
  return (
    <>
      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.destinationLabel}
        </label>
        <div className="relative flex items-center">
          <FiMapPin className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={destId !== undefined ? String(destId) : ""}
            onChange={(e) => onDestChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="">{t.allDestinations}</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.tripTypeLabel}
        </label>
        <div className="relative flex items-center">
          <FiTag className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={typeId !== undefined ? String(typeId) : ""}
            onChange={(e) => onTypeChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="">{t.allTripTypes}</option>
            {tripTypes.map((tt) => (
              <option key={tt.id} value={tt.id}>
                {tt.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.categoryLabel}
        </label>
        <div className="relative flex items-center">
          <FiTag className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={cat !== undefined ? String(cat) : ""}
            onChange={(e) => onCatChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="">{t.allCategories}</option>
            <option value="1">{t.categories.adventure}</option>
            <option value="2">{t.categories.cultural}</option>
            <option value="3">{t.categories.relaxation}</option>
            <option value="4">{t.categories.family}</option>
            <option value="5">{t.categories.romantic}</option>
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.searchLabel}
        </label>
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full h-[52px] pl-9 pr-3 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:border-[#013E51]"
          />
        </div>
      </div>
    </>
  );
}

interface HeroAccommodationFieldsProps {
  query: string;
  onQueryChange: (val: string) => void;
  rate?: number;
  onRateChange: (val?: number) => void;
  checkIn: string;
  onCheckInChange: (val: string) => void;
  guests: string;
  onGuestsChange: (val: string) => void;
  t: any;
}

export function HeroAccommodationFields({
  query,
  onQueryChange,
  rate,
  onRateChange,
  checkIn,
  onCheckInChange,
  guests,
  onGuestsChange,
  t,
}: HeroAccommodationFieldsProps) {
  return (
    <>
      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.destinationLabel}
        </label>
        <div className="relative flex items-center">
          <FiMapPin className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t.destinationPlaceholder}
            className="w-full h-[52px] pl-9 pr-3 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:border-[#013E51]"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.rateLabel}
        </label>
        <div className="relative flex items-center">
          <FiTag className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={rate !== undefined ? String(rate) : ""}
            onChange={(e) => onRateChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="">{t.allRates}</option>
            <option value="5">{t.fiveStars}</option>
            <option value="4">{t.fourStars}</option>
            <option value="3">{t.threeStars}</option>
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.checkInLabel}
        </label>
        <div className="relative flex items-center">
          <FiCalendar className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-3 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.guestsLabel}
        </label>
        <div className="relative flex items-center">
          <FiUsers className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={guests}
            onChange={(e) => onGuestsChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="1">{t.oneGuest}</option>
            <option value="2">{t.twoGuests}</option>
            <option value="4">{t.familyGuests}</option>
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>
    </>
  );
}
