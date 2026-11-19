"use client";

import { useState } from "react";
import { FiStar, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import AddReviewModal from "./AddReviewModal";
import ReviewRatingCard from "./ReviewRatingCard";
import { REVIEW_SLIDES } from "./reviewData";

export default function ReviewsSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeSlide = REVIEW_SLIDES[slideIndex];

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? REVIEW_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev === REVIEW_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FBF6F0] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-2.5">
            <span className="w-8 sm:w-12 h-[1px] bg-[#E8B34A]" />
            <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#708A93]">
              TRAVELER STORIES
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#E8B34A]" />
          </div>

          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#013E51] tracking-tight">
            What Our Travelers Say
          </h2>

          <div className="w-14 h-[3px] bg-[#E8B34A] mx-auto rounded-full my-3 sm:my-3.5" />

          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-[#013E51]/75 font-normal leading-relaxed max-w-xl mx-auto">
            Real experiences from guests who explored the Red Sea, the Nile and
            beyond with us.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[400px_1fr] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start mb-10 sm:mb-12">
          {/* Left: Overall Rating Card */}
          <ReviewRatingCard onWriteReview={() => setIsModalOpen(true)} />

          {/* Right: Slide Content */}
          <div className="flex flex-col justify-between">
            {/* Top: Featured Quote inside White Card (matches Figma mobile & desktop) */}
            <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-xs border border-black/5 mb-6 sm:mb-7">
              <span
                aria-hidden="true"
                className="block text-4xl sm:text-5xl font-serif text-[#013E51] leading-none mb-3 font-black"
              >
                &ldquo;
              </span>

              <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-[#013E51] italic font-normal leading-relaxed mb-5 sm:mb-6 max-w-2xl">
                {activeSlide.featured.quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {activeSlide.featured.initials}
                </div>
                <span className="font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base text-[#013E51]">
                  {activeSlide.featured.author}
                </span>
              </div>
            </div>

            {/* Bottom 2 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {activeSlide.cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 bg-white border border-[#E8B34A] shadow-xs flex flex-col justify-between min-h-[190px]"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-2.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar
                          key={s}
                          className="text-sm fill-[#E8B34A] text-[#E8B34A]"
                        />
                      ))}
                    </div>

                    <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51] leading-snug mb-2">
                      {card.title}
                    </h3>

                    <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 leading-relaxed mb-5">
                      {card.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <div
                      className={`w-9 h-9 rounded-full ${card.avatarBg} text-white font-[family-name:var(--font-lato)] font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {card.initials}
                    </div>
                    <span className="font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm text-[#013E51]">
                      {card.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Controls / Pagination */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous reviews"
            className="w-12 h-12 rounded-full border border-gray-400/60 bg-white hover:border-[#013E51] flex items-center justify-center text-[#013E51] transition-colors shadow-xs cursor-pointer"
          >
            <FiArrowLeft className="text-lg" />
          </button>

          <div className="flex items-center gap-2">
            {REVIEW_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  slideIndex === idx
                    ? "w-7 h-2 bg-[#013E51]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next reviews"
            className="w-12 h-12 rounded-full bg-[#013E51] text-white hover:bg-[#024f68] flex items-center justify-center shadow-md transition-colors cursor-pointer"
          >
            <FiArrowRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Write a Review Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
