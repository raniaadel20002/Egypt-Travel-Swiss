"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createDivingCourseBooking } from "@/clientApi/divingCourseBookingsApi";
import { initializePayPalPayment } from "@/clientApi/paymentsApi";
import { savePendingPaymentSession } from "@/features/payments/paymentSessionStorage";
import { initializeOrRecoverDivingPayment } from "@/features/payments/paymentInitHelper";
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
        responseData?.bookingId ||
          responseData?.booking?.id ||
          responseData?.id ||
          responseData?.data?.id ||
          responseData?.data?.bookingId ||
          ""
      );
      const bookingData = responseData?.booking || responseData?.data?.booking;

      const payableAmount = Number(bookingData?.totalPrice ?? totalPrice);

      if (!targetBookingId || payableAmount <= 0) {
        throw new Error(
          "Unable to initialize reservation for payment. Please try again."
        );
      }
      const depositAmount = payableAmount * 0.5;
      const remainingOnArrival = payableAmount - depositAmount;

      const paymentInit = await initializeOrRecoverDivingPayment(
        targetBookingId,
        depositAmount,
        initializePayPalPayment
      );

      const successParams: Record<string, string> = {
        type: "diving",
        id: targetBookingId,
        name: fullName.trim(),
        divingId: targetBookingId,
        divingName: bookingData?.fullName || fullName.trim(),
        divingEmail: bookingData?.email || email.trim(),
        divingPhone: bookingData?.phone || phone.trim(),
        roomNo: bookingData?.roomNo || roomNo.trim(),
        divingHotel: bookingData?.hotelName || hotelName.trim(),
        divingTotal: String(payableAmount),
        divingDeposit: String(depositAmount),
        divingRemaining: String(remainingOnArrival),
        divingCurrency: bookingData?.currency || currency || "EUR",
        divingStatus: bookingData?.status || "Pending",
        divingPaymentStatus: "Paid",
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

      savePendingPaymentSession({
        bookingType: "diving",
        bookingId: targetBookingId,
        paymentId: paymentInit.paymentId,
        payPalOrderId: paymentInit.payPalOrderId,
        amount: depositAmount,
        fullTotalAmount: payableAmount,
        depositPercentage: bookingData?.depositPercentage || 50,
        remainingOnArrival,
        currency: paymentInit.currency || currency || "EUR",
        bookingReference: paymentInit.bookingReference || targetBookingId,
        title: courseName,
        customerName: fullName.trim(),
        successParams,
      });

      router.push(`/${locale}/checkout/payment?type=diving&bookingId=${encodeURIComponent(targetBookingId)}`);
      return;
    } catch (err) {
      toast.error(extractErrorMessage(err, errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitCourseBooking };
}
