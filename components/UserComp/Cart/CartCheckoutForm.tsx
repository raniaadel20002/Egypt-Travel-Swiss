"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCartStore } from "@/features/cart/useCartStore";
import { useCreateBookingMutation } from "@/features/bookings/useBookings";
import { useInitializePayPalPaymentMutation } from "@/features/payments/usePayments";
import { savePendingPaymentSession } from "@/features/payments/paymentSessionStorage";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import { CartPricingSummary } from "@/models/cart";
import {
  isDateAvailableForTrip,
  getAvailableDaysText,
  getDayNameForDate,
} from "@/shared/utils/tripAvailability";
import CartGuestInputFields from "./CartGuestInputFields";
import CartPromoCodeSection from "./CartPromoCodeSection";

interface CartCheckoutFormProps {
  summary: CartPricingSummary;
  onRedirecting?: () => void;
}

export default function CartCheckoutForm({
  summary,
  onRedirecting,
}: CartCheckoutFormProps) {
  const { locale, dictionary } = useLocale();
  const t = dictionary.cartPage;
  const router = useRouter();
  const { items, promoCode, setPromoCode } = useCartStore();
  const createBookingMutation = useCreateBookingMutation();
  const initializePaymentMutation = useInitializePayPalPaymentMutation();
  const [isRedirecting, setIsRedirecting] = useState(false);

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

    if (items.length === 0) return toast.error("Your cart is empty.");
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return toast.error("Please enter your full first and last name.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return toast.error("Please enter a valid email address.");
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      return toast.error("Please enter a valid phone or WhatsApp number.");
    }
    if (!formData.nationality.trim()) {
      return toast.error("Please provide your nationality.");
    }
    if (!formData.hotelName.trim()) {
      return toast.error("Please specify your hotel or pickup accommodation.");
    }

    const todayIso = new Date().toISOString().split("T")[0];
    for (const item of items) {
      if (!item.leaveDate || item.leaveDate < todayIso) {
        return toast.error(`Please select a valid departure date for "${item.name}".`);
      }
      if (!isDateAvailableForTrip(item.leaveDate, item.availableDays)) {
        const daysText = getAvailableDaysText(item.availableDays);
        const dayName = getDayNameForDate(item.leaveDate);
        return toast.error(
          `"${item.name}" does not operate on ${dayName}. Available days: ${daysText}. Please choose an operating date in your cart.`
        );
      }
      if (item.noAdult < 1) {
        return toast.error(`At least one adult is required for "${item.name}".`);
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
      const bookingId = response?.id || 0;
      const guestFullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      const primaryTrip = items[0]?.name || "Excursion";

      const successParams: Record<string, string> = {
        type: "trip",
        id: String(bookingId || Date.now()),
        name: guestFullName,
        title: primaryTrip,
        trips: String(items.length),
        travelDate: items[0]?.leaveDate || "",
        travelers: String(summary.totalTravelers),
        pickup: formData.hotelName.trim(),
        total: summary.finalTotal.toFixed(0),
        onContact: summary.hasOnContactTrip ? "1" : "0",
      };

      const requiresOnlinePayment =
        !summary.hasOnContactTrip && summary.finalTotal > 0 && bookingId > 0;

      if (requiresOnlinePayment) {
        const initialized = await initializePaymentMutation.mutateAsync({
          bookingId,
        });
        savePendingPaymentSession({
          bookingType: "trip",
          bookingId,
          paymentId: Number(initialized.paymentId),
          payPalOrderId: initialized.payPalOrderId,
          amount: Number(initialized.amount || summary.finalTotal),
          currency: initialized.currency || "EUR",
          bookingReference: initialized.bookingReference || `#${bookingId}`,
          title:
            items.length > 1
              ? `${primaryTrip} (+${items.length - 1})`
              : primaryTrip,
          customerName: guestFullName,
          successParams,
        });
        setIsRedirecting(true);
        onRedirecting?.();
        router.push(
          `/${locale}/checkout/payment?type=trip&paymentId=${initialized.paymentId}`
        );
        return;
      }

      setIsRedirecting(true);
      onRedirecting?.();
      toast.success("Booking submitted successfully!");

      const searchParams = new URLSearchParams(successParams);
      router.push(`/${locale}/booking-success?${searchParams.toString()}`);
    } catch (err) {
      setIsRedirecting(false);
      toast.error(
        extractErrorMessage(
          err,
          "Failed to complete booking. Please review your details and try again."
        )
      );
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

      {/* Embedded Promo Code Field directly in the Form */}
      <div className="pt-2 border-t border-gray-100">
        <label className="text-xs font-bold text-[#013E51] uppercase tracking-wider block mb-2">
          {t?.promoCode || "Promo Code"}
        </label>
        <CartPromoCodeSection
          appliedPromo={promoCode}
          onApplyPromo={setPromoCode}
        />
      </div>

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
          disabled={
            createBookingMutation.isPending ||
            initializePaymentMutation.isPending ||
            isRedirecting ||
            items.length === 0 ||
            hasInvalidDateItem
          }
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8B34A] to-[#D49E35] text-[#013E51] font-bold text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          {createBookingMutation.isPending ||
          initializePaymentMutation.isPending ||
          isRedirecting ? (
            <>
              <div className="w-5 h-5 border-2 border-[#013E51] border-t-transparent rounded-full animate-spin" />
              <span>
                {summary.hasOnContactTrip
                  ? "Redirecting to confirmation..."
                  : "Preparing secure card payment..."}
              </span>
            </>
          ) : (
            <>
              <FiCheckCircle className="w-5 h-5 text-[#013E51]" />
              <span>
                {summary.hasOnContactTrip
                  ? `${t?.confirmAndBook || "Confirm & Book"} (${summary.itemCount} ${summary.itemCount === 1 ? "Trip" : "Trips"})`
                  : `${t?.continueToPayment || "Continue to Card Payment"} (${summary.itemCount} ${summary.itemCount === 1 ? "Trip" : "Trips"})`}
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
          <span>
            {summary.hasOnContactTrip
              ? t?.noPrepayment ||
                "No prepayment required. Secure confirmation via WhatsApp concierge."
              : t?.secureCardCheckout ||
                "Pay securely by card on our website via PayPal."}
          </span>
        </div>
      </div>
    </form>
  );
}
