"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import { TripApiItem } from "@/models/trip";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { buildTripDetailsPath } from "@/shared/utils/slugify";
import { useCartStore } from "@/features/cart/useCartStore";
import TripRatingBadge from "./TripRatingBadge";

interface TripCardProps {
  trip: TripApiItem;
  index?: number;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TripCard({ trip, index = 0 }: TripCardProps) {
  const { locale, dictionary } = useLocale();
  const t = dictionary.tripsPage?.card || {
    perPerson: "EUR / person",
    bookNow: "Book Now",
    addToCart: "Add to Cart",
    addedToCart: '"{title}" added to cart.',
    viewCart: "View Cart",
    categoryPrivate: "Private",
    categoryGroup: "Group",
  };

  const router = useRouter();
  const shouldReduce = useReducedMotion();
  const addTrip = useCartStore((state) => state.addTrip);

  const primaryImageRaw =
    trip.images?.find((img) => img.isPrimary)?.imageUrl ||
    trip.images?.[0]?.imageUrl ||
    trip.destinationInfo?.imageUrl ||
    "/Trips/heroTrips.png";

  const imageUrl = resolveApiImageUrl(primaryImageRaw);

  const destinationName =
    trip.destination || trip.destinationInfo?.name || "Hurghada";

  const tripTypeName = trip.tripTypeName || "Trip";

  const rawCat = trip.categoryName?.trim().toLowerCase() || "";
  const categoryLabel = rawCat.includes("private")
    ? t.categoryPrivate
    : t.categoryGroup;

  const isPriceOnContact = Number(trip.adultPrice) <= 0;

  const detailsPath = buildTripDetailsPath(locale, trip.id, trip.name);

  const handleCardClick = (e: React.MouseEvent) => {
    // Navigate unless clicking an action button directly
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;
    router.push(detailsPath);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const res = addTrip(trip);
    const toastMessage = t.addedToCart.replace("{title}", trip.name);
    toast.success(toastMessage, {
      action: {
        label: t.viewCart,
        onClick: () => router.push(`/${locale}/cart`),
      },
    });
  };

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: shouldReduce ? 0.15 : 0.45,
        delay: shouldReduce ? 0 : (index % 6) * 0.08,
        ease: BRAND_EASE,
      }}
      whileHover={shouldReduce ? undefined : { y: -6 }}
      onClick={handleCardClick}
      className="group bg-white rounded-[28px] overflow-hidden shadow-[0px_12px_32px_0px_#013E511A] flex flex-col justify-between transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
    >
      <div>
        {/* Clickable Image & Trip Type Ribbon */}
        <Link href={detailsPath} className="block relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden bg-slate-100">
          <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-[#013E51]/95 text-white text-xs font-semibold backdrop-blur-xs shadow-xs">
            {tripTypeName}
          </span>

          <Image
            src={imageUrl || "/Trips/heroTrips.png"}
            alt={trip.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes("heroTrips")) {
                target.src = "/Trips/heroTrips.png";
              }
            }}
          />
        </Link>

        {/* Card Information */}
        <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
          {/* Location & Category Row */}
          <div className="flex items-center justify-between gap-2 font-[family-name:var(--font-lato)]">
            <span className="flex items-center gap-1.5 text-[#19B8A5] font-bold text-[14px] leading-none shrink-0">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#19B8A5] shrink-0" />
              <span className="truncate max-w-[150px]">{destinationName}</span>
            </span>

            <span className="text-[#013E51] font-semibold text-xs sm:text-sm shrink-0">
              {categoryLabel}
            </span>
          </div>

          {/* Trip Title */}
          <Link
            href={detailsPath}
            className="block group-hover:text-[#19B8A5] transition-colors"
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold text-[#013E51] leading-[30px] line-clamp-3 min-h-[60px]">
              {trip.name}
            </h3>
          </Link>

          {/* Price & Reviews Row */}
          <div className="flex items-center justify-between gap-2 pt-1 font-[family-name:var(--font-lato)]">
            {isPriceOnContact ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#E8B34A]/15 text-[#013E51] font-bold text-xs sm:text-[13px] border border-[#E8B34A]/30">
                {t.priceOnContact || "Price available on contact"}
              </span>
            ) : (
              <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap shrink-0">
                <span className="font-bold text-xl sm:text-2xl text-[#013E51] whitespace-nowrap">
                  {Number(trip.adultPrice).toFixed(2)}&nbsp;&euro;
                </span>
                <span className="text-xs text-[#888888] whitespace-nowrap">{t.perPerson}</span>
              </div>
            )}

            <TripRatingBadge tripId={trip.id} />
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 grid grid-cols-2 gap-2 sm:gap-3 font-[family-name:var(--font-lato)]">
        <Link
          href={detailsPath}
          className="w-full py-3 sm:py-3.5 px-2.5 sm:px-4 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center text-center shadow-xs cursor-pointer whitespace-nowrap"
        >
          {t.bookNow}
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-3 sm:py-3.5 px-2 sm:px-3 rounded-xl border border-[#013E51] hover:bg-[#013E51]/5 text-[#013E51] text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer whitespace-nowrap"
        >
          <FiShoppingCart className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
          <span>{t.addToCart}</span>
        </button>
      </div>
    </motion.div>
  );
}
