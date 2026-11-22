"use client";

import { FiRepeat, FiRotateCcw, FiUsers } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { TransferLocationItem } from "@/models/transferLocation";

interface TransferBookingFormProps {
  fromLocations: TransferLocationItem[];
  toLocations: TransferLocationItem[];
  selectedFromId: string;
  selectedToId: string;
  onFromChange: (id: string) => void;
  onToChange: (id: string) => void;
  onSwapLocations: () => void;
  adults: number;
  childrenCount: number;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  isRoundTrip: boolean;
  onTripTypeChange: (isRoundTrip: boolean) => void;
  onReset: () => void;
}

export default function TransferBookingForm({
  fromLocations,
  toLocations,
  selectedFromId,
  selectedToId,
  onFromChange,
  onToChange,
  onSwapLocations,
  adults,
  childrenCount,
  onAdultsChange,
  onChildrenChange,
  isRoundTrip,
  onTripTypeChange,
  onReset,
}: TransferBookingFormProps) {
  const { dictionary: dict } = useLocale();
  const t = dict.transfers.bookingForm;

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center font-mono text-xs font-bold">
            1
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {t.heading}
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#888888] hover:text-[#013E51] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-gray-100"
        >
          <FiRotateCcw className="w-3.5 h-3.5" />
          <span>{t.reset}</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* From & To Row with Swap Button */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-4">
          {/* Pickup Location */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.from} <span className="text-[#E8B34A]">*</span>
            </label>
            <select
              value={selectedFromId}
              onChange={(e) => onFromChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
            >
              <option value="" disabled>
                {t.selectFrom}
              </option>
              {fromLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pb-1">
            <button
              type="button"
              onClick={onSwapLocations}
              title={t.swap}
              className="p-3 rounded-full border border-gray-200 bg-white text-[#013E51] hover:bg-[#013E51] hover:text-white transition-all shadow-2xs cursor-pointer"
            >
              <FiRepeat className="w-4 h-4" />
            </button>
          </div>

          {/* Destination Location */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.to} <span className="text-[#E8B34A]">*</span>
            </label>
            <select
              value={selectedToId}
              onChange={(e) => onToChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
            >
              <option value="" disabled>
                {t.selectTo}
              </option>
              {toLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Adults & Children Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Adults Counter */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.adults} <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]">
              <div className="flex items-center gap-2 text-[#013E51] text-sm font-semibold">
                <FiUsers className="w-4 h-4 text-[#E8B34A]" />
                <span>
                  {adults} {adults === 1 ? t.adult : t.adults}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                  disabled={adults <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-sm font-bold text-[#013E51] disabled:opacity-40 cursor-pointer hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-bold text-[#013E51]">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => onAdultsChange(Math.min(30, adults + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-sm font-bold text-[#013E51] cursor-pointer hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Children Counter */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.children}
            </label>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]">
              <div className="flex items-center gap-2 text-[#013E51] text-sm font-semibold">
                <FiUsers className="w-4 h-4 text-[#888888]" />
                <span>
                  {childrenCount} {childrenCount === 1 ? t.child : t.children}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChildrenChange(Math.max(0, childrenCount - 1))}
                  disabled={childrenCount <= 0}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-sm font-bold text-[#013E51] disabled:opacity-40 cursor-pointer hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-bold text-[#013E51]">
                  {childrenCount}
                </span>
                <button
                  type="button"
                  onClick={() => onChildrenChange(Math.min(20, childrenCount + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-sm font-bold text-[#013E51] cursor-pointer hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Type Segmented Buttons */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
            {t.transferType} <span className="text-[#E8B34A]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAF7F2] rounded-2xl border border-gray-200">
            <button
              type="button"
              onClick={() => onTripTypeChange(false)}
              className={`py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                !isRoundTrip
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "bg-transparent text-[#013E51] hover:bg-white/60"
              }`}
            >
              {t.oneWay}
            </button>
            <button
              type="button"
              onClick={() => onTripTypeChange(true)}
              className={`py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                isRoundTrip
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "bg-transparent text-[#013E51] hover:bg-white/60"
              }`}
            >
              {t.roundTrip}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
