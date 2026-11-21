export enum DivingBookingStatusEnum {
  Pending = 0,
  Confirmed = 1,
  Finished = 2,
  Cancelled = 3,
}

export interface DivingCourseBookingItemApi {
  id: string;
  divingCourseId: string;
  courseName: string;
  bookingDate: string;
  numberOfParticipants: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DivingCourseBookingApiItem {
  id: string;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  roomNo: string;
  hotelName: string;
  items: DivingCourseBookingItemApi[];
  totalPrice: number;
  depositPercentage: number;
  depositAmount: number;
  paidAmount: number;
  remainingAmount: number;
  currency: string;
  status: string | number;
  paymentStatus: string;
  createdAt: string;
}

export interface CreateDivingCourseBookingItemPayload {
  divingCourseId: string;
  bookingDate: string;
  numberOfParticipants: number;
}

export interface CreateDivingCourseBookingPayload {
  fullName: string;
  email: string;
  phone: string;
  roomNo: string;
  hotelName: string;
  items: CreateDivingCourseBookingItemPayload[];
}

export interface CreateDivingCourseBookingResponseData {
  bookingId: string;
  booking: DivingCourseBookingApiItem;
  message?: string;
}

export interface PaginatedDivingCourseBookingsData {
  data: DivingCourseBookingApiItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export interface DivingCourseBookingsQueryParams {
  pageNumber?: number;
  pageSize?: number;
}
