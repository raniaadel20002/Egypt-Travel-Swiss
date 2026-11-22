"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiMapPin,
  FiCalendar,
  FiUser,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { getTomorrowIsoDate } from "@/shared/utils/cartPricing";

const FROM_AIRPORTS = [
  "Zurich (ZRH)",
  "Geneva (GVA)",
  "Basel (BSL)",
  "Frankfurt (FRA)",
  "Munich (MUC)",
  "Berlin (BER)",
  "Vienna (VIE)",
  "London (LHR)",
  "Paris (CDG)",
  "Milan (MXP)",
  "Rome (FCO)",
  "Bucharest (OTP)",
];

const TO_AIRPORTS = [
  "Hurghada (HRG)",
  "Cairo (CAI)",
  "Sharm El Sheikh (SSH)",
  "Marsa Alam (RMF)",
  "Luxor (LXR)",
];

export default function FlightSearchForm() {
  const router = useRouter();
  const { locale, dictionary } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const t = dictionary.homePage?.flightInquiry || {
    fromLabel: "From",
    fromPlaceholder: "Select Departure Airport",
    toLabel: "To",
    toPlaceholder: "Select Egyptian Airport",
    departureLabel: "Departure",
    returnLabel: "Return (Optional)",
    passengersLabel: "Passengers",
    selectDatePlaceholder: "Select date",
    passengerSingular: "Passenger",
    passengersPlural: "Passengers",
    submit: "Request Flight Offer",
  };

  const todayIso = new Date().toISOString().split("T")[0];
  const [fromAirport, setFromAirport] = useState("Zurich (ZRH)");
  const [toAirport, setToAirport] = useState("Hurghada (HRG)");
  const [departureDate, setDepartureDate] = useState(getTomorrowIsoDate());
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const [departureFocused, setDepartureFocused] = useState(false);
  const [returnFocused, setReturnFocused] = useState(false);

  const departureRef = useRef<HTMLInputElement>(null);
  const returnRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (fromAirport) params.set("from", fromAirport);
    if (toAirport) params.set("to", toAirport);
    if (departureDate) params.set("dep", departureDate);
    if (returnDate) params.set("ret", returnDate);
    if (passengers) params.set("pax", passengers);

    router.push(`/${locale}/flights?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(148px,1.2fr)_minmax(158px,1.25fr)_minmax(130px,1fr)_minmax(130px,1fr)_minmax(118px,0.85fr)_auto] gap-2 sm:gap-2.5 xl:gap-2.5 items-end"
    >
      {/* From Airport */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#013E51]/80 mb-1">
          {t.fromLabel}
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#013E51] text-sm pointer-events-none" />
          <select
            value={fromAirport}
            onChange={(e) => setFromAirport(e.target.value)}
            className="w-full h-[48px] appearance-none bg-white rounded-xl pl-7.5 pr-6 font-[family-name:var(--font-lato)] text-xs sm:text-[12.5px] xl:text-[13px] font-semibold text-[#013E51] shadow-xs border border-[#013E51]/10 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]/50 focus:border-[#E8B34A] cursor-pointer truncate"
          >
            <option value="" disabled>
              {t.fromPlaceholder}
            </option>
            {FROM_AIRPORTS.map((airport) => (
              <option key={airport} value={airport} className="text-[#013E51]">
                {airport}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#013E51]/70 text-sm pointer-events-none" />
        </div>
      </div>

      {/* To Airport */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#013E51]/80 mb-1">
          {t.toLabel}
        </label>
        <div className="relative">
          <Image
            src="/home/FlightBookingInquiry/title-plane-icon.svg"
            alt=""
            width={16}
            height={16}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 object-contain pointer-events-none"
          />
          <select
            value={toAirport}
            onChange={(e) => setToAirport(e.target.value)}
            className="w-full h-[48px] appearance-none bg-white rounded-xl pl-7.5 pr-6 font-[family-name:var(--font-lato)] text-xs sm:text-[12.5px] xl:text-[13px] font-semibold text-[#013E51] shadow-xs border border-[#013E51]/10 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]/50 focus:border-[#E8B34A] cursor-pointer truncate"
          >
            <option value="" disabled>
              {t.toPlaceholder}
            </option>
            {TO_AIRPORTS.map((airport) => (
              <option key={airport} value={airport} className="text-[#013E51]">
                {airport}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#013E51]/70 text-sm pointer-events-none" />
        </div>
      </div>

      {/* Departure Date */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#013E51]/80 mb-1">
          {t.departureLabel}
        </label>
        <div className="relative">
          <FiCalendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#013E51] text-sm pointer-events-none z-10" />
          <input
            ref={departureRef}
            type={departureFocused || departureDate ? "date" : "text"}
            value={departureDate}
            min={todayIso}
            placeholder={t.selectDatePlaceholder}
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
            className="w-full h-[48px] bg-white rounded-xl pl-7.5 pr-2 font-[family-name:var(--font-lato)] text-xs sm:text-[12.5px] xl:text-[13px] font-semibold text-[#013E51] placeholder:text-[#013E51]/55 shadow-xs border border-[#013E51]/10 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]/50 focus:border-[#E8B34A] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>
      </div>

      {/* Return Date */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#013E51]/80 mb-1">
          {t.returnLabel}
        </label>
        <div className="relative">
          <FiCalendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#013E51] text-sm pointer-events-none z-10" />
          <input
            ref={returnRef}
            type={returnFocused || returnDate ? "date" : "text"}
            value={returnDate}
            min={departureDate || todayIso}
            placeholder={t.selectDatePlaceholder}
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
            className="w-full h-[48px] bg-white rounded-xl pl-7.5 pr-2 font-[family-name:var(--font-lato)] text-xs sm:text-[12.5px] xl:text-[13px] font-semibold text-[#013E51] placeholder:text-[#013E51]/55 shadow-xs border border-[#013E51]/10 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]/50 focus:border-[#E8B34A] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>
      </div>

      {/* Passengers */}
      <div className="min-w-0">
        <label className="block font-[family-name:var(--font-lato)] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#013E51]/80 mb-1">
          {t.passengersLabel}
        </label>
        <div className="relative">
          <FiUser className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#013E51] text-sm pointer-events-none" />
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full h-[48px] appearance-none bg-white rounded-xl pl-7.5 pr-6 font-[family-name:var(--font-lato)] text-xs sm:text-[12.5px] xl:text-[13px] font-semibold text-[#013E51] shadow-xs border border-[#013E51]/10 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]/50 focus:border-[#E8B34A] cursor-pointer truncate"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
              <option key={count} value={String(count)} className="text-[#013E51]">
                {count} {count === 1 ? t.passengerSingular : t.passengersPlural}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#013E51]/70 text-sm pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="shrink-0">
        <motion.button
          type="submit"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full xl:w-auto h-[48px] px-4 sm:px-5 xl:px-5.5 rounded-xl bg-[#E8B34A] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:bg-[#d8a33a] hover:shadow-lg transition-colors cursor-pointer"
        >
          <span>{t.submit}</span>
          <FiArrowRight className="text-base shrink-0 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      </div>
    </form>
  );
}
