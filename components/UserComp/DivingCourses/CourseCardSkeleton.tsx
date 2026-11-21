"use client";

export default function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#888888]/20 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)] flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 sm:h-64 w-full bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Metadata badges skeleton */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 w-24 bg-slate-200 rounded-full" />
            <div className="h-4 w-16 bg-slate-200 rounded-full" />
          </div>

          {/* Title skeleton */}
          <div className="h-7 w-3/4 bg-slate-200 rounded-md mb-3" />

          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-3 w-full bg-slate-200 rounded-sm" />
            <div className="h-3 w-5/6 bg-slate-200 rounded-sm" />
          </div>

          {/* Facilities tags skeleton */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <div className="h-5 w-20 bg-slate-100 rounded-full" />
            <div className="h-5 w-24 bg-slate-100 rounded-full" />
          </div>
        </div>

        <div>
          {/* Price Row skeleton */}
          <div className="flex items-baseline justify-between pt-4 border-t border-[#888888]/15">
            <div className="h-3 w-20 bg-slate-200 rounded-sm" />
            <div className="h-7 w-24 bg-slate-200 rounded-md" />
          </div>

          {/* Buttons skeleton */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="h-10 bg-slate-200 rounded-full" />
            <div className="h-10 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
