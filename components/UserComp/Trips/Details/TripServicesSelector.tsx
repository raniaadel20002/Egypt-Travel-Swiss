"use client";

import { useState } from "react";
import Image from "next/image";
import { FiCheck, FiX, FiImage } from "react-icons/fi";
import { ServiceApiItem } from "@/models/service";
import { Dictionary } from "@/features/i18n/i18nConfig";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface TripServicesSelectorProps {
  services: ServiceApiItem[];
  selectedServiceIds: number[];
  onToggleService: (service: ServiceApiItem) => void;
  dict: Dictionary["tripDetails"];
}

const FALLBACK_IMAGE = "/home/Categories/5af697b0125109949149af917bc7716385d9cf04.png";

export default function TripServicesSelector({
  services = [],
  selectedServiceIds = [],
  onToggleService,
  dict,
}: TripServicesSelectorProps) {
  const [modalService, setModalService] = useState<ServiceApiItem | null>(null);

  if (!services || services.length === 0) return null;

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8B34A]/30 shadow-xs space-y-5 font-[family-name:var(--font-lato)]">
      {/* Section Header with Gold Accent Line */}
      <div>
        <div className="flex items-center gap-4">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] whitespace-nowrap">
            {dict.selectYourServices}
          </h2>
          <span
            aria-hidden="true"
            className="flex-1 h-[1.5px] bg-[#E8B34A]/60 rounded-full"
          />
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {dict.enhanceTripSubtitle}
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-3.5">
        {services.map((service) => {
          const isSelected = selectedServiceIds.includes(service.id);
          const firstImg = service.images?.[0]?.imageUrl;
          const imageSrc = firstImg ? resolveApiImageUrl(firstImg) : FALLBACK_IMAGE;

          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service)}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-4.5 rounded-2xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#013E51] bg-[#F8FAFB] shadow-xs"
                  : "border-[#E8B34A]/40 bg-white hover:border-[#E8B34A]"
              }`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                {/* Thumbnail & Gallery Trigger */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-gray-200">
                    <Image
                      src={imageSrc}
                      alt={service.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalService(service);
                    }}
                    className="text-[10px] text-[#013E51] font-bold hover:underline mt-1 cursor-pointer"
                  >
                    {dict.viewGallery}
                  </button>
                </div>

                {/* Service Info */}
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-xl font-bold text-[#013E51] leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Price & Custom Checkbox */}
              <div className="flex items-center justify-end sm:justify-start gap-3.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <span className="font-extrabold text-lg sm:text-xl text-[#013E51]">
                  {Number(service.adultPrice || 0).toFixed(0)}&nbsp;&euro;
                </span>

                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#013E51] border-[#013E51] text-[#E8B34A]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <FiCheck className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Gallery Preview Modal */}
      {modalService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51]">
                {modalService.name}
              </h3>
              <button
                type="button"
                onClick={() => setModalService(null)}
                aria-label="Close service modal"
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
              {modalService.images && modalService.images.length > 0 ? (
                <Image
                  src={resolveApiImageUrl(modalService.images[0].imageUrl) || FALLBACK_IMAGE}
                  alt={modalService.name}
                  fill
                  sizes="500px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <FiImage className="w-8 h-8 opacity-40 mb-1" />
                  <span className="text-xs">No extra images available</span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {modalService.description}
            </p>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="px-5 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#024f67] cursor-pointer"
              >
                {dict.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
