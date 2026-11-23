"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCartStore } from "@/features/cart/useCartStore";
import { calculateCartSummary } from "@/shared/utils/cartPricing";
import CartItemCard from "./CartItemCard";
import CartOrderSummary from "./CartOrderSummary";
import CartEmptyState from "./CartEmptyState";

export default function CartPage() {
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;

  const {
    items,
    promoCode,
    hasHydrated,
    removeTrip,
    updateTravelers,
    updateLeaveDate,
    clearCart,
  } = useCartStore();

  const summary = calculateCartSummary(items, promoCode);

  if (!hasHydrated) {
    return (
      <div className="w-full bg-[#F7EDE1] min-h-screen py-16 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#013E51] border-t-transparent animate-spin" />
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
              href={`/${locale}/trips`}
              className="hover:text-[#013E51] transition-colors"
            >
              {t?.breadcrumbTrips || "Trips"}
            </Link>
            <FiChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#013E51]">
              {t?.breadcrumbCart || "Cart"}
            </span>
          </nav>

          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013E51]">
            {t?.title || "Trip Cart & Booking"}
          </h1>
          <p className="text-sm sm:text-base text-[#013E51]/75 max-w-xl mt-1">
            {t?.description ||
              "Review your selected excursions, choose departure dates, and complete your multi-trip booking in one seamless step."}
          </p>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-5">
              {items.map((item) => (
                <CartItemCard
                  key={item.tripId}
                  item={item}
                  onUpdateTravelers={(counts) =>
                    updateTravelers(item.tripId, counts)
                  }
                  onUpdateLeaveDate={(date) =>
                    updateLeaveDate(item.tripId, date)
                  }
                  onRemove={() => removeTrip(item.tripId)}
                />
              ))}
            </div>

            {/* Right Column: Order Summary with Proceed to Booking */}
            <div className="lg:col-span-4">
              <CartOrderSummary summary={summary} onClearCart={clearCart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
