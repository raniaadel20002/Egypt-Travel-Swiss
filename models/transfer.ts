export interface TransferVehicleItem {
  id: string;
  name: string;
  capacity: string;
  description: string;
  features: string[];
  icon: string;
  image?: string;
  inquiryHref?: string;
}

export interface TransferLocationItem {
  id: string | number;
  name: string;
  city?: string;
  code?: string;
  isAirport?: boolean;
}

export interface VehicleTypeTransferItem {
  id: string | number;
  name: string;
  capacityText: string;
  maxPassengers: number;
  maxLuggage: number;
  maxHandBags: number;
  features: string[];
  icon: string;
  oneWayPrice: number;
  roundTripPrice: number;
  currency: string;
}

export interface TransferVehiclePriceItem {
  id?: string | number;
  fromLocationId: string | number;
  toLocationId: string | number;
  vehicleTypeId: string | number;
  oneWayPrice: number;
  roundTripPrice: number;
  currency: string;
}

export interface TransferMatchRequest {
  fromLocationId: string | number;
  toLocationId: string | number;
  passengers: number;
  luggage?: number;
  isRoundTrip?: boolean;
}

export interface TransferMatchResponse {
  vehicleTypeId: string | number;
  price: number;
  currency: string;
  note?: string;
}

export interface TransferPreviewRequest {
  fromLocationId: string | number;
  toLocationId: string | number;
  vehicleTypeId: string | number;
  isRoundTrip: boolean;
  adults: number;
  children?: number;
  tripDate: string;
  tripTime: string;
  returnDate?: string;
  returnTime?: string;
}

export interface TransferPreviewResponse {
  basePrice: number;
  discount: number;
  totalPrice: number;
  currency: string;
  fromLocationName?: string;
  toLocationName?: string;
  vehicleTypeName?: string;
}

export interface CreateTransferBookingRequest {
  fromLocationId: string | number;
  toLocationId: string | number;
  vehicleTypeId: string | number;
  isRoundTrip: boolean;
  adults: number;
  children: number;
  tripDate: string;
  tripTime: string;
  returnDate?: string;
  returnTime?: string;
  name: string;
  nationality: string;
  email: string;
  preferredContactMethod: string;
  phone: string;
  luggagePieces: number;
  notes?: string;
}

export interface TransferBookingResult {
  id: string | number;
  bookingReference: string;
  status: string;
  totalPrice: number;
  currency: string;
  createdAt: string;
  fromLocation?: string;
  toLocation?: string;
  vehicleType?: string;
  tripDate?: string;
  tripTime?: string;
  customerName?: string;
  customerEmail?: string;
}

export type TransferBookingStatus =
  | "Pending"
  | "Confirmed"
  | "Finished"
  | "Cancelled";
