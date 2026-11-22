"use client";

import { FiCheckCircle, FiXCircle, FiPackage } from "react-icons/fi";
import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripInclusionsSectionProps {
  whatToBring?: string[];
  includes?: string[];
  excludes?: string[];
  dict: Dictionary["tripDetails"];
}

export default function TripInclusionsSection({
  whatToBring = [],
  includes = [],
  excludes = [],
  dict,
}: TripInclusionsSectionProps) {
  const hasWhatToBring = whatToBring && whatToBring.length > 0;
  const hasIncludes = includes && includes.length > 0;
  const hasExcludes = excludes && excludes.length > 0;

  if (!hasWhatToBring && !hasIncludes && !hasExcludes) return null;

  return (
    <div className="space-y-6 font-[family-name:var(--font-lato)]">
      {/* What's to Bring Card */}
      {hasWhatToBring && (
        <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E8B34A]/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <FiPackage className="w-5 h-5 text-[#013E51]" />
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
              {dict.whatsToBring}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {whatToBring.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E8B34A] shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Included & Not Included Grid */}
      {(hasIncludes || hasExcludes) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What's Included */}
          {hasIncludes && (
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E8B34A]/30 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
                  {dict.whatsIncluded}
                </h2>
              </div>

              <div className="space-y-2.5">
                {includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#E8B34A] shrink-0 mt-1.5" />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Not Included */}
          {hasExcludes && (
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E8B34A]/30 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <FiXCircle className="w-5 h-5 text-rose-500" />
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
                  {dict.whatsNotIncluded}
                </h2>
              </div>

              <div className="space-y-2.5">
                {excludes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
