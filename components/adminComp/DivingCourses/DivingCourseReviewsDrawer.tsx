"use client";

import { useState } from "react";
import { FiLoader, FiMessageSquare, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { DivingCourseApiItem } from "@/models/divingCourse";
import {
  useDivingCourseReviewsAverageQuery,
  useDivingCourseReviewsQuery,
  useUpdateDivingCourseReviewStatusMutation,
} from "@/features/divingCourses/useDivingCourseReviews";
import DivingCourseReviewCard from "./DivingCourseReviewCard";

interface DivingCourseReviewsDrawerProps {
  course: DivingCourseApiItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_TABS = [
  { label: "All Reviews", value: -1 },
  { label: "Pending", value: 0 },
  { label: "Approved", value: 1 },
  { label: "Rejected", value: 2 },
];

export default function DivingCourseReviewsDrawer({
  course,
  isOpen,
  onClose,
}: DivingCourseReviewsDrawerProps) {
  const [statusFilter, setStatusFilter] = useState<number>(-1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: avgData } = useDivingCourseReviewsAverageQuery(
    course?.id,
    isOpen && Boolean(course?.id)
  );

  const { data: reviewsData, isLoading: isLoadingReviews } =
    useDivingCourseReviewsQuery(
      course?.id,
      {
        pageNumber: 1,
        pageSize: 50,
        status: statusFilter === -1 ? undefined : statusFilter,
      },
      isOpen && Boolean(course?.id)
    );

  const updateStatusMutation = useUpdateDivingCourseReviewStatusMutation(
    course?.id
  );

  if (!isOpen || !course) return null;

  const reviews = reviewsData?.data || [];
  const averageRating = avgData?.averageRating || course.rating || 0;
  const totalReviews = avgData?.totalReviews ?? course.reviewsCount ?? 0;
  const distribution = avgData?.ratingDistribution || {};

  const handleStatusChange = async (reviewId: string, nextStatus: number) => {
    setUpdatingId(reviewId);
    try {
      await updateStatusMutation.mutateAsync({ reviewId, status: nextStatus });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-[#013E51]/40 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget && !updatingId) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/10 flex items-center justify-center text-[#013E51]">
              <FiMessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#013E51]">
                Course Reviews
              </h2>
              <p className="text-xs text-[#888888] line-clamp-1">
                {course.name} ({totalReviews} total)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-[#FAF7F2]/60 p-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="text-center sm:text-left sm:border-r sm:border-gray-200 sm:pr-5 shrink-0">
              <div className="text-3xl font-extrabold text-[#013E51]">
                {Number(averageRating).toFixed(1)}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(averageRating)
                        ? "text-[#E8B34A]"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-500 font-medium">
                Based on {totalReviews} reviews
              </span>
            </div>

            <div className="flex-1 w-full space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star] || 0;
                const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-[11px] font-bold text-gray-600">
                      {star}
                    </span>
                    <FaStar className="w-3 h-3 text-[#E8B34A] shrink-0" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#013E51] rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-7 text-[10px] text-gray-400 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2 overflow-x-auto">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  statusFilter === tab.value
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isLoadingReviews ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-gray-400">
              <FiLoader className="w-6 h-6 animate-spin text-[#013E51]" />
              <span className="text-xs font-medium">Loading reviews...</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              No reviews match the selected filter.
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <DivingCourseReviewCard
                  key={rev.id}
                  review={rev}
                  isPending={updatingId === rev.id}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
