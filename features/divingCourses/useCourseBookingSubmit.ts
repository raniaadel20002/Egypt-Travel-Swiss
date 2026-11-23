"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createDivingCourseBooking } from "@/clientApi/divingCourseBookingsApi";
import { initializePayPalPayment } from "@/clientApi/paymentsApi";
import { savePendingPaymentSession } from "@/features/payments/paymentSessionStorage";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface SubmitCourseBookingInput {
  courseId: string;
  courseName: string;
  date: string;
  participants: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  fullName: string;
  email: string;
  phone: string;
  hotelName: string;
  roomNo: string;
  locale: string;
  errorMessage: string;
}

export function useCourseBookingSubmit() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitCourseBooking = async (input: SubmitCourseBookingInput) => {
    const {
      courseId,
      courseName,
      date,
      participants,
      unitPrice,
      totalPrice,
      currency,
      fullName,
      email,
      phone,
      hotelName,
      roomNo,
      locale,
      errorMessage,
    } = input;

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error(errorMessage);
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createDivingCourseBooking({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        hotelName: hotelName.trim() || "To be confirmed",
        roomNo: roomNo.trim() || "To be confirmed",
        items: [
          {
            divingCourseId: courseId,
            bookingDate: date,
            numberOfParticipants: participants,
          },
        ],
      });

      const responseData = ((res as unknown as Record<string, unknown>)?.data ||
        res) as Record<string, any>;
      const targetBookingId = String(
        responseData?.bookingId || responseData?.booking?.id || ""
      );
      const bookingData = responseData?.booking;

      const successParams: Record<string, string> = {
        type: "diving",
        id: targetBookingId || "unknown",
        name: fullName.trim(),
        divingId: targetBookingId || "unknown",
        divingName: bookingData?.fullName || fullName.trim(),
        divingEmail: bookingData?.email || email.trim(),
        divingPhone: bookingData?.phone || phone.trim(),
        roomNo: bookingData?.roomNo || roomNo.trim(),
        divingHotel: bookingData?.hotelName || hotelName.trim(),
        divingTotal: String(bookingData?.totalPrice ?? totalPrice),
        divingDeposit: String(bookingData?.depositAmount ?? 0),
        divingRemaining: String(
          bookingData?.remainingAmount ?? bookingData?.totalPrice ?? totalPrice
        ),
        divingCurrency: bookingData?.currency || currency || "EUR",
        divingStatus: bookingData?.status || "Pending",
        divingPaymentStatus: bookingData?.paymentStatus || "Pending",
        divingItems: JSON.stringify(
          bookingData?.items || [
            {
              courseName,
              bookingDate: date,
              numberOfParticipants: participants,
              unitPrice,
              totalPrice,
            },
          ]
        ),
      };

      const payableAmount = Number(bookingData?.totalPrice ?? totalPrice);
      if (targetBookingId && payableAmount > 0) {
        const initialized = await initializePayPalPayment({
          divingCourseBookingId: targetBookingId,
        });

        savePendingPaymentSession({
          bookingType: "diving",
          bookingId: targetBookingId,
          divingCoursePaymentId: String(
            initialized.divingCoursePaymentId || initialized.paymentId
          ),
          payPalOrderId: initialized.payPalOrderId,
          amount: Number(initialized.amount || payableAmount),
          currency: initialized.currency || currency || "EUR",
          bookingReference: initialized.bookingReference || targetBookingId,
          title: courseName,
          customerName: fullName.trim(),
          successParams,
        });

        router.push(`/${locale}/checkout/payment?type=diving`);
        return;
      }

      const params = new URLSearchParams(successParams);
      router.push(`/${locale}/booking-success?${params.toString()}`);
    } catch (err) {
      toast.error(extractErrorMessage(err, errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitCourseBooking };
}
