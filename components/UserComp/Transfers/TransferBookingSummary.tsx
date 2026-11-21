"use client";

import { FiShield, FiLoader } from "react-icons/fi";

interface TransferBookingSummaryProps {
  vehicleTypeName: string;
  totalPrice: number;
  currency: string;
  isRoundTrip: boolean;
  fromName: string;
  toName: string;
  tripDate: string;
  tripTime: string;
  returnDate: string;
  returnTime: string;
  adults: number;
  childrenCount: number;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function TransferBookingSummary({
  vehicleTypeName,
  totalPrice,
  currency,
  isRoundTrip,
  fromName,
  toName,
  tripDate,
  tripTime,
  returnDate,
  returnTime,
  adults,
  childrenCount,
  isLoading,
  onSubmit,
}: TransferBookingSummaryProps) {
  const displayPrice = (totalPrice ?? 0).toFixed(2);
  const totalPassengers = adults + childrenCount;

  return (
    <div className="space-y-6">
      {/* Dark Navy Summary Container */}
      <div className="w-full bg-[#013E51] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-xl border border-[#E8B34A]/20">
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-white pb-4 mb-5 border-b border-white/10">
          Booking Summary
        </h3>

        <div className="space-y-4 text-sm font-[family-name:var(--font-lato)]">
          {/* Vehicle Type Row */}
          <div className="flex items-center justify-between">
            <span className="text-white/70">Vehicle Type:</span>
            <span className="font-bold text-white text-base">{vehicleTypeName}</span>
          </div>

          {/* Route Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
            <span className="text-white/70">Route:</span>
            <span className="font-semibold text-white/95 text-right max-w-sm truncate">
              {fromName || "Select Pickup"} &rarr; {toName || "Select Destination"}
            </span>
          </div>

          {/* Type & Passengers */}
          <div className="flex items-center justify-between">
            <span className="text-white/70">Service:</span>
            <span className="font-semibold text-white">
              {isRoundTrip ? "Round Trip (10% Discount Applied)" : "One Way"} &bull; {totalPassengers} Pax
            </span>
          </div>

          {/* Schedule */}
          {tripDate && (
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-white/70">Schedule:</span>
              <span className="font-semibold text-white/95">
                {tripDate} at {tripTime || "Anytime"}
                {isRoundTrip && returnDate ? ` | Return: ${returnDate} at ${returnTime || "Anytime"}` : ""}
              </span>
            </div>
          )}

          {/* Total Price Row */}
          <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Total Price:
            </span>
            <div className="text-right">
              <span className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#E8B34A]">
                &euro;{displayPrice}
              </span>
              <span className="text-xs text-white/60 block">{currency} &bull; All taxes &amp; fees included</span>
            </div>
          </div>
        </div>

        {/* Guarantee Pill */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-white/80">
          <FiShield className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>Best Price Guarantee &bull; Licensed &amp; Insured Chauffeurs &bull; Free Cancellation</span>
        </div>
      </div>

      {/* Primary Submit Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full sm:w-auto min-w-[280px] bg-[#013E51] hover:bg-[#02516a] text-white hover:text-[#E8B34A] border border-[#013E51] font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base uppercase tracking-wider py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
        >
          {isLoading ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              <span>Processing Reservation...</span>
            </>
          ) : (
            <span>Submit Booking</span>
          )}
        </button>
      </div>
    </div>
  );
}
