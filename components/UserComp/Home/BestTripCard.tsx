"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { TripApiItem } from "@/models/trip";
import { useCartStore } from "@/features/cart/useCartStore";
import { buildTripDetailsPath } from "@/shared/utils/slugify";

const EASING = [0.22, 1, 0.36, 1] as const;

export interface BestTripItemData {
  id: number;
  name: string;
  description?: string;
  location: string;
  adultPrice: number;
  currencyName: string;
  categoryName?: string;
  imageUrl: string | null;
  durationValue?: number;
  durationTypeName?: string;
  markerID: string;
}

interface BestTripCardProps {
  trip: BestTripItemData;
  rawTrip?: TripApiItem;
  index: number;
  locale: string;
  dict: any;
  shouldReduceMotion: boolean | null;
}

export default function BestTripCard({
  trip,
  rawTrip,
  index,
  locale,
  dict,
  shouldReduceMotion,
}: BestTripCardProps) {
  const t = dict.homePage.bestTrips;
  const router = useRouter();
  const addTrip = useCartStore((state) => state.addTrip);
  const detailsPath = buildTripDetailsPath(locale, trip.id, trip.name);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (rawTrip) {
      addTrip(rawTrip);
      toast.success(`"${trip.name}" added to cart.`, {
        action: {
          label: "View Cart",
          onClick: () => router.push(`/${locale}/cart`),
        },
      });
    } else {
      router.push(detailsPath);
    }
  };

  return (
    <motion.div
      className="group bg-white rounded-[28px] overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: EASING,
      }}
    >
      <div>
        {/* Image & Badge Container - Clickable Link */}
        <Link
          href={detailsPath}
          className="block relative w-full h-64 sm:h-72 overflow-hidden bg-[#013E51]/10 cursor-pointer"
        >
          {trip.categoryName && (
            <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-[#013E51]/90 text-white text-xs font-semibold backdrop-blur-md shadow-xs">
              {trip.categoryName}
            </span>
          )}

          {trip.imageUrl ? (
            <Image
              src={trip.imageUrl}
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
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#013E51] to-[#025a75] flex items-center justify-center">
              <span className="text-white/60 text-sm">{t.noImage}</span>
            </div>
          )}
        </Link>

        {/* Card Information */}
        <div className="p-6 space-y-4">
          {/* Location & Duration Row */}
          <div className="flex items-center justify-between text-xs font-[family-name:var(--font-lato)]">
            <span className="flex items-center gap-1.5 text-[#888888] font-medium">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span className="line-clamp-1">{trip.location}</span>
            </span>

            {trip.durationValue && trip.durationTypeName && (
              <span className="text-[#888888] font-medium shrink-0">
                {trip.durationValue} {trip.durationTypeName}
              </span>
            )}
          </div>

          {/* Trip Title - Clickable Link */}
          <Link
            href={detailsPath}
            className="block group-hover:text-[#025a75] transition-colors"
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold text-[#013E51] leading-tight line-clamp-3 min-h-[56px]">
              {trip.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 font-[family-name:var(--font-lato)]">
            {Number(trip.adultPrice) <= 0 ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#E8B34A]/15 text-[#013E51] font-bold text-xs sm:text-[13px] border border-[#E8B34A]/30">
                {t.priceOnContact || "Price available on contact"}
              </span>
            ) : (
              <>
                <span className="font-bold text-2xl text-[#013E51]">
                  {trip.adultPrice.toFixed(2)} {trip.currencyName || "€"}
                </span>
                <span className="text-xs text-[#888888]">{t.perPerson}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 font-[family-name:var(--font-lato)]">
        <Link
          href={detailsPath}
          className="w-full py-3 px-4 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-all flex items-center justify-center text-center shadow-xs active:scale-[0.98]"
        >
          {t.bookNow}
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-3 px-4 rounded-xl border border-[#013E51] hover:bg-[#013E51]/5 text-[#013E51] text-sm font-semibold transition-all flex items-center justify-center gap-2 text-center active:scale-[0.98] cursor-pointer"
        >
          <FiShoppingCart className="w-4 h-4 shrink-0" />
          <span>{t.addToCart}</span>
        </button>
      </div>
    </motion.div>
  );
}
