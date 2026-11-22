"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { BlogApiItem } from "@/models/blog";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface BlogDetailHeroProps {
  blog: BlogApiItem;
  tag: string;
  readTime: string;
  backHref: string;
  backLabel?: string;
}

const FALLBACK_IMAGE = "/home/blog/dive-sites.jpg";

export default function BlogDetailHero({
  blog,
  tag,
  readTime,
  backHref,
  backLabel = "Back to all articles",
}: BlogDetailHeroProps) {
  const imageSrc = blog.imageUrl
    ? resolveApiImageUrl(blog.imageUrl)
    : FALLBACK_IMAGE;

  return (
    <header className="max-w-[860px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
      {/* Back to Blog link */}
      <div className="mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#888888] hover:text-[#013E51] transition-colors font-[family-name:var(--font-lato)] group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* Eyebrow: Tag & Read Time */}
      <div className="flex items-center gap-2 text-xs font-semibold text-[#888888] tracking-widest uppercase mb-3 font-[family-name:var(--font-lato)]">
        <span className="text-[#E8B34A] font-bold">{tag}</span>
        <span className="text-[#888888]/50">·</span>
        <span>{readTime}</span>
      </div>

      {/* Editorial Title */}
      <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#013E51] leading-[1.2] mb-6 sm:mb-8">
        {blog.title}
      </h1>

      {/* Contained Featured Cover Image */}
      <div className="relative w-full h-[240px] sm:h-[360px] md:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-slate-100">
        <Image
          src={imageSrc}
          alt={blog.title}
          fill
          priority
          sizes="(max-width: 860px) 100vw, 860px"
          className="object-cover object-center"
        />
      </div>
    </header>
  );
}
