"use client";

import Image from "next/image";
import { BlogSectionApiItem } from "@/models/blog";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface BlogSectionItemProps {
  section: BlogSectionApiItem;
  index: number;
}

export default function BlogSectionItem({
  section,
}: BlogSectionItemProps) {
  const hasImage = Boolean(section.imageUrl);
  const imageSrc = hasImage ? resolveApiImageUrl(section.imageUrl) : null;

  return (
    <section className="mb-10 sm:mb-14">
      {/* Section title */}
      {section.title && (
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] leading-snug mb-3.5">
          {section.title}
        </h2>
      )}

      {/* Section content */}
      {section.content && (
        <p className="font-[family-name:var(--font-lato)] text-base sm:text-[17px] text-[#374151] leading-[1.85] whitespace-pre-line mb-5">
          {section.content}
        </p>
      )}

      {/* Section image */}
      {hasImage && imageSrc && (
        <div className="relative w-full h-[220px] sm:h-[320px] md:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-slate-100">
          <Image
            src={imageSrc}
            alt={section.title || `Section ${section.sectionNumber}`}
            fill
            sizes="(max-width: 860px) 100vw, 860px"
            className="object-cover object-center"
          />
        </div>
      )}
    </section>
  );
}
