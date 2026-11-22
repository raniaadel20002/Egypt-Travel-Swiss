
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiMapPin,
  FiCalendar,
  FiUser,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

const FROM_AIRPORTS = [
  "Zurich (ZRH)",
  "Geneva (GVA)",
  "Frankfurt (FRA)",
  "Munich (MUC)",
  "Berlin (BER)",
  "Vienna (VIE)",
  "London (LHR)",
];

const TO_AIRPORTS = [
  "Egypt (HRG)",
  "Cairo (CAI)",
  "Marsa Alam (RMF)",
  "Luxor (LXR)",
  "Sharm El Sheikh (SSH)",
];

const PASSENGER_OPTIONS = [
  "1 Passenger",
  "2 Passengers",
  "3 Passengers",
  "4 Passengers",
  "5+ Passengers",
];

export default function FlightSearchForm() {
  const { locale } = useLocale();

  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const [departureFocused, setDepartureFocused] = useState(false);
  const [returnFocused, setReturnFocused] = useState(false);

  const departureRef = useRef<HTMLInputElement>(null);
  const returnRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(140px,1.15fr)_minmax(140px,1.15fr)_minmax(120px,0.95fr)_minmax(120px,0.95fr)_minmax(130px,1fr)_auto] gap-2.5 sm:gap-3 xl:gap-2.5 2xl:gap-3 items-end"
    >
      {/* From Airport */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5 truncate">
          From
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#013E51] text-base pointer-events-none" />
          <select
            value={fromAirport}
            onChange={(e) => setFromAirport(e.target.value)}
            className={`w-full h-[50px] appearance-none bg-white rounded-2xl pl-8.5 pr-7 py-3 font-[family-name:var(--font-lato)] text-xs xl:text-[13px] 2xl:text-sm font-semibold shadow-xs border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer truncate ${
              fromAirport ? "text-[#013E51]" : "text-gray-400"
            }`}
          >
            <option value="" disabled>
              Departure
            </option>
            {FROM_AIRPORTS.map((airport) => (
              <option key={airport} value={airport} className="text-[#013E51]">
                {airport}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#013E51] text-sm pointer-events-none" />
        </div>
      </div>

      {/* To Airport */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5 truncate">
          To
        </label>
        <div className="relative">
          <Image
            src="/home/FlightBookingInquiry/title-plane-icon.svg"
            alt=""
            width={16}
            height={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 object-contain pointer-events-none"
          />
          <select
            value={toAirport}
            onChange={(e) => setToAirport(e.target.value)}
            className={`w-full h-[50px] appearance-none bg-white rounded-2xl pl-8.5 pr-7 py-3 font-[family-name:var(--font-lato)] text-xs xl:text-[13px] 2xl:text-sm font-semibold shadow-xs border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer truncate ${
              toAirport ? "text-[#013E51]" : "text-gray-400"
            }`}
          >
            <option value="" disabled>
             Destination
            </option>
            {TO_AIRPORTS.map((airport) => (
              <option key={airport} value={airport} className="text-[#013E51]">
                {airport}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#013E51] text-sm pointer-events-none" />
        </div>
      </div>

      {/* Departure Date */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5 truncate">
          Departure
        </label>
        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#013E51] text-base pointer-events-none z-10" />
          <input
            ref={departureRef}
            type={departureFocused || departureDate ? "date" : "text"}
            value={departureDate}
            placeholder="Select date"
            onFocus={() => {
              setDepartureFocused(true);
              try {
                departureRef.current?.showPicker?.();
              } catch {}
            }}
            onClick={() => {
              setDepartureFocused(true);
              try {
                departureRef.current?.showPicker?.();
              } catch {}
            }}
            onBlur={() => {
              if (!departureDate) {
                setDepartureFocused(false);
              }
            }}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full h-[50px] bg-white rounded-2xl pl-8.5 pr-3 py-3 font-[family-name:var(--font-lato)] text-xs xl:text-[13px] 2xl:text-sm font-semibold text-[#013E51] placeholder:text-[#013E51]/55 placeholder:font-normal shadow-xs border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer"
          />
        </div>
      </div>

      {/* Return Date */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5 truncate">
          Return
        </label>
        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#013E51] text-base pointer-events-none z-10" />
          <input
            ref={returnRef}
            type={returnFocused || returnDate ? "date" : "text"}
            value={returnDate}
            placeholder="Select date"
            onFocus={() => {
              setReturnFocused(true);
              try {
                returnRef.current?.showPicker?.();
              } catch {}
            }}
            onClick={() => {
              setReturnFocused(true);
              try {
                returnRef.current?.showPicker?.();
              } catch {}
            }}
            onBlur={() => {
              if (!returnDate) {
                setReturnFocused(false);
              }
            }}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full h-[50px] bg-white rounded-2xl pl-8.5 pr-3 py-3 font-[family-name:var(--font-lato)] text-xs xl:text-[13px] 2xl:text-sm font-semibold text-[#013E51] placeholder:text-[#013E51]/55 placeholder:font-normal shadow-xs border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer"
          />
        </div>
      </div>

      {/* Passengers */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5 truncate">
          Passengers
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#013E51] text-base pointer-events-none" />
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className={`w-full h-[50px] appearance-none bg-white rounded-2xl pl-8.5 pr-7 py-3 font-[family-name:var(--font-lato)] text-xs xl:text-[13px] 2xl:text-sm font-semibold shadow-xs border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer truncate ${
              passengers ? "text-[#013E51]" : "text-gray-400"
            }`}
          >
            <option value="" disabled>
              Passengers
            </option>
            {PASSENGER_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="text-[#013E51]">
                {opt}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#013E51] text-sm pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="shrink-0">
        <Link
          href={`/${locale}/flights?from=${encodeURIComponent(
            fromAirport
          )}&to=${encodeURIComponent(
            toAirport
          )}&dep=${encodeURIComponent(
            departureDate
          )}&ret=${encodeURIComponent(
            returnDate
          )}&pax=${encodeURIComponent(passengers)}`}
          className="inline-flex items-center justify-center gap-2 w-full xl:w-auto h-[50px] px-5 sm:px-6 xl:px-6 2xl:px-7 rounded-2xl bg-[#E8B34A] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm xl:text-sm whitespace-nowrap shadow-md hover:bg-[#d8a33a] hover:shadow-lg transition-all"
        >
          <span>Request Flight Offer</span>
          <FiArrowRight className="text-base shrink-0" />
        </Link>
      </div>
    </form>
  );
}
