"use client";

import Image from "next/image";
import { FiCheckSquare, FiLayers, FiSquare } from "react-icons/fi";
import { ServiceApiItem } from "@/models/service";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface TripServiceSelectCardProps {
  service: ServiceApiItem;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

export default function TripServiceSelectCard({
  service,
  isSelected,
  onToggle,
}: TripServiceSelectCardProps) {
  const primaryImg = service.images?.[0];
  const fullUrl = resolveApiImageUrl(primaryImg?.imageUrl);

  return (
    <div
      onClick={() => onToggle(service.id)}
      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
        isSelected
          ? "border-[#E8B34A] bg-[#FAF7F2] ring-1 ring-[#E8B34A]/50 shadow-xs"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          type="button"
          aria-label="Toggle selection"
          className="text-lg shrink-0 text-[#013E51]"
        >
          {isSelected ? (
            <FiCheckSquare className="w-5 h-5 text-[#013E51] fill-[#E8B34A]/20" />
          ) : (
            <FiSquare className="w-5 h-5 text-gray-300" />
          )}
        </button>

        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-[#013E51]/10 shrink-0">
          {fullUrl ? (
            <Image
              src={fullUrl}
              alt={service.name}
              fill
              sizes="48px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <FiLayers className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#013E51] text-xs sm:text-sm truncate">
              {service.name || "(Unnamed Service)"}
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              #{service.id}
            </span>
          </div>
          {service.description && (
            <p className="text-[11px] text-gray-500 line-clamp-1">
              {service.description}
            </p>
          )}
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="font-bold text-[#013E51] text-xs sm:text-sm block">
          €{service.adultPrice}
        </span>
        <span className="text-[10px] text-gray-400 block">
          Ch: €{service.childPrice} • Inf: €{service.infPrice}
        </span>
      </div>
    </div>
  );
}
