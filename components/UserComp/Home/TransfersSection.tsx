"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface VehicleOption {
  id: string;
  name: string;
  capacity: string;
  icon: string;
  href: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "car",
    name: "Car",
    capacity: "1–3 passengers",
    icon: "/home/TRANSFERS/car.svg",
    href: "#transfers",
  },
  {
    id: "minibus",
    name: "Minibus",
    capacity: "4–7 passengers",
    icon: "/home/TRANSFERS/minibus.svg",
    href: "#transfers",
  },
  {
    id: "bus",
    name: "bus",
    capacity: "8–18 passengers",
    icon: "/home/TRANSFERS/bus.svg",
    href: "#transfers",
  },
];

export default function TransfersSection() {
  const { locale } = useLocale();

  return (
    <section id="transfers" className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main Banner Card */}
        <div className="relative rounded-[32px] sm:rounded-[40px] lg:rounded-[44px] overflow-hidden bg-[#013E51] shadow-2xl flex flex-col lg:flex-row lg:items-center min-h-[480px] lg:min-h-[500px]">
          {/* Mobile/Tablet Top Photo Banner (matches Figma responsive design) */}
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
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[46%] overflow-hidden pointer-events-none z-0">
            <Image
              src="/home/TRANSFERS/transfer-person.jpg"
              alt="Airport and private transfers in Egypt"
              fill
              priority
              className="object-cover object-left opacity-100"
            />
            {/* Soft dissolve gradient into deep teal background on desktop */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-28 sm:w-40 lg:w-56 bg-gradient-to-r from-transparent to-[#013E51]"
            />
          </div>

          {/* Banner Inner Content: Aligned with Figma reference */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-12 lg:p-14 lg:pl-[46%] flex flex-col justify-center">
            {/* Eyebrow Subtitle */}
            <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#E8B34A] mb-2.5 sm:mb-3">
              TRANSFERS
            </span>

            {/* Main Heading */}
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.15] mb-3 sm:mb-4 max-w-[620px]">
              Comfortable Airport &amp; Private Transfers
            </h2>

            {/* Paragraph Description */}
            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-[15px] text-white/80 font-normal leading-relaxed mb-6 sm:mb-8 max-w-[580px]">
              Arrive relaxed. Licensed drivers, modern air-conditioned vehicles
              and fixed prices – from airport pickups to inter-city rides.
            </p>

            {/* 3 Vehicle Cards: Horizontal on mobile, cards on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-7 sm:mb-9 max-w-[720px]">
              {VEHICLE_OPTIONS.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  href={`/${locale}${vehicle.href}`}
                  className="group bg-white rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-3.5 sm:gap-0 sm:min-h-[145px] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-7 h-7 relative sm:mb-4 shrink-0">
                    <Image
                      src={vehicle.icon}
                      alt={vehicle.name}
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex sm:block items-baseline sm:items-start gap-2 sm:gap-0">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-2xl font-bold text-[#013E51] leading-tight group-hover:text-[#E8B34A] transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="font-[family-name:var(--font-lato)] text-xs text-[#013E51]/60 font-medium sm:mt-1">
                      {vehicle.capacity}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Action Buttons: Stacked on mobile, row on tablet/desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href={`/${locale}/bookings?service=transfer`}
                className="w-full sm:w-auto inline-flex items-center justify-center h-[50px] px-8 rounded-full bg-[#E8B34A] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base hover:bg-[#d8a33a] transition-colors shadow-md text-center"
              >
                Book a Transfer
              </Link>
              <Link
                href={`/${locale}/trips?category=transfers`}
                className="w-full sm:w-auto inline-flex items-center justify-center h-[50px] px-8 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-medium text-sm sm:text-base hover:bg-white/10 transition-colors text-center"
              >
                Transfers Overview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
