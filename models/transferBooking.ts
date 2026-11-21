export enum TransferTripTypeEnum {
  OneWay = 1,
  RoundTrip = 2,
}

export enum TransferCommunicationMethodEnum {
  Email = 1,
  WhatsApp = 2,
  Viber = 3,
  Phone = 4,
}

export enum TransferBookingStatusEnum {
  Pending = 0,
  Confirmed = 1,
  Completed = 2,
  Cancelled = 3,
}

export interface TransferMatchPayload {
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  children: number;
  tripType: TransferTripTypeEnum;
}

export interface TransferMatchResult {
  vehicleTypeTransferId: string;
  vehicleName: string;
  fromPerson: number;
  toPerson: number;
  totalPersons: number;
  fromId: string;
  fromLocation: string;
  toId: string;
  toLocation: string;
  tripType: string;
  outboundPrice: number;
  returnPrice: number;
  currency: string;
}

export interface TransferPreviewPayload {
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  children: number;
  tripType: TransferTripTypeEnum;
  additionalHours?: number;
}

export interface TransferPreviewPricing {
  outboundPrice: number;
  returnPrice: number;
  combinedPrice: number;
  discountPercentage: number;
  discountAmount: number;
  additionalHours: number;
  additionalHoursCost: number;
  finalPrice: number;
  currency: string;
}

export interface TransferPreviewResult {
  vehicleTypeTransferId: string;
  vehicleName: string;
  fromPerson: number;
  toPerson: number;
  totalPersons: number;
  tripType: string;
  pricing: TransferPreviewPricing;
}

export interface CreateTransferBookingPayload {
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  children: number;
  tripType: TransferTripTypeEnum;
  tripDate: string;
  tripTime: string;
  customerName: string;
  countryTransferId: number;
  email: string;
  communicationMethod: TransferCommunicationMethodEnum;
  phoneNumber: string;
  luggageCount: number;
  notes?: string;
}

export interface CompleteTransferBookingPayload {
  additionalHours: number;
}

export interface UpdateTransferBookingStatusPayload {
  id: string;
  status: TransferBookingStatusEnum;
}

export interface TransferBookingPricing {
  outboundPriceUsd: number;
  returnPriceUsd: number;
  combinedPriceUsd: number;
  discountPercentage: number;
  discountAmountUsd: number;
  additionalHoursRateUsd: number;
  additionalHours: number;
  additionalHoursCostUsd: number;
  basePriceUsd: number;
  finalPriceUsd: number;
  currency: string;
  exchangeRate: number;
  finalPriceConverted: number;
}

export interface TransferBookingApiItem {
  id: string;
  fromLocationId: string;
  fromLocationName?: string;
  toLocationId: string;
  toLocationName?: string;
  adults: number;
  children: number;
  totalPersons: number;
  tripType: string;
  tripDate: string;
  tripTime: string;
  customerName: string;
  countryTransferId: number;
  countryTransferName?: string;
  email: string;
  communicationMethod: TransferCommunicationMethodEnum;
  phoneNumber: string;
  luggageCount: number;
  notes?: string;
  vehicleTypeTransferId?: string;
  vehicleName?: string;
  vehicleFromPerson?: number;
  vehicleToPerson?: number;
  pricing?: TransferBookingPricing;
  status: string | number;
  isCompleted?: boolean;
  completedAt?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface TransferBookingsQueryParams {
  status?: TransferBookingStatusEnum;
  email?: string;
  pageNumber?: number;
  pageSize?: number;
}
