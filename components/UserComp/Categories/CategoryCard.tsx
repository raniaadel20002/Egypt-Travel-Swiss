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
      initial={shouldReduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduce ? 0.15 : 0.55,
        delay: shouldReduce ? 0 : (index % 6) * 0.08,
        ease: BRAND_EASE,
      }}
      whileHover={shouldReduce ? undefined : { y: -8 }}
      className="w-full"
    >
      <Link
        href={`/${locale}/trips?type=${category.id}`}
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #013E51 90%)",
        }}
        className="group relative block w-full aspect-[1/1.15] min-h-[420px] sm:min-h-[460px] xl:min-h-[520px] rounded-[22px] sm:rounded-[28px] overflow-hidden border-[2.5px] sm:border-[3px] border-[#E8B34A] shadow-[0px_10px_30px_rgba(1,62,81,0.14)] hover:shadow-[0px_20px_45px_rgba(1,62,81,0.25)] transition-all duration-300"
      >
        {/* Background Category Image */}
        <Image
          src={imageSrc}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Deep Teal Gradient Overlay matching Figma specification */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(1, 62, 81, 0) 35%, rgba(1, 62, 81, 0.92) 100%)",
          }}
        />

        {/* Card Bottom: Big Title & Circular Action Button */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8 xl:p-9 flex items-end justify-between gap-4 z-10">
          <div className="pr-2 min-w-0 flex-1">
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-[36px] lg:text-[42px] xl:text-[46px] font-medium text-white tracking-normal leading-[1.12] group-hover:text-[#E8B34A] transition-colors">
              {category.name}
            </h3>
          </div>

          <div
            aria-hidden="true"
            className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 lg:w-[48px] lg:h-[48px] rounded-full border-[1.5px] border-white/85 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#E8B34A] group-hover:border-[#E8B34A] group-hover:text-[#013E51] shadow-xs"
          >
            <FiArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
