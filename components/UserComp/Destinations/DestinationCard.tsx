"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { DestinationApiItem } from "@/models/destination";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

const EASE = [0.22, 1, 0.36, 1] as const;

interface DestinationCardProps {
  destination: DestinationApiItem;
  index?: number;
}

const DEFAULT_IMAGE =
  "/Destinations/a8d7ee0950cda74d298d598b68d6c4d3b43651e2.jpg";

export default function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const { locale, dictionary: dict } = useLocale();
  const reduced = useReducedMotion();
  
  const imageSrc = destination.imageUrl
    ? resolveApiImageUrl(destination.imageUrl)
    : DEFAULT_IMAGE;

  const cardVariants = {
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: reduced ? 0.1 : 0.7,
      delay: reduced ? 0 : index * 0.12,
      ease: EASE,
    },
  };

  const tripsLabel = destination.tripsCount === 1 
    ? dict.destinations.card.trip 
    : dict.destinations.card.trips;

  return (
    <motion.div {...cardVariants}>
      <Link
        href={`/${locale}/trips?dest=${destination.id}`}
        className="group relative block w-full aspect-[1.05/1] sm:aspect-square rounded-[12px] sm:rounded-[12px] lg:rounded-[12px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-[#013E51]"
      >
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Dark gradient overlay for text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#013E51]/95 via-[#013E51]/0 to-transparent pointer-events-none"
        />

        {/* Card Bottom Row */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8 flex items-end justify-between gap-4 z-10">
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-wide leading-tight group-hover:text-[#E8B34A] transition-colors">
              {destination.name}
            </h2>
            {destination.tripsCount !== undefined && (
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/80 mt-1">
                {destination.tripsCount} {tripsLabel}
              </p>
            )}
          </div>

          <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#013E51] shadow-xs">
            <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
