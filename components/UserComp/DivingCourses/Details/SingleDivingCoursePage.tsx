"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { useDivingCourseByIdQuery } from "@/features/divingCourses/useDivingCourses";
import { parseUuidFromSlug } from "@/shared/utils/slugify";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import CourseHeroGallery from "./CourseHeroGallery";
import CourseFacilitiesSection from "./CourseFacilitiesSection";
import CourseBookingSidebar from "./CourseBookingSidebar";
import CourseReviewsSection from "./CourseReviewsSection";

interface SingleDivingCoursePageProps {
  slug: string;
  locale: string;
}

function DivingCourseSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-6">
      <div className="h-4 bg-slate-200 rounded-sm w-64" />
      <div className="h-[460px] bg-slate-200 rounded-[32px]" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-64 bg-slate-200 rounded-[28px]" />
        </div>
        <div className="lg:col-span-4 h-[440px] bg-slate-200 rounded-[28px]" />
      </div>
    </div>
  );
}

export default function SingleDivingCoursePage({
  slug,
  locale,
}: SingleDivingCoursePageProps) {
  const { dictionary } = useLocale();
  const d = dictionary.divingCourses.detail;

  const courseId = parseUuidFromSlug(slug);
  const backendLanguage = localeToBackendLanguage(locale);

  const {
    data: course,
    isLoading,
    isError,
  } = useDivingCourseByIdQuery(courseId || undefined, backendLanguage);

  const handleEnrollClick = () => {
    const el = document.getElementById("booking-sidebar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <DivingCourseSkeleton />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-20 px-4">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-[28px] shadow-sm border border-[#E5DDD0]">
          <h1 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-2">
            {d.notFoundTitle}
          </h1>
          <p className="font-[family-name:var(--font-lato)] text-sm text-[#013E51]/70 mb-6">
            {d.notFoundDesc}
          </p>
          <Link
            href={`/${locale}/diving-courses`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8B34A] text-[#013E51] font-semibold text-sm hover:bg-[#d99f33] transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>{d.backToCourses}</span>
          </Link>
        </div>
      </div>
    );
  }

  const firstImg = course.images?.[0]?.imageUrl || course.images?.[0]?.url;
  const courseThumb = firstImg ? resolveApiImageUrl(firstImg) : undefined;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#013E51] font-[family-name:var(--font-lato)] py-6 sm:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-[#013E51]/60 overflow-x-auto whitespace-nowrap"
        >
          <Link
            href={`/${locale}/diving-courses`}
            className="hover:text-[#013E51] transition-colors"
          >
            {d.breadcrumbCourses}
          </Link>
          <FiChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[#013E51]/60">
            {d.breadcrumbAcademy}
          </span>
          <FiChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[#013E51] font-bold truncate max-w-[200px] sm:max-w-md">
            {course.name}
          </span>
        </nav>

        {/* 1. Top Hero Split Gallery Card */}
        <CourseHeroGallery
          name={course.name}
          description={course.description}
          price={course.price}
          currency={course.currency}
          perPersonLabel={d.perPerson}
          padiBadge={d.padiBadge}
          enrollCta={d.enrollCta}
          fromLabel={d.from}
          images={course.images || []}
          facilities={course.facilities || []}
          onEnrollClick={handleEnrollClick}
        />

        {/* 2. Middle Content Grid (Left Facilities + Right Booking Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Real Course Facilities & Training Standards */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <CourseFacilitiesSection
              heading={d.facilitiesHeading}
              subtitle={d.facilitiesSubtitle}
              facilities={course.facilities || []}
            />

            {/* Course Overview / About Card */}
            {course.description && (
              <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-sm border border-[#E5DDD0]">
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-4">
                  {d.aboutHeading}
                </h2>
                <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#013E51]/80 leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Sidebar */}
          <div className="lg:col-span-5">
            <CourseBookingSidebar
              courseId={course.id}
              courseName={course.name}
              courseImage={courseThumb}
              unitPrice={course.price}
              currency={course.currency}
              locale={locale}
              t={d}
            />
          </div>
        </div>

        {/* 3. Bottom Reviews Section */}
        <CourseReviewsSection courseId={course.id} t={d} />
      </div>
    </div>
  );
}
