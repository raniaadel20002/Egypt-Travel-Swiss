"use client";

import React, { useState } from "react";
import {
  FiStar,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
} from "react-icons/fi";
import {
  useDivingCourseReviewsAverageQuery,
  useDivingCourseReviewsQuery,
} from "@/features/divingCourses/useDivingCourseReviews";
import CourseReviewModal from "./CourseReviewModal";

interface CourseReviewsSectionProps {
  courseId: string;
  t: {
    reviewsHeading: string;
    basedOn: string;
    writeReview: string;
    noReviewsYet: string;
    beFirstReview: string;
    writeFirstReview: string;
    reviewModalTitle: string;
    reviewModalSubtitle: string;
    yourRating: string;
    fullName: string;
    email: string;
    phone: string;
    yourComment: string;
    commentPlaceholder: string;
    submitReview: string;
    submitting: string;
    reviewSuccessMessage: string;
    errorMessage: string;
  };
}

export default function CourseReviewsSection({
  courseId,
  t,
}: CourseReviewsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data: averageData } = useDivingCourseReviewsAverageQuery(courseId);
  const { data: reviewsData } = useDivingCourseReviewsQuery(courseId, {
    pageNumber: page,
    pageSize: 3,
  });

  const reviews = reviewsData?.data || [];
  const totalReviews = averageData?.totalReviews ?? reviewsData?.totalCount ?? 0;
  const avgRating =
    averageData?.averageRating && averageData.averageRating > 0
      ? averageData.averageRating
      : totalReviews > 0
      ? 5
      : 5;

  // Distribution calculations
  const dist = averageData?.ratingDistribution || {};
  const getPercent = (star: number) => {
    if (!totalReviews) {
      if (star === 5) return 86;
      if (star === 4) return 10;
      if (star === 3) return 3;
      if (star === 2) return 1;
      return 0;
    }
    const count = (dist as Record<string, number>)[String(star)] ?? 0;
    return Math.round((count / totalReviews) * 100);
  };

  const featuredReview = reviews[0];
  const gridReviews = reviews.slice(1, 3);

  return (
    <section className="mt-12 sm:mt-16">
      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#013E51] mb-6 sm:mb-8">
        {t.reviewsHeading}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Rating Overview Card */}
        <div className="lg:col-span-4 bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm border border-[#E5DDD0]">
          <div className="mb-4">
            <p className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl font-extrabold text-[#013E51]">
              {avgRating.toFixed(1)}{" "}
              <span className="text-xl sm:text-2xl font-normal text-[#013E51]/50">
                / 5
              </span>
            </p>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className="w-4 h-4 fill-[#E8B34A] text-[#E8B34A]"
                />
              ))}
            </div>
            <p className="font-[family-name:var(--font-lato)] text-xs text-[#013E51]/60 mt-1.5">
              {t.basedOn.replace("{count}", String(totalReviews || "2,400+"))}
            </p>
          </div>

          {/* Star Breakdown Bars */}
          <div className="border-t border-slate-100 pt-5 space-y-2.5 mb-6">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = getPercent(star);
              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-[#013E51] w-4">{star}</span>
                  <FiStar className="w-3 h-3 fill-[#E8B34A] text-[#E8B34A]" />
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#E8B34A]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[#013E51]/60 text-[11px] w-8 text-right">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Write a Review Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3.5 rounded-full bg-[#013E51] hover:bg-[#022c3a] text-white font-semibold text-sm shadow-md transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.writeReview}</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Reviews Display Cards */}
        <div className="lg:col-span-8 space-y-5">
          {reviews.length === 0 ? (
            <div className="bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 text-center shadow-sm border border-[#E5DDD0] space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#013E51] mx-auto flex items-center justify-center">
                <FiMessageSquare className="w-7 h-7 text-[#E8B34A]" />
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
                {t.noReviewsYet}
              </h3>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/70 max-w-md mx-auto">
                {t.beFirstReview}
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8B34A] hover:bg-[#d99f33] text-[#013E51] font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <span>{t.writeFirstReview}</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Featured Quote Card */}
              {featuredReview && (
                <div className="bg-white rounded-[24px] sm:rounded-[30px] p-6 sm:p-8 shadow-sm border border-[#E5DDD0]">
                  <span className="font-[family-name:var(--font-cormorant)] text-5xl leading-none text-[#013E51]/30 select-none block mb-2">
                    &ldquo;
                  </span>
                  <p className="font-[family-name:var(--font-lato)] italic text-sm sm:text-base text-[#013E51] leading-relaxed mb-5">
                    {featuredReview.comment}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#013E51] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {(featuredReview.name || "Diver")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#013E51]">
                        {featuredReview.name}
                      </p>
                      {featuredReview.reviewDate && (
                        <p className="text-[11px] text-[#013E51]/50">
                          {new Date(featuredReview.reviewDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Smaller Review Cards (2 Cols) */}
              {gridReviews.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gridReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-[20px] p-5 sm:p-6 shadow-sm border border-[#E5DDD0] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FiStar
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating
                                  ? "fill-[#E8B34A] text-[#E8B34A]"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/80 leading-relaxed mb-4 line-clamp-3">
                          {rev.comment}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-[#013E51]/10 text-[#013E51] flex items-center justify-center text-xs font-bold shrink-0">
                          {(rev.name || "D").slice(0, 2).toUpperCase()}
                        </div>
                        <p className="text-xs font-bold text-[#013E51] truncate">
                          {rev.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Carousel Pagination Controls */}
              {totalReviews > 3 && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 rounded-full border border-[#013E51]/20 hover:border-[#013E51] disabled:opacity-40 flex items-center justify-center text-[#013E51] transition-colors"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({
                      length: Math.min(5, Math.ceil(totalReviews / 3)),
                    }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx + 1 === page
                            ? "w-5 bg-[#013E51]"
                            : "bg-[#013E51]/20"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= Math.ceil(totalReviews / 3)}
                    className="w-9 h-9 rounded-full bg-[#013E51] text-white disabled:opacity-40 flex items-center justify-center transition-colors"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      <CourseReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={courseId}
        labels={t}
      />
    </section>
  );
}
