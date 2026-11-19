"use client";

import { useState } from "react";
import { DivingCourseCategory } from "@/models/divingCourse";
import DivingHeroBanner from "./DivingHeroBanner";
import CourseFilterBar from "./CourseFilterBar";
import CourseCard from "./CourseCard";
import CertificationProgression from "./CertificationProgression";
import DivingBottomBanner from "./DivingBottomBanner";
import { DIVING_COURSES_LIST } from "./divingCoursesData";

export default function DivingCoursesPage() {
  const [activeCategory, setActiveCategory] =
    useState<DivingCourseCategory>("all");

  const filteredCourses =
    activeCategory === "all"
      ? DIVING_COURSES_LIST
      : DIVING_COURSES_LIST.filter(
          (course) => course.category === activeCategory
        );

  return (
    <div className="w-full min-h-screen bg-[#F7EDE1] text-[#013E51] font-[family-name:var(--font-lato)]">
      {/* 1. Hero Banner */}
      <DivingHeroBanner />

      {/* 2. Category Filter Tabs */}
      <CourseFilterBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 3. Courses Grid */}
      <section className="w-full py-8 sm:py-10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#888888]/20 shadow-sm p-8">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
                No courses found in this category
              </h3>
              <p className="text-sm text-[#888888] mb-6">
                Try selecting &apos;All Courses&apos; to view our full dive training catalog.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="bg-[#013E51] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#024f67] transition-colors"
              >
                View All Courses
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Certification Progression Roadmap */}
      <CertificationProgression />

      {/* 5. Bottom Call-to-Action Banner */}
      <DivingBottomBanner />
    </div>
  );
}
