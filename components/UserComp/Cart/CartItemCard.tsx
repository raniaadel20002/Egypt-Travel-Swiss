"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiTrash2, FiCalendar, FiPlus, FiMinus } from "react-icons/fi";
import { CartTripItem } from "@/models/cart";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { buildTripDetailsPath } from "@/shared/utils/slugify";
import { calculateTripItemSubtotal } from "@/shared/utils/cartPricing";

interface CartItemCardProps {
  item: CartTripItem;
  onUpdateTravelers: (
    counts: { noAdult?: number; noChild?: number; noInf?: number }
  ) => void;
  onUpdateLeaveDate: (date: string) => void;
  onRemove: () => void;
}

export default function CartItemCard({
  item,
  onUpdateTravelers,
  onUpdateLeaveDate,
  onRemove,
}: CartItemCardProps) {
  const { locale } = useLocale();
  const subtotal = calculateTripItemSubtotal(item);
  const detailsPath = buildTripDetailsPath(locale, item.tripId, item.name);
  const todayIso = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 flex flex-col md:flex-row gap-5 font-[family-name:var(--font-lato)]">
      {/* Trip Image & Ribbon */}
      <div className="relative w-full md:w-48 lg:w-56 h-48 md:h-auto shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#013E51]/95 text-white text-[11px] font-semibold backdrop-blur-xs">
          {item.tripTypeName}
        </span>

        <Image
          src={item.imageUrl || "/Trips/heroTrips.png"}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover"
        />
      </div>

      {/* Main Details */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="flex items-center gap-1.5 text-[#19B8A5] font-bold text-[13px]">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#19B8A5] shrink-0" />
              <span>{item.destination}</span>
            </span>

            <span className="text-[#013E51] font-semibold text-xs">
              {item.categoryLabel}
            </span>
          </div>

          <Link href={detailsPath} className="hover:text-[#19B8A5] transition-colors">
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] leading-snug">
              {item.name}
            </h3>
          </Link>
        </div>

        {/* Departure Date Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm">
          <label
            htmlFor={`leave-date-${item.tripId}`}
            className="flex items-center gap-1.5 text-[#013E51]/80 font-semibold"
          >
            <FiCalendar className="w-4 h-4 text-[#013E51]" />
            <span>Departure Date:</span>
          </label>
          <input
            id={`leave-date-${item.tripId}`}
            type="date"
            min={todayIso}
            value={item.leaveDate}
            onChange={(e) => onUpdateLeaveDate(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-[#F8F9FA] text-[#013E51] text-xs sm:text-sm outline-hidden focus:border-[#013E51]"
          />
        </div>

        {/* Travelers Steppers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
          {/* Adults */}
          <div className="bg-[#F8F9FA] p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#013E51] block">
                Adults
              </span>
              <span className="text-[11px] text-[#888888]">
                &euro;{item.adultPrice} each
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onUpdateTravelers({ noAdult: Math.max(1, item.noAdult - 1) })
                }
                disabled={item.noAdult <= 1}
                aria-label="Decrease adults"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold text-[#013E51] w-4 text-center">
                {item.noAdult}
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateTravelers({ noAdult: item.noAdult + 1 })
                }
                aria-label="Increase adults"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] hover:bg-gray-100 cursor-pointer"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="bg-[#F8F9FA] p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#013E51] block">
                Children
              </span>
              <span className="text-[11px] text-[#888888]">
                &euro;{item.childPrice} each
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onUpdateTravelers({ noChild: Math.max(0, item.noChild - 1) })
                }
                disabled={item.noChild <= 0}
                aria-label="Decrease children"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold text-[#013E51] w-4 text-center">
                {item.noChild}
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateTravelers({ noChild: item.noChild + 1 })
                }
                aria-label="Increase children"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] hover:bg-gray-100 cursor-pointer"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="bg-[#F8F9FA] p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#013E51] block">
                Infants
              </span>
              <span className="text-[11px] text-[#888888]">
                &euro;{item.infPrice} each
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onUpdateTravelers({ noInf: Math.max(0, item.noInf - 1) })
                }
                disabled={item.noInf <= 0}
                aria-label="Decrease infants"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold text-[#013E51] w-4 text-center">
                {item.noInf}
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateTravelers({ noInf: item.noInf + 1 })
                }
                aria-label="Increase infants"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] hover:bg-gray-100 cursor-pointer"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Subtotal & Remove Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#888888]">Subtotal:</span>
            <span className="font-bold text-xl text-[#013E51]">
              &euro;{subtotal.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer transition-colors"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
