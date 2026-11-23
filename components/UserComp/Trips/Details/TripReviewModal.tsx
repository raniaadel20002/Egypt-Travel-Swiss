"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar } from "react-icons/fi";
import { useCreateTripReview } from "@/features/reviews/useTripReviews";
import { Dictionary } from "@/features/i18n/i18nConfig";
import { toast } from "sonner";

interface TripReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: number;
  tripTitle?: string;
  dict: Dictionary["tripDetails"];
}

export const TripReviewModal: React.FC<TripReviewModalProps> = ({
  isOpen,
  onClose,
  tripId,
  tripTitle,
  dict,
}) => {
  const createMutation = useCreateTripReview();

  const [rate, setRate] = useState<number>(5);
  const [hoveredRate, setHoveredRate] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !comment.trim()) {
      toast.error(dict.fillRequiredFields);
      return;
    }

    try {
      await createMutation.mutateAsync({
        tripId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        comment: comment.trim(),
        rate,
      });

      toast.success(dict.reviewSuccess);
      onClose();
      setFirstName("");
      setLastName("");
      setEmail("");
      setComment("");
      setRate(5);
    } catch {
      toast.error(dict.reviewError);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm font-[family-name:var(--font-lato)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8B34A]/30 overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <FiX className="text-xl" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51]">
              {dict.reviewModalTitle}
            </h3>
            {tripTitle && (
              <p className="text-xs text-[#E8B34A] font-semibold mt-1 truncate">
                {tripTitle}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider mb-2">
                {dict.rating}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoveredRate ?? rate) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRate(star)}
                      onMouseLeave={() => setHoveredRate(null)}
                      onClick={() => setRate(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <FiStar
                        className={`text-2xl transition-colors ${
                          active
                            ? "text-[#E8B34A] fill-[#E8B34A]"
                            : "text-slate-200"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-bold text-[#013E51] ml-2">
                  {hoveredRate ?? rate} / 5
                </span>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {dict.fullName} (First) *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E8B34A] focus:border-[#E8B34A] transition-all"
                  placeholder="e.g. John"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {dict.fullName} (Last) *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E8B34A] focus:border-[#E8B34A] transition-all"
                  placeholder="e.g. Doe"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {dict.emailAddress} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E8B34A] focus:border-[#E8B34A] transition-all"
                placeholder="name@example.com"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {dict.yourReview} *
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E8B34A] focus:border-[#E8B34A] transition-all resize-none"
                placeholder={dict.reviewPlaceholder}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#E8B34A] to-[#D49E35] text-[#013E51] font-bold text-sm tracking-wide shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {createMutation.isPending ? dict.submitting : dict.submitReview}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TripReviewModal;
