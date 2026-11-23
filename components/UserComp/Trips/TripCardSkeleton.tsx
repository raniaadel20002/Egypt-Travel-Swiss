export default function TripCardSkeleton() {
  return (
    <div className="bg-white rounded-[28px] overflow-hidden shadow-[0px_12px_32px_0px_#013E511A] flex flex-col justify-between animate-pulse">
      <div>
        {/* Image Placeholder */}
        <div className="w-full h-64 sm:h-72 bg-gray-200" />

        {/* Content Placeholder */}
        <div className="p-6 space-y-4">
          {/* Location & Category Placeholder */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded-sm" />
            <div className="h-4 w-16 bg-gray-200 rounded-sm" />
          </div>

          {/* Title Placeholder */}
          <div className="space-y-2 min-h-[60px]">
            <div className="h-6 w-3/4 bg-gray-200 rounded-sm" />
            <div className="h-6 w-1/2 bg-gray-200 rounded-sm" />
          </div>

          {/* Price & Rating Placeholder */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-6 w-28 bg-gray-200 rounded-sm" />
            <div className="h-5 w-24 bg-gray-200 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Buttons Placeholder */}
      <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
        <div className="h-12 bg-gray-200 rounded-xl" />
        <div className="h-12 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
