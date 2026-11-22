"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FiTrash2, FiShoppingBag, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { CartPricingSummary } from "@/models/cart";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCartStore } from "@/features/cart/useCartStore";
import CartPromoCodeSection from "./CartPromoCodeSection";

interface CartOrderSummaryProps {
  summary: CartPricingSummary;
  onClearCart: () => void;
}

export default function CartOrderSummary({
  summary,
  onClearCart,
}: CartOrderSummaryProps) {
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;
  const { items, promoCode, setPromoCode } = useCartStore();

  const whatsappInquiryUrl = useMemo(() => {
    const lines = [
      "Hello Egypt Travel Swiss! I have excursions in my booking cart with 'Price on contact':",
      ...items.map(
        (it) =>
          `- ${it.name} (${it.categoryLabel}) for ${it.noAdult} Adults, ${it.noChild} Children on ${it.leaveDate}`
      ),
      "Please let me know the full confirmed price for my booking.",
    ];
    return `https://wa.me/201004829104?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [items]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 space-y-6 font-[family-name:var(--font-lato)] sticky top-28">
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
        {t?.summaryTitle || "Order Summary"}
      </h3>

      {/* Promo Code Box */}
      <div className="pb-4 border-b border-gray-100">
        <CartPromoCodeSection
          appliedPromo={promoCode}
          onApplyPromo={setPromoCode}
        />
      </div>

      {/* Metrics Breakdown */}
      <div className="space-y-3 text-sm text-[#013E51]/80">
        <div className="flex items-center justify-between">
          <span>{t?.selectedExcursions || "Selected Excursions"}</span>
          <span className="font-semibold text-[#013E51]">{summary.itemCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>{t?.totalTravelers || "Total Travelers"}</span>
          <span className="font-semibold text-[#013E51]">{summary.totalTravelers}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>{t?.subtotal || "Subtotal"}</span>
          <span className="font-semibold text-[#013E51]">
            &euro;{summary.subtotal.toFixed(2)}
          </span>
        </div>

        {summary.discountAmount > 0 && (
          <div className="flex items-center justify-between text-emerald-700 font-semibold">
            <span>{t?.promoDiscount || "Promo Discount"}</span>
            <span>-&euro;{summary.discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
          <div>
            <span className="font-bold text-base text-[#013E51] block">
              {summary.hasOnContactTrip
                ? "Partial Estimated Total"
                : (t?.estimatedTotal || "Estimated Total")}
            </span>
            {summary.hasOnContactTrip && (
              <span className="text-[11px] text-amber-700 font-semibold block">
                {t?.includesOnContact || "Partial price (excludes items on contact)"}
              </span>
            )}
          </div>
          <span className="font-bold text-2xl text-[#013E51]">
            {summary.hasOnContactTrip ? (
              summary.finalTotal > 0 ? (
                <>
                  &euro;{summary.finalTotal.toFixed(0)}{" "}
                  <span className="text-xs font-semibold text-amber-700">
                    + Contact
                  </span>
                </>
              ) : (
                <span className="text-base text-amber-700">
                  {t?.priceOnContact || "On Contact"}
                </span>
              )
            ) : (
              <>&euro;{summary.finalTotal.toFixed(0)}</>
            )}
          </span>
        </div>
      </div>

      {/* On-Contact WhatsApp Alert */}
      {summary.hasOnContactTrip && (
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-amber-950 space-y-2.5">
          <div className="flex items-start gap-2">
            <FiInfo className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              {t?.onContactAlert ||
                "You can still book directly below! Note that the price shown here is not the full total as some excursions have prices available on contact. Please contact us on WhatsApp so you have the full price."}
            </p>
          </div>
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>{t?.inquireWhatsApp || "Contact on WhatsApp for Full Price"}</span>
          </a>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2.5 pt-2 border-t border-gray-100">
        <Link
          href={`/${locale}/trips`}
          className="w-full py-3.5 px-4 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 text-center shadow-xs"
        >
          <FiShoppingBag className="w-4 h-4" />
          <span>{t?.addMoreTrips || "Add More Trips"}</span>
        </Link>

        <button
          type="button"
          onClick={onClearCart}
          className="w-full py-2.5 px-4 rounded-xl text-xs text-[#888888] hover:text-red-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          <span>{t?.clearCart || "Clear Cart"}</span>
        </button>
      </div>
    </div>
  );
}
