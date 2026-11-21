"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useBlogsQuery } from "@/features/blogs/useBlogs";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

const DEFAULT_IMAGE = "/home/blog/dive-sites.jpg";

export default function BlogSection() {
  const { locale } = useLocale();
  const { data: blogs = [], isLoading } = useBlogsQuery({
    PageNumber: 1,
    PageSize: 10,
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
              TRAVEL BLOG
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Stories, Tips &amp; Inspiration
            </h2>
          </div>

          <Link
            href={`/${locale}/blog`}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>Read All Articles</span>
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
            {blogs.slice(0, 3).map((post) => {
              const imageSrc = post.imageUrl
                ? resolveApiImageUrl(post.imageUrl)
                : DEFAULT_IMAGE;

              return (
                <Link
                  key={post.id}
                  href={`/${locale}/blog`}
                  className="group bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Image */}
                  <div className="relative w-full h-[220px] sm:h-[240px] lg:h-[250px] overflow-hidden bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="block font-[family-name:var(--font-lato)] text-xs font-bold tracking-wider uppercase text-[#013E51]/60 mb-2.5">
                        TRAVEL GUIDE
                      </span>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] leading-[1.25] mb-3 group-hover:text-[#E8B34A] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 font-normal leading-relaxed mb-6 line-clamp-3">
                        {post.content}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] inline-flex items-center gap-1.5 group-hover:text-[#E8B34A] transition-colors">
                        <span>Read more</span>
                        <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
