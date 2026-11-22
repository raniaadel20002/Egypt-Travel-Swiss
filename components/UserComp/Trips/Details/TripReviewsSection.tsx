"use client";

import React, { useState, useMemo } from "react";
import { FiStar, FiEdit3, FiMessageSquare } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import { TripReviewItem } from "@/models/review";
import { Dictionary } from "@/features/i18n/i18nConfig";
import { TripReviewModal } from "./TripReviewModal";

interface TripReviewsSectionProps {
  tripId: number;
  tripTitle?: string;
  averageRating?: number;
  totalReviews?: number;
  reviews?: TripReviewItem[];
  isLoading?: boolean;
  dict: Dictionary["tripDetails"];
}

export const TripReviewsSection: React.FC<TripReviewsSectionProps> = ({
  tripId,
  tripTitle,
  averageRating = 0,
  totalReviews = 0,
  reviews = [],
  isLoading = false,
  dict,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayRating = averageRating > 0 ? averageRating.toFixed(1) : "0.0";
  const displayTotal = totalReviews > 0 ? totalReviews : reviews.length;

  const distribution = useMemo(() => {
    if (reviews.length === 0) {
      return [
        { star: 5, pct: 0, count: 0 },
        { star: 4, pct: 0, count: 0 },
        { star: 3, pct: 0, count: 0 },
        { star: 2, pct: 0, count: 0 },
        { star: 1, pct: 0, count: 0 },
      ];
    }
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      const idx = Math.max(1, Math.min(5, Math.round(r.rate || 5))) - 1;
      counts[idx]++;
    });
    const total = reviews.length;
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star - 1],
      pct: Math.round((counts[star - 1] / total) * 100),
    }));
  }, [reviews]);

  const featuredReview = reviews[0] || null;
  const secondaryReviews = reviews.slice(1, 3);

  return (
    <section className="mt-14 pt-10 border-t border-slate-200 font-[family-name:var(--font-lato)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Rating Overview Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8B34A]/30 shadow-xs space-y-6">
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51]">
              {dict.reviews}
            </h3>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-4xl font-[family-name:var(--font-cormorant)] font-bold text-[#013E51]">
                {displayRating}
              </span>
              <span className="text-base text-slate-400 font-medium">/ 5</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#E8B34A]">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar
                  key={s}
                  className={`text-base ${
                    displayTotal > 0 && s <= Math.round(Number(displayRating))
                      ? "fill-[#E8B34A]"
                      : "text-slate-200"
                  }`}
                />
              ))}
              <span className="text-xs text-slate-500 ml-2">
                {dict.basedOnReviews} ({displayTotal})
              </span>
            </div>
          </div>

          {/* Distribution Bars */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            {distribution.map((item) => (
              <div key={item.star} className="flex items-center gap-3 text-xs">
                <span className="w-14 text-slate-600 font-medium shrink-0">
                  {item.star} {dict.stars}
                </span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#E8B34A] rounded-full transition-all duration-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-slate-400 font-mono text-[11px] shrink-0">
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>

          {/* Write a Review CTA */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-5 rounded-2xl border-2 border-[#E8B34A] text-[#013E51] font-bold text-xs uppercase tracking-wider hover:bg-[#E8B34A]/10 transition-colors flex items-center justify-center gap-2"
          >
            <FiEdit3 className="text-sm text-[#013E51]" />
            <span>{dict.writeReview}</span>
          </button>
        </div>

        {/* Right Testimonial Reviews Grid */}
        <div className="lg:col-span-7 space-y-5">
          {featuredReview ? (
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#E8B34A]/25 relative">
              <FaQuoteLeft className="text-[#E8B34A]/30 text-4xl absolute top-5 right-6 pointer-events-none" />
              <div className="flex items-center gap-1 text-[#E8B34A] mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FiStar
                    key={s}
                    className={`text-sm ${
                      s <= (featuredReview.rate || 5)
                        ? "fill-[#E8B34A]"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic pr-6 mb-4">
                &ldquo;{featuredReview.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <div className="w-9 h-9 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center font-bold text-xs">
                  {featuredReview.firstName ? featuredReview.firstName[0] : "T"}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {featuredReview.firstName} {featuredReview.lastName}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {featuredReview.createdAt
                      ? new Date(featuredReview.createdAt).toLocaleDateString()
                      : "Verified Traveler"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-[#E8B34A]/25 text-center space-y-3">
              <FiMessageSquare className="text-4xl text-[#E8B34A] mx-auto" />
              <h4 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51]">
                {dict.noReviewsYet}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {dict.beFirstReview}
              </p>
            </div>
          )}

          {/* Secondary Reviews */}
          {secondaryReviews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#E8B34A]/20 text-[#013E51] flex items-center justify-center font-bold text-xs">
                        {rev.firstName ? rev.firstName[0] : "T"}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {rev.firstName} {rev.lastName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {rev.createdAt
                            ? new Date(rev.createdAt).toLocaleDateString()
                            : "Verified"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#E8B34A]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar
                          key={s}
                          className={`text-xs ${
                            s <= (rev.rate || 5)
                              ? "fill-[#E8B34A]"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <TripReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tripId={tripId}
        tripTitle={tripTitle}
        dict={dict}
      />
    </section>
  );
};

export default TripReviewsSection;
