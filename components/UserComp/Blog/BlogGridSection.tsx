"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import BlogCard from "./BlogCard";
import { useInfiniteBlogsQuery } from "@/features/blogs/useBlogs";
import { LoadingState, ErrorState, EmptyState, EndOfContent } from "./BlogStates";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogGridSection() {
  const { locale, dictionary: dict } = useLocale();
  const reduced = useReducedMotion();
  
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteBlogsQuery(6, locale);

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

  const sectionHeaderVariant = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: reduced ? 0.15 : 0.5,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="blog-grid"
      className="w-full bg-[#F7EDE1] py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-10 sm:mb-14">
          <motion.span
            {...sectionHeaderVariant(0)}
            className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B34A] mb-2 sm:mb-3"
          >
            {dict.blog.grid.eyebrow}
          </motion.span>
          <motion.h2
            {...sectionHeaderVariant(0.1)}
            className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#013E51] tracking-wide leading-tight"
          >
            {dict.blog.grid.heading}
          </motion.h2>
        </div>

        {/* Initial Loading Skeletons */}
        {isLoading && <LoadingState count={6} />}

        {/* Error State */}
        {isError && !isLoading && <ErrorState dict={dict.blog.states} />}

        {/* Empty State */}
        {!isLoading && !isError && blogs.length === 0 && (
          <EmptyState dict={dict.blog.states} />
        )}

        {/* Blog Cards Grid */}
        {blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
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
          <EndOfContent dict={dict.blog.states} />
        )}
      </div>
    </section>
  );
}
