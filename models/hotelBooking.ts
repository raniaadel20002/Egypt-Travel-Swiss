export enum HotelBookingStatusEnum {
  Pending = 0,
  Confirmed = 1,
  Finished = 2,
  Cancelled = 3,
}

export interface HotelBookingRoomApiItem {
  id: number;
  ratePlanId: number;
  ratePlanName: string;
  adults: number;
  children: number;
  infants: number;
}

export interface HotelBookingApiItem {
  id: number;
  hotelId: number;
  hotelName: string;
  name: string;
  email: string;
  whatsApp: string;
  nationality: string;
  adults: number;
  children: number;
  infants: number;
  nightsCount: number;
  roomsCount: number;
  bookingDate: string;
  status: string | number;
  createdAt: string;
  updatedAt: string | null;
  rooms: HotelBookingRoomApiItem[];
}

export interface CreateHotelBookingRoomPayload {
  ratePlanId: number;
  adults: number;
  children: number;
  infants: number;
}

export interface CreateHotelBookingPayload {
  hotelId: number;
  name: string;
  email: string;
  whatsApp: string;
  nationality: string;
  adults: number;
  children: number;
  infants: number;
  nightsCount: number;
  bookingDate: string;
  rooms: CreateHotelBookingRoomPayload[];
}

export interface HotelBookingsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  HotelId?: number;
  Status?: HotelBookingStatusEnum;
  Nationality?: string;
  CreatedFrom?: string;
  CreatedTo?: string;
  Language?: string;
}

export interface UpdateHotelBookingStatusPayload {
  id: number;
  status: HotelBookingStatusEnum;
}
