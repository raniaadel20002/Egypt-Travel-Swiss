"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BookingSuccessHeader from "./BookingSuccessHeader";
import HotelBookingSuccessCard from "./HotelBookingSuccessCard";
import DivingBookingSuccessCard from "./DivingBookingSuccessCard";
import TripBookingSuccessCard from "./TripBookingSuccessCard";
import TransferBookingSuccessCard from "./TransferBookingSuccessCard";
import FlightBookingSuccessCard from "./FlightBookingSuccessCard";
import BookingNextStepsTimeline from "./BookingNextStepsTimeline";
import BookingSuccessActions from "./BookingSuccessActions";

interface BookingSuccessPageProps {
  locale: string;
}

export default function BookingSuccessPage({ locale: _locale }: BookingSuccessPageProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  const type = (searchParams.get("type") || "general").toLowerCase();
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";

  // Hotel params
  const hotelName = searchParams.get("hotel") || undefined;
  const hotelLocation = searchParams.get("location") || undefined;
  const checkInDate = searchParams.get("checkIn") || undefined;
  const nightsCount = searchParams.get("nights") || 3;
  const roomsCount = searchParams.get("rooms") || 1;
  const adults = searchParams.get("adults") || 2;
  const children = searchParams.get("children") || 0;
  const infants = searchParams.get("infants") || 0;
  const ratePlanName = searchParams.get("plan") || undefined;

  // Diving params (from diving course booking API response)
  const divingBookingId = searchParams.get("divingId") || id;
  const divingFullName = searchParams.get("divingName") || name;
  const divingEmail = searchParams.get("divingEmail") || "";
  const divingPhone = searchParams.get("divingPhone") || "";
  const divingRoomNo = searchParams.get("roomNo") || "";
  const divingHotelName = searchParams.get("divingHotel") || "";
  const divingTotalPrice = searchParams.get("divingTotal") || "0";
  const divingDepositAmount = searchParams.get("divingDeposit") || "0";
  const divingRemainingAmount = searchParams.get("divingRemaining") || "0";
  const divingCurrency = searchParams.get("divingCurrency") || "EUR";
  const divingStatus = searchParams.get("divingStatus") || "Pending";
  const divingPaymentStatus = searchParams.get("divingPaymentStatus") || "Pending";
  const divingItems = searchParams.get("divingItems") || "[]";
  
  let parsedDivingItems = [];
  try {
    parsedDivingItems = JSON.parse(divingItems);
  } catch {
    parsedDivingItems = [];
  }

  // Trip params
  const tripTitle = searchParams.get("title") || undefined;
  const isPrivate = searchParams.get("isPrivate") === "true";
  const travelDate = searchParams.get("travelDate") || undefined;
  const travelersCount = searchParams.get("travelers") || 2;
  const pickupLocation = searchParams.get("pickup") || undefined;

  // Transfer params (All mapped from backend TransferBookingApiItem)
  const fromLocation = searchParams.get("from") || "";
  const toLocation = searchParams.get("to") || "";
  const vehicleName = searchParams.get("vehicle") || "";
  const transferDate = searchParams.get("date") || "";
  const transferTime = searchParams.get("time") || "";
  const adultsCount = searchParams.get("adults") || "2";
  const childrenCount = searchParams.get("children") || "0";
  const passengers = searchParams.get("passengers") || "2";
  const price = searchParams.get("price") || "0";
  const currency = searchParams.get("currency") || "EUR";
  const bookingStatus = searchParams.get("status") || "Pending";
  const tripType = searchParams.get("tripType") || "OneWay";
  const customerPhone = searchParams.get("phone") || "";
  const customerEmail = searchParams.get("email") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const returnTime = searchParams.get("returnTime") || "";
  const notes = searchParams.get("notes") || "";

  const courseName = searchParams.get("course") || searchParams.get("courseName") || undefined;
  const bookingTitle = hotelName || courseName || tripTitle || vehicleName || "";

  return (
    <main className="min-h-screen bg-[#FBF8F3] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1080px] mx-auto space-y-10">
        {/* Header with Checkmark */}
        <BookingSuccessHeader
          guestName={name}
          bookingType={type}
        />

        {/* Type-Specific Detailed Voucher Card */}
        {type === "hotel" && (
          <HotelBookingSuccessCard
            hotelName={hotelName}
            location={hotelLocation}
            checkInDate={checkInDate}
            nightsCount={nightsCount}
            roomsCount={roomsCount}
            adults={adults}
            children={children}
            infants={infants}
            ratePlanName={ratePlanName}
          />
        )}

        {type === "diving" && (
          <DivingBookingSuccessCard
            id={divingBookingId}
            fullName={divingFullName}
            email={divingEmail}
            phone={divingPhone}
            roomNo={divingRoomNo}
            hotelName={divingHotelName}
            items={parsedDivingItems}
            totalPrice={divingTotalPrice}
            depositAmount={divingDepositAmount}
            remainingAmount={divingRemainingAmount}
            currency={divingCurrency}
            status={divingStatus}
            paymentStatus={divingPaymentStatus}
          />
        )}

        {type === "trip" && (
          <TripBookingSuccessCard
            tripTitle={tripTitle}
            isPrivate={isPrivate}
            travelDate={travelDate}
            travelersCount={travelersCount}
            pickupLocation={pickupLocation}
          />
        )}

        {type === "transfer" && (
          <TransferBookingSuccessCard
            id={id}
            fromLocation={fromLocation}
            toLocation={toLocation}
            vehicleName={vehicleName}
            tripType={tripType}
            tripDate={transferDate}
            tripTime={transferTime}
            adults={adultsCount}
            children={childrenCount}
            totalPersons={passengers}
            customerName={name}
            phoneNumber={customerPhone}
            email={customerEmail}
            price={price}
            currency={currency}
            status={bookingStatus}
            notes={notes}
            returnDate={returnDate}
            returnTime={returnTime}
          />
        )}

        {type === "flight" && (
          <FlightBookingSuccessCard
            id={id}
            departureAirport={fromLocation}
            arrivalAirport={toLocation}
            departureDate={transferDate}
            returnDate={returnDate}
            passengersCount={passengers}
          />
        )}

        {/* Fallback if type is general or unknown */}
        {!["hotel", "diving", "trip", "transfer"].includes(type) && (
          <HotelBookingSuccessCard
            hotelName={hotelName}
            location={hotelLocation}
            checkInDate={checkInDate}
            nightsCount={nightsCount}
            roomsCount={roomsCount}
            adults={adults}
            children={children}
            infants={infants}
            ratePlanName={ratePlanName}
          />
        )}

        {/* Visual Timeline of What to Expect */}
        <BookingNextStepsTimeline />

        {/* Actions: Primary WhatsApp Channel */}
        <BookingSuccessActions bookingTitle={bookingTitle} />
      </div>
    </main>
  );
}
