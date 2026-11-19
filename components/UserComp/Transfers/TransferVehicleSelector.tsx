"use client";

import Image from "next/image";
import { FiCheck, FiCheckCircle } from "react-icons/fi";
import { VehicleTypeTransferItem } from "@/models/transfer";

interface TransferVehicleSelectorProps {
  vehicles: VehicleTypeTransferItem[];
  selectedVehicleId: string | number;
  isRoundTrip: boolean;
  onSelectVehicle: (id: string | number) => void;
}

export default function TransferVehicleSelector({
  vehicles,
  selectedVehicleId,
  isRoundTrip,
  onSelectVehicle,
}: TransferVehicleSelectorProps) {
  return (
    <div className="space-y-4">
      {vehicles.map((v) => {
        const isSelected = String(v.id) === String(selectedVehicleId);
        const price = isRoundTrip ? v.roundTripPrice : v.oneWayPrice;
        const tripLabel = isRoundTrip ? "Round Trip" : "One Way";

        return (
          <article
            key={v.id}
            onClick={() => onSelectVehicle(v.id)}
            className={`w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
              isSelected
                ? "bg-[#013E51]/5 border-[#013E51] shadow-md ring-2 ring-[#013E51]/10"
                : "bg-white border-[#013E51]/10 hover:border-[#013E51]/30 shadow-xs"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Left Column: Icon + Details */}
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Vehicle Icon Badge */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 p-3 transition-colors ${
                    isSelected
                      ? "bg-[#013E51] text-white"
                      : "bg-[#FAF7F2] text-[#013E51]"
                  }`}
                >
                  <Image
                    src={v.icon}
                    alt={v.name}
                    width={56}
                    height={40}
                    className="w-12 sm:w-14 h-auto object-contain brightness-95"
                  />
                </div>

                {/* Name & Capacity & Features */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51]">
                      {v.name}
                    </h3>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#013E51] bg-[#013E51]/10 px-2.5 py-0.5 rounded-full">
                        <FiCheckCircle className="w-3 h-3 text-[#013E51]" />
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] font-medium">
                    {v.capacityText}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {v.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#013E51]/90 bg-white/80 border border-[#013E51]/10 px-2.5 py-0.5 rounded-full"
                      >
                        <FiCheck className="w-2.5 h-2.5 text-[#E8B34A]" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Price & Selection Status */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 gap-1 shrink-0">
                <span className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  Price - {tripLabel}
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                  ${price.toFixed(2)}
                </span>
                <span className="text-[11px] font-medium text-[#888888]">
                  per vehicle (all-inclusive)
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
