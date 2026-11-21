"use client";

import Link from "next/link";
import { FiTrash2, FiShoppingBag, FiInfo } from "react-icons/fi";
import { CartPricingSummary } from "@/models/cart";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface CartOrderSummaryProps {
  summary: CartPricingSummary;
  onClearCart: () => void;
}

export default function CartOrderSummary({
  summary,
  onClearCart,
}: CartOrderSummaryProps) {
  const { locale } = useLocale();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 space-y-6 font-[family-name:var(--font-lato)] sticky top-28">
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
        Summary
      </h3>

      <div className="space-y-3 text-sm text-[#013E51]/80">
        <div className="flex items-center justify-between">
          <span>Selected Excursions</span>
          <span className="font-semibold text-[#013E51]">{summary.itemCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Total Travelers</span>
          <span className="font-semibold text-[#013E51]">{summary.totalTravelers}</span>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
          <span className="font-bold text-base text-[#013E51]">Estimated Total</span>
          <span className="font-bold text-2xl text-[#013E51]">
            &euro;{summary.subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Notice regarding checkout */}
      <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-gray-200/70 text-xs text-[#013E51]/75 flex items-start gap-2.5">
        <FiInfo className="w-4 h-4 text-[#013E51] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Your excursions and selected departure dates are safely saved in your
          cart. Direct booking checkout will be available shortly.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <Link
          href={`/${locale}/trips`}
          className="w-full py-3.5 px-4 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 text-center shadow-xs"
        >
          <FiShoppingBag className="w-4 h-4" />
          <span>Add More Trips</span>
        </Link>

        <button
          type="button"
          onClick={onClearCart}
          className="w-full py-2.5 px-4 rounded-xl text-xs text-[#888888] hover:text-red-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>
    </div>
  );
}
