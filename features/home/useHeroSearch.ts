"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { useDestinationsQuery } from "@/features/destinations/useDestinations";
import { useTripTypesQuery } from "@/features/tripTypes/useTripTypes";
import { useTransferLocationsQuery } from "@/features/transfers/useTransferLocations";
import { getTomorrowIsoDate } from "@/shared/utils/cartPricing";

export type HeroSearchTab = "activities" | "accommodation" | "flights" | "transfer";

export function useHeroSearch() {
  const router = useRouter();
  const { locale, dictionary } = useLocale();
  const t = dictionary.homePage.heroSearch;
  const backendLang = localeToBackendLanguage(locale);

  const [activeTab, setActiveTab] = useState<HeroSearchTab>("activities");

  // Activities & Tours Tab State
  const [activityDestId, setActivityDestId] = useState<number | undefined>(undefined);
  const [activityTypeId, setActivityTypeId] = useState<number | undefined>(undefined);
  const [activityCat, setActivityCat] = useState<number | undefined>(undefined);
  const [activityKeyword, setActivityKeyword] = useState("");

  // Accommodation Tab State
  const [hotelQuery, setHotelQuery] = useState("");
  const [hotelRate, setHotelRate] = useState<number | undefined>(undefined);
  const [hotelCheckIn, setHotelCheckIn] = useState(getTomorrowIsoDate());
  const [hotelGuests, setHotelGuests] = useState("1");

  // Flights Tab State
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [flightDepDate, setFlightDepDate] = useState(getTomorrowIsoDate());
  const [flightPax, setFlightPax] = useState("1");

  // Transfer Tab State
  const [transferFromId, setTransferFromId] = useState("");
  const [transferToId, setTransferToId] = useState("");
  const [transferDate, setTransferDate] = useState(getTomorrowIsoDate());
  const [transferAdults, setTransferAdults] = useState("1");

  // Remote Queries
  const { data: destinations = [] } = useDestinationsQuery({
    language: backendLang,
    PageSize: 100,
  });
  const { data: tripTypes = [] } = useTripTypesQuery({
    language: backendLang,
    PageSize: 100,
  });
  const { data: fromLocationsRes } = useTransferLocationsQuery("from", {
    language: locale,
  });
  const { data: toLocationsRes } = useTransferLocationsQuery("to", {
    language: locale,
  });

  const fromLocations = fromLocationsRes?.data || [];
  const toLocations = toLocationsRes?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "activities") {
      const p = new URLSearchParams();
      if (activityDestId !== undefined) p.set("dest", String(activityDestId));
      if (activityTypeId !== undefined) p.set("type", String(activityTypeId));
      if (activityCat !== undefined) p.set("cat", String(activityCat));
      if (activityKeyword.trim()) p.set("q", activityKeyword.trim());
      router.push(`/${locale}/trips${p.toString() ? `?${p.toString()}` : ""}`);
      return;
    }

    if (activeTab === "accommodation") {
      const p = new URLSearchParams();
      if (hotelQuery.trim()) p.set("q", hotelQuery.trim());
      if (hotelRate !== undefined) p.set("rate", String(hotelRate));
      if (hotelCheckIn) p.set("checkIn", hotelCheckIn);
      if (hotelGuests) p.set("guests", hotelGuests);
      router.push(
        `/${locale}/accommodation${p.toString() ? `?${p.toString()}` : ""}`
      );
      return;
    }

    if (activeTab === "flights") {
      const p = new URLSearchParams();
      if (flightFrom.trim()) p.set("from", flightFrom.trim());
      if (flightTo.trim()) p.set("to", flightTo.trim());
      if (flightDepDate) p.set("dep", flightDepDate);
      if (flightPax) p.set("pax", flightPax);
      router.push(`/${locale}/flights${p.toString() ? `?${p.toString()}` : ""}`);
      return;
    }

    if (activeTab === "transfer") {
      const p = new URLSearchParams();
      const resolvedFrom = transferFromId || fromLocations[0]?.id;
      const resolvedTo = transferToId || toLocations[0]?.id;
      if (resolvedFrom) p.set("fromId", resolvedFrom);
      if (resolvedTo) p.set("toId", resolvedTo);
      if (transferDate) p.set("date", transferDate);
      if (transferAdults) p.set("adults", transferAdults);
      router.push(
        `/${locale}/transfers${p.toString() ? `?${p.toString()}` : ""}`
      );
    }
  };

  return {
    activeTab,
    setActiveTab,
    t,
    destinations,
    tripTypes,
    fromLocations,
    toLocations,
    // Activities Tab
    activityDestId,
    setActivityDestId,
    activityTypeId,
    setActivityTypeId,
    activityCat,
    setActivityCat,
    activityKeyword,
    setActivityKeyword,
    // Accommodation Tab
    hotelQuery,
    setHotelQuery,
    hotelRate,
    setHotelRate,
    hotelCheckIn,
    setHotelCheckIn,
    hotelGuests,
    setHotelGuests,
    // Flights Tab
    flightFrom,
    setFlightFrom,
    flightTo,
    setFlightTo,
    flightDepDate,
    setFlightDepDate,
    flightPax,
    setFlightPax,
    // Transfer Tab
    transferFromId,
    setTransferFromId,
    transferToId,
    setTransferToId,
    transferDate,
    setTransferDate,
    transferAdults,
    setTransferAdults,
    // Action
    handleSearch,
  };
}
