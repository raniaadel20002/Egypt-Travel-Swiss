"use client";

import AccommodationHeroBanner from "./AccommodationHeroBanner";
import AccommodationGridSection from "./AccommodationGridSection";

export default function AccommodationPage() {
  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen">
      {/* 1. Hero Section */}
      <AccommodationHeroBanner />

      {/* 2. Main Accommodation Section */}
      <AccommodationGridSection />
    </div>
  );
}
