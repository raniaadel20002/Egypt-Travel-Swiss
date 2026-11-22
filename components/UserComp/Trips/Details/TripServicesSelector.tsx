"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiCheck, FiImage, FiChevronDown, FiChevronUp } from "react-icons/fi";
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
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

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
          const isExpanded = expandedServiceId === service.id;
          const firstImg = service.images?.[0]?.imageUrl;
          const imageSrc = firstImg ? resolveApiImageUrl(firstImg) : FALLBACK_IMAGE;
          const validImages = service.images && service.images.length > 0 ? service.images : [];

          return (
            <div
              key={service.id}
              className={`rounded-2xl border-2 transition-all overflow-hidden ${
                isSelected
                  ? "border-[#013E51] bg-[#F8FAFB] shadow-xs"
                  : "border-[#E8B34A]/40 bg-white hover:border-[#E8B34A]"
              }`}
            >
              {/* Main Service Card Row */}
              <div
                onClick={() => onToggleService(service)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-4.5 cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                  {/* Thumbnail & Gallery Toggle */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-gray-200">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={service.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.includes("5af697b0")) {
                              target.src = FALLBACK_IMAGE;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-slate-50">
                          <FiImage className="w-5 h-5 text-gray-300" />
                          <span className="text-[9px] text-gray-400 mt-0.5">No image</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedServiceId((prev) => (prev === service.id ? null : service.id));
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-[#013E51] font-bold hover:underline mt-1.5 cursor-pointer"
                    >
                      <span>{isExpanded ? (dict.hideGallery || "Hide Gallery") : (dict.viewGallery || "View Gallery")}</span>
                      {isExpanded ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Service Info */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-xl font-bold text-[#013E51] leading-snug">
                      {service.name}
                    </h3>
                    <p className={`text-xs text-gray-500 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
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

              {/* Inline Gallery Under Description (No Popup) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                    animate={shouldReduce ? undefined : { opacity: 1, height: "auto" }}
                    exit={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="border-t border-gray-100 bg-[#FAF7F2]/60 px-4 py-3.5 sm:px-6 sm:py-4 overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#013E51]">
                        <span>{service.name} — Gallery</span>
                        <span className="text-[11px] text-gray-500 font-normal">
                          {validImages.length} {validImages.length === 1 ? "photo" : "photos"}
                        </span>
                      </div>

                      {validImages.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
                          {validImages.map((img, idx) => (
                            <div
                              key={img.id || idx}
                              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#E8B34A]/30 shadow-2xs group"
                            >
                              <Image
                                src={resolveApiImageUrl(img.imageUrl) || FALLBACK_IMAGE}
                                alt={`${service.name} ${idx + 1}`}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  if (!target.src.includes("5af697b0")) {
                                    target.src = FALLBACK_IMAGE;
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-5 px-4 rounded-xl bg-white border border-gray-200 text-center flex flex-col items-center justify-center gap-1.5 text-xs text-gray-500">
                          <FiImage className="w-6 h-6 text-gray-300" />
                          <span>{dict.noExtraImages || "No additional images available"}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
