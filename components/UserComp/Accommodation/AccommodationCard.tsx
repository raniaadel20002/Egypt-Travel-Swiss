"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { HotelApiItem } from "@/models/hotel";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { buildAccommodationDetailsPath } from "@/shared/utils/slugify";

const EASE = [0.22, 1, 0.36, 1] as const;

interface AccommodationCardProps {
  hotel: HotelApiItem;
  index?: number;
}

const FALLBACK_IMAGE =
  "/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg";

export default function AccommodationCard({
  hotel,
  index = 0,
}: AccommodationCardProps) {
  const router = useRouter();
  const { locale, dictionary: dict } = useLocale();
  const reduced = useReducedMotion();

  const detailsPath = buildAccommodationDetailsPath(
    locale,
    hotel.id,
    hotel.name
  );

  const primaryImg =
    hotel.images?.find((img) => img.isPrimary)?.imageUrl ||
    hotel.images?.[0]?.imageUrl;
  const imageSrc = primaryImg ? resolveApiImageUrl(primaryImg) : FALLBACK_IMAGE;

  const topFacilities = (hotel.facilities || [])
    .slice(0, 2)
    .map((f) => f.name || f.values?.[0])
    .filter(Boolean);

  const starCount = Math.max(1, Math.min(5, hotel.rate || 5));

  const cardVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduced ? 0.1 : 0.5,
      delay: reduced ? 0 : index * 0.08,
      ease: EASE,
    },
  };

  const badgeVariant = (delay: number) => ({
    initial: { opacity: 0, scale: reduced ? 1 : 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: reduced ? 0.1 : 0.4,
      delay: reduced ? 0 : delay + index * 0.08,
      ease: EASE,
    },
  });

  const handleCardClick = () => {
    router.push(detailsPath);
  };

  return (
    <motion.article
      {...cardVariant}
      onClick={handleCardClick}
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              transition: { duration: 0.3, ease: EASE },
            }
      }
      className="group bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
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
          <motion.div
            {...badgeVariant(0.1)}
            className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center text-[#E8B34A]">
              {Array.from({ length: starCount }).map((_, idx) => (
                <FaStar key={idx} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="font-[family-name:var(--font-lato)] text-xs font-bold text-[#013E51]">
              {starCount}-{dict.accommodation.card.star}
            </span>
          </motion.div>

          {/* Verified Stay Tag */}
          <motion.div
            {...badgeVariant(0.2)}
            className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-[#013E51]/85 backdrop-blur-md text-[11px] font-semibold text-[#E8B34A] tracking-wider uppercase shadow-sm font-[family-name:var(--font-lato)]"
          >
            {dict.accommodation.card.verifiedStay}
          </motion.div>
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

      {/* Card Action Footer */}
      <div className="p-5 sm:p-6 pt-0">
        <Link
          href={detailsPath}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all duration-200 text-center shadow-xs flex items-center justify-center gap-1.5"
        >
          <span>{dict.accommodation.card.details}</span>
          <FiArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}
