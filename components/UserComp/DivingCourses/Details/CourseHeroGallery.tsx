"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCamera,
  FiArrowRight,
  FiAward,
  FiCompass,
  FiClock,
  FiCheckCircle,
  FiMaximize2,
} from "react-icons/fi";
import {
  DivingCourseFacilityApiItem,
  DivingCourseImageApiItem,
} from "@/models/divingCourse";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import CourseImageViewerModal from "./CourseImageViewerModal";

interface CourseHeroGalleryProps {
  name: string;
  description?: string;
  price: number;
  currency: string;
  perPersonLabel: string;
  padiBadge: string;
  enrollCta: string;
  fromLabel: string;
  images: DivingCourseImageApiItem[];
  facilities?: DivingCourseFacilityApiItem[];
  onEnrollClick?: () => void;
}

const FALLBACK_MAIN_IMAGE =
  "/home/DivingCourses/Gemini_Generated_Image_fdmthjfdmthjfdmt 1.png";

const renderHighlightIcon = (icon?: string, fallbackIdx?: number) => {
  const norm = (icon || "").toLowerCase();
  if (norm.includes("clock") || norm.includes("duration") || fallbackIdx === 0) {
    return <FiClock className="w-4 h-4 text-[#E8B34A]" />;
  }
  if (
    norm.includes("compass") ||
    norm.includes("depth") ||
    norm.includes("water") ||
    fallbackIdx === 1
  ) {
    return <FiCompass className="w-4 h-4 text-[#E8B34A]" />;
  }
  if (
    norm.includes("award") ||
    norm.includes("cert") ||
    fallbackIdx === 2
  ) {
    return <FiAward className="w-4 h-4 text-[#E8B34A]" />;
  }
  return <FiCheckCircle className="w-4 h-4 text-[#E8B34A]" />;
};

export default function CourseHeroGallery({
  name,
  description,
  price,
  currency,
  perPersonLabel,
  padiBadge,
  enrollCta,
  fromLabel,
  images,
  facilities = [],
  onEnrollClick,
}: CourseHeroGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const imageList = images && images.length > 0 ? images : [];
  const totalImages = imageList.length > 0 ? imageList.length : 1;
  const activeImageRaw =
    imageList[selectedIdx]?.imageUrl || imageList[selectedIdx]?.url;
  const activeImageSrc = activeImageRaw
    ? resolveApiImageUrl(activeImageRaw)
    : FALLBACK_MAIN_IMAGE;

  const allImageUrls =
    imageList.length > 0
      ? imageList.map((img) => resolveApiImageUrl(img.imageUrl || img.url))
      : [FALLBACK_MAIN_IMAGE];

  const code = (currency || "EUR").toUpperCase();
  const symbol =
    code === "USD" ? "$" : code === "EUR" ? "€" : code === "GBP" ? "£" : "$";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  };

  const highlightItems = facilities.slice(0, 4);

  return (
    <>
      <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-sm border border-[#E5DDD0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Course Identity, Features & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Academy Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7EE] border border-[#E8B34A]/40 text-[#013E51] text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#013E51]" />
                {padiBadge}
              </span>
            </div>

            {/* Course Name */}
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#013E51] leading-[1.12] mb-4">
              {name}
            </h1>

            {/* Description */}
            {description && (
              <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#013E51]/80 leading-relaxed mb-6 line-clamp-3">
                {description}
              </p>
            )}

            {/* 4 Highlight Pills (2x2 Grid) */}
            {highlightItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {highlightItems.map((item, idx) => (
                  <div
                    key={item.id || `hl-${idx}`}
                    className="flex items-center gap-3 p-3 rounded-[16px] bg-[#FAF7F2] border border-[#013E51]/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#013E51] text-white flex items-center justify-center shrink-0">
                      {renderHighlightIcon(item.icon, idx)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-[family-name:var(--font-lato)] text-[11px] font-bold uppercase tracking-wider text-[#013E51] truncate">
                        {item.name}
                      </p>
                      <p className="font-[family-name:var(--font-lato)] text-xs text-[#013E51]/70 truncate">
                        {item.values}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions: Enroll CTA + Price Pill */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onEnrollClick}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#013E51] hover:bg-[#022c3a] text-white font-[family-name:var(--font-lato)] font-semibold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>{enrollCta}</span>
                <FiArrowRight className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#FAF7F2] border border-[#013E51]/10 text-sm font-bold text-[#013E51]">
                <span>
                  {fromLabel} {symbol}
                  {price} {perPersonLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Photo Gallery */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Main Photo Card (Click to open fullscreen modal) */}
            <div
              onClick={() => setIsViewerOpen(true)}
              className="group relative w-full h-[280px] sm:h-[360px] lg:h-[400px] rounded-[20px] overflow-hidden shadow-md bg-[#012533] cursor-pointer"
            >
              <Image
                src={activeImageSrc}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />

              {/* Top Right Fullscreen Icon Pill */}
              <div className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white opacity-80 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                <FiMaximize2 className="w-4 h-4 text-[#E8B34A]" />
              </div>

              {/* Bottom Controls Overlay */}
              <div className="absolute inset-x-0 bottom-3 px-4 flex items-center justify-between pointer-events-none z-10">
                {/* Prev Button */}
                {totalImages > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="pointer-events-auto w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Counter Pill */}
                <div className="mx-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-medium backdrop-blur-xs">
                  <FiCamera className="w-3.5 h-3.5 text-[#E8B34A]" />
                  <span>
                    {selectedIdx + 1} / {totalImages}
                  </span>
                </div>

                {/* Next Button */}
                {totalImages > 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="pointer-events-auto w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {imageList.length > 1 && (
              <div className="flex items-center gap-2.5 mt-3.5 overflow-x-auto pb-1 scrollbar-none">
                {imageList.map((img, idx) => {
                  const rawUrl = img.imageUrl || img.url;
                  const src = rawUrl
                    ? resolveApiImageUrl(rawUrl)
                    : FALLBACK_MAIN_IMAGE;
                  const isSelected = idx === selectedIdx;

                  return (
                    <button
                      key={img.id || `thumb-${idx}`}
                      type="button"
                      onClick={() => setSelectedIdx(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-[14px] overflow-hidden shrink-0 transition-all ${
                        isSelected
                          ? "ring-2 ring-[#E8B34A] scale-102 shadow-sm"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${name} thumbnail ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Slider / Lightbox Modal */}
      <CourseImageViewerModal
        images={allImageUrls}
        initialIndex={selectedIdx}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        courseName={name}
      />
    </>
  );
}
