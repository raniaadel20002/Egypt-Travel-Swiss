"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { HotelApiItem } from "@/models/hotel";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { buildAccommodationDetailsPath } from "@/shared/utils/slugify";

interface AccommodationCardProps {
  hotel: HotelApiItem;
  onInquire: (hotel: HotelApiItem) => void;
}

const FALLBACK_IMAGE =
  "/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg";

export default function AccommodationCard({
  hotel,
  onInquire,
}: AccommodationCardProps) {
  const router = useRouter();
  const { locale } = useLocale();

  const detailsPath = buildAccommodationDetailsPath(
    locale,
    hotel.id,
    hotel.name
  );

  const primaryImg =
    hotel.images?.find((img) => img.isPrimary)?.imageUrl ||
    hotel.images?.[0]?.imageUrl;
  const imageSrc = primaryImg ? resolveApiImageUrl(primaryImg) : FALLBACK_IMAGE;

  // Extract top 2 facilities for clean pills
  const topFacilities = (hotel.facilities || [])
    .slice(0, 2)
    .map((f) => f.name || f.values?.[0])
    .filter(Boolean);

  const starCount = Math.max(1, Math.min(5, hotel.rate || 5));

  const handleCardClick = () => {
    router.push(detailsPath);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-[#013E51]/10 cursor-pointer"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-100">
          <Image
            src={imageSrc}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Floating Star Rating Badge */}
          <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm">
            <div className="flex items-center text-[#E8B34A]">
              {Array.from({ length: starCount }).map((_, idx) => (
                <FaStar key={idx} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="font-[family-name:var(--font-lato)] text-xs font-bold text-[#013E51]">
              {starCount}-Star
            </span>
          </div>

          {/* Luxury Resort Tag */}
          <div className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-[#013E51]/85 backdrop-blur-md text-[11px] font-semibold text-[#E8B34A] tracking-wider uppercase shadow-sm font-[family-name:var(--font-lato)]">
            Verified Stay
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#19B8A5] font-[family-name:var(--font-lato)] mb-2">
            <FaMapMarkerAlt className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{hotel.location || "Egypt"}</span>
          </div>

          {/* Hotel Name */}
          <Link
            href={detailsPath}
            onClick={(e) => e.stopPropagation()}
            className="block"
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors leading-snug line-clamp-1 mb-2">
              {hotel.name}
            </h3>
          </Link>

          {/* Description Excerpt */}
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed line-clamp-2 mb-4">
            {hotel.description}
          </p>

          {/* Facility Pills */}
          {topFacilities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {topFacilities.map((facility, idx) => (
                <span
                  key={idx}
                  className="font-[family-name:var(--font-lato)] text-[11px] font-medium text-[#013E51] bg-[#F7EDE1] px-2.5 py-1 rounded-lg truncate max-w-[150px]"
                >
                  {facility}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer: Two buttons (Details + Inquire) */}
      <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5">
        <Link
          href={detailsPath}
          onClick={(e) => e.stopPropagation()}
          className="w-full text-center py-2.5 px-3 rounded-xl border border-[#013E51] text-[#013E51] hover:bg-[#013E51] hover:text-white transition-colors duration-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1"
        >
          <span>Details</span>
          <FiArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInquire(hotel);
          }}
          className="w-full bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all duration-200 text-center cursor-pointer shadow-sm flex items-center justify-center"
        >
          <span>Inquire</span>
        </button>
      </div>
    </article>
  );
}
