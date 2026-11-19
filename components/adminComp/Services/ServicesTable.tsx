"use client";

import Image from "next/image";
import { FiEdit2, FiImage, FiTrash2, FiLayers } from "react-icons/fi";
import { ServiceApiItem } from "@/models/service";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface ServicesTableProps {
  items: ServiceApiItem[];
  isLoading: boolean;
  onEdit: (item: ServiceApiItem) => void;
  onManageImages: (item: ServiceApiItem) => void;
  onDelete: (item: ServiceApiItem) => void;
}

export default function ServicesTable({
  items,
  isLoading,
  onEdit,
  onManageImages,
  onDelete,
}: ServicesTableProps) {
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
          <FiLayers className="w-7 h-7 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Private Services Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-1">
          No services match your search or filter. Create custom add-ons to enhance private excursion packages.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[28px] border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAF7F2]/70 text-[11px] font-bold uppercase tracking-[0.14em] text-[#888888]">
              <th className="py-4 px-5 w-20">ID</th>
              <th className="py-4 px-5 w-24">Photo</th>
              <th className="py-4 px-5">Service Title & Details</th>
              <th className="py-4 px-5 w-44">Pricing (EUR)</th>
              <th className="py-4 px-5 w-32">Created</th>
              <th className="py-4 px-5 text-right w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((item) => {
              const primaryImg = item.images?.[0];
              const fullImageUrl = resolveApiImageUrl(primaryImg?.imageUrl);
              const totalImages = item.images?.length || 0;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAF7F2]/40 transition-colors group"
                >
                  <td className="py-4 px-5 font-bold text-[#013E51]">
                    #{item.id}
                  </td>
                  <td className="py-4 px-5">
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
                      {totalImages > 0 && (
                        <span className="absolute bottom-1 right-1 px-1 rounded bg-black/60 text-[9px] font-bold text-white">
                          {totalImages}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-semibold text-[#013E51] text-sm sm:text-base line-clamp-1">
                      {item.name || "(Unnamed Service)"}
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-[#013E51]">
                        Adult: €{item.adultPrice}
                      </div>
                      <div className="text-gray-500 text-[11px]">
                        Child: €{item.childPrice} | Inf: €{item.infPrice}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-xs text-gray-500">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        title="Edit Service"
                        className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#E8B34A] transition cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onManageImages(item)}
                        title="Manage Gallery Photos"
                        className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#013E51] transition cursor-pointer"
                      >
                        <FiImage className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        title="Delete Service"
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
