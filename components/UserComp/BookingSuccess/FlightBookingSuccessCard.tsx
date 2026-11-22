"use client";

import React from "react";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface FlightBookingSuccessCardProps {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate?: string;
  passengersCount: string;
}

export default function FlightBookingSuccessCard({
  id,
  departureAirport,
  arrivalAirport,
  departureDate,
  returnDate,
  passengersCount,
}: FlightBookingSuccessCardProps) {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-[#E5DDD0] space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#013E51] text-white flex items-center justify-center shrink-0">
            <MdFlight className="w-5 h-5 text-[#E8B34A] rotate-45" />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#E8B34A]">
              {t.heroEyebrow}
            </span>
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51]">
              {departureAirport} → {arrivalAirport}
            </h3>
          </div>
        </div>

        {id && (
          <span className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-bold text-[#013E51]">
            Ref #{id}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0]/60">
          <div className="flex items-center gap-1.5 text-[#013E51]/60 font-bold uppercase tracking-wider text-[10px] mb-1">
            <FiMapPin className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>{t.step2Title}</span>
          </div>
          <p className="font-bold text-[#013E51]">
            {departureAirport} → {arrivalAirport}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0]/60">
          <div className="flex items-center gap-1.5 text-[#013E51]/60 font-bold uppercase tracking-wider text-[10px] mb-1">
            <FiCalendar className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>{t.dateLabel}</span>
          </div>
          <p className="font-bold text-[#013E51]">
            {departureDate}
            {returnDate ? ` • ${returnDate}` : ""}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0]/60">
          <div className="flex items-center gap-1.5 text-[#013E51]/60 font-bold uppercase tracking-wider text-[10px] mb-1">
            <FiUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>{t.manifestSummary}</span>
          </div>
          <p className="font-bold text-[#013E51]">
            {passengersCount}{" "}
            {Number(passengersCount) === 1
              ? t.passengerCountSingular
              : t.passengerCountPlural}
          </p>
        </div>
      </div>
    </div>
  );
}
