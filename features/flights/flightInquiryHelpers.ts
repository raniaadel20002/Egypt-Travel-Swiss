import {
  BaggageTypeEnum,
  CreateFlightBookingPayload,
  CreateFlightPassengerPayload,
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
  PassengerTypeEnum,
} from "@/models/flightBooking";

export const EGYPT_AIRPORTS = [
  "Cairo (CAI)",
  "Hurghada (HRG)",
  "Sharm El Sheikh (SSH)",
  "Luxor (LXR)",
  "Marsa Alam (RMF)",
  "Aswan (ASW)",
  "Alexandria (HBE)",
];

export const INTERNATIONAL_AIRPORTS = [
  "Zurich (ZRH)",
  "Geneva (GVA)",
  "Frankfurt (FRA)",
  "Munich (MUC)",
  "Berlin (BER)",
  "Vienna (VIE)",
  "London (LHR)",
  "Paris (CDG)",
  "Milan (MXP)",
  "Rome (FCO)",
  "Bucharest (OTP)",
  "Moscow (SVO)",
];

export const makeDefaultPassenger = (): CreateFlightPassengerPayload => ({
  fullName: "",
  passportNumber: "",
  passengerType: PassengerTypeEnum.Adult,
  baggages: [{ baggageType: BaggageTypeEnum.CarryOn, quantity: 1, weightPerItem: 7 }],
});

export function combineIsoDateTime(dateStr: string, timeStr: string): string {
  const dt = new Date(`${dateStr}T${timeStr || "09:30"}:00`);
  return isNaN(dt.getTime()) ? new Date(dateStr).toISOString() : dt.toISOString();
}

export interface BuildPublicFlightPayloadParams {
  bookingType: FlightBookingTypeEnum;
  tripType: FlightTripTypeEnum;
  fromCountryId: number | null;
  fromCityId: number | null;
  toCountryId: number | null;
  toCityId: number | null;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime: string;
  returnDepartureAirport: string;
  returnArrivalAirport: string;
  returnDate: string;
  returnTime: string;
  passengers: CreateFlightPassengerPayload[];
  fallbackFromCountryId?: number | null;
  fallbackFromCityId?: number | null;
  fallbackToCountryId?: number | null;
  fallbackToCityId?: number | null;
}

export function buildPublicFlightPayload(
  params: BuildPublicFlightPayloadParams
): CreateFlightBookingPayload {
  const isOneWay = params.tripType === FlightTripTypeEnum.OneWay;
  const isCountryToEgypt = params.bookingType === FlightBookingTypeEnum.CountryToEgypt;
  const isEgyptToCountry = params.bookingType === FlightBookingTypeEnum.EgyptToCountry;

  const resolvedFromCountryId = isCountryToEgypt
    ? params.fromCountryId ?? null
    : null;
  const resolvedFromCityId = isCountryToEgypt
    ? params.fromCityId ?? null
    : null;

  const resolvedToCountryId = isEgyptToCountry
    ? params.toCountryId ?? null
    : null;
  const resolvedToCityId = isEgyptToCountry
    ? params.toCityId ?? null
    : null;

  return {
    bookingType: params.bookingType,
    tripType: params.tripType,
    fromCountryId: resolvedFromCountryId,
    fromCityId: resolvedFromCityId,
    toCountryId: resolvedToCountryId,
    toCityId: resolvedToCityId,
    departureAirport: params.departureAirport.trim(),
    arrivalAirport: params.arrivalAirport.trim(),
    departureDate: combineIsoDateTime(params.departureDate, params.departureTime),
    returnDepartureAirport: isOneWay
      ? null
      : (params.returnDepartureAirport || params.arrivalAirport).trim(),
    returnArrivalAirport: isOneWay
      ? null
      : (params.returnArrivalAirport || params.departureAirport).trim(),
    returnDate: isOneWay
      ? null
      : combineIsoDateTime(params.returnDate, params.returnTime),
    numberOfPeople: params.passengers.length,
    passengers: params.passengers.map((p) => ({
      fullName: p.fullName.trim(),
      passportNumber: p.passportNumber.trim(),
      passengerType: p.passengerType,
      baggages: p.baggages,
    })),
  };
}

export interface ValidateFlightFormParams {
  bookingType: FlightBookingTypeEnum;
  tripType: FlightTripTypeEnum;
  fromCountryId: number | null;
  fromCustomCountry: string;
  fromCityId: number | null;
  fromCustomCity: string;
  toCountryId: number | null;
  toCustomCountry: string;
  toCityId: number | null;
  toCustomCity: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate: string;
  passengers: CreateFlightPassengerPayload[];
  email: string;
  phone: string;
  agreeTerms: boolean;
  t: Record<string, string>;
}

export function validateFlightForm(params: ValidateFlightFormParams): string | null {
  const hasFromLocation =
    Boolean(params.fromCountryId || params.fromCustomCountry.trim()) &&
    Boolean(params.fromCityId || params.fromCustomCity.trim());
  const hasToLocation =
    Boolean(params.toCountryId || params.toCustomCountry.trim()) &&
    Boolean(params.toCityId || params.toCustomCity.trim());

  if (
    (params.bookingType === FlightBookingTypeEnum.EgyptToCountry && !hasToLocation) ||
    (params.bookingType === FlightBookingTypeEnum.CountryToEgypt && !hasFromLocation) ||
    !params.departureAirport.trim() ||
    !params.arrivalAirport.trim()
  ) {
    return params.t.validationRoute;
  }

  if (
    !params.departureDate ||
    (params.tripType === FlightTripTypeEnum.RoundTrip &&
      (!params.returnDate || params.returnDate < params.departureDate))
  ) {
    return params.t.validationDates;
  }

  if (params.passengers.some((p) => !p.fullName.trim() || !p.passportNumber.trim())) {
    return params.t.validationPassengers;
  }

  if (!params.email.trim() || !params.phone.trim() || !params.agreeTerms) {
    return params.t.validationContact;
  }

  return null;
}

export function buildFlightSuccessUrl(params: {
  locale: string;
  bookingId: number | string;
  fullName: string;
  from: string;
  to: string;
  date: string;
  passengersCount: number;
  isRoundTrip: boolean;
  returnDate?: string;
  email?: string;
  phone?: string;
}): string {
  const p = new URLSearchParams({
    type: "flight",
    id: String(params.bookingId || ""),
    name: params.fullName.trim(),
    from: params.from.trim(),
    to: params.to.trim(),
    date: params.date,
    passengers: String(params.passengersCount),
  });
  if (params.isRoundTrip && params.returnDate) p.set("returnDate", params.returnDate);
  if (params.email?.trim()) p.set("email", params.email.trim());
  if (params.phone?.trim()) p.set("phone", params.phone.trim());
  return `/${params.locale}/booking-success?${p.toString()}`;
}
