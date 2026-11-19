"use client";

import { DivingCourseCategory } from "@/models/divingCourse";
import { DIVING_FILTER_TABS } from "./divingCoursesData";

interface CourseFilterBarProps {
  activeCategory: DivingCourseCategory;
  onSelectCategory: (category: DivingCourseCategory) => void;
}

export default function CourseFilterBar({
  activeCategory,
  onSelectCategory,
}: CourseFilterBarProps) {
  return (
    <div className="w-full flex justify-center pt-10 sm:pt-14 pb-2 px-4">
      {/* Pill Wrapper */}
      <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-white rounded-full shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)] border border-[#888888]/20">
        {DIVING_FILTER_TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectCategory(tab.key)}
              className={`rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#013E51] text-white shadow-sm"
                  : "text-[#013E51] hover:bg-[#F7EDE1]/70"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
