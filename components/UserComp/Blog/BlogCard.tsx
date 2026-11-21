"use client";

import Image from "next/image";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { BlogApiItem } from "@/models/blog";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface BlogCardProps {
  post: BlogApiItem;
  onRead?: (post: BlogApiItem) => void;
}

const DEFAULT_IMAGE = "/home/blog/dive-sites.jpg";

export default function BlogCard({ post, onRead }: BlogCardProps) {
  const imageSrc = post.imageUrl
    ? resolveApiImageUrl(post.imageUrl)
    : DEFAULT_IMAGE;

  const handleClick = () => {
    if (onRead) {
      onRead(post);
    }
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white rounded-[28px] sm:rounded-[34px] p-5 sm:p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer border border-[#888888]/15"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative w-full h-56 sm:h-64 rounded-[22px] sm:rounded-[26px] overflow-hidden mb-5 bg-slate-100">
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#888888] font-[family-name:var(--font-lato)] mb-2">
          <div className="flex items-center gap-1.5 uppercase tracking-wider">
            <span className="text-[#E8B34A]">Travel Blog</span>
          </div>

          <div className="flex items-center gap-1 text-[#888888]/80 text-[11px]">
            <FiCalendar className="w-3 h-3 text-[#E8B34A]" />
            <span>Guide</span>
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors leading-snug mt-1 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Content */}
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed mb-6 line-clamp-3">
          {post.content}
        </p>
      </div>

      {/* Read More Row */}
      <div className="pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors cursor-pointer"
        >
          <span>Read more</span>
          <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
