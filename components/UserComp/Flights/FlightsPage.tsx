"use client";

import React from "react";
import { useFlightsInquiryForm } from "@/features/flights/useFlightsInquiryForm";
import FlightsHeroBanner from "./FlightsHeroBanner";
import FlightTripConfigStep from "./FlightTripConfigStep";
import FlightRouteScheduleStep from "./FlightRouteScheduleStep";
import FlightPassengersStep from "./FlightPassengersStep";
import FlightContactStep from "./FlightContactStep";
import FlightInquirySidebar from "./FlightInquirySidebar";
import FlightsTrustAndTransfer from "./FlightsTrustAndTransfer";

export default function FlightsPage() {
  const form = useFlightsInquiryForm();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#013E51] font-[family-name:var(--font-lato)] pb-16">
      <FlightsHeroBanner />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 space-y-10">
        <form
          onSubmit={form.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start"
        >
          {/* Left Column: 4 Steps */}
          <div className="lg:col-span-8 space-y-6">
            <FlightTripConfigStep
              bookingType={form.bookingType}
              onBookingTypeChange={form.setBookingType}
              tripType={form.tripType}
              onTripTypeChange={form.setTripType}
            />

            <FlightRouteScheduleStep
              bookingType={form.bookingType}
              tripType={form.tripType}
              countries={form.countries}
              fromCities={form.fromCities}
              toCities={form.toCities}
              fromCountryId={form.fromCountryId}
              onFromCountryChange={form.setFromCountryId}
              fromCustomCountry={form.fromCustomCountry}
              onFromCustomCountryChange={form.setFromCustomCountry}
              fromCityId={form.fromCityId}
              onFromCityChange={form.setFromCityId}
              fromCustomCity={form.fromCustomCity}
              onFromCustomCityChange={form.setFromCustomCity}
              toCountryId={form.toCountryId}
              onToCountryChange={form.setToCountryId}
              toCustomCountry={form.toCustomCountry}
              onToCustomCountryChange={form.setToCustomCountry}
              toCityId={form.toCityId}
              onToCityChange={form.setToCityId}
              toCustomCity={form.toCustomCity}
              onToCustomCityChange={form.setToCustomCity}
              departureAirport={form.departureAirport}
              onDepartureAirportChange={form.handleDepartureAirportChange}
              arrivalAirport={form.arrivalAirport}
              onArrivalAirportChange={form.handleArrivalAirportChange}
              departureDate={form.departureDate}
              onDepartureDateChange={form.setDepartureDate}
              departureTime={form.departureTime}
              onDepartureTimeChange={form.setDepartureTime}
              returnDepartureAirport={form.returnDepartureAirport}
              onReturnDepartureAirportChange={form.setReturnDepartureAirport}
              returnArrivalAirport={form.returnArrivalAirport}
              onReturnArrivalAirportChange={form.setReturnArrivalAirport}
              returnDate={form.returnDate}
              onReturnDateChange={form.setReturnDate}
              returnTime={form.returnTime}
              onReturnTimeChange={form.setReturnTime}
              onSwapDirection={form.handleSwapDirection}
            />

            <FlightPassengersStep
              passengers={form.passengers}
              onChange={form.setPassengers}
            />

            <FlightContactStep
              email={form.email}
              onEmailChange={form.setEmail}
              phone={form.phone}
              onPhoneChange={form.setPhone}
              specialRequests={form.specialRequests}
              onSpecialRequestsChange={form.setSpecialRequests}
              agreeTerms={form.agreeTerms}
              onAgreeTermsChange={form.setAgreeTerms}
              onClear={form.handleClear}
              isSubmitting={form.isSubmitting}
            />
          </div>

          {/* Right Column: Sticky Inquiry Summary */}
          <div className="lg:col-span-4">
            <FlightInquirySidebar
              bookingType={form.bookingType}
              tripType={form.tripType}
              departureAirport={form.departureAirport}
              arrivalAirport={form.arrivalAirport}
              departureDate={form.departureDate}
              departureTime={form.departureTime}
              returnDepartureAirport={form.returnDepartureAirport}
              returnArrivalAirport={form.returnArrivalAirport}
              returnDate={form.returnDate}
              returnTime={form.returnTime}
              passengers={form.passengers}
              isSubmitting={form.isSubmitting}
            />
          </div>
        </form>

        <FlightsTrustAndTransfer />
      </div>
    </div>
  );
}
