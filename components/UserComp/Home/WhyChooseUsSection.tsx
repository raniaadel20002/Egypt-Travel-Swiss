"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LuShieldCheck, LuStar, LuUser, LuHotel } from "react-icons/lu";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function WhyChooseUsSection() {
  const { locale, dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const w = dictionary.whyChooseUs;

  const promiseItems = [
    {
      id: "safety",
      number: "1",
      title: w.safetyTitle,
      subtitle: w.safetySubtitle,
      icon: LuShieldCheck,
    },
    {
      id: "exclusive",
      number: "2",
      title: w.exclusiveTitle,
      subtitle: w.exclusiveSubtitle,
      icon: LuStar,
    },
    {
      id: "guides",
      number: "3",
      title: w.guidesTitle,
      subtitle: w.guidesSubtitle,
      icon: LuUser,
    },
    {
      id: "hotels",
      number: "4",
      title: w.hotelsTitle,
      subtitle: w.hotelsSubtitle,
      icon: LuHotel,
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="relative w-full py-4 sm:py-6 lg:py-8 bg-white overflow-hidden font-[family-name:var(--font-lato)]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Heading, Description, and 2x2 Value Cards */}
          <div className="order-1 lg:order-none lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            {/* Header Content */}
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, ease: BRAND_EASE }}
              className="text-center lg:text-left mb-6 sm:mb-8"
            >
              <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-[#E8B34A] mb-2 sm:mb-3">
                {w.eyebrow}
              </span>

              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-bold leading-[1.1] mb-3 sm:mb-4 tracking-tight">
                <span className="italic font-normal text-[#E8B34A]">{w.why}</span>
                <span className="text-[#013E51]"> {w.chooseUs}</span>
              </h2>

              <p className="font-[family-name:var(--font-lato)] text-sm sm:text-[15px] lg:text-base text-[#013E51]/75 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                {w.description}
              </p>
            </motion.div>

            {/* 2x2 Grid of Value Cards with Concentric Number Badges */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-5 w-full">
              {promiseItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
                  whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: BRAND_EASE,
                  }}
                >
                  <div className="flex flex-col items-center w-full select-none">
                    {/* Concentric Number Badge: Outer warm sand/cream ring + inner navy circle */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5ECE1] flex items-center justify-center p-1 sm:p-1.5 shadow-xs mb-2.5">
                      <div className="w-full h-full rounded-full bg-[#013E51] text-white flex items-center justify-center font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold">
                        {item.number}
                      </div>
                    </div>

                    {/* Card Body: Distinct darker slate-blue gradient matching the design */}
                    <div className="w-full bg-gradient-to-br from-[#CAD6DD] via-[#D5DFE5] to-[#E8EEF2] rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-4.5 flex items-center gap-3 sm:gap-3.5 shadow-[0_8px_24px_rgba(1,62,81,0.06)] border border-white/80">
                      {/* Icon inside white container */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-[16px] bg-white flex items-center justify-center shrink-0 shadow-xs border border-white/90 text-[#E0B660]">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-[family-name:var(--font-lato)] text-xs sm:text-[14px] font-bold text-[#013E51] leading-tight truncate">
                          {item.title}
                        </h3>
                        <p className="font-[family-name:var(--font-lato)] text-[10px] sm:text-[12px] text-[#5A7382] font-normal mt-0.5 leading-snug truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Balanced Watercolor Pyramids Artwork */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: BRAND_EASE }}
            className="order-2 lg:order-none lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end w-full relative"
          >
            <div className="relative w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[680px] xl:max-w-[720px] h-[340px] sm:h-[440px] md:h-[500px] lg:h-[560px] xl:h-[620px] flex items-center justify-center lg:justify-end">
              <Image
                src="/home/WhyChooseUs/traveler-pyramids.png"
                alt="Traveler with open arms in front of the Pyramids of Giza"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain object-center lg:object-right select-none drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
