"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { AccommodationItem } from "@/models/accommodation";

interface AccommodationCardProps {
  item: AccommodationItem;
  onInquire?: (item: AccommodationItem) => void;
}

export default function AccommodationCard({
  item,
  onInquire,
}: AccommodationCardProps) {
  const handleClick = () => {
    if (onInquire) {
      onInquire(item);
    } else {
      const el = document.getElementById("inquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white rounded-[28px] sm:rounded-[34px] p-5 sm:p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer border border-[#888888]/15"
    >
      <div>
        {/* Hotel Image */}
        <div className="relative w-full h-56 sm:h-64 rounded-[22px] sm:rounded-[26px] overflow-hidden mb-5 bg-slate-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Stars Rating Row */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center gap-1 text-[#E8B34A]">
            {Array.from({ length: item.stars }).map((_, index) => (
              <FaStar key={index} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-[family-name:var(--font-lato)] text-xs font-semibold text-[#013E51]">
            {item.stars} Stars
          </span>
        </div>

        {/* Hotel Name */}
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors leading-snug mb-1.5">
          {item.name}
        </h3>

        {/* Location & Short Description */}
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mb-6">
          <span>{item.location}</span>
          <span className="mx-2 text-[#E8B34A]">•</span>
          <span>{item.feature}</span>
        </p>
      </div>

      {/* Inquire Now Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className="w-full bg-[#F7EDE1] hover:bg-[#ebd9c7] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 sm:py-4 rounded-2xl transition-colors text-center cursor-pointer shadow-xs"
      >
        Inquire Now
      </button>
    </article>
  );
}
