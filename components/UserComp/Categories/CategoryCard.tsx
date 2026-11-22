"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { TripTypeItem } from "@/models/tripType";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface CategoryCardProps {
  category: TripTypeItem;
  index?: number;
}

const DEFAULT_IMAGE =
  "/Categories/36bf881bb9fc58e52b50ea73b83f231c3c116bd4.jpg";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CategoryCard({
  category,
  index = 0,
}: CategoryCardProps) {
  const { locale } = useLocale();
  const shouldReduce = useReducedMotion();

  const imageSrc = category.imageUrl
    ? resolveApiImageUrl(category.imageUrl)
    : DEFAULT_IMAGE;

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduce ? 0.15 : 0.45,
        delay: shouldReduce ? 0 : (index % 6) * 0.07,
        ease: BRAND_EASE,
      }}
      whileHover={shouldReduce ? undefined : { y: -5 }}
      className="w-full"
    >
      <Link
        href={`/${locale}/trips?type=${category.id}`}
        className="group relative block w-full aspect-[1/1.14] rounded-[20px] sm:rounded-[24px] overflow-hidden border-[2px] sm:border-[2.5px] border-[#E8B34A] shadow-[0px_8px_24px_rgba(1,62,81,0.12)] hover:shadow-[0px_16px_36px_rgba(1,62,81,0.22)] transition-shadow duration-300 bg-[#013E51]"
      >
        {/* Background Category Image */}
        <Image
          src={imageSrc}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Ambient Overlay for High Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#013E51]/95 via-[#013E51]/30 to-transparent pointer-events-none"
        />

        {/* Card Bottom Row: Title on left, circular button on right */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 flex items-end justify-between gap-3 z-10">
          <div className="pr-2">
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-white tracking-wide leading-tight group-hover:text-[#E8B34A] transition-colors">
              {category.name}
            </h3>
          </div>

          <div
            aria-hidden="true"
            className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/80 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#E8B34A] group-hover:border-[#E8B34A] group-hover:text-[#013E51] shadow-xs"
          >
            <FiArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
