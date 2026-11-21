"use client";

import { FiArrowRight } from "react-icons/fi";
import BlogCard from "./BlogCard";
import { useBlogsQuery } from "@/features/blogs/useBlogs";

export default function BlogGridSection() {
  const { data: blogs = [], isLoading } = useBlogsQuery({
    PageNumber: 1,
    PageSize: 50,
  });

  const handleViewAll = () => {
    const el = document.getElementById("blog-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="blog-grid"
      className="w-full bg-[#F7EDE1] py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B34A] mb-2 sm:mb-3">
              Travel Blog
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#013E51] tracking-wide leading-tight">
              Stories, Tips &amp; Inspiration
            </h2>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="self-start sm:self-auto inline-flex items-center gap-2 border border-[#013E51] text-[#013E51] hover:bg-[#013E51] hover:text-[#F7EDE1] rounded-full px-7 py-3 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer group"
          >
            <span>Read All Articles</span>
            <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white/40 rounded-[28px] sm:rounded-[34px] h-[380px] animate-pulse border border-[#888888]/15"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && blogs.length === 0 && (
          <div className="text-center py-16">
            <p className="font-[family-name:var(--font-lato)] text-lg text-[#013E51]/70">
              No travel stories or blog articles found at this time.
            </p>
          </div>
        )}

        {/* Blog Cards Grid */}
        {!isLoading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
