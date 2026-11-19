"use client";

import Image from "next/image";
import Link from "next/link";
import { LuShieldCheck, LuStar, LuUser, LuHotel } from "react-icons/lu";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface PromiseItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: typeof LuShieldCheck;
}

const PROMISE_ITEMS: PromiseItem[] = [
  {
    id: "safety",
    number: "1",
    title: "Safety First Always",
    subtitle: "Certified & insured",
    icon: LuShieldCheck,
  },
  {
    id: "exclusive",
    number: "2",
    title: "Exclusive Trips",
    subtitle: "Curated experiences",
    icon: LuStar,
  },
  {
    id: "guides",
    number: "3",
    title: "Professional Guides",
    subtitle: "Local experts",
    icon: LuUser,
  },
  {
    id: "hotels",
    number: "4",
    title: "Hand-Picked Hotels",
    subtitle: "Top-rated stays",
    icon: LuHotel,
  },
];

export default function WhyChooseUsSection() {
  const { locale } = useLocale();

  return (
    <section id="why-choose-us" className="relative w-full py-2 sm:py-6 lg:py-8 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16 items-center">
          {/* Header: Order 1 on mobile, Col 1 Row 1 on desktop */}
          <div className="order-1 lg:order-none text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Eyebrow */}
            <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#E8B34A] mb-2 sm:mb-3">
              OUR PROMISE
            </span>

            {/* Main Heading */}
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#013E51] leading-tight mb-4">
              <span className="italic text-[#E8B34A]">Why</span> Choose Us
            </h2>

            {/* Paragraph Description */}
            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#013E51]/80 font-normal leading-relaxed">
              From the Red Sea reefs to the temples of the Nile, we plan every
              detail so you can simply enjoy an authentic, safe and
              unforgettable Egyptian journey.
            </p>
          </div>

          {/* Painterly Traveler & Pyramids Image: Order 2 on mobile, Col 2 on desktop */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 relative w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[750px] lg:max-w-[900px] xl:max-w-[1000px] h-[400px] sm:h-[500px] lg:h-[720px] xl:h-[800px]">
              <Image
                src="/home/WhyChooseUs/traveler-pyramids.png"
                alt="Traveler with open arms in front of the Pyramids of Giza"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-center lg:object-right select-none"
              />
            </div>
          </div>

          {/* 2x2 Grid of Value Cards: Order 3 on mobile, Col 1 Row 2 on desktop */}
          <div className="order-3 lg:order-none lg:col-start-1 w-full max-w-xl mx-auto lg:mx-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-10 lg:gap-15">
              {PROMISE_ITEMS.map((item) => (
                <Link
                  key={item.number}
                  href={`/${locale}/about#${item.id}`}
                  className="group flex flex-col items-center w-full"
                >
                  {/* Floating Number Badge */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#013E51] text-white flex items-center justify-center font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold shadow-md mb-4 group-hover:bg-[#E8B34A] group-hover:text-[#013E51] transition-colors">
                    {item.number}
                  </div>

                  {/* Card Body: Vertical centered on mobile, horizontal on desktop */}
                  <div className="w-full h-full bg-gradient-to-br from-[#E2E6E8] via-[#D5DADC] to-[#ECEFF1] rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-5 flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-white/60">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs text-[#E8B34A]">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                    <div className="min-w-0 w-full">
                      <h3 className="font-[family-name:var(--font-lato)] text-xs sm:text-base font-bold text-[#013E51] leading-tight group-hover:text-[#E8B34A] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-[family-name:var(--font-lato)] text-[10px] sm:text-xs text-[#013E51]/70 font-normal mt-0.5 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
