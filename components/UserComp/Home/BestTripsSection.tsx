"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface BestTripItem {
  id: string;
  badge: string;
  title: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: string;
  image: string;
  href: string;
}

const BEST_TRIPS: BestTripItem[] = [
  {
    id: "safari-trip",
    badge: "Safari Trip",
    title: "Sunset Quad & Camel Safari",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 689,
    price: "35.00 $",
    image: "/home/BestTrips/fa452a480e54c1859a0f6f83bd4c063a070fe249.jpg",
    href: "/bookings?trip=sunset-quad-safari",
  },
  {
    id: "snorkeling-trip",
    badge: "Snorkeling Trip",
    title: "Giftun Island Snorkeling Cruise",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 689,
    price: "35.00 $",
    image: "/home/BestTrips/dfc6b17a4bf77886765b45cb670f0e28ea86f6be.jpg",
    href: "/bookings?trip=giftun-island-snorkeling",
  },
  {
    id: "historical-trip",
    badge: "Historical Trip",
    title: "Giza Pyramids & Sphinx Tour",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 689,
    price: "35.00 $",
    image: "/home/BestTrips/0570d7caa05e04d1874d5dde31079a9c92d86570.jpg",
    href: "/bookings?trip=giza-pyramids-tour",
  },
];

export default function BestTripsSection() {
  const { locale } = useLocale();

  return (
    <section className="relative w-full bg-[#013E51] overflow-hidden py-16 sm:py-20 lg:py-20">
      {/* Background Watermark Outlines */}
      <div className="absolute top-6 left-6 w-24 h-24 sm:w-32 sm:h-32 opacity-50 pointer-events-none">
        <Image
          src="/home/BestTrips/mask.svg"
          alt=""
          width={120}
          height={120}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute top-8 right-6 w-24 h-24 sm:w-32 sm:h-32 opacity-50 pointer-events-none scale-x-[-1]">
        <Image
          src="/home/BestTrips/mask.svg"
          alt=""
          width={120}
          height={120}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-170 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 opacity-50 pointer-events-none">
        <Image
          src="/home/BestTrips/fish.svg"
          alt=""
          width={110}
          height={110}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-39 left-1/4 w-20 h-20 sm:w-24 sm:h-24 opacity-50 pointer-events-none -rotate-12 hidden sm:block">
        <Image
          src="/home/BestTrips/fish.svg"
          alt=""
          width={90}
          height={90}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-29 right-10 w-24 h-24 sm:w-28 sm:h-28 opacity-50 pointer-events-none hidden sm:block">
        <Image
          src="/home/BestTrips/fish.svg"
          alt=""
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title with Golden Fading Gradient Lines */}
        <div className="text-center mb-2">
          <div className="inline-flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-l-full"
              style={{
                background:
                  "linear-gradient(to right, rgb(232, 179, 74) 0%, rgb(232, 179, 74) 35%, rgba(232, 179, 74, 0) 100%)",
              }}
            />

            <h2 className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-2xl sm:text-4xl lg:text-[56px] font-bold tracking-[0.08em] uppercase leading-none">
              <span className="text-white">BEST </span>
              <span className="text-[#E8B34A] italic">TRIPS</span>
            </h2>

            <span
              aria-hidden="true"
              className="block shrink-0 w-16 sm:w-24 md:w-28 h-[3px] rounded-r-full"
              style={{
                background:
                  "linear-gradient(to left, rgb(232, 179, 74) 0%, rgb(232, 179, 74) 35%, rgba(232, 179, 74, 0) 100%)",
              }}
            />
          </div>
        </div>

        {/* Section Subtitle */}
        <p className="font-[family-name:var(--font-lato)] text-center text-sm sm:text-base text-white/85 max-w-2xl mx-auto mb-12 sm:mb-16">
          Our most loved experiences across Egypt, from the Red Sea reefs to the
          timeless wonders of the Nile.
        </p>

        {/* 3 Trips Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEST_TRIPS.map((trip) => (
            <div
              key={trip.id}
              className="group bg-white rounded-[28px] overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Image & Badge Container */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-[#013E51]/95 text-white text-xs font-semibold backdrop-blur-xs">
                    {trip.badge}
                  </span>

                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Information */}
                <div className="p-6 space-y-4">
                  {/* Location & Reviews Row */}
                  <div className="flex items-center justify-between text-xs font-[family-name:var(--font-lato)]">
                    <span className="flex items-center gap-1.5 text-[#888888] font-medium">
                      <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#888888]" />
                      <span>{trip.location}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <FaStar className="w-3.5 h-3.5 text-[#E8B34A]" />
                      <span className="font-bold text-[#013E51]">
                        {trip.rating}
                      </span>
                      <span className="text-[#888888]">
                        ({trip.reviewsCount} Reviews)
                      </span>
                    </span>
                  </div>

                  {/* Trip Title */}
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold text-[#013E51] leading-tight line-clamp-1">
                    {trip.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pt-1 font-[family-name:var(--font-lato)]">
                    <span className="font-bold text-2xl text-[#013E51]">
                      {trip.price}
                    </span>
                    <span className="text-xs text-[#888888]">USD / person</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 font-[family-name:var(--font-lato)]">
                <Link
                  href={`/${locale}${trip.href}`}
                  className="w-full py-3 px-4 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-colors flex items-center justify-center text-center shadow-xs"
                >
                  Book Now
                </Link>

                <Link
                  href={`/${locale}${trip.href}`}
                  className="w-full py-3 px-4 rounded-xl border border-[#013E51] hover:bg-[#013E51]/5 text-[#013E51] text-sm font-semibold transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <FiShoppingCart className="w-4 h-4 shrink-0" />
                  <span>Add to Cart</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href={`/${locale}/trips`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors shadow-sm"
          >
            <span>View More</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
