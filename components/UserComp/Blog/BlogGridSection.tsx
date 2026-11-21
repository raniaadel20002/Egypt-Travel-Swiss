"use client";

import { useEffect, useMemo, useRef } from "react";
import BlogCard from "./BlogCard";
import { useInfiniteBlogsQuery } from "@/features/blogs/useBlogs";

export default function BlogGridSection() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteBlogsQuery(6);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const blogs = useMemo(() => {
    return data?.pages.flatMap((page) => page) ?? [];
  }, [data]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "250px" }
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section
      id="blog-grid"
      className="w-full bg-[#F7EDE1] py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-10 sm:mb-14">
          <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B34A] mb-2 sm:mb-3">
            Travel Blog
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#013E51] tracking-wide leading-tight">
            Stories, Tips &amp; Inspiration
          </h2>
        </div>

        {/* Initial Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm h-[380px] animate-pulse border border-[#888888]/15"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && blogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#888888]/20 shadow-sm p-8 max-w-xl mx-auto">
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
              No stories published yet
            </h3>
            <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
              Check back soon for new travel stories, itineraries, and diving
              guides.
            </p>
          </div>
        )}

        {/* Blog Cards Grid */}
        {blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Next Page Fetching Indicator */}
        {isFetchingNextPage && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`next-${idx}`}
                className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm h-[380px] animate-pulse border border-[#888888]/15"
              />
            ))}
          </div>
        )}

        {/* Endless Scroll Sentinel Target */}
        <div ref={loadMoreRef} className="h-6 w-full" aria-hidden="true" />

        {/* End of Content Notice */}
        {!isLoading && !hasNextPage && blogs.length > 0 && (
          <div className="mt-14 sm:mt-18 text-center pt-10 border-t border-[#013E51]/15 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span
                aria-hidden="true"
                className="h-px w-10 sm:w-16 bg-[#E8B34A]"
              />
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                End of Stories
              </h3>
              <span
                aria-hidden="true"
                className="h-px w-10 sm:w-16 bg-[#E8B34A]"
              />
            </div>
            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888]">
              You have viewed all available articles. Check back regularly for
              new updates and guides.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
