"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
}

export default function TripCard({ trip }: TripCardProps) {
  const { locale } = useLocale();
  const router = useRouter();
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
  const categoryLabel = rawCat.includes("private") ? "Private" : "Group";

  const detailsPath = buildTripDetailsPath(locale, trip.id, trip.name);

  const handleAddToCart = () => {
    const res = addTrip(trip);
    if (res.isNew) {
      toast.success(`"${trip.name}" added to cart.`, {
        action: {
          label: "View Cart",
          onClick: () => router.push(`/${locale}/cart`),
        },
      });
    } else {
      toast.success(
        `Added another adult to "${trip.name}" (${res.quantity} total).`,
        {
          action: {
            label: "View Cart",
            onClick: () => router.push(`/${locale}/cart`),
          },
        }
      );
    }
  };

  return (
    <div className="group bg-white rounded-[28px] overflow-hidden shadow-[0px_12px_32px_0px_#013E511A] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div>
        {/* Image & Trip Type Ribbon on Top Left */}
        <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden bg-slate-100">
          <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-[#013E51]/95 text-white text-xs font-semibold backdrop-blur-xs">
            {tripTypeName}
          </span>

          <Image
            src={imageUrl || "/Trips/heroTrips.png"}
            alt={trip.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

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
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold text-[#013E51] leading-[30px] line-clamp-1">
              {trip.name}
            </h3>
          </Link>

          {/* Price & Reviews Row */}
          <div className="flex items-center justify-between gap-2 pt-1 font-[family-name:var(--font-lato)]">
            <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap shrink-0">
              <span className="font-bold text-xl sm:text-2xl text-[#013E51] whitespace-nowrap">
                {Number(trip.adultPrice).toFixed(2)}&nbsp;&euro;
              </span>
              <span className="text-xs text-[#888888] whitespace-nowrap">EUR / person</span>
            </div>

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
          Book Now
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-3 sm:py-3.5 px-2 sm:px-3 rounded-xl border border-[#013E51] hover:bg-[#013E51]/5 text-[#013E51] text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer whitespace-nowrap"
        >
          <FiShoppingCart className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
