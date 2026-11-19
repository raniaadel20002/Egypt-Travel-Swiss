"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  useTransferFromLocations,
  useTransferToLocations,
  useTransferVehicleTypes,
  useCreateTransferBooking,
} from "@/features/transfers/useTransfers";
import TransferHeroBanner from "./TransferHeroBanner";
import TransferBookingForm from "./TransferBookingForm";
import TransferVehicleSelector from "./TransferVehicleSelector";
import TransferDiscountBanner from "./TransferDiscountBanner";
import TransferScheduleForm from "./TransferScheduleForm";
import TransferCustomerForm from "./TransferCustomerForm";
import TransferNotesForm from "./TransferNotesForm";
import TransferBookingSummary from "./TransferBookingSummary";
import TransferHelpContact from "./TransferHelpContact";
import { TransferBookingResult } from "@/models/transferApi";

export default function TransferPage() {
  const { data: fromLocations = [] } = useTransferFromLocations();
  const { data: toLocations = [] } = useTransferToLocations();
  const { data: vehicleTypes = [] } = useTransferVehicleTypes();
  const createBookingMutation = useCreateTransferBooking();

  const [selectedFromId, setSelectedFromId] = useState<string | number>("hrg-apt");
  const [selectedToId, setSelectedToId] = useState<string | number>("hrg-hotels");
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | number>("car");

  const [tripDate, setTripDate] = useState<string>("");
  const [tripTime, setTripTime] = useState<string>("10:00");
  const [returnDate, setReturnDate] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("10:00");

  const [name, setName] = useState<string>("");
  const [nationality, setNationality] = useState<string>("Germany");
  const [email, setEmail] = useState<string>("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<string>("WhatsApp");
  const [phone, setPhone] = useState<string>("");
  const [luggagePieces, setLuggagePieces] = useState<number>(2);
  const [notes, setNotes] = useState<string>("");

  const [confirmedBooking, setConfirmedBooking] = useState<TransferBookingResult | null>(null);

  const selectedVehicle = useMemo(() => {
    return (
      vehicleTypes.find((v) => String(v.id) === String(selectedVehicleId)) ||
      vehicleTypes[0]
    );
  }, [vehicleTypes, selectedVehicleId]);

  const selectedFromName = useMemo(() => {
    return fromLocations.find((l) => String(l.id) === String(selectedFromId))?.name || "";
  }, [fromLocations, selectedFromId]);

  const selectedToName = useMemo(() => {
    return toLocations.find((l) => String(l.id) === String(selectedToId))?.name || "";
  }, [toLocations, selectedToId]);

  const totalPrice = useMemo(() => {
    if (!selectedVehicle) return 25;
    if (isRoundTrip) {
      return selectedVehicle.roundTripPrice * 0.9;
    }
    return selectedVehicle.oneWayPrice;
  }, [selectedVehicle, isRoundTrip]);

  const handleSwap = () => {
    const prevFrom = selectedFromId;
    setSelectedFromId(selectedToId);
    setSelectedToId(prevFrom);
    toast.info("Locations swapped");
  };

  const handleReset = () => {
    setSelectedFromId("hrg-apt");
    setSelectedToId("hrg-hotels");
    setAdults(2);
    setChildrenCount(0);
    setIsRoundTrip(false);
    setSelectedVehicleId("car");
    setTripDate("");
    setTripTime("10:00");
    setReturnDate("");
    setReturnTime("10:00");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    toast.info("Form reset to defaults");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your contact phone number.");
      return;
    }
    if (!tripDate) {
      toast.error("Please select your trip departure date.");
      return;
    }
    if (isRoundTrip && !returnDate) {
      toast.error("Please select your return trip date.");
      return;
    }

    try {
      const res = await createBookingMutation.mutateAsync({
        fromLocationId: selectedFromId,
        toLocationId: selectedToId,
        vehicleTypeId: selectedVehicleId,
        isRoundTrip,
        adults,
        children: childrenCount,
        tripDate,
        tripTime,
        returnDate: isRoundTrip ? returnDate : undefined,
        returnTime: isRoundTrip ? returnTime : undefined,
        name,
        nationality,
        email,
        preferredContactMethod,
        phone,
        luggagePieces,
        notes,
      });

      setConfirmedBooking(res);
      toast.success("Transfer booking submitted successfully!");
    } catch {
      toast.error("An error occurred while submitting your booking.");
    }
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen">
      {/* 1. Hero Banner */}
      <TransferHeroBanner />

      {/* 2. Main Booking Flow Container */}
      <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6 sm:space-y-8">
        {confirmedBooking ? (
          <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 shadow-xl border border-[#013E51]/10 text-center space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#013E51]/10 text-[#013E51] font-bold text-xs uppercase tracking-wider">
              Booking Confirmed
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl font-bold text-[#013E51]">
              Thank You, {confirmedBooking.customerName || name}!
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#888888] max-w-lg mx-auto">
              Your private transfer reservation has been received. Our operations team will contact you via {preferredContactMethod} with driver details.
            </p>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/10 max-w-md mx-auto text-left space-y-2 text-sm text-[#013E51]">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Booking Reference:</span>
                <span className="font-bold text-[#013E51]">{confirmedBooking.bookingReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Vehicle:</span>
                <span className="font-bold">{selectedVehicle?.name || "Car"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Total Price:</span>
                <span className="font-bold text-[#E8B34A]">${confirmedBooking.totalPrice?.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setConfirmedBooking(null);
                handleReset();
              }}
              className="bg-[#013E51] hover:bg-[#02516a] text-white font-bold text-sm uppercase tracking-wider py-3.5 px-8 rounded-full transition-colors cursor-pointer"
            >
              Book Another Transfer
            </button>
          </div>
        ) : (
          <>
            {/* Booking Form (From / To / Passengers / Type) */}
            <TransferBookingForm
              fromLocations={fromLocations}
              toLocations={toLocations}
              selectedFromId={selectedFromId}
              selectedToId={selectedToId}
              onFromChange={setSelectedFromId}
              onToChange={setSelectedToId}
              onSwapLocations={handleSwap}
              adults={adults}
              childrenCount={childrenCount}
              onAdultsChange={setAdults}
              onChildrenChange={setChildrenCount}
              isRoundTrip={isRoundTrip}
              onTripTypeChange={setIsRoundTrip}
              onReset={handleReset}
            />

            {/* Vehicle Selection */}
            <TransferVehicleSelector
              vehicles={vehicleTypes}
              selectedVehicleId={selectedVehicleId}
              isRoundTrip={isRoundTrip}
              onSelectVehicle={setSelectedVehicleId}
            />

            {/* Discount Callout Banner */}
            <TransferDiscountBanner
              isRoundTrip={isRoundTrip}
              onActivateRoundTrip={() => setIsRoundTrip(true)}
            />

            {/* Trip Schedule */}
            <TransferScheduleForm
              tripDate={tripDate}
              tripTime={tripTime}
              returnDate={returnDate}
              returnTime={returnTime}
              isRoundTrip={isRoundTrip}
              onTripDateChange={setTripDate}
              onTripTimeChange={setTripTime}
              onReturnDateChange={setReturnDate}
              onReturnTimeChange={setReturnTime}
            />

            {/* Customer Information */}
            <TransferCustomerForm
              name={name}
              nationality={nationality}
              email={email}
              preferredContactMethod={preferredContactMethod}
              phone={phone}
              luggagePieces={luggagePieces}
              onNameChange={setName}
              onNationalityChange={setNationality}
              onEmailChange={setEmail}
              onContactMethodChange={setPreferredContactMethod}
              onPhoneChange={setPhone}
              onLuggageChange={setLuggagePieces}
            />

            {/* Notes & Special Requests */}
            <TransferNotesForm
              notes={notes}
              onNotesChange={setNotes}
            />

            {/* Booking Summary & Submit Action */}
            <TransferBookingSummary
              vehicleTypeName={selectedVehicle?.name || "Car"}
              totalPrice={totalPrice}
              currency="USD"
              isRoundTrip={isRoundTrip}
              fromName={selectedFromName}
              toName={selectedToName}
              tripDate={tripDate}
              tripTime={tripTime}
              returnDate={returnDate}
              returnTime={returnTime}
              adults={adults}
              childrenCount={childrenCount}
              isLoading={createBookingMutation.isPending}
              onSubmit={handleSubmit}
            />

            {/* Need Help? Quick Contact Channels */}
            <TransferHelpContact />
          </>
        )}
      </main>
    </div>
  );
}
