"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaMapMarkerAlt, FaStar, FaCamera } from "react-icons/fa";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HotelApiItem } from "@/models/hotel";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { useLocale } from "@/shared/providers/LocaleProvider";
import HotelImageViewerModal from "./HotelImageViewerModal";

interface HotelDetailHeroCardProps {
  hotel: HotelApiItem;
  backHref: string;
}

const FALLBACK_IMAGE =
  "/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg";

export default function HotelDetailHeroCard({
  hotel,
  backHref,
}: HotelDetailHeroCardProps) {
  const { dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dictionary.accommodation.detail;

  const rawImages = (hotel.images || []).map((img) =>
    resolveApiImageUrl(img.imageUrl)
  );
  const images = rawImages.length > 0 ? rawImages : [FALLBACK_IMAGE];

  const [heroIndex, setHeroIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const starCount = Math.max(1, Math.min(5, hotel.rate || 5));
  const activeImage = images[heroIndex] || images[0];

  const secondaryImageTop = images.length > 1 ? images[(heroIndex + 1) % images.length] : activeImage;
  const secondaryImageBottom = images.length > 2 ? images[(heroIndex + 2) % images.length] : activeImage;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeroIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeroIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openViewerAt = (idx: number) => {
    setViewerIndex(idx);
    setIsViewerOpen(true);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full space-y-4">
      {/* Breadcrumb & Superheading */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#888888] font-[family-name:var(--font-lato)]">
          <Link
            href={backHref}
            className="hover:text-[#013E51] transition-colors inline-flex items-center gap-1.5"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>{t.breadcrumbAccommodation}</span>
          </Link>
          <span>/</span>
          <span>{t.breadcrumbCategory}</span>
          <span>/</span>
          <span className="text-[#013E51] font-semibold truncate max-w-[200px] sm:max-w-none">
            {hotel.name}
          </span>
        </div>
        <p className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl text-[#013E51] italic tracking-wide">
          {t.heroSubtitle}
        </p>
      </div>

      {/* Main Presentation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-6">
        {/* Title, Rating & Top CTA Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013E51] leading-tight">
              {hotel.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-[#E8B34A]">
                {Array.from({ length: starCount }).map((_, i) => (
                  <FaStar key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#19B8A5] font-[family-name:var(--font-lato)]">
                <FaMapMarkerAlt className="w-3.5 h-3.5 shrink-0" />
                <span>{hotel.location}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToBooking}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>{t.selectRoomAndBook}</span>
            <span>&darr;</span>
          </button>
        </div>

        {/* Featured Mosaic Gallery */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[340px] sm:h-[440px] lg:h-[480px]">
            {/* Main Featured Photo */}
            <div
              onClick={() => openViewerAt(heroIndex)}
              className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group shadow-xs"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroIndex}
                  initial={shouldReduce ? undefined : { opacity: 0.8 }}
                  animate={shouldReduce ? undefined : { opacity: 1 }}
                  exit={shouldReduce ? undefined : { opacity: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeImage}
                    alt={`${hotel.name} featured image`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#013E51] flex items-center justify-center backdrop-blur-xs transition-all shadow-md z-10 cursor-pointer"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#013E51] flex items-center justify-center backdrop-blur-xs transition-all shadow-md z-10 cursor-pointer"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Counter Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                <FaCamera className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>
                  {heroIndex + 1}/{images.length}
                </span>
              </div>
            </div>

            {/* Stacked Secondary Photos */}
            <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4">
              <div
                onClick={() => openViewerAt((heroIndex + 1) % images.length)}
                className="relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group shadow-xs"
              >
                <Image
                  src={secondaryImageTop}
                  alt={`${hotel.name} preview top`}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                />
              </div>
              <div
                onClick={() => openViewerAt((heroIndex + 2) % images.length)}
                className="relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group shadow-xs"
              >
                <Image
                  src={secondaryImageBottom}
                  alt={`${hotel.name} preview bottom`}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.slice(0, 8).map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroIndex(idx)}
                  onDoubleClick={() => openViewerAt(idx)}
                  className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    heroIndex === idx
                      ? "border-[#013E51] scale-102 shadow-md ring-2 ring-[#E8B34A]/50"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${hotel.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <HotelImageViewerModal
        images={images}
        initialIndex={viewerIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        hotelName={hotel.name}
      />
    </section>
  );
}
