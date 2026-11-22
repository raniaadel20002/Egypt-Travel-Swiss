"use client";

import React from "react";
import { FiArrowRight, FiMapPin, FiRepeat } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import {
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface FlightTripConfigStepProps {
  bookingType: FlightBookingTypeEnum;
  onBookingTypeChange: (type: FlightBookingTypeEnum) => void;
  tripType: FlightTripTypeEnum;
  onTripTypeChange: (type: FlightTripTypeEnum) => void;
}

export default function FlightTripConfigStep({
  bookingType,
  onBookingTypeChange,
  tripType,
  onTripTypeChange,
}: FlightTripConfigStepProps) {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  const serviceOptions = [
    {
      value: FlightBookingTypeEnum.EgyptToCountry,
      title: t.outboundTitle,
      desc: t.outboundDesc,
      icon: MdFlightTakeoff,
    },
    {
      value: FlightBookingTypeEnum.CountryToEgypt,
      title: t.inboundTitle,
      desc: t.inboundDesc,
      icon: FaCrown,
    },
    {
      value: FlightBookingTypeEnum.Local,
      title: t.domesticTitle,
      desc: t.domesticDesc,
      icon: FiMapPin,
    },
  ];

  return (
    <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-[#E5DDD0]">
      {/* Step Header */}
      <div className="flex items-start gap-3.5 mb-6">
        <span className="w-7 h-7 rounded-full bg-[#013E51] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          1
        </span>
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] leading-tight">
            {t.step1Title}
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/65 mt-0.5">
            {t.step1Subtitle}
          </p>
        </div>
      </div>

      {/* Flight Service Type */}
      <div className="mb-6">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-3">
          {t.serviceTypeLabel}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {serviceOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = bookingType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onBookingTypeChange(opt.value)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                  isSelected
                    ? "bg-[#013E51] border-[#013E51] text-white shadow-md"
                    : "bg-[#FAF7F2]/60 border-[#E5DDD0] text-[#013E51] hover:border-[#013E51]/40"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-[#E8B34A] text-[#013E51]"
                      : "bg-white border border-[#E5DDD0] text-[#013E51]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-lato)] text-sm font-bold leading-snug">
                    {opt.title}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      isSelected ? "text-white/75" : "text-[#013E51]/60"
                    }`}
                  >
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Journey Type Pill Switch */}
      <div>
        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-2.5">
          {t.journeyTypeLabel}
        </span>

        <div className="inline-flex items-center p-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD0]">
          <button
            type="button"
            onClick={() => onTripTypeChange(FlightTripTypeEnum.RoundTrip)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              tripType === FlightTripTypeEnum.RoundTrip
                ? "bg-[#E8B34A] text-[#013E51] shadow-xs"
                : "text-[#013E51]/70 hover:text-[#013E51]"
            }`}
          >
            <FiRepeat className="w-3.5 h-3.5" />
            <span>{t.roundTrip}</span>
          </button>
          <button
            type="button"
            onClick={() => onTripTypeChange(FlightTripTypeEnum.OneWay)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              tripType === FlightTripTypeEnum.OneWay
                ? "bg-[#E8B34A] text-[#013E51] shadow-xs"
                : "text-[#013E51]/70 hover:text-[#013E51]"
            }`}
          >
            <FiArrowRight className="w-3.5 h-3.5" />
            <span>{t.oneWay}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
