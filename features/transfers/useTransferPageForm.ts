"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useTransferLocationsQuery } from "@/features/transfers/useTransferLocations";
import { useVehicleTypeTransfersQuery } from "@/features/transfers/useTransferVehicles";
import { useCountryTransfersQuery } from "@/features/transfers/useCountryTransfers";
import {
  useTransferPreviewQuery,
  useCreateTransferBookingMutation,
} from "@/features/transfers/useTransferBookings";
import {
  TransferTripTypeEnum,
  TransferCommunicationMethodEnum,
  TransferPreviewPayload,
} from "@/models/transferBooking";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export function useTransferPageForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();

  const { data: fromLocationsRes } = useTransferLocationsQuery("from", { language: locale });
  const { data: toLocationsRes } = useTransferLocationsQuery("to", { language: locale });
  const { data: countries = [] } = useCountryTransfersQuery({ language: locale });
  const { data: vehiclesRes } = useVehicleTypeTransfersQuery({ language: locale });
  const createBookingMutation = useCreateTransferBookingMutation();

  const fromLocations = useMemo(() => fromLocationsRes?.data || [], [fromLocationsRes]);
  const toLocations = useMemo(() => toLocationsRes?.data || [], [toLocationsRes]);
  const vehicles = useMemo(() => vehiclesRes?.data || [], [vehiclesRes]);

  const [selectedFromId, setSelectedFromId] = useState<string>("");
  const [selectedToId, setSelectedToId] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

  const [tripDate, setTripDate] = useState<string>(getTomorrowDateString());
  const [tripTime, setTripTime] = useState<string>("10:00");
  const [returnDate, setReturnDate] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("10:00");
  const [additionalHours, setAdditionalHours] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [countryTransferId, setCountryTransferId] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [communicationMethod, setCommunicationMethod] = useState<TransferCommunicationMethodEnum>(
    TransferCommunicationMethodEnum.WhatsApp
  );
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const qFrom = searchParams.get("fromId");
    const qTo = searchParams.get("toId");
    const qDate = searchParams.get("date");
    const qAdults = searchParams.get("adults");

    if (qFrom) setSelectedFromId(qFrom);
    else if (!selectedFromId && fromLocations.length > 0) setSelectedFromId(fromLocations[0].id);

    if (qTo) setSelectedToId(qTo);
    else if (!selectedToId && toLocations.length > 0) {
      const defaultTo = toLocations.find((l) => l.id !== fromLocations[0]?.id) || toLocations[0];
      setSelectedToId(defaultTo.id);
    }

    if (qDate) setTripDate(qDate);
    if (qAdults) {
      const parsed = parseInt(qAdults, 10);
      if (!isNaN(parsed) && parsed >= 1) setAdults(parsed);
    }
  }, [searchParams, fromLocations, toLocations, selectedFromId, selectedToId]);

  useEffect(() => {
    if (countryTransferId === 0 && countries.length > 0) {
      const first = countries[0];
      setCountryTransferId(first.id);
      if (first.code && !phone) {
        setPhone(`${first.code} `);
      }
    }
  }, [countries, countryTransferId, phone]);

  const handleCountryChange = (newCountryId: number) => {
    setCountryTransferId(newCountryId);
    const country = countries.find((c) => c.id === newCountryId);
    if (country?.code) {
      const nationalDigits = phone.replace(/^\+\d+[\s-]*/, "").trim();
      setPhone(nationalDigits ? `${country.code} ${nationalDigits}` : `${country.code} `);
    }
  };

  const previewPayload: TransferPreviewPayload | null = useMemo(() => {
    if (!selectedFromId || !selectedToId) return null;
    return {
      fromLocationId: selectedFromId,
      toLocationId: selectedToId,
      adults: Math.max(1, adults),
      children: Math.max(0, childrenCount),
      tripType: isRoundTrip ? TransferTripTypeEnum.RoundTrip : TransferTripTypeEnum.OneWay,
      additionalHours: isRoundTrip ? additionalHours : 0,
    };
  }, [selectedFromId, selectedToId, adults, childrenCount, isRoundTrip, additionalHours]);

  const { data: previewData } = useTransferPreviewQuery(previewPayload, locale);

  useEffect(() => {
    if (previewData?.vehicleTypeTransferId) {
      setSelectedVehicleId(previewData.vehicleTypeTransferId);
    } else if (!selectedVehicleId && vehicles.length > 0) {
      setSelectedVehicleId(vehicles[0].id);
    }
  }, [previewData, vehicles, selectedVehicleId]);

  const selectedFromName = useMemo(
    () => fromLocations.find((l) => l.id === selectedFromId)?.name || "",
    [fromLocations, selectedFromId]
  );

  const selectedToName = useMemo(
    () => toLocations.find((l) => l.id === selectedToId)?.name || "",
    [toLocations, selectedToId]
  );

  const selectedVehicleName = useMemo(() => {
    if (previewData?.vehicleName) return previewData.vehicleName;
    return vehicles.find((v) => v.id === selectedVehicleId)?.name || "";
  }, [previewData, vehicles, selectedVehicleId]);

  const handleSwap = () => {
    const matchToInFrom = fromLocations.find((f) => f.name === selectedToName);
    const matchFromInTo = toLocations.find((t) => t.name === selectedFromName);
    if (matchToInFrom && matchFromInTo) {
      setSelectedFromId(matchToInFrom.id);
      setSelectedToId(matchFromInTo.id);
      toast.info("Locations swapped");
    } else {
      toast.info("Opposite route not directly configured in system");
    }
  };

  const handleTripTypeChange = (roundTrip: boolean) => {
    setIsRoundTrip(roundTrip);
    if (!roundTrip) {
      setAdditionalHours(0);
    }
  };

  const handleReset = () => {
    if (fromLocations[0]) setSelectedFromId(fromLocations[0].id);
    if (toLocations[0]) setSelectedToId(toLocations[0].id);
    setAdults(2);
    setChildrenCount(0);
    setIsRoundTrip(false);
    setAdditionalHours(0);
    setTripDate(getTomorrowDateString());
    setTripTime("10:00");
    setReturnDate("");
    setReturnTime("10:00");
    toast.info("Form reset to defaults");
  };

  const handleSubmit = async () => {
    if (!name.trim()) return toast.error("Please enter your full name.");
    if (!email.trim() || !email.includes("@")) return toast.error("Please enter a valid email address.");
    const selectedCountry =
      countries.find((c) => c.id === countryTransferId) || countries[0];
    const prefix = selectedCountry?.code || "+20";
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = `${prefix} ${formattedPhone}`.trim();
    }
    const digitsOnly = formattedPhone.replace(/\D/g, "");
    if (digitsOnly.length < 6) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!tripDate) return toast.error("Please select your trip departure date.");
    if (isRoundTrip && !returnDate) return toast.error("Please select your return trip date.");
    if (!selectedFromId || !selectedToId) return toast.error("Please select pickup and destination.");

    const isoTripDate = new Date(`${tripDate}T${tripTime || "10:00"}:00`).toISOString();

    try {
      const res = await createBookingMutation.mutateAsync({
        fromLocationId: selectedFromId,
        toLocationId: selectedToId,
        adults: Math.max(1, adults),
        children: Math.max(0, childrenCount),
        tripType: isRoundTrip ? TransferTripTypeEnum.RoundTrip : TransferTripTypeEnum.OneWay,
        tripDate: isoTripDate,
        tripTime: tripTime || "10:00",
        customerName: name.trim(),
        countryTransferId: countryTransferId || countries[0]?.id || 1,
        email: email.trim(),
        communicationMethod,
        phoneNumber: formattedPhone.replace(/\s+/g, ""),
        luggageCount: 0,
        notes: notes.trim() || undefined,
      });

      toast.success("Transfer booking confirmed! Redirecting to voucher...");
      const finalPrice = res?.pricing?.finalPriceConverted ?? res?.pricing?.finalPriceUsd ?? previewData?.pricing?.finalPrice ?? 0;
      const params = new URLSearchParams({
        type: "transfer",
        id: String(res?.id || ""),
        from: res?.fromLocationName || selectedFromName,
        to: res?.toLocationName || selectedToName,
        date: res?.tripDate ? res.tripDate.split("T")[0] : tripDate,
        time: res?.tripTime || tripTime,
        vehicle: res?.vehicleName || selectedVehicleName || "Private Luxury Vehicle",
        adults: String(res?.adults ?? adults),
        children: String(res?.children ?? childrenCount),
        passengers: String(res?.totalPersons ?? (adults + childrenCount)),
        price: String(finalPrice),
        currency: res?.pricing?.currency || "EUR",
        status: String(res?.status || "Pending"),
        tripType: String(res?.tripType || (isRoundTrip ? "RoundTrip" : "OneWay")),
        name: res?.customerName || name.trim(),
        phone: res?.phoneNumber || formattedPhone.replace(/\s+/g, ""),
        email: res?.email || email.trim(),
      });
      const noteVal = res?.notes?.trim() || notes.trim();
      if (noteVal) params.set("notes", noteVal);
      if (isRoundTrip && returnDate) {
        params.set("returnDate", returnDate);
        params.set("returnTime", returnTime);
      }
      router.push(`/${locale}/booking-success?${params.toString()}`);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to submit transfer reservation."));
    }
  };

  return {
    fromLocations,
    toLocations,
    vehicles,
    countries,
    previewData,
    isSubmitting: createBookingMutation.isPending,
    selectedFromId,
    selectedToId,
    selectedFromName,
    selectedToName,
    selectedVehicleId,
    selectedVehicleName,
    adults,
    childrenCount,
    isRoundTrip,
    tripDate,
    tripTime,
    returnDate,
    returnTime,
    additionalHours,
    name,
    countryTransferId,
    email,
    communicationMethod,
    phone,
    notes,
    setSelectedFromId,
    setSelectedToId,
    setSelectedVehicleId,
    setAdults,
    setChildrenCount,
    setIsRoundTrip: handleTripTypeChange,
    setTripDate,
    setTripTime,
    setReturnDate,
    setReturnTime,
    setAdditionalHours,
    setName,
    setCountryTransferId: handleCountryChange,
    setEmail,
    setCommunicationMethod,
    setPhone,
    setNotes,
    handleSwap,
    handleReset,
    handleSubmit,
  };
}
