"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiStar, FiCheckCircle } from "react-icons/fi";
import { DivingCourseApiItem } from "@/models/divingCourse";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { buildDivingCourseDetailsPath } from "@/shared/utils/slugify";

interface CourseCardProps {
  course: DivingCourseApiItem;
}

const FALLBACK_IMAGE =
  "/DivingCourses/18beb5ba1af65cd74f209d6618df941bc4a19eac.jpg";

function formatCurrencyPrice(price: number, currency: string) {
  const code = (currency || "EUR").toUpperCase();
  if (code === "EUR") return `€${price}`;
  if (code === "USD") return `$${price}`;
  if (code === "GBP") return `£${price}`;
  return `${price} ${code}`;
}

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const { locale } = useLocale();

  const detailsPath = buildDivingCourseDetailsPath(
    locale,
    course.id,
    course.name
  );
  const bookingPath = `/${locale}/bookings?courseId=${course.id}`;

  const firstImage = course.images?.[0]?.imageUrl || course.images?.[0]?.url;
  const imageSrc = firstImage ? resolveApiImageUrl(firstImage) : FALLBACK_IMAGE;

  const ratingValue =
    typeof course.averageRating === "number" && course.averageRating > 0
      ? course.averageRating
      : typeof course.rating === "number" && course.rating > 0
      ? course.rating
      : 5;

  const reviewsCount =
    typeof course.totalReviews === "number"
      ? course.totalReviews
      : typeof course.reviewsCount === "number"
      ? course.reviewsCount
      : 0;

  const sortedFacilities = [...(course.facilities || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  const displayFacilities = sortedFacilities.slice(0, 3);

  const handleCardClick = () => {
    router.push(detailsPath);
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#888888]/20 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Course Image & Top Badges */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={course.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-left certification badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-xs inline-block bg-[#013E51]/90 backdrop-blur-xs text-white">
            PADI Certified
          </span>
        </div>

        {/* Top-right rating pill */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-xs text-[#013E51] px-2.5 py-1 rounded-full shadow-xs text-xs font-bold">
          <FiStar className="w-3.5 h-3.5 text-[#E8B34A] fill-[#E8B34A]" />
          <span>{ratingValue.toFixed(1)}</span>
          {reviewsCount > 0 && (
            <span className="text-[10px] text-[#888888] font-normal">
              ({reviewsCount})
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Course Name */}
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors leading-tight mb-2">
            {course.name}
          </h3>

          {/* Description */}
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed line-clamp-2 mb-4">
            {course.description}
          </p>

          {/* Facility Highlights */}
          {displayFacilities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {displayFacilities.map((fac) => (
                <span
                  key={fac.id || fac.name}
                  className="inline-flex items-center gap-1 bg-[#F7EDE1]/60 text-[#013E51] text-[11px] px-2.5 py-1 rounded-full font-medium"
                >
                  <FiCheckCircle className="w-3 h-3 text-[#E8B34A] flex-shrink-0" />
                  <span className="truncate max-w-[140px]">
                    {fac.name || fac.values}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Pricing Row */}
          <div className="flex items-baseline justify-between pt-4 border-t border-[#888888]/15">
            <span className="font-[family-name:var(--font-lato)] text-[10px] tracking-wider uppercase text-[#888888] font-bold">
              Starting From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                {formatCurrencyPrice(course.price, course.currency)}
              </span>
              <span className="font-[family-name:var(--font-lato)] text-xs text-[#888888]">
                / person
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href={detailsPath}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-center py-2.5 px-3 rounded-full border border-[#013E51] text-[#013E51] text-xs font-bold uppercase tracking-wider hover:bg-[#013E51] hover:text-white transition-colors duration-200"
            >
              Course Details
            </Link>
            <Link
              href={bookingPath}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-center py-2.5 px-3 rounded-full bg-[#013E51] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#024f67] transition-colors duration-200 shadow-sm"
            >
              Book Course
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
