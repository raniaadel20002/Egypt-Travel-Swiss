"use client";

import { useState } from "react";
import { FiX, FiStar, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { useCreateReviewProject } from "@/features/reviews/useReviewsProject";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: () => void;
}

export default function AddReviewModal({
  isOpen,
  onClose,
  onReviewSubmitted,
}: AddReviewModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const createMutation = useCreateReviewProject();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !comment.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await createMutation.mutateAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || "+2000000000",
        comment: comment.trim(),
        rate: rating || 5,
      });

      toast.success("Thank you! Your review has been submitted successfully.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setComment("");
      setRating(5);
      onReviewSubmitted?.();
      onClose();
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
    >
      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 max-w-lg w-full shadow-2xl relative border border-black/5 max-h-[90vh] overflow-y-auto">
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
            Share your travel experience with future customers
          </p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Hassan"
                className="w-full h-[50px] bg-[#F3F4F6] rounded-2xl px-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent"
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. El-Sayed"
                className="w-full h-[50px] bg-[#F3F4F6] rounded-2xl px-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent"
              />
            </div>
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
              className="w-full h-[50px] bg-[#F3F4F6] rounded-2xl px-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+20 100 000 0000"
              className="w-full h-[50px] bg-[#F3F4F6] rounded-2xl px-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5">
              Rating ({rating} Stars)
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
              Review Details *
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full h-28 bg-[#F3F4F6] rounded-2xl p-4 font-[family-name:var(--font-lato)] text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 border border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={createMutation.isPending}
              className="h-[50px] px-6 rounded-2xl border border-gray-300 font-[family-name:var(--font-lato)] text-sm font-bold text-[#013E51] hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="h-[50px] flex-1 rounded-2xl bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-sm font-bold hover:bg-[#024f68] transition-colors shadow-md cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {createMutation.isPending && (
                <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
              )}
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
