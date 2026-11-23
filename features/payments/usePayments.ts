import { useMutation, useQuery } from "@tanstack/react-query";
import {
  initializePayPalPayment,
  capturePayPalPayment,
  getPaymentById,
  getPaymentsByBookingId,
} from "@/clientApi/paymentsApi";
import {
  InitializePayPalPaymentPayload,
  CapturePayPalPaymentPayload,
} from "@/models/payment";

export const PAYMENT_QUERY_KEYS = {
  detail: (paymentId: number | null) => ["payments", "detail", paymentId] as const,
  byBooking: (bookingId: number | null) => ["payments", "booking", bookingId] as const,
};

export function useInitializePayPalPaymentMutation() {
  return useMutation({
    mutationFn: (payload: InitializePayPalPaymentPayload) =>
      initializePayPalPayment(payload),
  });
}

export function useCapturePayPalPaymentMutation() {
  return useMutation({
    mutationFn: (payload: CapturePayPalPaymentPayload) =>
      capturePayPalPayment(payload),
  });
}

export function usePaymentDetailQuery(paymentId: number | null, enabled = true) {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.detail(paymentId),
    queryFn: () => getPaymentById(paymentId as number),
    enabled: Boolean(enabled && paymentId && paymentId > 0),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useBookingPaymentsQuery(bookingId: number | null, enabled = true) {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.byBooking(bookingId),
    queryFn: () => getPaymentsByBookingId(bookingId as number),
    enabled: Boolean(enabled && bookingId && bookingId > 0),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
