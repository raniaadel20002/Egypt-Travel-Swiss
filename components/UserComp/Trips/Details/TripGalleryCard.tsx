"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiCamera, FiX } from "react-icons/fi";
import { TripImageApiItem } from "@/models/trip";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface TripGalleryCardProps {
  images: TripImageApiItem[];
  tripName: string;
  categoryLabel?: string;
}

const FALLBACK_IMAGE = "/Trips/heroTrips.png";

export default function TripGalleryCard({
  images = [],
  tripName,
  categoryLabel = "Featured",
}: TripGalleryCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const validImages = images.length > 0 ? images : [{ id: 0, imageUrl: FALLBACK_IMAGE, isPrimary: true }];
  const activeImage = validImages[selectedIndex] || validImages[0];
  const activeSrc = resolveApiImageUrl(activeImage?.imageUrl) || FALLBACK_IMAGE;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : validImages.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < validImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white rounded-[24px] p-3 sm:p-4 border border-[#E8B34A]/30 shadow-xs space-y-3 font-[family-name:var(--font-lato)]">
      {/* Featured Main Image */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[20px] overflow-hidden bg-slate-900 cursor-pointer select-none"
      >
        <Image
          src={activeSrc}
          alt={tripName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
        />

        {/* Category / Featured Ribbon */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#E8B34A] text-[#013E51] text-xs font-bold shadow-sm uppercase tracking-wider">
            {categoryLabel}
          </span>
        </div>

        {/* Counter Badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1.5">
          <FiCamera className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>
            {selectedIndex + 1} / {validImages.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-2xs"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-2xs"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-6 gap-2 sm:gap-2.5 overflow-x-auto pb-1">
          {validImages.map((img, idx) => {
            const thumbUrl = resolveApiImageUrl(img.imageUrl) || FALLBACK_IMAGE;
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#E8B34A] ring-2 ring-[#E8B34A]/40 scale-102"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`${tripName} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Full-screen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close photo modal"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/10] max-h-[85vh]">
            <Image
              src={activeSrc}
              alt={tripName}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {validImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
