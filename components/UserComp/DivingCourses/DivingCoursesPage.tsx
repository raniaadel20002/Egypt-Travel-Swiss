"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { useDivingCoursesQuery } from "@/features/divingCourses/useDivingCourses";
import DivingHeroBanner from "./DivingHeroBanner";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";
import CertificationProgression from "./CertificationProgression";
import DivingBottomBanner from "./DivingBottomBanner";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DivingCoursesPage() {
  const { locale, dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const g = dictionary.divingCourses.grid;

  const backendLanguage = localeToBackendLanguage(locale);

  const { data, isLoading, isError, refetch, isFetching } =
    useDivingCoursesQuery({
      pageNumber: 1,
      pageSize: 50,
      language: backendLanguage,
    });

  const coursesList = useMemo(() => {
    return data?.data || [];
  }, [data]);

  return (
    <div className="w-full min-h-screen bg-[#F7EDE1] text-[#013E51] font-[family-name:var(--font-lato)]">
      {/* 1. Hero Banner */}
      <DivingHeroBanner />

      {/* 2. Courses Grid Section */}
      <section className="w-full py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          {/* Section Heading */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.42, ease: BRAND_EASE }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#888888] uppercase block mb-3">
              {g.eyebrow}
            </span>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span
                aria-hidden="true"
                className="h-px w-12 sm:w-24 bg-[#E8B34A]"
              />
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-normal text-[#013E51]">
                {g.heading}
              </h2>
              <span
                aria-hidden="true"
                className="h-px w-12 sm:w-24 bg-[#E8B34A]"
              />
            </div>
          </motion.div>

          {/* Loading Skeleton State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <CourseCardSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            /* Error State */
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
              animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: BRAND_EASE }}
              className="text-center py-16 bg-white rounded-3xl border border-red-200 shadow-sm p-8 max-w-xl mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-4">
                <FiAlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
                {g.errorTitle}
              </h3>
              <p className="text-sm text-[#888888] mb-6">
                {g.errorDesc}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center gap-2 bg-[#013E51] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#024f67] transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <FiRefreshCw
                  className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
                />
                <span>{isFetching ? g.retrying : g.retry}</span>
              </button>
            </motion.div>
          ) : coursesList.length > 0 ? (
            /* Success Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {coursesList.map((course, idx) => (
                <CourseCard key={course.id} course={course} index={idx} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
              animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: BRAND_EASE }}
              className="text-center py-16 bg-white rounded-3xl border border-[#888888]/20 shadow-sm p-8 max-w-xl mx-auto"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
                {g.emptyTitle}
              </h3>
              <p className="text-sm text-[#888888]">
                {g.emptyDesc}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. Certification Progression Roadmap */}
      <CertificationProgression />

      {/* 4. Bottom Call-to-Action Banner */}
      <DivingBottomBanner />
    </div>
  );
}
