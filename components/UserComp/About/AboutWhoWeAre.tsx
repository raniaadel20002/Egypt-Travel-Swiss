"use client";

import Image from "next/image";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function AboutWhoWeAre() {
  const { dictionary: dict } = useLocale();
  const s = dict.about.whoWeAre;

  return (
    <section id="who-we-are" className="w-full scroll-mt-24">
      {/* Big Card: 24px radius, no shadow, gold border */}
      <div className="bg-white rounded-[24px] p-7 sm:p-9 lg:p-10 border-[1px] border-[#E8B34A]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story & Highlights */}
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#013E51] tracking-tight mb-5 leading-tight">
              {s.heading}
            </h2>

            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#000000] leading-relaxed mb-4 font-normal">
              {s.para1}
            </p>

            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#000000] leading-relaxed mb-6 sm:mb-8 font-normal">
              {s.para2}
            </p>

            {/* Tags Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#F7EDE1] border-[1px] border-[#E8B34A] text-[#013E51] font-[family-name:var(--font-lato)] text-xs font-semibold rounded-full px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Photo of Tourists at Ancient Site (24px radius) */}
          <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[20px] overflow-hidden">
            <Image
              src="/About/cfc0a9880495c470c8e408984b6ed9a9657182c7.jpg"
              alt="Tourists exploring historical sites in Egypt"
              fill
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
