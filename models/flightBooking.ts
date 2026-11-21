export enum FlightTripTypeEnum {
  OneWay = 1,
  RoundTrip = 2,
}

export enum FlightBookingTypeEnum {
  EgyptToCountry = 1,
  CountryToEgypt = 2,
  Local = 3,
}

export enum BaggageTypeEnum {
  CarryOn = 1,
  PersonalItem = 2,
  CheckedBaggage = 3,
  SpecialBaggage = 4,
}

export enum PassengerTypeEnum {
  Adult = 1,
  Child = 2,
  Infant = 3,
}

export interface FlightPassengerBaggageApiItem {
  id?: number;
  flightPassengerId?: number;
  baggageType: BaggageTypeEnum | number;
  quantity: number;
  weightPerItem: number;
}

export interface CreateFlightPassengerBaggagePayload {
  baggageType: BaggageTypeEnum;
  quantity: number;
  weightPerItem: number;
}

export interface FlightPassengerApiItem {
  id?: number;
  flightBookingId?: number;
  fullName: string;
  passportNumber: string;
  passengerType: PassengerTypeEnum | number;
  baggages: FlightPassengerBaggageApiItem[];
}

export interface CreateFlightPassengerPayload {
  fullName: string;
  passportNumber: string;
  passengerType: PassengerTypeEnum;
  baggages: CreateFlightPassengerBaggagePayload[];
}

export interface FlightBookingApiItem {
  id: number;
  bookingType: FlightBookingTypeEnum | number;
  tripType: FlightTripTypeEnum | number;
  fromCountryId?: number | null;
  fromCountryName?: string | null;
  fromCityId?: number | null;
  fromCityName?: string | null;
  toCountryId?: number | null;
  toCountryName?: string | null;
  toCityId?: number | null;
  toCityName?: string | null;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDepartureAirport?: string | null;
  returnArrivalAirport?: string | null;
  returnDate?: string | null;
  numberOfPeople: number;
  passengers: FlightPassengerApiItem[];
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateFlightBookingPayload {
  bookingType: FlightBookingTypeEnum;
  tripType: FlightTripTypeEnum;
  fromCountryId?: number | null;
  fromCityId?: number | null;
  toCountryId?: number | null;
  toCityId?: number | null;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDepartureAirport?: string | null;
  returnArrivalAirport?: string | null;
  returnDate?: string | null;
  numberOfPeople: number;
  passengers: CreateFlightPassengerPayload[];
}

export interface UpdateFlightBookingPayload extends CreateFlightBookingPayload {
  id: number;
}

export interface FlightBookingsQueryParams {
  BookingType?: FlightBookingTypeEnum;
  TripType?: FlightTripTypeEnum;
  FromCountryId?: number;
  FromCityId?: number;
  ToCountryId?: number;
  ToCityId?: number;
  DepartureDateFrom?: string;
  DepartureDateTo?: string;
  ReturnDateFrom?: string;
  ReturnDateTo?: string;
  MinPeople?: number;
  MaxPeople?: number;
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}
