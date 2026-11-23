"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCalendar, FiUsers, FiShield, FiTag } from "react-icons/fi";
import { CartPricingSummary } from "@/models/cart";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCartStore } from "@/features/cart/useCartStore";

interface BookingOrderSidebarProps {
  summary: CartPricingSummary;
}

export default function BookingOrderSidebar({ summary }: BookingOrderSidebarProps) {
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;
  const { items } = useCartStore();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 space-y-5 font-[family-name:var(--font-lato)] sticky top-28">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          {t?.summaryTitle || "Order Summary"}
        </h3>
        <Link
          href={`/${locale}/cart`}
          className="text-xs font-semibold text-[#19B8A5] hover:text-[#013E51] transition-colors flex items-center gap-1"
        >
          <FiArrowLeft className="w-3 h-3" />
          <span>{t?.backToCart || "Back to Cart"}</span>
        </Link>
      </div>

      {/* Itemized Excursions */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {items.map((it) => (
          <div
            key={it.tripId}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8F9FA] border border-gray-100"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-200">
              <Image
                src={it.imageUrl || "/Trips/heroTrips.png"}
                alt={it.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 text-xs">
              <h4 className="font-bold text-[#013E51] truncate">{it.name}</h4>
              <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <FiCalendar className="w-3 h-3 text-[#E8B34A]" />
                  {it.leaveDate}
                </span>
                <span className="flex items-center gap-1">
                  <FiUsers className="w-3 h-3 text-[#E8B34A]" />
                  {(it.noAdult || 0) + (it.noChild || 0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="pt-3 border-t border-gray-100 space-y-2.5 text-xs text-[#013E51]/80">
        <div className="flex items-center justify-between">
          <span>{t?.subtotal || "Subtotal"}</span>
          <span className="font-semibold text-[#013E51]">
            &euro;{summary.subtotal.toFixed(2)}
          </span>
        </div>

        {summary.discountAmount > 0 && (
          <div className="flex items-center justify-between text-emerald-700 font-bold">
            <span className="flex items-center gap-1">
              <FiTag className="w-3 h-3" />
              {t?.promoDiscount || "Promo Discount"}
            </span>
            <span>-&euro;{summary.discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
          <div>
            <span className="font-bold text-sm text-[#013E51] block">
              {summary.hasOnContactTrip
                ? "Partial Estimated Total"
                : (t?.estimatedTotal || "Total Amount")}
            </span>
            {summary.hasOnContactTrip && (
              <span className="text-[10px] text-amber-700 font-semibold block">
                {t?.includesOnContact || "Partial price (excludes items on contact)"}
              </span>
            )}
          </div>
          <span className="font-bold text-xl text-[#013E51]">
            {summary.hasOnContactTrip ? (
              summary.finalTotal > 0 ? (
                <>
                  &euro;{summary.finalTotal.toFixed(0)}{" "}
                  <span className="text-xs font-semibold text-amber-700">
                    + Contact
                  </span>
                </>
              ) : (
                <span className="text-sm text-amber-700">
                  {t?.priceOnContact || "On Contact"}
                </span>
              )
            ) : (
              <>&euro;{summary.finalTotal.toFixed(0)}</>
            )}
          </span>
        </div>
      </div>

      {/* Trust Notice */}
      <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-xs text-slate-500 leading-snug">
        <FiShield className="w-4 h-4 text-[#E8B34A] shrink-0 mt-0.5" />
        <span>Free cancellation up to 24h before excursion departure. No booking fees.</span>
      </div>
    </div>
  );
}
