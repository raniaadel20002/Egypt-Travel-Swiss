"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { TripItem } from "@/models/trip";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface TripCardProps {
  trip: TripItem;
}

export default function TripCard({ trip }: TripCardProps) {
  const { locale } = useLocale();

  return (
    <div className="group bg-white rounded-[28px] overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div>
        {/* Image & Badge Container */}
        <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-100">
          <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-[#013E51]/95 text-white text-xs font-semibold backdrop-blur-xs">
            {trip.badge}
          </span>

          <Image
            src={trip.image}
            alt={trip.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Card Information */}
        <div className="p-6 space-y-4">
          {/* Location & Reviews Row */}
          <div className="flex items-center justify-between text-xs font-[family-name:var(--font-lato)]">
            <span className="flex items-center gap-1.5 text-[#19B8A5] font-semibold">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#19B8A5]" />
              <span>{trip.location}</span>
            </span>

            <span className="flex items-center gap-1">
              <FaStar className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span className="font-bold text-[#013E51]">{trip.rating}</span>
              <span className="text-[#888888]">({trip.reviewsCount} Reviews)</span>
            </span>
          </div>

          {/* Trip Title */}
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold text-[#013E51] leading-tight line-clamp-1">
            {trip.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 font-[family-name:var(--font-lato)]">
            <span className="font-bold text-2xl text-[#013E51]">
              {trip.price}
            </span>
            <span className="text-xs text-[#888888]">USD / person</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 font-[family-name:var(--font-lato)]">
        <Link
          href={`/${locale}${trip.href}`}
          className="w-full py-3.5 px-4 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-colors flex items-center justify-center text-center shadow-xs"
        >
          Book Now
        </Link>

        <Link
          href={`/${locale}${trip.href}`}
          className="w-full py-3.5 px-4 rounded-xl border border-[#013E51] hover:bg-[#013E51]/5 text-[#013E51] text-sm font-semibold transition-colors flex items-center justify-center gap-2 text-center"
        >
          <FiShoppingCart className="w-4 h-4 shrink-0" />
          <span>Add to Cart</span>
        </Link>
      </div>
    </div>
  );
}
