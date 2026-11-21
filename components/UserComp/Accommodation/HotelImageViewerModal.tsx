"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from "react-icons/fi";

interface HotelImageViewerModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  hotelName?: string;
}

export default function HotelImageViewerModal({
  images,
  initialIndex,
  isOpen,
  onClose,
  hotelName,
}: HotelImageViewerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/92 backdrop-blur-md select-none transition-all duration-300"
    >
      {/* Top Header Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full flex items-center justify-between px-4 sm:px-8 py-4 z-20 text-white"
      >
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-wider px-3 py-1 rounded-full bg-white/15 text-white/90">
            {currentIndex + 1} / {images.length}
          </span>
          {hotelName && (
            <span className="hidden sm:inline font-[family-name:var(--font-cormorant)] text-lg text-white/90 font-medium truncate max-w-md">
              {hotelName}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          aria-label="Close viewer"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 flex items-center justify-center px-4 sm:px-16 py-2 overflow-hidden"
      >
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-20 p-3 sm:p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
            aria-label="Previous image"
          >
            <FiChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Display Image */}
        <div className="relative w-full h-full max-h-[72vh] max-w-5xl flex items-center justify-center">
          <Image
            src={currentImage}
            alt={hotelName || `Photo ${currentIndex + 1}`}
            fill
            sizes="100vw"
            priority
            className="object-contain object-center transition-all duration-200"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-20 p-3 sm:p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
            aria-label="Next image"
          >
            <FiChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full py-4 px-4 sm:px-8 z-20 overflow-x-auto flex justify-center"
        >
          <div className="flex items-center gap-2 sm:gap-3 max-w-full overflow-x-auto py-1">
            {images.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-11 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "border-[#E8B34A] scale-105 shadow-md shadow-black/50"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
