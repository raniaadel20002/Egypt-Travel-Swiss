"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { BlogApiItem } from "@/models/blog";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { buildBlogDetailsPath } from "@/shared/utils/slugify";

const EASE = [0.22, 1, 0.36, 1] as const;

interface BlogCardProps {
  post: BlogApiItem;
  index?: number;
  onRead?: (post: BlogApiItem) => void;
}

const DEFAULT_IMAGE = "/home/blog/dive-sites.jpg";

function getBlogTag(post: BlogApiItem, tags: Record<string, string>): string {
  const text = `${post.title || ""} ${post.content || ""}`.toLowerCase();
  
  if (
    text.includes("dive") ||
    text.includes("scuba") ||
    text.includes("reef") ||
    text.includes("snorkeling")
  ) {
    return tags.diving;
  } else if (
    text.includes("cairo") ||
    text.includes("pyramid") ||
    text.includes("culture") ||
    text.includes("museum") ||
    text.includes("temple") ||
    text.includes("luxor")
  ) {
    return tags.culture;
  } else if (
    text.includes("time") ||
    text.includes("when") ||
    text.includes("season") ||
    text.includes("tip") ||
    text.includes("weather")
  ) {
    return tags.tips;
  }
  
  return tags.travel;
}

function getReadTime(post: BlogApiItem): number {
  const wordCount = (post.content || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.min(10, Math.ceil(wordCount / 200) || 5));
}

export default function BlogCard({ post, index = 0, onRead }: BlogCardProps) {
  const { locale, dictionary: dict } = useLocale();
  const router = useRouter();
  const reduced = useReducedMotion();

  const imageSrc = post.imageUrl
    ? resolveApiImageUrl(post.imageUrl)
    : DEFAULT_IMAGE;

  const detailsPath = buildBlogDetailsPath(locale, post.id, post.title);
  const tag = getBlogTag(post, dict.blog.card.tags);
  const readTime = getReadTime(post);

  const cardVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduced ? 0.1 : 0.5,
      delay: reduced ? 0 : index * 0.08,
      ease: EASE,
    },
  };

  const handleClick = () => {
    if (onRead) {
      onRead(post);
    } else {
      router.push(detailsPath);
    }
  };

  return (
    <motion.article
      {...cardVariant}
      onClick={handleClick}
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              transition: { duration: 0.3, ease: EASE },
            }
      }
      className="group bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Cover Image */}
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
            <span>
              {readTime} {dict.blog.card.minRead}
            </span>
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
          <span>{dict.blog.card.readMore}</span>
          <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
