"use client";

import { useTransferPageForm } from "@/features/transfers/useTransferPageForm";
import TransferHeroBanner from "./TransferHeroBanner";
import TransferDiscountBanner from "./TransferDiscountBanner";
import TransferBookingForm from "./TransferBookingForm";
import TransferVehicleSelector from "./TransferVehicleSelector";
import TransferScheduleForm from "./TransferScheduleForm";
import TransferCustomerForm from "./TransferCustomerForm";
import TransferNotesForm from "./TransferNotesForm";
import TransferBookingSummary from "./TransferBookingSummary";
import TransferHelpContact from "./TransferHelpContact";

export default function TransferPage() {
  const form = useTransferPageForm();

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen">
      <TransferHeroBanner />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Multi-Step Configuration */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8">
            <TransferDiscountBanner
              isRoundTrip={form.isRoundTrip}
              discountPercentage={form.previewData?.pricing?.discountPercentage || 10}
              onActivateRoundTrip={() => form.setIsRoundTrip(true)}
            />

            <TransferBookingForm
              fromLocations={form.fromLocations}
              toLocations={form.toLocations}
              selectedFromId={form.selectedFromId}
              selectedToId={form.selectedToId}
              onFromChange={form.setSelectedFromId}
              onToChange={form.setSelectedToId}
              onSwapLocations={form.handleSwap}
              adults={form.adults}
              childrenCount={form.childrenCount}
              onAdultsChange={form.setAdults}
              onChildrenChange={form.setChildrenCount}
              isRoundTrip={form.isRoundTrip}
              onTripTypeChange={form.setIsRoundTrip}
              onReset={form.handleReset}
            />

            <TransferVehicleSelector
              vehicles={form.vehicles}
              matchedVehicleId={form.previewData?.vehicleTypeTransferId}
              selectedVehicleId={form.selectedVehicleId}
              isRoundTrip={form.isRoundTrip}
              previewPrice={form.previewData?.pricing?.finalPrice}
              onSelectVehicle={form.setSelectedVehicleId}
            />

            <TransferScheduleForm
              tripDate={form.tripDate}
              tripTime={form.tripTime}
              returnDate={form.returnDate}
              returnTime={form.returnTime}
              isRoundTrip={form.isRoundTrip}
              additionalHours={form.additionalHours}
              onTripDateChange={form.setTripDate}
              onTripTimeChange={form.setTripTime}
              onReturnDateChange={form.setReturnDate}
              onReturnTimeChange={form.setReturnTime}
              onAdditionalHoursChange={form.setAdditionalHours}
            />

            <TransferCustomerForm
              name={form.name}
              countryTransferId={form.countryTransferId}
              countries={form.countries}
              email={form.email}
              communicationMethod={form.communicationMethod}
              phone={form.phone}
              onNameChange={form.setName}
              onCountryChange={form.setCountryTransferId}
              onEmailChange={form.setEmail}
              onCommunicationMethodChange={form.setCommunicationMethod}
              onPhoneChange={form.setPhone}
            />

            <TransferNotesForm
              notes={form.notes}
              onNotesChange={form.setNotes}
            />

            <TransferHelpContact />
          </div>

          {/* Right Column: Sticky Booking Summary */}
          <div className="lg:col-span-5 xl:col-span-4 relative h-full">
            <div className="sticky top-28 self-start space-y-4">
              <TransferBookingSummary
                vehicleTypeName={form.selectedVehicleName}
                fromName={form.selectedFromName}
                toName={form.selectedToName}
                tripDate={form.tripDate}
                tripTime={form.tripTime}
                returnDate={form.returnDate}
                returnTime={form.returnTime}
                adults={form.adults}
                childrenCount={form.childrenCount}
                isRoundTrip={form.isRoundTrip}
                additionalHours={form.additionalHours}
                pricing={form.previewData?.pricing}
                isLoading={form.isSubmitting}
                onSubmit={form.handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
