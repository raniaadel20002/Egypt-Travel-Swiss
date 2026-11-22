"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  CreateFlightPassengerPayload,
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import {
  useCitiesQuery,
  useCountriesQuery,
} from "@/features/flightLocations/useFlightLocations";
import { useCreateFlightBookingMutation } from "@/features/flights/useFlightBookings";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { getTomorrowIsoDate } from "@/shared/utils/cartPricing";
import {
  buildFlightSuccessUrl,
  buildPublicFlightPayload,
  makeDefaultPassenger,
  validateFlightForm,
} from "./flightInquiryHelpers";

export function useFlightsInquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, dictionary } = useLocale();
  const t = dictionary.flightsPage;
  const backendLang = localeToBackendLanguage(locale);

  const [bookingType, setBookingType] = useState(FlightBookingTypeEnum.CountryToEgypt);
  const [tripType, setTripType] = useState(FlightTripTypeEnum.RoundTrip);

  const [fromCountryId, setFromCountryId] = useState<number | null>(null);
  const [fromCustomCountry, setFromCustomCountry] = useState("");
  const [fromCityId, setFromCityId] = useState<number | null>(null);
  const [fromCustomCity, setFromCustomCity] = useState("");

  const [toCountryId, setToCountryId] = useState<number | null>(null);
  const [toCustomCountry, setToCustomCountry] = useState("");
  const [toCityId, setToCityId] = useState<number | null>(null);
  const [toCustomCity, setToCustomCity] = useState("");

  const [departureAirport, setDepartureAirport] = useState("Frankfurt (FRA)");
  const [arrivalAirport, setArrivalAirport] = useState("Hurghada (HRG)");
  const [departureDate, setDepartureDate] = useState(getTomorrowIsoDate());
  const [departureTime, setDepartureTime] = useState("09:30");

  const [returnDepartureAirport, setReturnDepartureAirport] = useState("Hurghada (HRG)");
  const [returnArrivalAirport, setReturnArrivalAirport] = useState("Frankfurt (FRA)");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("14:45");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [passengers, setPassengers] = useState<CreateFlightPassengerPayload[]>([
    makeDefaultPassenger(),
  ]);

  useEffect(() => {
    const qFrom = searchParams.get("from");
    const qTo = searchParams.get("to");
    const qDep = searchParams.get("dep");
    const qRet = searchParams.get("ret");
    const qPax = searchParams.get("pax");

    if (qFrom) {
      setDepartureAirport(qFrom);
      setReturnArrivalAirport(qFrom);
      setBookingType(FlightBookingTypeEnum.CountryToEgypt);
    }
    if (qTo) {
      setArrivalAirport(qTo);
      setReturnDepartureAirport(qTo);
    }
    if (qDep) setDepartureDate(qDep);
    if (qRet) {
      setReturnDate(qRet);
      setTripType(FlightTripTypeEnum.RoundTrip);
    }
    if (qPax) {
      const count = parseInt(qPax, 10);
      if (!isNaN(count) && count >= 1 && count <= 9) {
        setPassengers(Array.from({ length: count }, () => makeDefaultPassenger()));
      }
    }
  }, [searchParams]);

  const handleDepartureAirportChange = (val: string) => {
    setDepartureAirport(val);
    setReturnArrivalAirport(val);
  };

  const handleArrivalAirportChange = (val: string) => {
    setArrivalAirport(val);
    setReturnDepartureAirport(val);
  };

  const handleSwapDirection = () => {
    if (bookingType === FlightBookingTypeEnum.EgyptToCountry) {
      setBookingType(FlightBookingTypeEnum.CountryToEgypt);
      setFromCountryId(toCountryId);
      setFromCustomCountry(toCustomCountry);
      setFromCityId(toCityId);
      setFromCustomCity(toCustomCity);
      setToCountryId(null);
      setToCustomCountry("");
      setToCityId(null);
      setToCustomCity("");
    } else if (bookingType === FlightBookingTypeEnum.CountryToEgypt) {
      setBookingType(FlightBookingTypeEnum.EgyptToCountry);
      setToCountryId(fromCountryId);
      setToCustomCountry(fromCustomCountry);
      setToCityId(fromCityId);
      setToCustomCity(fromCustomCity);
      setFromCountryId(null);
      setFromCustomCountry("");
      setFromCityId(null);
      setFromCustomCity("");
    }
    const prevDep = departureAirport;
    setDepartureAirport(arrivalAirport);
    setArrivalAirport(prevDep);
    setReturnDepartureAirport(prevDep);
    setReturnArrivalAirport(arrivalAirport);
  };

  const { data: countriesRes } = useCountriesQuery({ Language: backendLang, PageSize: 200 });
  const { data: fromCitiesRes } = useCitiesQuery(
    { CountryId: fromCountryId ?? undefined, Language: backendLang, PageSize: 200 },
    Boolean(fromCountryId)
  );
  const { data: toCitiesRes } = useCitiesQuery(
    { CountryId: toCountryId ?? undefined, Language: backendLang, PageSize: 200 },
    Boolean(toCountryId)
  );

  const createMutation = useCreateFlightBookingMutation();

  const handleClear = () => {
    setFromCountryId(null);
    setFromCustomCountry("");
    setFromCityId(null);
    setFromCustomCity("");
    setToCountryId(null);
    setToCustomCountry("");
    setToCityId(null);
    setToCustomCity("");
    setDepartureAirport("");
    setArrivalAirport("");
    setReturnDepartureAirport("");
    setReturnArrivalAirport("");
    setDepartureDate(getTomorrowIsoDate());
    setReturnDate("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
    setPassengers([makeDefaultPassenger()]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateFlightForm({
      bookingType,
      tripType,
      fromCountryId,
      fromCustomCountry,
      fromCityId,
      fromCustomCity,
      toCountryId,
      toCustomCountry,
      toCityId,
      toCustomCity,
      departureAirport,
      arrivalAirport,
      departureDate,
      returnDate,
      passengers,
      email,
      phone,
      agreeTerms,
      t,
    });

    if (validationError) {
      toast.error(validationError);
      return;
    }

    const payload = buildPublicFlightPayload({
      bookingType,
      tripType,
      fromCountryId,
      fromCityId,
      toCountryId,
      toCityId,
      departureAirport,
      arrivalAirport,
      departureDate,
      departureTime,
      returnDepartureAirport,
      returnArrivalAirport,
      returnDate,
      returnTime,
      passengers,
      fallbackFromCountryId: countriesRes?.data?.[0]?.id,
      fallbackFromCityId: fromCitiesRes?.data?.[0]?.id,
      fallbackToCountryId: countriesRes?.data?.[0]?.id,
      fallbackToCityId: toCitiesRes?.data?.[0]?.id,
    });

    try {
      const created = await createMutation.mutateAsync(payload);
      toast.success(t.successToast);
      router.push(
        buildFlightSuccessUrl({
          locale,
          bookingId: created?.id || "",
          fullName: passengers[0]?.fullName || "",
          from: departureAirport,
          to: arrivalAirport,
          date: departureDate,
          passengersCount: passengers.length,
          isRoundTrip: tripType === FlightTripTypeEnum.RoundTrip,
          returnDate,
          email,
          phone,
        })
      );
    } catch {
      toast.error(t.errorToast);
    }
  };

  return {
    bookingType,
    setBookingType,
    tripType,
    setTripType,
    fromCountryId,
    setFromCountryId,
    fromCustomCountry,
    setFromCustomCountry,
    fromCityId,
    setFromCityId,
    fromCustomCity,
    setFromCustomCity,
    toCountryId,
    setToCountryId,
    toCustomCountry,
    setToCustomCountry,
    toCityId,
    setToCityId,
    toCustomCity,
    setToCustomCity,
    departureAirport,
    handleDepartureAirportChange,
    arrivalAirport,
    handleArrivalAirportChange,
    departureDate,
    setDepartureDate,
    departureTime,
    setDepartureTime,
    returnDepartureAirport,
    setReturnDepartureAirport,
    returnArrivalAirport,
    setReturnArrivalAirport,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
    passengers,
    setPassengers,
    email,
    setEmail,
    phone,
    setPhone,
    specialRequests,
    setSpecialRequests,
    agreeTerms,
    setAgreeTerms,
    countries: countriesRes?.data || [],
    fromCities: fromCitiesRes?.data || [],
    toCities: toCitiesRes?.data || [],
    isSubmitting: createMutation.isPending,
    handleSwapDirection,
    handleClear,
    handleSubmit,
  };
}
