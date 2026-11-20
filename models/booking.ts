export enum BookingStatusEnum {
  Pending = 0,
  Confirmed = 1,
  Finished = 2,
}

export type BookingStatusFilter = "all" | "pending" | "confirmed" | "finished";

export interface TripBookingItem {
  id: number;
  tripId: number;
  title: string;
  priceForChild: number;
  priceForAdult: number;
  noAdult: number;
  noChild: number;
  noInf: number;
  leaveDate: string;
  subTotal: number;
}

export interface BookingApiItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  bookingDate: string;
  hotelName: string;
  roomNo: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  tripsBookings: TripBookingItem[];
}

export interface BookingsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  Nationality?: string;
  SearchItem?: string;
  Phone?: string;
  Date?: string;
  Status?: BookingStatusEnum;
  TripId?: number;
}

export interface CreateTripBookingItemPayload {
  tripId: number;
  noAdult: number;
  noChild: number;
  noInf: number;
  leaveDate: string;
  serviceIds?: number[];
}

export interface CreateBookingPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  code?: number | null;
  nationality: string;
  hotelName: string;
  roomNo: string;
  tripsBookings: CreateTripBookingItemPayload[];
}
