"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiArrowRight,
  FiX,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { TripApiItem } from "@/models/trip";
import { ServiceApiItem } from "@/models/service";
import { Dictionary } from "@/features/i18n/i18nConfig";
import { useCartStore } from "@/features/cart/useCartStore";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { TripGuestStepper } from "./TripGuestStepper";
import { toast } from "sonner";

interface TripBookingSidebarProps {
  trip: TripApiItem;
  leaveDate: string;
  onDateChange: (date: string) => void;
  noAdult: number;
  onAdultChange: (count: number) => void;
  noChild: number;
  onChildChange: (count: number) => void;
  noInf: number;
  onInfChange: (count: number) => void;
  selectedServices: ServiceApiItem[];
  onRemoveService: (serviceId: number) => void;
  locale: string;
  dict: Dictionary["tripDetails"];
}

export const TripBookingSidebar: React.FC<TripBookingSidebarProps> = ({
  trip,
  leaveDate,
  onDateChange,
  noAdult,
  onAdultChange,
  noChild,
  onChildChange,
  noInf,
  onInfChange,
  selectedServices,
  onRemoveService,
  locale,
  dict,
}) => {
  const router = useRouter();
  const addCustomConfiguredTrip = useCartStore((s) => s.addCustomConfiguredTrip);

  const adultPrice = trip.adultPrice ?? 0;
  const childPrice = trip.childPrice ?? 0;
  const infantPrice = trip.infPrice ?? 0;

  const adultTotal = noAdult * adultPrice;
  const childTotal = noChild * childPrice;
  const infantTotal = noInf * infantPrice;

  const servicesTotal = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + (s.adultPrice ?? 0), 0);
  }, [selectedServices]);

  const grandTotal = adultTotal + childTotal + infantTotal + servicesTotal;

  const primaryImage =
    trip.images?.find((img) => img.isPrimary)?.imageUrl ||
    trip.images?.[0]?.imageUrl ||
    "/Trips/heroTrips.png";
  const imageSrc = resolveApiImageUrl(primaryImage) || "/Trips/heroTrips.png";

  const handleBookNow = () => {
    if (!leaveDate) {
      toast.error(dict.selectDatePrompt || "Please select a travel date before booking.");
      return;
    }

    if (noAdult < 1) {
      toast.error(dict.minOneAdult || "At least one adult is required.");
      return;
    }

    addCustomConfiguredTrip({
      trip,
      leaveDate,
      noAdult,
      noChild,
      noInf,
      serviceIds: selectedServices.map((s) => s.id),
      selectedServices: selectedServices.map((s) => ({
        id: s.id,
        name: s.name,
        adultPrice: s.adultPrice,
        childPrice: s.childPrice,
        infPrice: s.infPrice,
      })),
    });

    toast.success(dict.bookingAddedSuccess || "Trip added to your booking!");
    router.push(`/${locale}/cart`);
  };

  const todayStr = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  return (
    <div className="sticky top-24 bg-white rounded-[24px] p-6 sm:p-7 border border-[#E8B34A]/35 shadow-xl space-y-6 font-[family-name:var(--font-lato)]">
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-gray-100">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E8B34A]/30">
          <Image
            src={imageSrc}
            alt={trip.name || "Trip"}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51] truncate">
            {trip.name}
          </h2>
          {(trip.destinationInfo?.name || trip.destination) && (
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 truncate">
              <FiMapPin className="text-[#E8B34A] shrink-0" />
              <span>{trip.destinationInfo?.name || trip.destination}</span>
            </div>
          )}
        </div>
      </div>

      {/* Date Picker */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#013E51]">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="text-[#E8B34A]" />
            {dict.selectDate}
          </span>
          <span className="text-[11px] text-[#013E51] font-semibold bg-[#E8B34A]/20 px-2.5 py-0.5 rounded-full">
            {dict.availableDaily}
          </span>
        </div>
        <input
          type="date"
          min={todayStr}
          value={leaveDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8B34A] focus:border-[#E8B34A] transition-all"
        />
      </div>

      {/* Guests Stepper Component */}
      <TripGuestStepper
        noAdult={noAdult}
        onAdultChange={onAdultChange}
        adultPrice={adultPrice}
        noChild={noChild}
        onChildChange={onChildChange}
        childPrice={childPrice}
        noInf={noInf}
        onInfChange={onInfChange}
        infantPrice={infantPrice}
        dict={dict}
      />

      {/* Selected Services Itemized */}
      {selectedServices.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="text-xs font-bold text-[#013E51]">
            {dict.selectedServices} ({selectedServices.length})
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {selectedServices.map((srv) => (
              <div
                key={srv.id}
                className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-[#E8B34A]/10 text-slate-800"
              >
                <span className="truncate pr-2 font-medium">{srv.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-[#013E51]">
                    +${srv.adultPrice}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveService(srv.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title={dict.remove}
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Breakdown Summary */}
      <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>
            {dict.adultsLabel} ({noAdult}x)
          </span>
          <span className="font-semibold text-slate-900">${adultTotal}</span>
        </div>
        {noChild > 0 && (
          <div className="flex justify-between">
            <span>
              {dict.childrenLabel} ({noChild}x)
            </span>
            <span className="font-semibold text-slate-900">${childTotal}</span>
          </div>
        )}
        {noInf > 0 && (
          <div className="flex justify-between">
            <span>
              {dict.infantsLabel} ({noInf}x)
            </span>
            <span className="font-semibold text-slate-900">
              {infantTotal > 0 ? `$${infantTotal}` : dict.free}
            </span>
          </div>
        )}
        {servicesTotal > 0 && (
          <div className="flex justify-between text-[#013E51] font-semibold">
            <span>{dict.selectedServices}</span>
            <span>+${servicesTotal}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-500 block">
            {dict.totalPrice}
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51]">
            ${grandTotal}
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          / {dict.trip}
        </span>
      </div>

      {/* Proceed to Book CTA */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBookNow}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E8B34A] to-[#D49E35] text-[#013E51] font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <span>{dict.proceedToBook}</span>
        <FiArrowRight className="text-base" />
      </motion.button>

      {/* Cancellation Guarantee Badge */}
      <div className="flex items-start gap-2.5 pt-2 text-xs text-slate-500 leading-relaxed">
        <FiShield className="text-[#E8B34A] text-base shrink-0 mt-0.5" />
        <span>{dict.freeCancellationNotice}</span>
      </div>
    </div>
  );
};

export default TripBookingSidebar;
