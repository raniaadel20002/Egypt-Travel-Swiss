"use client";

export default function AccommodationCardSkeleton() {
  return (
    <div className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm border border-[#013E51]/10 animate-pulse flex flex-col justify-between">
      <div>
        {/* Cover Skeleton */}
        <div className="w-full h-56 sm:h-64 bg-slate-200" />

        {/* Content Skeleton */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="h-3.5 bg-slate-200 rounded w-1/3" />
          <div className="h-6 bg-slate-200 rounded w-4/5" />
          <div className="space-y-1.5 pt-1">
            <div className="h-3 bg-slate-200 rounded w-full" />
            <div className="h-3 bg-slate-200 rounded w-3/4" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-5 bg-slate-200 rounded-lg w-20" />
            <div className="h-5 bg-slate-200 rounded-lg w-24" />
          </div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="p-5 sm:p-6 pt-0">
        <div className="w-full h-11 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}
