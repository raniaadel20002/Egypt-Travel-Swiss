"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiTrash2, FiCalendar, FiPlus, FiMinus, FiTruck, FiCheck, FiAlertCircle } from "react-icons/fi";
import { CartTripItem } from "@/models/cart";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { buildTripDetailsPath } from "@/shared/utils/slugify";
import { calculateTripItemSubtotal } from "@/shared/utils/cartPricing";
import { useMatchPrivateVehicleTransfersQuery } from "@/features/privateVehicles/usePrivateVehicleTransfers";
import { useCartStore } from "@/features/cart/useCartStore";
import TripDatePicker from "@/components/UserComp/Common/TripDatePicker";
import {
  isDateAvailableForTrip,
  getAvailableDaysText,
  getDayNameForDate,
} from "@/shared/utils/tripAvailability";

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
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;
  const updateTransferPricing = useCartStore((s) => s.updateTransferPricing);
  const [imgSrc, setImgSrc] = useState(item.imageUrl || "/Trips/heroTrips.png");

  const isOnContact = (item.adultPrice || 0) <= 0;
  const isPrivate = item.categoryLabel === "Private";
  const totalPersons = Math.max(1, (item.noAdult || 0) + (item.noChild || 0));

  const { data: matchedTransfers } = useMatchPrivateVehicleTransfersQuery(
    isPrivate ? item.tripId : null,
    totalPersons
  );
  const privateTransfer = isPrivate && matchedTransfers && matchedTransfers.length > 0
    ? matchedTransfers[0]
    : null;

  useEffect(() => {
    if (isPrivate && privateTransfer) {
      const newPrice = Number(privateTransfer.price || 0);
      const newName = privateTransfer.vehicleName;
      if (item.transferPrice !== newPrice || item.transferVehicleName !== newName) {
        updateTransferPricing(item.tripId, newPrice, newName);
      }
    }
  }, [isPrivate, privateTransfer, item.tripId, item.transferPrice, item.transferVehicleName, updateTransferPricing]);

  const subtotal = calculateTripItemSubtotal(item);
  const detailsPath = buildTripDetailsPath(locale, item.tripId, item.name);
  const todayIso = new Date().toISOString().split("T")[0];

  const isDateValid = isDateAvailableForTrip(item.leaveDate, item.availableDays);
  const availableDaysLabel = getAvailableDaysText(item.availableDays);
  const selectedDayName = getDayNameForDate(item.leaveDate);

  return (
    <div className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0px_12px_32px_0px_#013E511A] border ${!isDateValid ? "border-amber-300" : "border-gray-100"} flex flex-col md:flex-row gap-5 font-[family-name:var(--font-lato)]`}>
      {/* Trip Image & Ribbon */}
      <div className="relative w-full md:w-48 lg:w-56 h-48 md:h-auto shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#013E51]/95 text-white text-[11px] font-semibold backdrop-blur-xs">
          {item.tripTypeName}
        </span>

        <Image
          src={imgSrc}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover"
          onError={() => setImgSrc("/Trips/heroTrips.png")}
        />
      </div>

      {/* Main Details */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="flex items-center gap-1.5 text-[#E8B34A] font-bold text-[13px]">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
              <span className="text-[#013E51]">{item.destination}</span>
            </span>

            <span className="text-[#013E51] font-semibold text-xs px-2.5 py-0.5 rounded-full bg-slate-100">
              {item.categoryLabel}
            </span>
          </div>

          <Link href={detailsPath} className="hover:text-[#E8B34A] transition-colors">
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] leading-snug">
              {item.name}
            </h3>
          </Link>

          {isOnContact && (
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-[#E8B34A]/15 text-[#013E51] text-xs font-semibold">
              {t?.priceOnContact || "Price available on contact"}
            </div>
          )}
        </div>

        {/* Departure Date Selector */}
        <div className="space-y-1.5 pt-1">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51]/80">
            <FiCalendar className="w-4 h-4 text-[#E8B34A]" />
            <span>{t?.departureDate || "Departure Date"}:</span>
          </label>
          <TripDatePicker
            value={item.leaveDate}
            onChange={onUpdateLeaveDate}
            availableDays={item.availableDays}
            minDate={todayIso}
            className="w-full sm:max-w-xs"
          />
        </div>

        {/* Travelers Steppers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
          {/* Adults */}
          <div className="bg-[#F8F9FA] p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#013E51] block">{t?.adults || "Adults"}</span>
              <span className="text-[11px] text-[#888888]">{isOnContact ? (t?.onContactShort || "On contact") : `€${item.adultPrice} ${t?.each || "each"}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpdateTravelers({ noAdult: Math.max(1, item.noAdult - 1) })}
                disabled={item.noAdult <= 1}
                aria-label="Decrease adults"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold text-[#013E51] w-4 text-center">{item.noAdult}</span>
              <button
                type="button"
                onClick={() => onUpdateTravelers({ noAdult: item.noAdult + 1 })}
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
              <span className="text-xs font-semibold text-[#013E51] block">{t?.children || "Children"}</span>
              <span className="text-[11px] text-[#888888]">{isOnContact ? (t?.onContactShort || "On contact") : `€${item.childPrice} ${t?.each || "each"}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpdateTravelers({ noChild: Math.max(0, item.noChild - 1) })}
                disabled={item.noChild <= 0}
                aria-label="Decrease children"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold text-[#013E51] w-4 text-center">{item.noChild}</span>
              <button
                type="button"
                onClick={() => onUpdateTravelers({ noChild: item.noChild + 1 })}
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
              <span className="text-xs font-semibold text-[#013E51] block">{t?.infants || "Infants"}</span>
              <span className="text-[11px] text-[#888888]">{isOnContact ? (t?.onContactShort || "On contact") : `€${item.infPrice} ${t?.each || "each"}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpdateTravelers({ noInf: Math.max(0, item.noInf - 1) })}
                disabled={item.noInf <= 0}
                aria-label="Decrease infants"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold text-[#013E51] w-4 text-center">{item.noInf}</span>
              <button
                type="button"
                onClick={() => onUpdateTravelers({ noInf: item.noInf + 1 })}
                aria-label="Increase infants"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#013E51] hover:bg-gray-100 cursor-pointer"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Services & Private Transfer Inclusions */}
        {((item.selectedServices && item.selectedServices.length > 0) || (isPrivate && (item.transferPrice ?? 0) > 0)) && (
          <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-2 text-xs">
            {isPrivate && (item.transferPrice ?? 0) > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E8B34A]/15 text-[#013E51] font-medium">
                <FiTruck className="text-[#E8B34A]" />
                <span>{t?.privateTransfer || "Private Transfer"}: {item.transferVehicleName || "Vehicle"} (+&euro;{item.transferPrice})</span>
              </span>
            )}
            {item.selectedServices?.map((srv) => (
              <span
                key={srv.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-[#013E51] font-medium"
              >
                <FiCheck className="text-[#E8B34A]" />
                <span>{srv.name} (+&euro;{srv.adultPrice})</span>
              </span>
            ))}
          </div>
        )}

        {/* Bottom Subtotal & Remove Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#888888]">{t?.subtotal || "Subtotal"}:</span>
            {isOnContact ? (
              <span className="font-bold text-base text-[#013E51]">
                {subtotal > 0
                  ? `€${subtotal.toFixed(2)} + ${t?.onContactShort || "On Contact"}`
                  : (t?.priceOnContact || "Price on contact")}
              </span>
            ) : (
              <span className="font-bold text-xl text-[#013E51]">
                &euro;{subtotal.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer transition-colors"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>{t?.remove || "Remove"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
