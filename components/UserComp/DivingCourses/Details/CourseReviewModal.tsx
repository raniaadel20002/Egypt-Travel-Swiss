"use client";

import React, { useState } from "react";
import { FiX, FiStar } from "react-icons/fi";
import { toast } from "sonner";
import { useCreateDivingCourseReviewMutation } from "@/features/divingCourses/useDivingCourseReviews";

interface CourseReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  labels: {
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

export default function CourseReviewModal({
  isOpen,
  onClose,
  courseId,
  labels,
}: CourseReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const createReviewMutation = useCreateDivingCourseReviewMutation(courseId);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim()) {
      toast.error(labels.errorMessage);
      return;
    }

    createReviewMutation.mutate(
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        comment: comment.trim(),
        rating,
      },
      {
        onSuccess: () => {
          toast.success(labels.reviewSuccessMessage);
          setName("");
          setEmail("");
          setPhone("");
          setComment("");
          setRating(5);
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {labels.reviewModalTitle}
          </h3>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 mt-1">
            {labels.reviewModalSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51] mb-2">
              {labels.yourRating}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-hidden"
                >
                  <FiStar
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "fill-[#E8B34A] text-[#E8B34A]"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder={labels.fullName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FAF7F2] text-sm text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
            required
          />

          <input
            type="email"
            placeholder={labels.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FAF7F2] text-sm text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
            required
          />

          <input
            type="tel"
            placeholder={labels.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FAF7F2] text-sm text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
          />

          <textarea
            rows={4}
            placeholder={labels.commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FAF7F2] text-sm text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
            required
          />

          <button
            type="submit"
            disabled={createReviewMutation.isPending}
            className="w-full py-3.5 rounded-full bg-[#013E51] hover:bg-[#022c3a] text-white font-semibold text-sm shadow-md transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
          >
            {createReviewMutation.isPending
              ? labels.submitting
              : labels.submitReview}
          </button>
        </form>
      </div>
    </div>
  );
}
