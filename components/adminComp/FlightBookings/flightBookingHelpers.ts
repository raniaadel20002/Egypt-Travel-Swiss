import {
  BaggageTypeEnum,
  CreateFlightBookingPayload,
  CreateFlightPassengerPayload,
  FlightBookingApiItem,
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
  PassengerTypeEnum,
} from "@/models/flightBooking";

export const DEFAULT_PASSENGER: CreateFlightPassengerPayload = {
  fullName: "",
  passportNumber: "",
  passengerType: PassengerTypeEnum.Adult,
  baggages: [
    {
      baggageType: BaggageTypeEnum.CarryOn,
      quantity: 1,
      weightPerItem: 7,
    },
  ],
};

export function mapApiPassengersToPayload(
  booking: FlightBookingApiItem
): CreateFlightPassengerPayload[] {
  if (!booking.passengers || booking.passengers.length === 0) {
    return [{ ...DEFAULT_PASSENGER }];
  }
  return booking.passengers.map((p) => ({
    fullName: p.fullName,
    passportNumber: p.passportNumber,
    passengerType: Number(p.passengerType) as PassengerTypeEnum,
    baggages: (p.baggages || []).map((b) => ({
      baggageType: Number(b.baggageType) as BaggageTypeEnum,
      quantity: Number(b.quantity) || 1,
      weightPerItem: Number(b.weightPerItem) || 0,
    })),
  }));
}

export function buildFlightBookingPayload(params: {
  bookingType: FlightBookingTypeEnum;
  tripType: FlightTripTypeEnum;
  fromCountryId: number | null;
  fromCityId: number | null;
  toCountryId: number | null;
  toCityId: number | null;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDepartureAirport: string;
  returnArrivalAirport: string;
  returnDate: string;
  passengers: CreateFlightPassengerPayload[];
}): CreateFlightBookingPayload {
  const isOneWay = params.tripType === FlightTripTypeEnum.OneWay;
  return {
    bookingType: params.bookingType,
    tripType: params.tripType,
    fromCountryId:
      params.bookingType === FlightBookingTypeEnum.CountryToEgypt
        ? params.fromCountryId
        : null,
    fromCityId:
      params.bookingType === FlightBookingTypeEnum.CountryToEgypt
        ? params.fromCityId
        : null,
    toCountryId:
      params.bookingType === FlightBookingTypeEnum.EgyptToCountry
        ? params.toCountryId
        : null,
    toCityId:
      params.bookingType === FlightBookingTypeEnum.EgyptToCountry
        ? params.toCityId
        : null,
    departureAirport: params.departureAirport.trim(),
    arrivalAirport: params.arrivalAirport.trim(),
    departureDate: new Date(params.departureDate).toISOString(),
    returnDepartureAirport: isOneWay
      ? null
      : params.returnDepartureAirport.trim(),
    returnArrivalAirport: isOneWay ? null : params.returnArrivalAirport.trim(),
    returnDate: isOneWay ? null : new Date(params.returnDate).toISOString(),
    numberOfPeople: params.passengers.length,
    passengers: params.passengers.map((p) => ({
      fullName: p.fullName.trim(),
      passportNumber: p.passportNumber.trim(),
      passengerType: p.passengerType,
      baggages: p.baggages,
    })),
  };
}

export function parseFlightBookingType(val: unknown): FlightBookingTypeEnum {
  if (typeof val === "number") {
    if (val === 2) return FlightBookingTypeEnum.CountryToEgypt;
    if (val === 3) return FlightBookingTypeEnum.Local;
    return FlightBookingTypeEnum.EgyptToCountry;
  }
  if (typeof val === "string") {
    const s = val.trim().toLowerCase();
    if (s === "2" || s.includes("countrytoegypt")) {
      return FlightBookingTypeEnum.CountryToEgypt;
    }
    if (s === "3" || s.includes("local")) {
      return FlightBookingTypeEnum.Local;
    }
  }
  return FlightBookingTypeEnum.EgyptToCountry;
}

export function parseFlightTripType(val: unknown): FlightTripTypeEnum {
  if (typeof val === "number") {
    return val === 2 ? FlightTripTypeEnum.RoundTrip : FlightTripTypeEnum.OneWay;
  }
  if (typeof val === "string") {
    const s = val.trim().toLowerCase();
    if (s === "2" || s.includes("round")) return FlightTripTypeEnum.RoundTrip;
  }
  return FlightTripTypeEnum.OneWay;
}

export function getFlightBookingTypeLabel(type: FlightBookingTypeEnum | number): {
  label: string;
  badgeClass: string;
} {
  const parsed = parseFlightBookingType(type);
  switch (parsed) {
    case FlightBookingTypeEnum.EgyptToCountry:
      return {
        label: "Egypt to Country",
        badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
      };
    case FlightBookingTypeEnum.CountryToEgypt:
      return {
        label: "Country to Egypt",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      };
    case FlightBookingTypeEnum.Local:
      return {
        label: "Local (Domestic)",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
  }
}

export function getFlightTripTypeLabel(type: FlightTripTypeEnum | number): {
  label: string;
  badgeClass: string;
} {
  const parsed = parseFlightTripType(type);
  if (parsed === FlightTripTypeEnum.RoundTrip) {
    return {
      label: "Round Trip",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    };
  }
  return {
    label: "One Way",
    badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
  };
}

export function getPassengerTypeLabel(type: PassengerTypeEnum | number): string {
  switch (Number(type)) {
    case PassengerTypeEnum.Adult:
      return "Adult";
    case PassengerTypeEnum.Child:
      return "Child";
    case PassengerTypeEnum.Infant:
      return "Infant";
    default:
      return "Adult";
  }
}

export function getBaggageTypeLabel(type: BaggageTypeEnum | number): string {
  switch (Number(type)) {
    case BaggageTypeEnum.CarryOn:
      return "Carry-On";
    case BaggageTypeEnum.PersonalItem:
      return "Personal Item";
    case BaggageTypeEnum.CheckedBaggage:
      return "Checked Baggage";
    case BaggageTypeEnum.SpecialBaggage:
      return "Special Baggage";
    default:
      return "Carry-On";
  }
}

export function formatFlightRouteSummary(booking: FlightBookingApiItem): {
  originLabel: string;
  destinationLabel: string;
} {
  const bType = parseFlightBookingType(booking.bookingType);

  if (bType === FlightBookingTypeEnum.EgyptToCountry) {
    const destParts = [booking.toCityName, booking.toCountryName].filter(Boolean);
    return {
      originLabel: "Egypt",
      destinationLabel: destParts.length > 0 ? destParts.join(", ") : "International",
    };
  }

  if (bType === FlightBookingTypeEnum.CountryToEgypt) {
    const origParts = [booking.fromCityName, booking.fromCountryName].filter(Boolean);
    return {
      originLabel: origParts.length > 0 ? origParts.join(", ") : "International",
      destinationLabel: "Egypt",
    };
  }

  return {
    originLabel: "Egypt (Local)",
    destinationLabel: "Egypt (Local)",
  };
}

export function toDateInputString(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
