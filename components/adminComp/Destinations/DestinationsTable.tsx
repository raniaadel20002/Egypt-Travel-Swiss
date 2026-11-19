"use client";

import Image from "next/image";
import { FiEdit2, FiImage, FiTrash2, FiMapPin, FiStar } from "react-icons/fi";
import { DestinationApiItem } from "@/models/destination";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface DestinationsTableProps {
  items: DestinationApiItem[];
  isLoading: boolean;
  onEdit: (item: DestinationApiItem) => void;
  onEditImage: (item: DestinationApiItem) => void;
  onDelete: (item: DestinationApiItem) => void;
}

export default function DestinationsTable({
  items,
  isLoading,
  onEdit,
  onEditImage,
  onDelete,
}: DestinationsTableProps) {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-[24px] p-8 border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-100 rounded-xl w-full" />
          <div className="h-16 bg-gray-50 rounded-xl w-full" />
          <div className="h-16 bg-gray-50 rounded-xl w-full" />
          <div className="h-16 bg-gray-50 rounded-xl w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full bg-white rounded-[24px] sm:rounded-[28px] p-10 sm:p-14 border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mb-3">
          <FiMapPin className="w-7 h-7 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Destinations Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-1">
          No destinations match your search or filter criteria. Try a different query or add a new destination.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[28px] border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] text-left border-collapse table-auto sm:table-fixed">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAF7F2]/70 text-[11px] font-bold uppercase tracking-[0.14em] text-[#888888]">
              <th className="py-4 px-6 w-20 sm:w-[10%]">ID</th>
              <th className="py-4 px-6 w-24 sm:w-[12%]">Photo</th>
              <th className="py-4 px-6 sm:w-[36%]">Destination (EN)</th>
              <th className="py-4 px-6 sm:w-[16%]">Featured</th>
              <th className="py-4 px-6 sm:w-[12%]">Trips</th>
              <th className="py-4 px-6 text-right w-36 sm:w-[14%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((item) => {
              const fullImageUrl = resolveApiImageUrl(item.imageUrl);

              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAF7F2]/40 transition-colors group"
                >
                  <td className="py-4 px-6 font-bold text-[#013E51]">
                    #{item.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-[#013E51]/10 shrink-0">
                      {fullImageUrl ? (
                        <Image
                          src={fullImageUrl}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FiImage className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-[#013E51] text-sm sm:text-base">
                      {item.name || "(Unnamed Destination)"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.isFeatured ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8B34A]/15 text-[#976D17] border border-[#E8B34A]/30">
                        <FiStar className="w-3.5 h-3.5 fill-[#E8B34A]" />
                        <span>Featured</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold text-[#013E51] bg-[#013E51]/5 border border-[#013E51]/10">
                      {item.tripsCount ?? 0} {item.tripsCount === 1 ? "Trip" : "Trips"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        title="Edit Names & Details"
                        className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#E8B34A] transition cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditImage(item)}
                        title="Edit Photo Alone"
                        className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#013E51] transition cursor-pointer"
                      >
                        <FiImage className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        title="Delete Destination"
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition cursor-pointer"
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
