"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function CartEmptyState() {
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;

  return (
    <div className="bg-white rounded-[28px] p-10 sm:p-16 text-center shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 max-w-xl mx-auto space-y-6 font-[family-name:var(--font-lato)]">
      <div className="w-20 h-20 mx-auto rounded-full bg-[#F7EDE1] flex items-center justify-center text-[#013E51]">
        <FiShoppingCart className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51]">
          {t?.emptyTitle || "Your Cart is Empty"}
        </h2>
        <p className="text-sm sm:text-base text-[#013E51]/70 max-w-md mx-auto">
          {t?.emptyDesc ||
            "You haven't added any trips or excursions to your cart yet. Explore our collection of handpicked adventures across Egypt."}
        </p>
      </div>

      <div>
        <Link
          href={`/${locale}/trips`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-colors shadow-xs"
        >
          {t?.exploreTrips || "Explore Trips"}
        </Link>
      </div>
    </div>
  );
}
