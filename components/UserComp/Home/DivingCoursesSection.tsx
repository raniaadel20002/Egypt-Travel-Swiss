"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { buildDivingCourseDetailsPath } from "@/shared/utils/slugify";
import { useDivingCoursesQuery } from "@/features/divingCourses/useDivingCourses";
import { DivingCourseApiItem } from "@/models/divingCourse";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BACKUP_COURSE_IMAGES = [
  "/home/DivingCourses/f9ac485c9b51592a41c4e5df356b680e572f38b4.jpg",
  "/home/DivingCourses/e715a186a1ca02953412c259f4475f7f89d5b7f6.jpg",
  "/home/DivingCourses/dfc6b17a4bf77886765b45cb670f0e28ea86f6be.jpg",
];

interface DisplayCourse {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  href: string;
}

function extractRealSubtitle(course: DivingCourseApiItem): string {
  const durationFacility = course.facilities?.find(
    (f) =>
      /duration|durée|durata|durată|длительность|продолжительность/i.test(f.name || "") ||
      f.icon === "clock"
  );

  const depthFacility = course.facilities?.find(
    (f) =>
      /depth|profondeur|profondità|adâncime|глубина/i.test(f.name || "") ||
      f.icon === "water"
  );

  const duration = durationFacility?.values?.split("(")[0]?.trim() || durationFacility?.values?.trim();
  const depth = depthFacility?.values?.split("(")[0]?.trim() || depthFacility?.values?.trim();

  if (duration && depth) {
    return `${duration} • ${depth}`;
  }
  if (duration) return duration;
  if (depth) return depth;
  return "";
}

function formatPriceString(price: number, currency: string, fromLabel: string): string {
  const code = (currency || "EUR").toUpperCase();
  const symbol = code === "USD" ? "$" : code === "EUR" ? "€" : code === "GBP" ? "£" : "$";
  return `${fromLabel} ${symbol}${price}`;
}

export default function DivingCoursesSection() {
  const { locale, dictionary } = useLocale();
  const shouldReduce = useReducedMotion();

  const d = dictionary.homePage?.divingCourses;
  const backendLanguage = localeToBackendLanguage(locale);

  const { data, isLoading } = useDivingCoursesQuery({
    pageNumber: 1,
    pageSize: 6,
    language: backendLanguage,
  });

  const displayCourses = useMemo<DisplayCourse[]>(() => {
    const rawList = data?.data || [];
    const fromWord = d?.from || "From";

    return rawList.slice(0, 3).map((item, idx) => {
      const rawImg = item.images?.[0]?.imageUrl || item.images?.[0]?.url;
      const image = rawImg ? resolveApiImageUrl(rawImg) : BACKUP_COURSE_IMAGES[idx % BACKUP_COURSE_IMAGES.length];

      return {
        id: item.id,
        title: item.name,
        subtitle: extractRealSubtitle(item),
        price: formatPriceString(item.price, item.currency, fromWord),
        image,
        href: buildDivingCourseDetailsPath(locale, item.id, item.name),
      };
    });
  }, [data, d?.from, locale]);

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16 bg-[#FAF7F2] overflow-hidden font-[family-name:var(--font-lato)]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Rounded Hero Banner */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: BRAND_EASE }}
          className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden shadow-2xl min-h-[480px] sm:min-h-[520px] lg:min-h-[540px] flex items-center"
        >
          {/* Panoramic Scuba Diving Background Image */}
          <Image
            src="/home/DivingCourses/Gemini_Generated_Image_fdmthjfdmthjfdmt 1.png"
            alt={d?.heading || "Learn to Dive in the Red Sea"}
            fill
            priority
            sizes="(max-width: 1560px) 100vw, 1560px"
            className="object-cover object-[center_30%]"
          />

          {/* Deep Ocean Gradient Overlay */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#012533]/95 via-[#012f40]/80 to-transparent"
          />
          <div
            aria-hidden="true"
            className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#012533]/92 via-[#012f40]/85 to-[#012533]/95"
          />

          {/* Content Grid */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-14">
            {/* Left Content Column */}
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, x: -24 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: BRAND_EASE }}
              className="w-full lg:max-w-xl"
            >
              {/* Category Badge with Icon */}
              <div className="inline-flex items-center gap-3 mb-3.5 sm:mb-4.5">
                <Image
                  src="/home/DivingCourses/Group.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
                <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] text-[#E8B34A] uppercase">
                  {d?.eyebrow || "DIVING COURSES"}
                </span>
              </div>

              {/* Banner Heading */}
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-wide leading-[1.12] mb-3 sm:mb-4">
                {d?.heading || "Learn to Dive in the Red Sea"}
              </h2>

              {/* Subtitle Description */}
              <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-[17px] text-white/85 font-normal leading-relaxed max-w-[480px] mb-7 sm:mb-9">
                {d?.description ||
                  "Take your skills to the next level with certified instructors, top locations and international standards."}
              </p>

              {/* CTA Explore Button */}
              <Link
                href={`/${locale}/diving-courses`}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E8B34A] hover:bg-[#d99f33] text-[#013E51] font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-[1.03] text-center"
              >
                <span>{d?.cta || "Explore Diving Courses"}</span>
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Right Column: Dynamic Course Cards */}
            <div className="w-full lg:max-w-md xl:max-w-[440px] flex flex-col gap-3.5 sm:gap-4">
              {isLoading && displayCourses.length === 0 ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="h-20 sm:h-22 rounded-[20px] sm:rounded-[24px] bg-[#022f3e]/60 border border-white/10 animate-pulse"
                  />
                ))
              ) : (
                displayCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={shouldReduce ? undefined : { opacity: 0, x: 24 }}
                    whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + idx * 0.1,
                      ease: BRAND_EASE,
                    }}
                  >
                    <Link
                      href={course.href}
                      className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-[20px] sm:rounded-[24px] bg-[#022f3e]/85 hover:bg-[#022f3e]/95 backdrop-blur-md border border-white/10 hover:border-white/25 shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2 sm:pr-3">
                        {/* Thumbnail Image */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[14px] sm:rounded-[18px] overflow-hidden shrink-0 shadow-md bg-[#012533]">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Course Text Details */}
                        <div className="min-w-0">
                          <h3 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-[22px] font-bold text-white tracking-wide leading-tight truncate">
                            {course.title}
                          </h3>
                          {course.subtitle ? (
                            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-[13px] text-white/75 font-normal mt-0.5 mb-1 truncate">
                              {course.subtitle}
                            </p>
                          ) : null}
                          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold text-[#E8B34A]">
                            {course.price}
                          </p>
                        </div>
                      </div>

                      {/* Right: Golden Arrow Button */}
                      <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E8B34A] flex items-center justify-center text-[#013E51] shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-[#dfa636]">
                        <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
