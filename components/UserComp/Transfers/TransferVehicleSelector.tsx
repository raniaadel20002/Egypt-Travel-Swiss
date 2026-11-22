"use client";

import { FiCheckCircle, FiUsers } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { VehicleTypeTransferApiItem } from "@/models/transferService";

interface TransferVehicleSelectorProps {
  vehicles: VehicleTypeTransferApiItem[];
  matchedVehicleId?: string;
  selectedVehicleId: string;
  isRoundTrip: boolean;
  previewPrice?: number;
  onSelectVehicle: (id: string) => void;
}

export default function TransferVehicleSelector({
  vehicles,
  matchedVehicleId,
  selectedVehicleId,
  isRoundTrip,
  previewPrice,
  onSelectVehicle,
}: TransferVehicleSelectorProps) {
  const { dictionary: dict } = useLocale();
  const t = dict.transfers.vehicles;

  const tripLabel = isRoundTrip
    ? dict.transfers.bookingForm.roundTrip
    : dict.transfers.bookingForm.oneWay;

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10 space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center font-mono text-xs font-bold">
            2
          </span>
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
              {t.heading}
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] mt-0.5">
              {t.subheading}
            </p>
          </div>
        </div>
      </div>

      {/* Real Backend Vehicle Cards */}
      <div className="space-y-4">
        {vehicles.map((v) => {
          const isSelected = String(v.id) === String(selectedVehicleId);
          const isAutoMatched = String(v.id) === String(matchedVehicleId);

          const passengerCapacity =
            v.fromPerson && v.toPerson && v.fromPerson !== v.toPerson
              ? `${v.fromPerson} - ${v.toPerson} passengers`
              : `Up to ${v.toPerson || 4} passengers`;

          return (
            <article
              key={v.id}
              onClick={() => onSelectVehicle(v.id)}
              className={`w-full rounded-[22px] p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? "bg-[#013E51]/5 border-[#013E51] shadow-md ring-2 ring-[#013E51]/10"
                  : "bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] border-[#013E51]/10 hover:border-[#013E51]/30 shadow-2xs"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                {/* Left Side: Vehicle Info & Real Capacity */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
                      {v.name}
                    </h3>

                    {isAutoMatched && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#013E51] bg-[#E8B34A] px-3 py-1 rounded-full shadow-2xs">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        {t.autoMatched}
                      </span>
                    )}

                    {isSelected && !isAutoMatched && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#013E51] bg-[#013E51]/10 px-2.5 py-0.5 rounded-full">
                        <FiCheckCircle className="w-3 h-3 text-[#013E51]" />
                        {t.selectVehicle}
                      </span>
                    )}
                  </div>

                  {/* Real Capacity Badge */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 font-semibold text-[#013E51]">
                      <FiUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
                      {passengerCapacity}
                    </span>
                  </div>
                </div>

                {/* Right Side: Route Price Quote */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center pt-3 md:pt-0 border-t md:border-t-0 border-gray-200 gap-1 shrink-0">
                  <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    {t.priceLabel.replace("{type}", tripLabel)}
                  </span>
                  <span className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51]">
                    {isSelected && typeof previewPrice === "number" && previewPrice > 0
                      ? `\u20AC${previewPrice.toFixed(2)}`
                      : "Live Route"}
                  </span>
                  <span className="text-[10px] text-[#888888]">
                    per vehicle (all-inclusive)
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
