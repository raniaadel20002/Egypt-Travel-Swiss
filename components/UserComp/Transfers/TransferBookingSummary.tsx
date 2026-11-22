"use client";

import { FiShield, FiLoader, FiCheck } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { TransferPreviewPricing } from "@/models/transferBooking";

interface TransferBookingSummaryProps {
  vehicleTypeName: string;
  fromName: string;
  toName: string;
  tripDate: string;
  tripTime: string;
  returnDate: string;
  returnTime: string;
  adults: number;
  childrenCount: number;
  isRoundTrip: boolean;
  additionalHours: number;
  pricing?: TransferPreviewPricing | null;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function TransferBookingSummary({
  vehicleTypeName,
  fromName,
  toName,
  tripDate,
  tripTime,
  returnDate,
  returnTime,
  adults,
  childrenCount,
  isRoundTrip,
  additionalHours,
  pricing,
  isLoading,
  onSubmit,
}: TransferBookingSummaryProps) {
  const { dictionary: dict } = useLocale();
  const t = dict.transfers.summary;

  const totalPassengers = adults + childrenCount;
  const finalPrice = pricing?.finalPrice ?? 0;
  const hasLivePrice = typeof pricing?.finalPrice === "number" && pricing.finalPrice > 0;

  return (
    <div className="w-full bg-[#013E51] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-7 shadow-xl border border-[#E8B34A]/20 space-y-5">
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-white pb-3 mb-2 border-b border-white/10">
        {t.heading}
      </h3>

      <div className="space-y-3.5 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
        {/* Vehicle Class */}
        <div className="flex items-center justify-between">
          <span className="text-white/70">{t.vehicleType}:</span>
          <span className="font-bold text-white text-sm sm:text-base">
            {vehicleTypeName || "Private Vehicle"}
          </span>
        </div>

        {/* Route */}
        <div className="space-y-1">
          <span className="text-white/70 block text-xs">{t.route}:</span>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 font-medium text-xs leading-relaxed text-[#E8B34A] flex items-center gap-2">
            <span>{fromName || "..."}</span>
            {isRoundTrip ? (
              <FaExchangeAlt className="w-3 h-3 text-[#E8B34A] shrink-0" />
            ) : (
              <span className="text-sm">&rarr;</span>
            )}
            <span>{toName || "..."}</span>
          </div>
        </div>

        {/* Service & Headcount */}
        <div className="flex items-center justify-between">
          <span className="text-white/70">{t.service}:</span>
          <span className="font-semibold text-white">
            {isRoundTrip ? t.roundTrip : t.oneWay} &bull; {totalPassengers} Pax
          </span>
        </div>

        {/* Schedule */}
        {tripDate && (
          <div className="flex flex-col gap-0.5 text-xs text-white/90">
            <span className="text-white/70">{t.schedule}:</span>
            <span className="font-medium text-white">
              {tripDate} {tripTime ? `at ${tripTime}` : ""}
            </span>
            {isRoundTrip && returnDate && (
              <span className="font-medium text-white/80">
                {t.returnSchedule}: {returnDate} {returnTime ? `at ${returnTime}` : ""}
              </span>
            )}
          </div>
        )}

        {/* Itemized Price Breakdown */}
        {pricing && (
          <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
            {pricing.outboundPrice > 0 && (
              <div className="flex justify-between text-white/80">
                <span>{t.outboundPrice}:</span>
                <span>&euro;{pricing.outboundPrice.toFixed(2)}</span>
              </div>
            )}

            {isRoundTrip && pricing.returnPrice > 0 && (
              <div className="flex justify-between text-white/80">
                <span>{t.returnPrice}:</span>
                <span>&euro;{pricing.returnPrice.toFixed(2)}</span>
              </div>
            )}

            {isRoundTrip && pricing.discountAmount > 0 && (
              <div className="flex justify-between text-[#19B8A5] font-semibold">
                <span>
                  {t.roundTripDiscount.replace(
                    "{pct}",
                    String(pricing.discountPercentage || 10)
                  )}
                  :
                </span>
                <span>-&euro;{pricing.discountAmount.toFixed(2)}</span>
              </div>
            )}

            {isRoundTrip && additionalHours > 0 && pricing.additionalHoursCost > 0 && (
              <div className="flex justify-between text-[#E8B34A] font-semibold">
                <span>
                  {t.extraHoursCost.replace("{hours}", String(additionalHours))}:
                </span>
                <span>+&euro;{pricing.additionalHoursCost.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {/* Total Price Block */}
        <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
            {t.totalPrice}:
          </span>
          <div className="text-right">
            <span className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#E8B34A]">
              {hasLivePrice ? `\u20AC${finalPrice.toFixed(2)}` : "--"}
            </span>
            <span className="text-[10px] sm:text-xs text-white/60 block mt-0.5">
              {t.allTaxesIncluded}
            </span>
          </div>
        </div>
      </div>

      {/* Guarantee Notice */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-white/70 text-center">
        <FiShield className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
        <span>{t.guarantees}</span>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading || !hasLivePrice}
        className="w-full bg-[#E8B34A] hover:bg-[#d8a339] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <FiLoader className="w-4 h-4 animate-spin" />
            <span>{t.submitting}</span>
          </>
        ) : (
          <>
            <FiCheck className="w-4 h-4 stroke-[2.5]" />
            <span>{hasLivePrice ? t.submit : t.pricingUnavailable}</span>
          </>
        )}
      </button>
    </div>
  );
}
