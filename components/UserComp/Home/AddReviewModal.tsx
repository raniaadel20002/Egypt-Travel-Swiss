"use client";

import { useState } from "react";
import { FiX, FiStar } from "react-icons/fi";
import { toast } from "sonner";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: (review: {
    name: string;
    email: string;
    rating: number;
    details: string;
  }) => void;
}

export default function AddReviewModal({
  isOpen,
  onClose,
  onReviewSubmitted,
}: AddReviewModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !details.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    onReviewSubmitted?.({
      name: fullName.trim(),
      email: email.trim(),
      rating,
      details: details.trim(),
    });

    toast.success("Thank you! Your review has been submitted for approval.");
    setFullName("");
    setEmail("");
    setDetails("");
    setRating(0);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
    >
      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 max-w-lg w-full shadow-2xl relative border border-black/5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="w-10 h-10 rounded-full bg-[#F3F4F6] text-gray-500 hover:text-black flex items-center justify-center absolute top-7 right-7 sm:top-9 sm:right-9 cursor-pointer transition-colors"
        >
          <FiX className="text-xl" />
        </button>

        {/* Modal Header */}
        <div className="pr-12 mb-6">
          <h3 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51]">
            Write a Review
          </h3>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-gray-500 font-normal mt-1">
            Share your inspection experience with future customers
          </p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
          {/* Full Name */}
          <div>
            <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Hassan El-Sayed"
              className="w-full h-[52px] bg-[#F3F4F6] rounded-2xl px-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
              Your E-mail *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@example.com"
              className="w-full h-[52px] bg-[#F3F4F6] rounded-2xl px-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-1.5 pt-0.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <FiStar
                      className={`text-2xl transition-colors ${
                        isFilled
                          ? "fill-[#E8B34A] text-[#E8B34A]"
                          : "text-[#E8B34A]/40 stroke-[#E8B34A]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Details */}
          <div>
            <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
              Review Details
            </label>
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="comment...."
              className="w-full h-32 bg-[#F3F4F6] rounded-2xl p-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-[52px] px-7 rounded-2xl border border-gray-300 font-[family-name:var(--font-lato)] text-sm sm:text-base font-bold text-[#013E51] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[52px] flex-1 rounded-2xl bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-sm sm:text-base font-bold hover:bg-[#024f68] transition-colors shadow-md cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
