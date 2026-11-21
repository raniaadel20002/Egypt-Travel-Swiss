"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { BlogApiItem } from "@/models/blog";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { buildBlogDetailsPath } from "@/shared/utils/slugify";

interface BlogCardProps {
  post: BlogApiItem;
  onRead?: (post: BlogApiItem) => void;
}

const DEFAULT_IMAGE = "/home/blog/dive-sites.jpg";

function getBlogMeta(post: BlogApiItem): { tag: string; readTime: string } {
  const text = `${post.title || ""} ${post.content || ""}`.toLowerCase();
  let tag = "TRAVEL";
  if (
    text.includes("dive") ||
    text.includes("scuba") ||
    text.includes("reef") ||
    text.includes("snorkeling")
  ) {
    tag = "DIVING";
  } else if (
    text.includes("cairo") ||
    text.includes("pyramid") ||
    text.includes("culture") ||
    text.includes("museum") ||
    text.includes("temple") ||
    text.includes("luxor")
  ) {
    tag = "CULTURE";
  } else if (
    text.includes("time") ||
    text.includes("when") ||
    text.includes("season") ||
    text.includes("tip") ||
    text.includes("weather")
  ) {
    tag = "TIPS";
  }

  const wordCount = (post.content || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(3, Math.min(10, Math.ceil(wordCount / 25) || 5));

  return { tag, readTime: `${minutes} MIN READ` };
}

export default function BlogCard({ post, onRead }: BlogCardProps) {
  const { locale } = useLocale();
  const router = useRouter();

  const imageSrc = post.imageUrl
    ? resolveApiImageUrl(post.imageUrl)
    : DEFAULT_IMAGE;

  const detailsPath = buildBlogDetailsPath(locale, post.id, post.title);
  const { tag, readTime } = getBlogMeta(post);

  const handleClick = () => {
    if (onRead) {
      onRead(post);
    } else {
      router.push(detailsPath);
    }
  };

  return (
    <article
      onClick={handleClick}
      className="group bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Flush Top Cover Image */}
        <div className="relative w-full h-[220px] sm:h-[240px] lg:h-[250px] overflow-hidden bg-slate-100">
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {/* Eyebrow: TAG · X MIN READ */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#888888] tracking-wider uppercase mb-2.5 font-[family-name:var(--font-lato)]">
            <span>{tag}</span>
            <span className="text-[#888888]/60">·</span>
            <span>{readTime}</span>
          </div>

          {/* Title */}
          <Link
            href={detailsPath}
            onClick={(e) => e.stopPropagation()}
            className="block"
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] leading-[1.25] mb-3 group-hover:text-[#E8B34A] transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed line-clamp-2">
            {post.content}
          </p>
        </div>
      </div>

      {/* Read More Footer */}
      <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1">
        <Link
          href={detailsPath}
          onClick={(e) => {
            e.stopPropagation();
            if (onRead) onRead(post);
          }}
          className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] inline-flex items-center gap-1.5 group-hover:text-[#E8B34A] transition-colors cursor-pointer"
        >
          <span>Read more</span>
          <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
