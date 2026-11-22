"use client";

import React from "react";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import {
  CreateFlightPassengerPayload,
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
  PassengerTypeEnum,
} from "@/models/flightBooking";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface FlightInquirySidebarProps {
  bookingType: FlightBookingTypeEnum;
  tripType: FlightTripTypeEnum;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime: string;
  returnDepartureAirport: string;
  returnArrivalAirport: string;
  returnDate: string;
  returnTime: string;
  passengers: CreateFlightPassengerPayload[];
  isSubmitting: boolean;
}

function extractAirportCode(val: string, fallback: string): string {
  const match = val.match(/\(([A-Za-z]{3})\)/);
  if (match) return match[1].toUpperCase();
  const clean = val.trim();
  if (clean.length >= 3) return clean.slice(0, 3).toUpperCase();
  return fallback;
}

export default function FlightInquirySidebar({
  bookingType,
  tripType,
  departureAirport,
  arrivalAirport,
  departureDate,
  departureTime,
  returnDepartureAirport,
  returnArrivalAirport,
  returnDate,
  returnTime,
  passengers,
  isSubmitting,
}: FlightInquirySidebarProps) {
  const { locale, dictionary } = useLocale();
  const t = dictionary.flightsPage;

  const isRoundTrip = tripType === FlightTripTypeEnum.RoundTrip;
  const origCode = extractAirportCode(departureAirport, "ORIG");
  const destCode = extractAirportCode(arrivalAirport, "DEST");
  const retOrigCode = extractAirportCode(returnDepartureAirport, destCode);
  const retDestCode = extractAirportCode(returnArrivalAirport, origCode);

  const serviceBadge =
    bookingType === FlightBookingTypeEnum.EgyptToCountry
      ? t.outboundTitle
      : bookingType === FlightBookingTypeEnum.CountryToEgypt
      ? t.inboundTitle
      : t.domesticTitle;

  const formatShortDate = (dateStr: string) => {
    if (!dateStr) return "--";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const adults = passengers.filter(
    (p) => p.passengerType === PassengerTypeEnum.Adult
  ).length;
  const children = passengers.filter(
    (p) => p.passengerType === PassengerTypeEnum.Child
  ).length;
  const infants = passengers.filter(
    (p) => p.passengerType === PassengerTypeEnum.Infant
  ).length;

  let totalWeightKg = 0;
  let totalPieces = 0;
  passengers.forEach((p) => {
    p.baggages.forEach((b) => {
      const qty = Number(b.quantity) || 0;
      const weight = Number(b.weightPerItem) || 0;
      totalPieces += qty;
      totalWeightKg += qty * weight;
    });
  });

  return (
    <aside className="bg-white rounded-[24px] p-6 shadow-sm border border-[#E5DDD0] lg:sticky lg:top-24 space-y-5">
      {/* Top Badge & Journey Type */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-[#E8B34A] text-[#013E51] text-[11px] font-bold">
          {serviceBadge}
        </span>
        <span className="text-xs font-semibold text-[#013E51]/70">
          {isRoundTrip ? t.roundTrip : t.oneWay}
        </span>
      </div>

      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
        {t.sidebarTitle}
      </h3>

      {/* Route Preview */}
      <div className="flex items-center justify-between gap-2 py-2">
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51] leading-none">
            {origCode}
          </p>
          <p className="text-[11px] text-[#013E51]/60 mt-1 truncate max-w-[100px]">
            {departureAirport || "--"}
          </p>
        </div>

        <div className="flex flex-col items-center shrink-0">
          <FiArrowRight className="w-4 h-4 text-[#E8B34A]" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-[#013E51]/50 mt-0.5">
            {isRoundTrip ? `2 ${t.legPlural}` : `1 ${t.legSingular}`}
          </span>
        </div>

        <div className="min-w-0 text-right">
          <p className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51] leading-none">
            {destCode}
          </p>
          <p className="text-[11px] text-[#013E51]/60 mt-1 truncate max-w-[100px]">
            {arrivalAirport || "--"}
          </p>
        </div>
      </div>

      {/* Outbound & Return Date Cards */}
      <div className="space-y-2.5">
        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-between gap-2">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-[#013E51]/55">
              {t.outboundSummary}
            </span>
            <span className="text-xs font-bold text-[#013E51]">
              {formatShortDate(departureDate)}
              {departureTime ? ` • ${departureTime}` : ""}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DDD0] text-[10px] font-bold text-[#013E51]">
            {origCode} → {destCode}
          </span>
        </div>

        {isRoundTrip && (
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-between gap-2">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#013E51]/55">
                {t.returnSummary}
              </span>
              <span className="text-xs font-bold text-[#013E51]">
                {formatShortDate(returnDate)}
                {returnTime ? ` • ${returnTime}` : ""}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DDD0] text-[10px] font-bold text-[#013E51]">
              {retOrigCode} → {retDestCode}
            </span>
          </div>
        )}
      </div>

      {/* Passenger Manifest Breakdown */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold uppercase tracking-wider text-[#013E51]/60">
            {t.manifestSummary}
          </span>
          <span className="font-bold text-[#013E51]">
            {passengers.length} {t.totalLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#013E51] text-white text-[11px] font-bold">
            {adults} {t.adult}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#013E51] text-[11px] font-bold">
            {children} {t.child}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#013E51] text-[11px] font-bold">
            {infants} {t.infant}
          </span>
        </div>
      </div>

      {/* Total Baggage Allowance */}
      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
          {t.totalBaggage}
        </span>
        <p className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51] leading-none">
          {totalWeightKg} kg
        </p>
        <p className="text-[11px] text-[#013E51]/65 mt-1">
          {totalPieces} {t.piecesAcrossManifest}
        </p>
      </div>

      {/* Submit Action */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-full bg-[#013E51] hover:bg-[#022c3a] text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
            <span>{t.submitting}</span>
          </>
        ) : (
          <>
            <span>{t.submitRequest}</span>
            <FiArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-[#013E51]/60 leading-relaxed">
        {t.sidebarNotice}
      </p>
    </aside>
  );
}
