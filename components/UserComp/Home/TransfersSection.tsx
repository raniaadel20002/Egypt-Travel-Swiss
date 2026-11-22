"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaCar, FaVanShuttle, FaBusSimple } from "react-icons/fa6";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface VehicleOption {
  id: string;
  name: string;
  capacity: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "car",
    name: "Car",
    capacity: "1–3 passengers",
    icon: FaCar,
    href: "/transfers",
  },
  {
    id: "minibus",
    name: "Minibus",
    capacity: "4–7 passengers",
    icon: FaVanShuttle,
    href: "/transfers",
  },
  {
    id: "bus",
    name: "Bus",
    capacity: "8–18 passengers",
    icon: FaBusSimple,
    href: "/transfers",
  },
];

export default function TransfersSection() {
  const { locale } = useLocale();
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="transfers"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FAF7F2] overflow-hidden font-[family-name:var(--font-lato)]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main Banner Card */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
          className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden bg-[#013E51] shadow-2xl flex flex-col lg:flex-row lg:items-center min-h-[460px] lg:min-h-[480px]"
        >
          {/* Mobile/Tablet Top Photo Banner */}
          <div className="lg:hidden relative w-full h-56 sm:h-64 overflow-hidden pointer-events-none">
            <Image
              src="/home/TRANSFERS/transfer-person.jpg"
              alt="Airport and private transfers in Egypt"
              fill
              priority
              className="object-cover object-top"
            />
          </div>

          {/* Desktop Left Side Background Photo */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[44%] overflow-hidden pointer-events-none z-0">
            <Image
              src="/home/TRANSFERS/transfer-person.jpg"
              alt="Airport and private transfers in Egypt"
              fill
              priority
              className="object-cover object-left opacity-100"
            />
            {/* Soft dissolve gradient into deep teal background */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-32 sm:w-44 lg:w-56 bg-gradient-to-r from-transparent via-[#013E51]/70 to-[#013E51]"
            />
          </div>

          {/* Banner Inner Content */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-12 lg:p-14 lg:pl-[45%] flex flex-col justify-center">
            {/* Eyebrow Subtitle */}
            <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#E8B34A] mb-2 sm:mb-2.5">
              TRANSFERS
            </span>

            {/* Main Heading */}
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.15] mb-3 sm:mb-3.5 max-w-[620px]">
              Comfortable Airport &amp; Private Transfers
            </h2>

            {/* Paragraph Description */}
            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-[14px] text-white/80 font-normal leading-relaxed mb-6 sm:mb-8 max-w-[560px]">
              Arrive relaxed. Licensed drivers, modern air-conditioned vehicles
              and fixed prices &ndash; from airport pickups to inter-city rides.
            </p>

            {/* 3 Clean Vehicle Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-7 sm:mb-8 max-w-[680px]">
              {VEHICLE_OPTIONS.map((vehicle) => {
                const IconComponent = vehicle.icon;
                return (
                  <Link
                    key={vehicle.id}
                    href={`/${locale}${vehicle.href}`}
                    className="group bg-white rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-3 sm:gap-0 sm:min-h-[135px] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-8 h-8 sm:mb-3 flex items-center justify-center text-[#013E51] group-hover:text-[#E8B34A] transition-colors shrink-0">
                      <IconComponent className="w-6 h-6 text-current" />
                    </div>
                    <div className="flex sm:block items-baseline sm:items-start gap-2 sm:gap-0">
                      <h3 className="font-[family-name:var(--font-lato)] text-base sm:text-lg font-bold text-[#013E51] leading-tight group-hover:text-[#E8B34A] transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="font-[family-name:var(--font-lato)] text-[11px] sm:text-xs text-[#013E51]/60 font-medium sm:mt-1">
                        {vehicle.capacity}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Single CTA: Book a Transfer */}
            <div>
              <Link
                href={`/${locale}/transfers`}
                className="inline-flex items-center justify-center h-[48px] sm:h-[50px] px-8 rounded-full bg-[#E8B34A] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base hover:bg-[#d8a33a] transition-all shadow-md hover:shadow-lg text-center"
              >
                Book a Transfer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
