"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiStar, FiArrowRight, FiArrowLeft, FiLoader } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import AddReviewModal from "./AddReviewModal";
import ReviewRatingCard from "./ReviewRatingCard";
import { useReviewsProjectList } from "@/features/reviews/useReviewsProject";
import { ReviewProjectItem } from "@/models/reviewsProject";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ReviewsSection() {
  const { locale, dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useReviewsProjectList({
    pageNumber: 1,
    pageSize: 30,
  });

  const reviews: ReviewProjectItem[] = data?.data ?? [];

  // Compute average rating and star breakdown from real reviews
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + (r.rate || 5), 0) / totalReviews
      : 5.0;

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rate) === star).length;
    const percent =
      totalReviews > 0 ? Math.round((count / totalReviews) * 100) : star === 5 ? 100 : 0;
    return { star, percent };
  });

  // Chunk reviews into slides (1 featured quote + up to 2 cards)
  const slides: {
    featured: ReviewProjectItem;
    cards: ReviewProjectItem[];
  }[] = [];

  for (let i = 0; i < reviews.length; i += 3) {
    slides.push({
      featured: reviews[i],
      cards: reviews.slice(i + 1, i + 3),
    });
  }

  const currentSlideIndex = slides.length > 0 ? slideIndex % slides.length : 0;
  const activeSlide = slides[currentSlideIndex];

  const handlePrev = () => {
    if (slides.length <= 1) return;
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (slides.length <= 1) return;
    setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const getInitials = (firstName: string, lastName: string) => {
    const f = firstName?.[0] || "";
    const l = lastName?.[0] || "";
    return (f + l).toUpperCase() || "T";
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FBF6F0] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: BRAND_EASE }}
            className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-2.5"
          >
            <span className="w-8 sm:w-12 h-[1px] bg-[#E8B34A]" />
            <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#708A93]">
              {dict.homePage.reviews.eyebrow}
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#E8B34A]" />
          </motion.div>

          <motion.h2
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#013E51] tracking-tight"
          >
            {dict.homePage.reviews.heading}
          </motion.h2>

          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, scaleX: 0 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: BRAND_EASE }}
            className="w-14 h-[3px] bg-[#E8B34A] mx-auto rounded-full my-3 sm:my-3.5"
          />

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-[#013E51]/75 font-normal leading-relaxed max-w-xl mx-auto"
          >
            {dict.homePage.reviews.divider}
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[400px_1fr] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start mb-10 sm:mb-12">
          {/* Left: Overall Rating Card */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, x: -30 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: BRAND_EASE }}
          >
            <ReviewRatingCard
              onWriteReview={() => setIsModalOpen(true)}
              averageRating={averageRating}
              totalReviews={totalReviews}
              breakdown={breakdown}
            />
          </motion.div>

          {/* Right: Slide Content / Empty / Loading */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: BRAND_EASE }}
            className="flex flex-col justify-between"
          >
            {isLoading && (
              <div className="bg-white rounded-[24px] sm:rounded-[32px] p-12 text-center border border-black/5 flex flex-col items-center justify-center min-h-[300px] gap-3">
                <FiLoader className="w-8 h-8 text-[#013E51] animate-spin" />
                <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                  {dict.homePage.reviews.loading}
                </p>
              </div>
            )}

            {!isLoading && (isError || reviews.length === 0) && (
              <div className="bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 text-center border border-black/5 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-14 h-14 rounded-2xl bg-[#E8B34A]/10 text-[#E8B34A] flex items-center justify-center mb-3">
                  <FiStar className="w-7 h-7" />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-2">
                  {dict.homePage.reviews.noReviews}
                </h3>
                <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/70 max-w-md mb-6">
                  {dict.homePage.reviews.noReviewsDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-7 py-3 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#025670] transition shadow-sm cursor-pointer"
                >
                  {dict.homePage.reviews.writeFirstReview}
                </button>
              </div>
            )}

            {!isLoading && activeSlide && (
              <>
                {/* Top: Featured Quote inside White Card */}
                <motion.div
                  key={`featured-${currentSlideIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: BRAND_EASE }}
                  className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-xs border border-black/5 mb-6 sm:mb-7"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      aria-hidden="true"
                      className="block text-4xl sm:text-5xl font-serif text-[#013E51] leading-none font-black"
                    >
                      &ldquo;
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: activeSlide.featured.rate || 5 }).map((_, idx) => (
                        <FiStar key={idx} className="text-sm fill-[#E8B34A] text-[#E8B34A]" />
                      ))}
                    </div>
                  </div>

                  <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-[#013E51] italic font-normal leading-relaxed mb-5 sm:mb-6 max-w-2xl">
                    {activeSlide.featured.comment}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {getInitials(activeSlide.featured.firstName, activeSlide.featured.lastName)}
                    </div>
                    <div>
                      <span className="block font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base text-[#013E51]">
                        {activeSlide.featured.firstName} {activeSlide.featured.lastName}
                      </span>
                      {activeSlide.featured.createdAt && (
                        <span className="block font-[family-name:var(--font-lato)] text-[11px] text-[#888888]">
                          {new Date(activeSlide.featured.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Bottom 2 Cards */}
                {activeSlide.cards.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {activeSlide.cards.map((card, cardIndex) => (
                      <motion.div
                        key={card.id}
                        initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
                        animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: shouldReduce ? 0 : 0.4 + cardIndex * 0.1,
                          ease: BRAND_EASE,
                        }}
                        className="rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 bg-white border border-[#E8B34A] shadow-xs flex flex-col justify-between min-h-[190px]"
                      >
                        <div>
                          <div className="flex items-center gap-1 mb-2.5">
                            {Array.from({ length: card.rate || 5 }).map((_, s) => (
                              <FiStar
                                key={s}
                                className="text-sm fill-[#E8B34A] text-[#E8B34A]"
                              />
                            ))}
                          </div>

                          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/80 leading-relaxed mb-5 line-clamp-3">
                            {card.comment}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="w-9 h-9 rounded-full bg-[#E8B34A] text-white font-[family-name:var(--font-lato)] font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {getInitials(card.firstName, card.lastName)}
                          </div>
                          <div>
                            <span className="block font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm text-[#013E51]">
                              {card.firstName} {card.lastName}
                            </span>
                            {card.createdAt && (
                              <span className="block font-[family-name:var(--font-lato)] text-[10px] text-[#888888]">
                                {new Date(card.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* Slider Controls / Pagination */}
        {slides.length > 1 && (
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: BRAND_EASE }}
            className="flex items-center justify-between"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label={dict.homePage.reviews.previousReviews}
              className="w-12 h-12 rounded-full border border-gray-400/60 bg-white hover:border-[#013E51] flex items-center justify-center text-[#013E51] transition-colors shadow-xs cursor-pointer"
            >
              <FiArrowLeft className="text-lg" />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  aria-label={dict.homePage.reviews.goToSlide.replace('{{number}}', String(idx + 1))}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlideIndex === idx
                      ? "w-7 h-2 bg-[#013E51]"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label={dict.homePage.reviews.nextReviews}
              className="w-12 h-12 rounded-full bg-[#013E51] text-white hover:bg-[#024f68] flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <FiArrowRight className="text-lg" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Write a Review Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
