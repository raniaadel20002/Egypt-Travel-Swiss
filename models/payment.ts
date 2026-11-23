export type OnlinePaymentBookingType = "trip" | "diving";

export const PaymentCaptureCategory = {
  Trip: 0,
  DivingCourse: 1,
} as const;

export type PaymentCaptureCategoryValue =
  (typeof PaymentCaptureCategory)[keyof typeof PaymentCaptureCategory];

export interface InitializePayPalPaymentPayload {
  bookingId?: number;
  divingCourseBookingId?: string;
}

export interface InitializePayPalPaymentData {
  paymentId: number | string;
  divingCoursePaymentId?: string;
  payPalOrderId: string;
  amount: number;
  currency: string;
  status: string;
  bookingId?: number;
  divingCourseBookingId?: string;
  bookingReference?: string;
  createdAt: string;
}

export interface CapturePayPalPaymentPayload {
  category: PaymentCaptureCategoryValue;
  paymentId: number;
  payPalOrderId: string;
}

export interface CapturePayPalPaymentData {
  paymentId: number | string;
  payPalOrderId: string;
  payPalCaptureId: string;
  status: string;
  amount: number;
  currency: string;
  paidAt?: string;
  failureReason?: string | null;
  bookingConfirmed: boolean;
}

export interface PaymentDetailData {
  paymentId: number;
  bookingId: number;
  status: string;
  amount: number;
  currency: string;
  provider: string;
  payPalOrderId: string;
  payPalCaptureId?: string | null;
  createdAt: string;
  paidAt?: string | null;
  failureReason?: string | null;
}

export interface PendingPaymentSession {
  bookingType: OnlinePaymentBookingType;
  bookingId: number | string;
  paymentId?: number;
  divingCoursePaymentId?: string;
  payPalOrderId: string;
  amount: number;
  fullTotalAmount?: number;
  depositPercentage?: number;
  remainingOnArrival?: number;
  currency: string;
  bookingReference?: string;
  title: string;
  customerName: string;
  successParams: Record<string, string>;
}
