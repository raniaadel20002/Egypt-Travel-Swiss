"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface AccommodationItem {
  id: string;
  name: string;
  location: string;
  feature: string;
  rating: number;
  image: string;
  href: string;
}

const ACCOMMODATIONS: AccommodationItem[] = [
  {
    id: "jaz-aquamarine",
    name: "Jaz Aquamarine Resort",
    location: "Hurghada",
    feature: "All-Inclusive Beachfront",
    rating: 5,
    image: "/home/Accommodation/0318738f5c14426967c57ff8e0e9dbf3df21077c.png",
    href: "#accommodation",
  },
  {
    id: "three-corners-fayrouz",
    name: "Three Corners Fayrouz Plaza",
    location: "Marsa Alam",
    feature: "House Reef",
    rating: 5,
    image: "/home/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg",
    href: "#accommodation",
  },
  {
    id: "sonesta-st-george",
    name: "Sonesta St. George Hotel",
    location: "Luxor",
    feature: "Nilefront Palace",
    rating: 5,
    image: "/home/Accommodation/3de35f7a3ab464ff9164086e4b9ffbb4d5c04df7.jpg",
    href: "#accommodation",
  },
];

export default function AccommodationSection() {
  const { locale } = useLocale();

  return (
    <section id="accommodation" className="w-full bg-[#013E51] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header: Left details & Right Inquiry button (desktop only) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B34A] mb-2 sm:mb-3">
              Stay With Us
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-white tracking-wide leading-tight mb-2 sm:mb-3">
              Accommodation in Egypt
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-white/80 font-normal max-w-xl">
              Handpicked hotels & resorts, from the Red Sea to the Nile.
            </p>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex self-start sm:self-auto px-7 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/90 text-white font-[family-name:var(--font-lato)] text-sm sm:text-base font-medium hover:bg-white hover:text-[#013E51] transition-all duration-300 shadow-sm"
          >
            Inquiry Service
          </Link>
        </div>

        {/* 3 Accommodation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {ACCOMMODATIONS.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-[28px] p-4 sm:p-5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Framed Image Container */}
                <div className="relative w-full aspect-[16/10.5] rounded-[20px] overflow-hidden shadow-inner">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Stars Rating Row */}
                <div className="flex items-center gap-1 mt-4 sm:mt-5 mb-2">
                  {Array.from({ length: hotel.rating }).map((_, index) => (
                    <FaStar key={index} className="w-3.5 h-3.5 text-[#E8B34A]" />
                  ))}
                  <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold text-[#013E51] ml-2">
                    {hotel.rating} Stars
                  </span>
                </div>

                {/* Hotel Title */}
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] tracking-wide leading-tight mb-1">
                  {hotel.name}
                </h3>

                {/* Location & Key Feature */}
                <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#777777] font-normal mb-6">
                  {hotel.location} <span className="text-[#E8B34A]">•</span> {hotel.feature}
                </p>
              </div>

              {/* Action Button */}
              <Link
                href={`/${locale}${hotel.href}`}
                className="w-full py-3 sm:py-3.5 rounded-full bg-[#F5EAD9] hover:bg-[#ebd8bf] text-[#013E51] font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base text-center transition-colors duration-200 block shadow-xs"
              >
                Inquire Now
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Inquiry Service Button */}
        <div className="mt-8 text-center block sm:hidden">
          <Link
            href={`/${locale}/contact`}
            className="w-full inline-flex items-center justify-center py-3.5 px-8 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-bold text-sm hover:bg-white/10 transition-colors shadow-sm"
          >
            Inquiry Service
          </Link>
        </div>
      </div>
    </section>
  );
}
