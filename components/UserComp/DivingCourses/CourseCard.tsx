"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiClock, FiArrowDown } from "react-icons/fi";
import { DivingCourseItem } from "@/models/divingCourse";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface CourseCardProps {
  course: DivingCourseItem;
}

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const { locale } = useLocale();

  const detailsPath = `/${locale}${course.detailsHref}`;
  const bookingPath = `/${locale}${course.bookingHref}`;

  const handleCardClick = () => {
    router.push(detailsPath);
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#888888]/20 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Course Image & Badge */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-left Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-xs inline-block ${
              course.badgeVariant === "gold"
                ? "bg-[#E8B34A] text-white"
                : "bg-[#013E51]/90 backdrop-blur-xs text-white"
            }`}
          >
            {course.badge}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Metadata Row: Duration & Max Depth */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#013E51] mb-2.5">
            <span className="flex items-center gap-1.5">
              <FiClock className="w-4 h-4 text-[#E8B34A]" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <FiArrowDown className="w-4 h-4 text-[#E8B34A]" />
              {course.depth}
            </span>
          </div>

          {/* Course Title */}
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors leading-tight mb-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed line-clamp-2 mb-6">
            {course.description}
          </p>
        </div>

        <div>
          {/* Price Row */}
          <div className="flex items-baseline justify-between pt-4 border-t border-[#888888]/15">
            <span className="font-[family-name:var(--font-lato)] text-[10px] tracking-wider uppercase text-[#888888] font-bold">
              Starting From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                ${course.price}
              </span>
              <span className="font-[family-name:var(--font-lato)] text-xs text-[#888888]">
                {course.priceUnit}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href={detailsPath}
              onClick={(e) => e.stopPropagation()}
              className="border border-[#013E51] text-[#013E51] hover:bg-[#013E51]/5 rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-center transition-colors"
            >
              Course Details
            </Link>
            <Link
              href={bookingPath}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#013E51] hover:bg-[#024f67] text-white rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-center transition-colors shadow-xs"
            >
              Book Course
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
