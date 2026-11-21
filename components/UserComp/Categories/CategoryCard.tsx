"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { TripTypeItem } from "@/models/tripType";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface CategoryCardProps {
  category: TripTypeItem;
}

const DEFAULT_IMAGE =
  "/Categories/36bf881bb9fc58e52b50ea73b83f231c3c116bd4.jpg";

export default function CategoryCard({ category }: CategoryCardProps) {
  const { locale } = useLocale();
  const imageSrc = category.imageUrl
    ? resolveApiImageUrl(category.imageUrl)
    : DEFAULT_IMAGE;

  return (
    <Link
      href={`/${locale}/trips?type=${category.id}`}
      className="group relative block w-full aspect-[1.05/1] sm:aspect-square rounded-[28px] sm:rounded-[34px] lg:rounded-[38px] overflow-hidden border-2 sm:border-[2.5px] border-[#E8B34A] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-[#013E51]"
    >
      {/* Background Category Image */}
      <Image
        src={imageSrc}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
      />

      {/* Bottom Gradient Overlay for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#013E51]/95 via-[#013E51]/30 to-transparent pointer-events-none"
      />

      {/* Card Bottom Row: Title on left, circular button on right */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8 flex items-end justify-between gap-4 z-10">
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white tracking-wide leading-tight group-hover:text-[#E8B34A] transition-colors">
            {category.name}
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/80 mt-1">
            Explore Tours
          </p>
        </div>

        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#013E51] shadow-xs">
          <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
