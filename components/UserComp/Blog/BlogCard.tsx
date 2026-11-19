"use client";

import Image from "next/image";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { BlogPostItem } from "@/models/blog";

interface BlogCardProps {
  post: BlogPostItem;
  onRead?: (post: BlogPostItem) => void;
}

export default function BlogCard({ post, onRead }: BlogCardProps) {
  const handleClick = () => {
    if (onRead) {
      onRead(post);
    } else {
      const el = document.getElementById(post.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
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
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Metadata: Tag, Reading Time & Date */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#888888] font-[family-name:var(--font-lato)] mb-2">
          <div className="flex items-center gap-1.5 uppercase tracking-wider">
            <span className="text-[#E8B34A]">{post.tag}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="flex items-center gap-1 text-[#888888]/80 text-[11px]">
            <FiCalendar className="w-3 h-3 text-[#E8B34A]" />
            <span>{post.publishDate}</span>
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors leading-snug mt-1 mb-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed mb-6">
          {post.excerpt}
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
