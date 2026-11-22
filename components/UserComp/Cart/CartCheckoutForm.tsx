"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCartStore } from "@/features/cart/useCartStore";
import { useCreateBookingMutation } from "@/features/bookings/useBookings";
import { CartPricingSummary } from "@/models/cart";
import {
  isDateAvailableForTrip,
  getAvailableDaysText,
  getDayNameForDate,
} from "@/shared/utils/tripAvailability";
import CartGuestInputFields from "./CartGuestInputFields";

interface CartCheckoutFormProps {
  summary: CartPricingSummary;
}

export default function CartCheckoutForm({ summary }: CartCheckoutFormProps) {
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;
  const router = useRouter();
  const { items, promoCode, clearCart } = useCartStore();
  const createBookingMutation = useCreateBookingMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    hotelName: "",
    roomNo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("Please enter your full first and last name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      toast.error("Please enter a valid phone or WhatsApp number.");
      return;
    }

    if (!formData.nationality.trim()) {
      toast.error("Please provide your nationality.");
      return;
    }

    if (!formData.hotelName.trim()) {
      toast.error("Please specify your hotel or pickup accommodation.");
      return;
    }

    const todayIso = new Date().toISOString().split("T")[0];
    for (const item of items) {
      if (!item.leaveDate || item.leaveDate < todayIso) {
        toast.error(`Please select a valid departure date for "${item.name}".`);
        return;
      }
      if (!isDateAvailableForTrip(item.leaveDate, item.availableDays)) {
        const daysText = getAvailableDaysText(item.availableDays);
        const dayName = getDayNameForDate(item.leaveDate);
        toast.error(
          `"${item.name}" does not operate on ${dayName}. Available days: ${daysText}. Please choose an operating date in your cart.`
        );
        return;
      }
      if (item.noAdult < 1) {
        toast.error(`At least one adult is required for "${item.name}".`);
        return;
      }
    }

    const promoCodeNumber = promoCode?.code
      ? Number(promoCode.code) || null
      : null;

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      code: promoCodeNumber,
      nationality: formData.nationality.trim(),
      hotelName: formData.hotelName.trim(),
      roomNo: formData.roomNo.trim() || "TBD",
      tripsBookings: items.map((item) => ({
        tripId: item.tripId,
        noAdult: item.noAdult,
        noChild: item.noChild,
        noInf: item.noInf,
        leaveDate: item.leaveDate,
        serviceIds: item.serviceIds || [],
      })),
    };

    try {
      const response = await createBookingMutation.mutateAsync(payload);
      const bookingId = response?.id || Date.now();
      const guestFullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      const primaryTrip = items[0]?.name || "Excursion";

      clearCart();
      toast.success("Booking submitted successfully!");

      const searchParams = new URLSearchParams({
        type: "trip",
        id: String(bookingId),
        name: guestFullName,
        title: primaryTrip,
        trips: String(items.length),
        travelDate: items[0]?.leaveDate || "",
        travelers: String(summary.totalTravelers),
        pickup: formData.hotelName.trim(),
        total: summary.finalTotal.toFixed(0),
        onContact: summary.hasOnContactTrip ? "1" : "0",
      });

      router.push(`/${locale}/booking-success?${searchParams.toString()}`);
    } catch {
      toast.error("Failed to complete booking. Please review your details and try again.");
    }
  };

  const hasInvalidDateItem = items.some(
    (item) => !isDateAvailableForTrip(item.leaveDate, item.availableDays)
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 space-y-6 font-[family-name:var(--font-lato)]"
    >
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#E8B34A] uppercase tracking-wider mb-1">
          <FiCheckCircle className="w-4 h-4 text-[#E8B34A]" />
          <span>{t?.checkoutEyebrow || "Final Step"}</span>
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {t?.checkoutTitle || "Lead Guest & Hotel Pickup Details"}
        </h2>
        <p className="text-xs sm:text-sm text-[#013E51]/70 mt-1">
          {t?.checkoutDesc ||
            "We need this information to organize hotel transfers and dispatch your booking voucher."}
        </p>
      </div>

      <CartGuestInputFields
        formData={formData}
        onChange={handleChange}
      />

      <div className="pt-2">
        {hasInvalidDateItem && (
          <div className="mb-3 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
            <FiAlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              One or more excursions in your cart are set to dates they do not operate. Please choose an operating day above before confirming your booking.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={createBookingMutation.isPending || items.length === 0 || hasInvalidDateItem}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8B34A] to-[#D49E35] text-[#013E51] font-bold text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          {createBookingMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-[#013E51] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiCheckCircle className="w-5 h-5 text-[#013E51]" />
              <span>
                {t?.confirmAndBook || "Confirm & Book"} ({summary.itemCount} {summary.itemCount === 1 ? "Trip" : "Trips"})
              </span>
            </>
          )}
        </button>

        {summary.hasOnContactTrip && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-center leading-relaxed font-medium">
            Booking includes excursions with price available on contact. You can complete your booking now, and our concierge team will confirm the full final price with you via WhatsApp.
          </div>
        )}

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#013E51]/70">
          <FiLock className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>{t?.noPrepayment || "No prepayment required. Secure confirmation via WhatsApp concierge."}</span>
        </div>
      </div>
    </form>
  );
}
