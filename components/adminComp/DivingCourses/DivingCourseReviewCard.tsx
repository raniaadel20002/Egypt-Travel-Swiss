"use client";

import { FiCheck, FiFilter, FiLoader, FiXCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { DivingCourseReviewApiItem } from "@/models/divingCourse";

interface DivingCourseReviewCardProps {
  review: DivingCourseReviewApiItem;
  isPending: boolean;
  onStatusChange: (reviewId: string, status: number) => void;
}

export default function DivingCourseReviewCard({
  review,
  isPending,
  onStatusChange,
}: DivingCourseReviewCardProps) {
  const getStatusBadge = (status: number) => {
    if (status === 1) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Approved
        </span>
      );
    }
    if (status === 2) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
          Rejected
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
        Pending
      </span>
    );
  };

  return (
    <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-[#013E51]">{review.name}</h4>
            {getStatusBadge(review.status)}
          </div>
          <p className="text-[11px] text-gray-400">{review.email}</p>
        </div>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar
              key={s}
              className={`w-3 h-3 ${
                s <= review.rating ? "text-[#E8B34A]" : "text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-700 leading-relaxed bg-[#FAF7F2]/40 p-2.5 rounded-xl border border-gray-100">
        {review.comment}
      </p>

      <div className="flex items-center justify-end gap-1.5 pt-1">
        {review.status !== 1 && (
          <button
            type="button"
            onClick={() => onStatusChange(review.id, 1)}
            disabled={isPending}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-bold transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <FiLoader className="w-3 h-3 animate-spin" />
            ) : (
              <FiCheck className="w-3 h-3" />
            )}
            <span>Approve</span>
          </button>
        )}

        {review.status !== 2 && (
          <button
            type="button"
            onClick={() => onStatusChange(review.id, 2)}
            disabled={isPending}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-[11px] font-bold transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <FiLoader className="w-3 h-3 animate-spin" />
            ) : (
              <FiXCircle className="w-3 h-3" />
            )}
            <span>Reject</span>
          </button>
        )}

        {review.status !== 0 && (
          <button
            type="button"
            onClick={() => onStatusChange(review.id, 0)}
            disabled={isPending}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-[11px] font-bold transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <FiLoader className="w-3 h-3 animate-spin" />
            ) : (
              <FiFilter className="w-3 h-3" />
            )}
            <span>Set Pending</span>
          </button>
        )}
      </div>
    </div>
  );
}
