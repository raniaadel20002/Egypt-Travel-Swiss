"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiArrowLeft, FiMaximize2 } from "react-icons/fi";
import { HotelApiItem } from "@/models/hotel";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import HotelImageViewerModal from "./HotelImageViewerModal";

interface AccommodationDetailHeroProps {
  hotel: HotelApiItem;
  backHref: string;
}

const FALLBACK_IMAGE =
  "/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg";

export default function AccommodationDetailHero({
  hotel,
  backHref,
}: AccommodationDetailHeroProps) {
  const allImages = (hotel.images || []).map((img) =>
    resolveApiImageUrl(img.imageUrl)
  );
  if (allImages.length === 0) {
    allImages.push(FALLBACK_IMAGE);
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const starCount = Math.max(1, Math.min(5, hotel.rate || 5));
  const activeImage = allImages[activeImageIndex] || allImages[0];

  const handleOpenViewer = (index: number) => {
    setViewerIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <header className="w-full">
      {/* Back Breadcrumb */}
      <div className="mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#888888] hover:text-[#013E51] transition-colors font-[family-name:var(--font-lato)] group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to All Accommodations</span>
        </Link>
      </div>

      {/* Title & Metadata Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          {/* Star Rating & Verified Pill */}
          <div className="flex items-center gap-3 mb-2.5">
            <div className="flex items-center gap-1 text-[#E8B34A]">
              {Array.from({ length: starCount }).map((_, idx) => (
                <FaStar key={idx} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-[family-name:var(--font-lato)] text-xs font-bold text-[#013E51] tracking-wide uppercase">
              {starCount}-Star Luxury Stay
            </span>
          </div>

          {/* Hotel Name */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013E51] leading-tight">
            {hotel.name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#19B8A5] font-[family-name:var(--font-lato)] mt-2">
            <FaMapMarkerAlt className="w-4 h-4 shrink-0" />
            <span>{hotel.location}</span>
          </div>
        </div>
      </div>

      {/* Featured Gallery */}
      <div className="space-y-3">
        {/* Main Display Image with Click-to-view */}
        <div
          onClick={() => handleOpenViewer(activeImageIndex)}
          className="group relative w-full h-[280px] sm:h-[420px] lg:h-[500px] rounded-3xl overflow-hidden shadow-sm bg-slate-100 cursor-pointer"
        >
          <Image
            src={activeImage}
            alt={hotel.name}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
          />

          {/* Hover View Photos Badge */}
          <div className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-semibold transition-all">
            <FiMaximize2 className="w-4 h-4 text-[#E8B34A]" />
            <span>View All Photos ({allImages.length})</span>
          </div>
        </div>

        {/* Thumbnails Row (if more than 1 image) */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {allImages.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveImageIndex(idx);
                }}
                onDoubleClick={() => handleOpenViewer(idx)}
                className={`relative w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? "border-[#013E51] scale-102 shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`${hotel.name} - Photo ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <HotelImageViewerModal
        images={allImages}
        initialIndex={viewerIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        hotelName={hotel.name}
      />
    </header>
  );
}
