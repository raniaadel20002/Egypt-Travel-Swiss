"use client";

import BlogHeroBanner from "./BlogHeroBanner";
import BlogGridSection from "./BlogGridSection";

export default function BlogPage() {
  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen">
      {/* 1. Hero Section */}
      <BlogHeroBanner />

      {/* 2. Main Blog Section */}
      <BlogGridSection />
    </div>
  );
}
