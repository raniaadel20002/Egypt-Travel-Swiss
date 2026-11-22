"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useBlogsQuery } from "@/features/blogs/useBlogs";
import BlogCard from "@/components/UserComp/Blog/BlogCard";

export default function BlogSection() {
  const { locale, dictionary: dict } = useLocale();
  const { data: blogs = [], isLoading } = useBlogsQuery({
    PageNumber: 1,
    PageSize: 10,
    language: locale,
  });

  return (
    <section
      id="blog"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#013E51] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12 lg:mb-14 text-center sm:text-left">
          <div className="mx-auto sm:mx-0">
            <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#E8B34A] mb-2 sm:mb-2.5">
              {dict.blog.hero.eyebrow}
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {dict.blog.hero.heading}
            </h2>
          </div>

          <Link
            href={`/${locale}/blog`}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{dict.blog.card.readMore}</span>
            <FiArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-[24px] sm:rounded-[28px] overflow-hidden h-[380px] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="font-[family-name:var(--font-lato)] text-base text-white/70">
              No articles published yet. Check back soon for travel guides and tips.
            </p>
          </div>
        )}

        {/* Backend Blogs Grid */}
        {!isLoading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {blogs.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Mobile Read All Articles Button */}
        <div className="mt-8 text-center block sm:hidden">
          <Link
            href={`/${locale}/blog`}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-semibold text-sm hover:bg-white/10 transition-colors shadow-sm"
          >
            <span>Read All Articles</span>
            <FiArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
