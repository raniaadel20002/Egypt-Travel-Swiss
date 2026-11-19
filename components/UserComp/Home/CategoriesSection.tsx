"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "snorkeling",
    title: "Snorkeling",
    subtitle: "Reefs & Courses",
    image: "/home/Categories/5af697b0125109949149af917bc7716385d9cf04.png",
    href: "/trips?category=snorkeling",
  },
  {
    id: "safari",
    title: "Safari",
    subtitle: "Desert Adventures & Wildlife",
    image: "/home/Categories/fa452a480e54c1859a0f6f83bd4c063a070fe249.jpg",
    href: "/trips?category=safari",
  },
  {
    id: "culture",
    title: "Culture",
    subtitle: "Heritage & Local Traditions",
    image: "/home/Categories/36bf881bb9fc58e52b50ea73b83f231c3c116bd4.jpg",
    href: "/trips?category=culture",
  },
  {
    id: "diving",
    title: "Diving",
    subtitle: "Coral Reefs & Marine Life",
    image: "/home/Categories/f9ac485c9b51592a41c4e5df356b680e572f38b4.jpg",
    href: "/trips?category=diving",
  },
  {
    id: "flighting",
    title: "Flighting",
    subtitle: "Scenic Flights & Sky Views",
    image: "/home/Categories/aa09f6d53a1939da0b6f2f5880a2bdd1318dfa6a.jpg",
    href: "/trips?category=flighting",
  },
];

export default function CategoriesSection() {
  const { locale } = useLocale();

  return (
    <section className="w-full py-16 sm:py-20 bg-[#F7EDE1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title with Decorative Lines */}

        <div className="text-center mb-2">
          <div className="inline-flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-l-full"
              style={{
                background:
                  "linear-gradient(to right, rgb(1, 62, 81) 0%, rgb(1, 62, 81) 35%, rgba(1, 62, 81, 0) 100%)",
              }}
            />

            <h2 className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-2xl sm:text-4xl lg:text-[50px] font-bold tracking-[0.04em] text-[#013E51] uppercase leading-none">
              Categories
            </h2>

            <span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-l-none rounded-r-full"
              style={{
                background:
                  "linear-gradient(to left, rgb(1, 62, 81) 0%, rgb(1, 62, 81) 35%, rgba(1, 62, 81, 0) 100%)",
              }}
            />
          </div>
        </div>


        {/* Subtitle & View All Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 text-center sm:text-left">
          <p className="font-[family-name:var(--font-lato)] text-base sm:text-xl lg:text-[22px] text-[#888888] font-normal mx-auto sm:mx-0">
            Everything for Your Egyptian Adventure
          </p>

          <Link
            href={`/${locale}/categories`}
            className="hidden sm:inline-flex items-center gap-1.5 font-[family-name:var(--font-lato)] text-base font-semibold text-[#013E51] hover:text-[#E8B34A] transition-colors group self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 5 Arch Shaped Cards Grid (Horizontal scroll on mobile, grid on tablet/desktop) */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-7 snap-x snap-mandatory">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}${category.href}`}
              className="group flex flex-col items-center w-[200px] sm:w-auto shrink-0 sm:shrink snap-center"
            >
              {/* Arch / Pill Capsule Container with Golden Border */}
              <div className="relative w-full aspect-[1/1.7] rounded-[200px] overflow-hidden border-[4px] sm:border-[5px] border-[#E8B34A] shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mt-3.5 sm:mt-5 space-y-1">
                <h3 className="font-[family-name:var(--font-lato)] text-base sm:text-xl lg:text-[22px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors">
                  {category.title}
                </h3>
                <p className="font-[family-name:var(--font-lato)] text-[11px] sm:text-[13px] text-[#013E51]/80 font-bold">
                  {category.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button (Matches Figma responsive design) */}
        <div className="mt-8 sm:hidden flex justify-center w-full">
          <Link
            href={`/${locale}/categories`}
            className="w-full max-w-sm h-[50px] rounded-full border-2 border-[#013E51] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-sm flex items-center justify-center hover:bg-[#013E51] hover:text-white transition-colors"
          >
            View all Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
