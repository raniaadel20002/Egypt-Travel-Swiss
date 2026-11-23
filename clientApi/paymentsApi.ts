import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  InitializePayPalPaymentPayload,
  InitializePayPalPaymentData,
  CapturePayPalPaymentPayload,
  CapturePayPalPaymentData,
  PaymentDetailData,
} from "@/models/payment";

export async function initializePayPalPayment(
  payload: InitializePayPalPaymentPayload
): Promise<InitializePayPalPaymentData> {
  const response = await apiClient.post<ApiResponse<InitializePayPalPaymentData>>(
    "/api/Payments/paypal/initialize",
    payload
  );
  return response.data.data;
}

export async function capturePayPalPayment(
  payload: CapturePayPalPaymentPayload
): Promise<CapturePayPalPaymentData> {
  const response = await apiClient.post<ApiResponse<CapturePayPalPaymentData>>(
    "/api/Payments/paypal/capture",
    payload
  );
  return response.data.data;
}

export async function getPaymentById(
  paymentId: number
): Promise<PaymentDetailData> {
  const response = await apiClient.get<ApiResponse<PaymentDetailData>>(
    `/api/Payments/${paymentId}`
  );
  return response.data.data;
}

export async function getPaymentsByBookingId(
  bookingId: number
): Promise<PaymentDetailData[]> {
  const response = await apiClient.get<ApiResponse<PaymentDetailData[]>>(
    `/api/Payments/booking/${bookingId}`
  );
  return response.data?.data || [];
}
