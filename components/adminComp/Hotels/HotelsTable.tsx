"use client";

import Image from "next/image";
import { FiEdit2, FiImage, FiList, FiStar, FiTrash2 } from "react-icons/fi";
import { HotelApiItem } from "@/models/hotel";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface HotelsTableProps {
  items: HotelApiItem[];
  isLoading: boolean;
  onEdit: (item: HotelApiItem) => void;
  onManageImages: (item: HotelApiItem) => void;
  onReorderFacilities: (item: HotelApiItem) => void;
  onDelete: (item: HotelApiItem) => void;
}

export default function HotelsTable({
  items,
  isLoading,
  onEdit,
  onManageImages,
  onReorderFacilities,
  onDelete,
}: HotelsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-12 text-center border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <div className="inline-block w-8 h-8 border-4 border-[#013E51]/20 border-t-[#013E51] rounded-full animate-spin mb-3" />
        <p className="text-xs sm:text-sm font-semibold text-[#013E51]">
          Loading resorts and hotel records...
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-12 text-center border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <p className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Hotels or Resorts Found
        </p>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-1.5">
          Try clearing your filters or create a new hotel record.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#013E51]/10 bg-[#FAF7F2]/60 text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
              <th className="py-4 px-5">ID</th>
              <th className="py-4 px-5">Hotel / Resort</th>
              <th className="py-4 px-5">Location</th>
              <th className="py-4 px-5">Rating</th>
              <th className="py-4 px-5">Facilities</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#013E51]/5 text-xs sm:text-sm">
            {items.map((hotel) => {
              const primaryImage =
                hotel.images?.find((img) => img.isPrimary) || hotel.images?.[0];
              const validImgUrl = primaryImage?.imageUrl
                ? resolveApiImageUrl(primaryImage.imageUrl)
                : null;

              return (
                <tr
                  key={hotel.id}
                  className="hover:bg-[#FAF7F2]/40 transition duration-150"
                >
                  {/* ID */}
                  <td className="py-4 px-5 font-mono text-xs font-bold text-[#013E51]/60">
                    #{hotel.id}
                  </td>

                  {/* Name & Photo */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onManageImages(hotel)}
                        title="Click to manage resort photos"
                        className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden relative shrink-0 border border-gray-200 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#013E51]/30 transition group"
                      >
                        {validImgUrl ? (
                          <Image
                            src={validImgUrl}
                            alt={hotel.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            unoptimized
                          />
                        ) : (
                          <span className="font-bold text-xs text-gray-400 group-hover:text-[#013E51]">
                            {hotel.name?.slice(0, 2).toUpperCase() || "HT"}
                          </span>
                        )}
                      </button>
                      <div>
                        <h4 className="font-bold text-[#013E51] text-xs sm:text-sm line-clamp-1">
                          {hotel.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {hotel.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-5 text-xs font-medium text-gray-700 max-w-[200px]">
                    <span className="line-clamp-1">{hotel.location}</span>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < hotel.rate
                              ? "fill-[#E8B34A] text-[#E8B34A]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs font-bold text-[#013E51]">
                        {hotel.rate}
                      </span>
                    </div>
                  </td>

                  {/* Facilities Count */}
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#013E51]/10 text-xs font-bold text-[#013E51]">
                      <span>{hotel.facilities?.length || 0}</span>
                      <span className="font-normal text-gray-500">
                        {hotel.facilities?.length === 1 ? "Facility" : "Facilities"}
                      </span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onManageImages(hotel)}
                        title="Manage Resort Photos"
                        className="p-2 rounded-xl text-xs font-bold text-[#013E51] bg-[#FAF7F2] hover:bg-[#013E51] hover:text-white transition cursor-pointer flex items-center gap-1"
                      >
                        <FiImage className="w-3.5 h-3.5 text-[#E8B34A]" />
                        <span className="hidden md:inline">Photos</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onReorderFacilities(hotel)}
                        title="Reorder Facilities Sequence"
                        className="p-2 rounded-xl text-xs font-bold text-[#013E51] bg-[#FAF7F2] hover:bg-[#013E51] hover:text-white transition cursor-pointer flex items-center gap-1"
                      >
                        <FiList className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Reorder</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(hotel)}
                        title="Edit Hotel"
                        className="p-2 rounded-xl text-gray-600 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(hotel)}
                        title="Delete Hotel"
                        className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
