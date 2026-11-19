"use client";

import { ACCOMMODATION_ITEMS } from "./accommodationData";
import AccommodationCard from "./AccommodationCard";

export default function AccommodationGridSection() {
  return (
    <section id="inquiry" className="w-full bg-[#F7EDE1] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header: Left details */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#013E51] mb-2 sm:mb-3">
              Stay With Us
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#013E51] tracking-wide leading-tight mb-2 sm:mb-3">
              Accommodation in Egypt
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#013E51] font-normal max-w-xl">
              Handpicked hotels &amp; resorts, from the Red Sea to the Nile.
            </p>
          </div>
        </div>

        {/* Accommodation Cards Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ACCOMMODATION_ITEMS.map((item) => (
            <AccommodationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
