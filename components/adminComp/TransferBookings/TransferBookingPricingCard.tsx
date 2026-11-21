import { TransferBookingPricing } from "@/models/transferBooking";

interface TransferBookingPricingCardProps {
  pricing: TransferBookingPricing;
  priceEur: number;
}

export default function TransferBookingPricingCard({
  pricing,
  priceEur,
}: TransferBookingPricingCardProps) {
  return (
    <div className="space-y-3 font-[family-name:var(--font-lato)]">
      <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
        <span className="font-bold text-[#E8B34A] text-sm">&euro;</span>
        <span>Pricing Breakdown (EUR)</span>
      </h3>
      <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Outbound Price:</span>
          <span className="font-semibold text-gray-700">
            {Number(pricing.outboundPriceUsd).toFixed(2)} &euro;
          </span>
        </div>
        {pricing.returnPriceUsd > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">Return Price:</span>
            <span className="font-semibold text-gray-700">
              {Number(pricing.returnPriceUsd).toFixed(2)} &euro;
            </span>
          </div>
        )}
        {pricing.discountAmountUsd > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Discount ({pricing.discountPercentage}%):</span>
            <span>-{Number(pricing.discountAmountUsd).toFixed(2)} &euro;</span>
          </div>
        )}
        {pricing.additionalHours > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">
              Additional Hours ({pricing.additionalHours}h @ {pricing.additionalHoursRateUsd}&euro;):
            </span>
            <span className="font-semibold text-gray-700">
              +{Number(pricing.additionalHoursCostUsd).toFixed(2)} &euro;
            </span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 flex justify-between items-center text-sm">
          <span className="font-bold text-[#013E51]">Final Total:</span>
          <span className="font-extrabold text-[#013E51] text-base">
            {Number(priceEur).toFixed(2)} &euro;
          </span>
        </div>
      </div>
    </div>
  );
}
