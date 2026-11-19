"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { DestinationItem } from "@/models/destination";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface DestinationCardProps {
  destination: DestinationItem;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const { locale } = useLocale();

  return (
    <Link
      href={`/${locale}${destination.href}`}
      className="group relative block w-full aspect-[1.05/1] sm:aspect-square rounded-[28px] sm:rounded-[34px] lg:rounded-[36px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-[#013E51]"
    >
      {/* Background Image */}
      <Image
        src={destination.image}
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
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-wide leading-tight group-hover:text-[#E8B34A] transition-colors">
          {destination.name}
        </h2>

        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#013E51] shadow-xs">
          <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
