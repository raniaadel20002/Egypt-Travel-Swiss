"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useBlogDetailQuery, useBlogsQuery } from "@/features/blogs/useBlogs";
import { BlogSectionApiItem } from "@/models/blog";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { parseNumericIdFromSlug } from "@/shared/utils/slugify";
import BlogCard from "./BlogCard";
import BlogDetailHero from "./BlogDetailHero";
import BlogSectionItem from "./BlogSectionItem";

interface BlogDetailPageProps {
  slug: string;
  locale: string;
}

function getBlogMeta(
  title: string,
  content: string,
  tags: Record<string, string>,
  minReadLabel: string
): { tag: string; readTime: string } {
  const text = `${title} ${content}`.toLowerCase();
  let tag = tags.travel || "TRAVEL";
  if (
    text.includes("dive") ||
    text.includes("scuba") ||
    text.includes("reef") ||
    text.includes("snorkeling")
  ) {
    tag = tags.diving || "DIVING";
  } else if (
    text.includes("cairo") ||
    text.includes("pyramid") ||
    text.includes("culture") ||
    text.includes("museum") ||
    text.includes("temple") ||
    text.includes("luxor")
  ) {
    tag = tags.culture || "CULTURE";
  } else if (
    text.includes("time") ||
    text.includes("when") ||
    text.includes("season") ||
    text.includes("tip") ||
    text.includes("weather")
  ) {
    tag = tags.tips || "TIPS";
  }
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.min(10, Math.ceil(wordCount / 25) || 5));
  return { tag, readTime: `${minutes} ${minReadLabel}` };
}

function BlogDetailSkeleton() {
  return (
    <div className="animate-pulse max-w-[860px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16">
      <div className="h-4 bg-slate-200 rounded w-28 mb-6" />
      <div className="h-4 bg-slate-200 rounded w-36 mb-3" />
      <div className="h-10 bg-slate-200 rounded w-4/5 mb-6" />
      <div className="w-full h-[240px] sm:h-[380px] bg-slate-200 rounded-2xl sm:rounded-3xl mb-8" />
      <div className="space-y-3 mb-10">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-200 rounded w-4/6" />
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="mb-10">
          <div className="h-7 bg-slate-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-full mb-2" />
          <div className="h-4 bg-slate-200 rounded w-4/5 mb-4" />
          <div className="w-full h-[220px] bg-slate-200 rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

export default function BlogDetailPage({ slug, locale }: BlogDetailPageProps) {
  const { dictionary: dict } = useLocale();
  const blogId = parseNumericIdFromSlug(slug);
  const backHref = `/${locale}/blog`;

  const {
    data: blog,
    isLoading,
    isError,
  } = useBlogDetailQuery(blogId ?? undefined, locale);

  const { data: allBlogs } = useBlogsQuery({ PageSize: 6, language: locale });

  const relatedBlogs = (allBlogs ?? [])
    .filter((b) => b.id !== blogId)
    .slice(0, 3);

  const sortedSections: BlogSectionApiItem[] = blog?.blogSections
    ? [...blog.blogSections].sort((a, b) => a.sectionNumber - b.sectionNumber)
    : [];

  const { tag, readTime } = blog
    ? getBlogMeta(
        blog.title,
        blog.content,
        dict.blog.card.tags,
        dict.blog.card.minRead
      )
    : {
        tag: dict.blog.card.tags.travel,
        readTime: `5 ${dict.blog.card.minRead}`,
      };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <BlogDetailSkeleton />
      </main>
    );
  }

  if (isError || !blog) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51] mb-4">
          {dict.blog.detail.notFoundTitle}
        </p>
        <p className="font-[family-name:var(--font-lato)] text-[#888888] mb-8 max-w-sm">
          {dict.blog.detail.notFoundDesc}
        </p>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-[family-name:var(--font-lato)] text-sm font-semibold text-white bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] transition-colors px-6 py-3 rounded-full"
        >
          <FiArrowLeft className="w-4 h-4" />
          {dict.blog.detail.backToBlog}
        </Link>
      </main>
    );
  }

  return (
    <article className="min-h-screen bg-white pb-16">
      {/* Contained Hero */}
      <BlogDetailHero
        blog={blog}
        tag={tag}
        readTime={readTime}
        backHref={backHref}
        backLabel={dict.blog.detail.backToAll}
      />

      {/* Intro Lead Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-8 pb-6">
        {blog.content && (
          <div className="border-l-4 border-[#E8B34A] pl-5 sm:pl-6 py-1">
            <p className="font-[family-name:var(--font-lato)] text-base sm:text-lg text-[#374151] leading-[1.8] italic">
              {blog.content}
            </p>
          </div>
        )}
      </div>

      {/* Sections Divider */}
      {sortedSections.length > 0 && (
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <hr className="border-[#E8B34A]/20 my-6" />
        </div>
      )}

      {/* Sections List */}
      {sortedSections.length > 0 && (
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          {sortedSections.map((section, idx) => (
            <BlogSectionItem key={section.id} section={section} index={idx} />
          ))}
        </div>
      )}

      {/* Related Articles Strip */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#F7EDE1] py-14 sm:py-20 mt-8">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51] mb-2 text-center">
              {dict.blog.detail.moreArticles}
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888] text-center mb-10">
              {dict.blog.detail.continueExploring}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
