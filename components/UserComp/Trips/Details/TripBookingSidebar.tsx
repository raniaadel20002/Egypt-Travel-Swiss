"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight, FiX, FiMapPin, FiShield, FiAlertCircle } from "react-icons/fi";
import { TripApiItem } from "@/models/trip";
import { ServiceApiItem } from "@/models/service";
import { PromoCodeItem } from "@/models/promoCode";
import { Dictionary } from "@/features/i18n/i18nConfig";
import { useCartStore } from "@/features/cart/useCartStore";
import { useMatchPrivateVehicleTransfersQuery } from "@/features/privateVehicles/usePrivateVehicleTransfers";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import TripDatePicker from "@/components/UserComp/Common/TripDatePicker";
import {
  isDateAvailableForTrip,
  getAvailableDaysText,
  getDayNameForDate,
} from "@/shared/utils/tripAvailability";
import { TripGuestStepper } from "./TripGuestStepper";
import TripPromoCodeSection from "./TripPromoCodeSection";
import TripOnContactNotice from "./TripOnContactNotice";
import TripPriceBreakdownRows from "./TripPriceBreakdownRows";
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
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeItem | null>(null);

  const isOnContact = (trip.adultPrice ?? 0) <= 0;
  const isPrivate = trip.categoryName?.trim().toLowerCase().includes("private");
  const totalPersons = Math.max(1, noAdult + noChild);

  const { data: matchedTransfers } = useMatchPrivateVehicleTransfersQuery(
    isPrivate ? trip.id : null,
    totalPersons
  );
  const privateTransfer = isPrivate && matchedTransfers?.[0] ? matchedTransfers[0] : null;
  const transferPrice = privateTransfer ? Number(privateTransfer.price || 0) : 0;

  const adultPrice = trip.adultPrice ?? 0;
  const childPrice = trip.childPrice ?? 0;
  const infantPrice = trip.infPrice ?? 0;

  const adultTotal = isOnContact ? 0 : noAdult * adultPrice;
  const childTotal = isOnContact ? 0 : noChild * childPrice;
  const infantTotal = isOnContact ? 0 : noInf * infantPrice;

  const servicesTotal = useMemo(
    () => selectedServices.reduce((sum, s) => sum + (s.adultPrice ?? 0), 0),
    [selectedServices]
  );

  const subtotal = adultTotal + childTotal + infantTotal + transferPrice + servicesTotal;

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountpercent > 0) return (subtotal * appliedPromo.discountpercent) / 100;
    if (appliedPromo.discountEuro > 0) return Math.min(subtotal, appliedPromo.discountEuro);
    return 0;
  }, [appliedPromo, subtotal]);

  const grandTotal = Math.max(0, subtotal - discountAmount);

  const primaryImage =
    trip.images?.find((img) => img.isPrimary)?.imageUrl ||
    trip.images?.[0]?.imageUrl ||
    "/Trips/heroTrips.png";
  const imageSrc = resolveApiImageUrl(primaryImage) || "/Trips/heroTrips.png";

  const whatsappUrl = useMemo(() => {
    const lines = [
      `Hello Egypt Travel Swiss! I would like to inquire about:`,
      `*Trip:* ${trip.name}`,
      `*Type:* ${isPrivate ? "Private" : "Group"}`,
      `*Date:* ${leaveDate || "Not chosen yet"}`,
      `*Guests:* ${noAdult} Adults, ${noChild} Children, ${noInf} Infants`,
    ];
    if (isPrivate && privateTransfer) lines.push(`*Private Transfer:* ${privateTransfer.vehicleName} (${transferPrice} €)`);
    if (selectedServices.length > 0) lines.push(`*Extra Services:* ${selectedServices.map((s) => s.name).join(", ")}`);
    if (appliedPromo) lines.push(`*Promo Code:* ${appliedPromo.code}`);
    lines.push(`Please let me know the full price and availability details.`);
    return `https://wa.me/201004829104?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [trip.name, isPrivate, leaveDate, noAdult, noChild, noInf, privateTransfer, transferPrice, selectedServices, appliedPromo]);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const isDateValid = isDateAvailableForTrip(leaveDate, trip.availableDays);
  const availableDaysText = getAvailableDaysText(trip.availableDays);
  const selectedDayName = getDayNameForDate(leaveDate);

  const handleBookNow = () => {
    if (!leaveDate) {
      toast.error(dict.selectDatePrompt || "Please select a travel date before booking.");
      return;
    }
    if (!isDateValid) {
      toast.error(`"${trip.name}" is not operating on ${selectedDayName}. Available days: ${availableDaysText}`);
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
      transferPrice: isPrivate ? transferPrice : undefined,
      transferVehicleName: isPrivate ? privateTransfer?.vehicleName : undefined,
      promoCode: appliedPromo,
    });

    toast.success(dict.bookingAddedSuccess || "Trip added to your booking!");
    router.push(`/${locale}/cart`);
  };

  return (
    <div className="sticky top-24 bg-white rounded-[24px] p-6 sm:p-7 border border-[#E8B34A]/35 shadow-xl space-y-5 font-[family-name:var(--font-lato)]">
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-gray-100">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E8B34A]/30">
          <Image src={imageSrc} alt={trip.name || "Trip"} fill className="object-cover" />
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
          <span className="flex items-center gap-1.5"><FiCalendar className="text-[#E8B34A]" />{dict.selectDate}</span>
          <span className="text-[11px] text-[#013E51] font-semibold bg-[#E8B34A]/20 px-2.5 py-0.5 rounded-full">
            {availableDaysText === "Daily" ? dict.availableDaily : availableDaysText}
          </span>
        </div>
        <TripDatePicker
          value={leaveDate}
          onChange={onDateChange}
          availableDays={trip.availableDays}
          minDate={todayStr}
        />
        {!isDateValid && (
          <div className="flex items-start gap-1.5 p-2 rounded-xl bg-amber-50 border border-amber-300 text-[11px] text-amber-900 leading-snug">
            <FiAlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              Not operating on {selectedDayName}. Operating days: <strong>{availableDaysText}</strong>.
            </span>
          </div>
        )}
      </div>

      {/* Guests Stepper */}
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
          <div className="text-xs font-bold text-[#013E51]">{dict.selectedServices} ({selectedServices.length})</div>
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {selectedServices.map((srv) => (
              <div key={srv.id} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-[#E8B34A]/10 text-slate-800">
                <span className="truncate pr-2 font-medium">{srv.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-[#013E51]">+{srv.adultPrice}&nbsp;&euro;</span>
                  <button type="button" onClick={() => onRemoveService(srv.id)} className="text-slate-400 hover:text-red-500 transition-colors" title={dict.remove}>
                    <FiX className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promo Code Input */}
      <div className="pt-2 border-t border-gray-100">
        <TripPromoCodeSection tripId={trip.id} appliedPromo={appliedPromo} onApplyPromo={setAppliedPromo} dict={dict} />
      </div>

      {/* On Contact WhatsApp Notice */}
      {isOnContact && <TripOnContactNotice whatsappUrl={whatsappUrl} dict={dict} />}

      {/* Pricing Breakdown Summary */}
      <TripPriceBreakdownRows
        isOnContact={isOnContact}
        noAdult={noAdult}
        adultTotal={adultTotal}
        noChild={noChild}
        childTotal={childTotal}
        noInf={noInf}
        infantTotal={infantTotal}
        isPrivate={isPrivate}
        transferPrice={transferPrice}
        vehicleName={privateTransfer?.vehicleName}
        servicesTotal={servicesTotal}
        discountAmount={discountAmount}
        dict={dict}
      />

      {/* Grand Total */}
      <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-500 block">{dict.totalPrice}</span>
          <span className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51]">
            {grandTotal.toFixed(0)}&nbsp;&euro;
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">/ {dict.trip}</span>
      </div>

      {/* Proceed to Book CTA */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBookNow}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E8B34A] to-[#D49E35] text-[#013E51] font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{dict.proceedToBook}</span>
        <FiArrowRight className="text-base" />
      </motion.button>

      {/* Cancellation Guarantee Badge */}
      <div className="flex items-start gap-2.5 pt-1 text-xs text-slate-500 leading-relaxed">
        <FiShield className="text-[#E8B34A] text-base shrink-0 mt-0.5" />
        <span>{dict.freeCancellationNotice}</span>
      </div>
    </div>
  );
};

export default TripBookingSidebar;
