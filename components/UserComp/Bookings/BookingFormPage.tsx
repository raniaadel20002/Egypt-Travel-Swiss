"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCartStore } from "@/features/cart/useCartStore";
import { calculateCartSummary } from "@/shared/utils/cartPricing";
import CartCheckoutForm from "@/components/UserComp/Cart/CartCheckoutForm";
import CartEmptyState from "@/components/UserComp/Cart/CartEmptyState";
import BookingOrderSidebar from "./BookingOrderSidebar";

export default function BookingFormPage() {
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;
  const { items, promoCode, hasHydrated } = useCartStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const summary = calculateCartSummary(items, promoCode);

  if (!hasHydrated) {
    return (
      <div className="w-full bg-[#F7EDE1] min-h-screen py-16 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#013E51] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div className="w-full bg-[#F7EDE1] min-h-screen py-24 flex flex-col items-center justify-center space-y-4 font-[family-name:var(--font-lato)]">
        <div className="w-12 h-12 rounded-full border-3 border-[#013E51] border-t-transparent animate-spin" />
        <div className="text-center space-y-1">
          <p className="font-bold text-lg text-[#013E51] flex items-center justify-center gap-2">
            <FiCheckCircle className="text-[#E8B34A] w-5 h-5" />
            Booking Submitted Successfully!
          </p>
          <p className="text-xs text-[#013E51]/70">
            Redirecting to your booking confirmation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen py-10 sm:py-14 lg:py-16 font-[family-name:var(--font-lato)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
        {/* Breadcrumb & Header */}
        <div>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-[#013E51]/70 mb-3"
          >
            <Link
              href={`/${locale}`}
              className="hover:text-[#013E51] transition-colors"
            >
              {t?.breadcrumbHome || "Home"}
            </Link>
            <FiChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/${locale}/cart`}
              className="hover:text-[#013E51] transition-colors"
            >
              {t?.breadcrumbCart || "Cart"}
            </Link>
            <FiChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#013E51]">
              {t?.bookingFormBreadcrumb || "Booking Form"}
            </span>
          </nav>

          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013E51]">
            {t?.bookingFormPageTitle || "Complete Your Booking"}
          </h1>
          <p className="text-sm sm:text-base text-[#013E51]/75 max-w-xl mt-1">
            {t?.bookingFormPageDesc ||
              "Enter your lead guest and hotel pickup details to confirm your itinerary and dispatch your booking voucher."}
          </p>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Checkout Form (includes Embedded Promo Code) */}
            <div className="lg:col-span-8">
              <CartCheckoutForm
                summary={summary}
                onRedirecting={() => setIsRedirecting(true)}
              />
            </div>

            {/* Right Column: Booking Order Sidebar */}
            <div className="lg:col-span-4">
              <BookingOrderSidebar summary={summary} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
