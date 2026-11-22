"use client";

import React from "react";
import { FiCalendar, FiRepeat } from "react-icons/fi";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import {
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import { CityApiItem, CountryApiItem } from "@/models/flightLocation";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { getTomorrowIsoDate } from "@/shared/utils/cartPricing";
import {
  EGYPT_AIRPORTS,
  INTERNATIONAL_AIRPORTS,
} from "@/features/flights/flightInquiryHelpers";
import FlightLocationEndpointCard from "./FlightLocationEndpointCard";

interface FlightRouteScheduleStepProps {
  bookingType: FlightBookingTypeEnum;
  tripType: FlightTripTypeEnum;
  countries: CountryApiItem[];
  fromCities: CityApiItem[];
  toCities: CityApiItem[];
  fromCountryId: number | null;
  onFromCountryChange: (id: number | null) => void;
  fromCustomCountry: string;
  onFromCustomCountryChange: (val: string) => void;
  fromCityId: number | null;
  onFromCityChange: (id: number | null) => void;
  fromCustomCity: string;
  onFromCustomCityChange: (val: string) => void;
  toCountryId: number | null;
  onToCountryChange: (id: number | null) => void;
  toCustomCountry: string;
  onToCustomCountryChange: (val: string) => void;
  toCityId: number | null;
  onToCityChange: (id: number | null) => void;
  toCustomCity: string;
  onToCustomCityChange: (val: string) => void;
  departureAirport: string;
  onDepartureAirportChange: (val: string) => void;
  arrivalAirport: string;
  onArrivalAirportChange: (val: string) => void;
  departureDate: string;
  onDepartureDateChange: (val: string) => void;
  departureTime: string;
  onDepartureTimeChange: (val: string) => void;
  returnDepartureAirport: string;
  onReturnDepartureAirportChange: (val: string) => void;
  returnArrivalAirport: string;
  onReturnArrivalAirportChange: (val: string) => void;
  returnDate: string;
  onReturnDateChange: (val: string) => void;
  returnTime: string;
  onReturnTimeChange: (val: string) => void;
  onSwapDirection: () => void;
}

export default function FlightRouteScheduleStep({
  bookingType,
  tripType,
  countries,
  fromCities,
  toCities,
  fromCountryId,
  onFromCountryChange,
  fromCustomCountry,
  onFromCustomCountryChange,
  fromCityId,
  onFromCityChange,
  fromCustomCity,
  onFromCustomCityChange,
  toCountryId,
  onToCountryChange,
  toCustomCountry,
  onToCustomCountryChange,
  toCityId,
  onToCityChange,
  toCustomCity,
  onToCustomCityChange,
  departureAirport,
  onDepartureAirportChange,
  arrivalAirport,
  onArrivalAirportChange,
  departureDate,
  onDepartureDateChange,
  departureTime,
  onDepartureTimeChange,
  returnDepartureAirport,
  onReturnDepartureAirportChange,
  returnArrivalAirport,
  onReturnArrivalAirportChange,
  returnDate,
  onReturnDateChange,
  returnTime,
  onReturnTimeChange,
  onSwapDirection,
}: FlightRouteScheduleStepProps) {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  const isOutbound = bookingType === FlightBookingTypeEnum.EgyptToCountry;
  const isInbound = bookingType === FlightBookingTypeEnum.CountryToEgypt;
  const isRoundTrip = tripType === FlightTripTypeEnum.RoundTrip;
  const minDate = getTomorrowIsoDate();

  return (
    <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-[#E5DDD0] space-y-5">
      {/* Step Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <span className="w-7 h-7 rounded-full bg-[#013E51] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
            2
          </span>
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] leading-tight">
              {t.step2Title}
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/65 mt-0.5">
              {t.step2Subtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwapDirection}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5DDD0] bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:border-[#013E51] transition-colors cursor-pointer"
        >
          <FiRepeat className="w-3.5 h-3.5" />
          <span>{t.swapDirection}</span>
        </button>
      </div>

      {/* Origin & Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FlightLocationEndpointCard
          title={t.originLabel}
          icon={MdFlightTakeoff}
          countries={countries}
          cities={fromCities}
          countryId={fromCountryId}
          onCountryChange={onFromCountryChange}
          customCountry={fromCustomCountry}
          onCustomCountryChange={onFromCustomCountryChange}
          cityId={fromCityId}
          onCityChange={onFromCityChange}
          customCity={fromCustomCity}
          onCustomCityChange={onFromCustomCityChange}
          airport={departureAirport}
          onAirportChange={onDepartureAirportChange}
          datalistId={isInbound ? "intl-airports" : "egypt-airports"}
          requiredCountryCity={isInbound}
        />

        <FlightLocationEndpointCard
          title={t.destinationLabel}
          icon={MdFlightLand}
          countries={countries}
          cities={toCities}
          countryId={toCountryId}
          onCountryChange={onToCountryChange}
          customCountry={toCustomCountry}
          onCustomCountryChange={onToCustomCountryChange}
          cityId={toCityId}
          onCityChange={onToCityChange}
          customCity={toCustomCity}
          onCustomCityChange={onToCustomCityChange}
          airport={arrivalAirport}
          onAirportChange={onArrivalAirportChange}
          datalistId={isOutbound ? "intl-airports" : "egypt-airports"}
          requiredCountryCity={isOutbound}
        />
      </div>

      {/* Airport Datalists */}
      <datalist id="egypt-airports">
        {EGYPT_AIRPORTS.map((ap) => (
          <option key={ap} value={ap} />
        ))}
      </datalist>
      <datalist id="intl-airports">
        {INTERNATIONAL_AIRPORTS.map((ap) => (
          <option key={ap} value={ap} />
        ))}
      </datalist>

      {/* Outbound Departure Date & Time */}
      <div className="rounded-2xl border border-[#E5DDD0] p-4 space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
          <FiCalendar className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>{t.outboundDateTimeLabel}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
              {t.dateLabel} *
            </label>
            <input
              type="date"
              required
              min={minDate}
              value={departureDate}
              onChange={(e) => onDepartureDateChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2]/60 border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
              {t.timeLabel}
            </label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => onDepartureTimeChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2]/60 border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
            />
          </div>
        </div>
      </div>

      {/* Return Flight Leg (Only for Round Trip) */}
      {isRoundTrip && (
        <div className="rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] p-4 space-y-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
              <FiRepeat className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>{t.returnLegTitle}</span>
            </div>
            <p className="text-[11px] text-[#013E51]/60 mt-0.5">
              {t.returnLegHint}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
                {t.returnFrom} *
              </label>
              <input
                type="text"
                required
                value={returnDepartureAirport}
                onChange={(e) => onReturnDepartureAirportChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
                {t.returnTo} *
              </label>
              <input
                type="text"
                required
                value={returnArrivalAirport}
                onChange={(e) => onReturnArrivalAirportChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
                {t.dateLabel} *
              </label>
              <input
                type="date"
                required
                min={departureDate || minDate}
                value={returnDate}
                onChange={(e) => onReturnDateChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
                {t.timeLabel}
              </label>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => onReturnTimeChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
