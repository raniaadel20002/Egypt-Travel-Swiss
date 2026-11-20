"use client";

import Image from "next/image";
import {
  FiEdit2,
  FiImage,
  FiPower,
  FiCompass,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiLayers,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { TripApiItem } from "@/models/trip";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface TripsTableProps {
  items: TripApiItem[];
  isLoading: boolean;
  onEdit: (item: TripApiItem) => void;
  onManageImages: (item: TripApiItem) => void;
  onManageServices: (item: TripApiItem) => void;
  onManagePrivateTransfers?: (item: TripApiItem) => void;
  onToggleStatus: (item: TripApiItem) => void;
}

export default function TripsTable({
  items,
  isLoading,
  onEdit,
  onManageImages,
  onManageServices,
  onManagePrivateTransfers,
  onToggleStatus,
}: TripsTableProps) {
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
          <FiCompass className="w-7 h-7 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Excursions Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-1">
          No excursions match your search or filter criteria. Try adjusting your query or create a new excursion.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[28px] border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[920px] text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAF7F2]/70 text-[11px] font-bold uppercase tracking-[0.14em] text-[#888888]">
              <th className="py-4 px-5 w-20">ID</th>
              <th className="py-4 px-5 w-24">Photo</th>
              <th className="py-4 px-5">Excursion & Destination</th>
              <th className="py-4 px-5 w-36">Category & Duration</th>
              <th className="py-4 px-5 w-36">Prices (EUR)</th>
              <th className="py-4 px-5 w-28">Status</th>
              <th className="py-4 px-5 text-right w-36">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((item) => {
              const primaryImg =
                item.images?.find((img) => img.isPrimary) || item.images?.[0];
              const fullImageUrl = resolveApiImageUrl(primaryImg?.imageUrl);
              const totalImages = item.images?.length || 0;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAF7F2]/40 transition-colors group"
                >
                  {/* ID & Marker */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#013E51]">#{item.id}</div>
                    {item.markerID && (
                      <div className="text-[11px] font-mono text-[#888888]">
                        {item.markerID}
                      </div>
                    )}
                  </td>

                  {/* Photo */}
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

                  {/* Title, Destination & Type */}
                  <td className="py-4 px-5">
                    <div className="font-semibold text-[#013E51] text-sm sm:text-base line-clamp-1">
                      {item.name || "(Unnamed Excursion)"}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-[#888888]">
                      {item.destinationInfo?.name && (
                        <span className="font-medium text-[#013E51]/80">
                          {item.destinationInfo.name}
                        </span>
                      )}
                      {item.destinationInfo?.name && item.tripTypeName && (
                        <span>•</span>
                      )}
                      {item.tripTypeName && (
                        <span className="px-2 py-0.5 rounded-md bg-[#013E51]/5 text-[#013E51] font-semibold text-[11px]">
                          {item.tripTypeName}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Category & Duration */}
                  <td className="py-4 px-5">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider w-fit ${
                          item.categoryName?.toLowerCase() === "private"
                            ? "bg-[#E8B34A]/15 text-[#976D17] border border-[#E8B34A]/30"
                            : "bg-blue-50 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {item.categoryName?.toLowerCase() === "private"
                          ? "Private"
                          : "Groups"}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-600 font-medium mt-0.5">
                        <FiClock className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          {item.durationValue} {item.durationTypeName || "Hours"}
                        </span>
                        {item.timeFrom && (
                          <span className="text-[11px] text-gray-400">
                            ({item.timeFrom.slice(0, 5)})
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Pricing */}
                  <td className="py-4 px-5">
                    {item.categoryName?.toLowerCase() === "private" ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8B34A]/15 text-[#976D17] border border-[#E8B34A]/30">
                          Services + Transfer
                        </span>
                        <span className="block text-[11px] text-gray-400">
                          Base: €0
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs space-y-0.5">
                        <div className="font-bold text-[#013E51]">
                          Adult: €{item.adultPrice}
                        </div>
                        <div className="text-gray-500 text-[11px]">
                          Child: €{item.childPrice} | Inf: €{item.infPrice}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    {item.isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-gray-500 bg-gray-100 border border-gray-200">
                        <FiXCircle className="w-3.5 h-3.5 text-gray-400" />
                        <span>Inactive</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onManageServices(item)}
                        title="Manage Excursion Services"
                        className="p-2 rounded-xl text-[#013E51] bg-[#FAF7F2] hover:bg-[#E8B34A]/25 transition cursor-pointer"
                      >
                        <FiLayers className="w-4 h-4 text-[#013E51]" />
                      </button>

                      {item.categoryName?.toLowerCase() === "private" && onManagePrivateTransfers && (
                        <button
                          type="button"
                          onClick={() => onManagePrivateTransfers(item)}
                          title="Manage Private Vehicle Transfer Pricing"
                          className="p-2 rounded-xl text-[#013E51] bg-[#FAF7F2] hover:bg-[#013E51] hover:text-[#E8B34A] transition cursor-pointer"
                        >
                          <FaCar className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        title="Edit Excursion Details"
                        className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#E8B34A] transition cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onManageImages(item)}
                        title="Manage Gallery Images"
                        className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#013E51] transition cursor-pointer"
                      >
                        <FiImage className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleStatus(item)}
                        title={
                          item.isActive
                            ? "Deactivate Excursion"
                            : "Reactivate Excursion"
                        }
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          item.isActive
                            ? "text-amber-600 hover:bg-amber-50"
                            : "text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        <FiPower className="w-4 h-4" />
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
