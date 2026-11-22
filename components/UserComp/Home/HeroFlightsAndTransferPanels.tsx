"use client";

import React from "react";
import { FiCalendar, FiChevronDown, FiMapPin, FiUsers } from "react-icons/fi";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import { TransferLocationItem } from "@/models/transferLocation";

interface HeroFlightsFieldsProps {
  from: string;
  onFromChange: (val: string) => void;
  to: string;
  onToChange: (val: string) => void;
  depDate: string;
  onDepDateChange: (val: string) => void;
  pax: string;
  onPaxChange: (val: string) => void;
  t: any;
}

export function HeroFlightsFields({
  from,
  onFromChange,
  to,
  onToChange,
  depDate,
  onDepDateChange,
  pax,
  onPaxChange,
  t,
}: HeroFlightsFieldsProps) {
  return (
    <>
      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.fromLabel}
        </label>
        <div className="relative flex items-center">
          <MdFlightTakeoff className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="text"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            placeholder={t.fromPlaceholder}
            className="w-full h-[52px] pl-9 pr-3 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:border-[#013E51]"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.toLabel}
        </label>
        <div className="relative flex items-center">
          <MdFlightLand className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="text"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            placeholder={t.toPlaceholder}
            className="w-full h-[52px] pl-9 pr-3 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:border-[#013E51]"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.departureDateLabel}
        </label>
        <div className="relative flex items-center">
          <FiCalendar className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="date"
            value={depDate}
            onChange={(e) => onDepDateChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-3 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.passengersLabel}
        </label>
        <div className="relative flex items-center">
          <FiUsers className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={pax}
            onChange={(e) => onPaxChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <option key={num} value={String(num)}>
                {num} {num === 1 ? (t.onePassenger || "1 Passenger").replace(/^\d+\s*/, "") : (t.threePassengers || "Passengers").replace(/^\d+\s*/, "")}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>
    </>
  );
}

interface HeroTransferFieldsProps {
  fromId: string;
  onFromChange: (val: string) => void;
  toId: string;
  onToChange: (val: string) => void;
  date: string;
  onDateChange: (val: string) => void;
  adults: string;
  onAdultsChange: (val: string) => void;
  fromLocations: TransferLocationItem[];
  toLocations: TransferLocationItem[];
  t: any;
}

export function HeroTransferFields({
  fromId,
  onFromChange,
  toId,
  onToChange,
  date,
  onDateChange,
  adults,
  onAdultsChange,
  fromLocations,
  toLocations,
  t,
}: HeroTransferFieldsProps) {
  return (
    <>
      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.fromLabel}
        </label>
        <div className="relative flex items-center">
          <FiMapPin className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={fromId}
            onChange={(e) => onFromChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="">{t.selectFrom}</option>
            {fromLocations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.toLabel}
        </label>
        <div className="relative flex items-center">
          <FiMapPin className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={toId}
            onChange={(e) => onToChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="">{t.selectTo}</option>
            {toLocations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.dateLabel}
        </label>
        <div className="relative flex items-center">
          <FiCalendar className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-3 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">
          {t.passengersLabel}
        </label>
        <div className="relative flex items-center">
          <FiUsers className="absolute left-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={adults}
            onChange={(e) => onAdultsChange(e.target.value)}
            className="w-full h-[52px] pl-9 pr-8 rounded-xl border border-[#888888]/30 bg-white text-xs sm:text-sm font-semibold text-[#013E51] appearance-none focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 25, 30].map((num) => (
              <option key={num} value={String(num)}>
                {num} {num === 1 ? (t.passengerSingular || "Passenger") : (t.passengersPlural || "Passengers")}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>
      </div>
    </>
  );
}
