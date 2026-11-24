"use client";

import { useEffect, useState } from "react";
import { DestinationApiItem } from "@/models/destination";
import { TripTypeItem } from "@/models/tripType";
import {
  CreateTripPayload,
  DurationTypeEnum,
  TripApiItem,
  TripCategoryEnum,
  TripMultiLangDetails,
  TripTranslationInput,
  TRIP_DAYS_OF_WEEK,
} from "@/models/trip";

const emptyTranslation = (): TripTranslationInput => ({
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
});

export function normalizeTranslation(
  trans: TripTranslationInput
): TripTranslationInput {
  const en = trans.en.trim();
  return {
    en,
    fr: trans.fr?.trim() || en,
    ru: trans.ru?.trim() || en,
    ro: trans.ro?.trim() || en,
    it: trans.it?.trim() || en,
  };
}

interface UseTripFormStateProps {
  isOpen: boolean;
  isEdit: boolean;
  item: TripApiItem | null;
  detailsData?: TripMultiLangDetails;
  destinations: DestinationApiItem[];
  tripTypes: TripTypeItem[];
}

export function useTripFormState({
  isOpen,
  isEdit,
  item,
  detailsData,
  destinations,
  tripTypes,
}: UseTripFormStateProps) {
  const [destinationId, setDestinationId] = useState<number>(0);
  const [tripTypeId, setTripTypeId] = useState<number>(0);
  const [category, setCategory] = useState<TripCategoryEnum>(
    TripCategoryEnum.Normal
  );
  const [timeFrom, setTimeFrom] = useState<string>("");
  const [durationValue, setDurationValue] = useState<number>(0);
  const [durationType, setDurationType] = useState<DurationTypeEnum>(
    DurationTypeEnum.Hours
  );
  const [adultPrice, setAdultPrice] = useState<number>(0);
  const [childPrice, setChildPrice] = useState<number>(0);
  const [infPrice, setInfPrice] = useState<number>(0);
  const [availabilityDayNo, setAvailabilityDayNo] = useState<number[]>([]);

  const [name, setName] = useState<TripTranslationInput>(emptyTranslation);
  const [description, setDescription] = useState<TripTranslationInput>(
    emptyTranslation
  );
  const [highlights, setHighlights] = useState<TripTranslationInput[]>([]);
  const [includes, setIncludes] = useState<TripTranslationInput[]>([]);
  const [excludes, setExcludes] = useState<TripTranslationInput[]>([]);
  const [whatToBring, setWhatToBring] = useState<TripTranslationInput[]>([]);
  const [initialFiles, setInitialFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && detailsData) {
      setDestinationId(detailsData.destinationId || 0);

      let matchedTypeId = detailsData.tripTypeId;
      if (!matchedTypeId && item?.tripTypeName) {
        const found = tripTypes.find(
          (t) =>
            t.name.trim().toLowerCase() === item.tripTypeName.trim().toLowerCase()
        );
        if (found) matchedTypeId = found.id;
      }
      setTripTypeId(matchedTypeId || tripTypes[0]?.id || 0);
      setCategory(detailsData.category);
      setTimeFrom(detailsData.timeFrom || "08:00");
      setDurationValue(detailsData.durationValue || 8);
      setDurationType(detailsData.durationType);
      setAdultPrice(detailsData.adultPrice || 0);
      setChildPrice(detailsData.childPrice || 0);
      setInfPrice(detailsData.infPrice || 0);
      setAvailabilityDayNo(
        detailsData.availabilityDayNo || [0, 1, 2, 3, 4, 5, 6]
      );
      setName(detailsData.name || emptyTranslation());
      setDescription(detailsData.description || emptyTranslation());
      setHighlights(detailsData.highlights || []);
      setIncludes(detailsData.includes || []);
      setExcludes(detailsData.excludes || []);
      setWhatToBring(detailsData.whatToBring || []);
      setInitialFiles([]);
    } else if (!isEdit) {
      setDestinationId(0);
      setTripTypeId(0);
      setCategory(TripCategoryEnum.Normal);
      setTimeFrom("");
      setDurationValue(0);
      setDurationType(DurationTypeEnum.Hours);
      setAdultPrice(0);
      setChildPrice(0);
      setInfPrice(0);
      setAvailabilityDayNo([]);
      setName(emptyTranslation());
      setDescription(emptyTranslation());
      setHighlights([]);
      setIncludes([]);
      setExcludes([]);
      setWhatToBring([]);
      setInitialFiles([]);
    }
  }, [isOpen, isEdit, detailsData, item, destinations, tripTypes]);

  const handleCategoryChange = (newCategory: TripCategoryEnum) => {
    setCategory(newCategory);
    if (newCategory === TripCategoryEnum.Private) {
      setAdultPrice(0);
      setChildPrice(0);
      setInfPrice(0);
    }
  };

  const handleDayToggle = (dayNo: number) => {
    setAvailabilityDayNo((prev) =>
      prev.includes(dayNo) ? prev.filter((d) => d !== dayNo) : [...prev, dayNo]
    );
  };

  const handleSelectAllDays = (selectAll: boolean) => {
    setAvailabilityDayNo(
      selectAll ? TRIP_DAYS_OF_WEEK.map((d) => d.dayNo) : []
    );
  };

  const buildPayload = (): CreateTripPayload => {
    const isPrivate = category === TripCategoryEnum.Private;
    return {
      destinationId,
      tripTypeId,
      category,
      timeFrom,
      durationValue: Number(durationValue) || 1,
      durationType,
      adultPrice: isPrivate ? 0 : Number(adultPrice) || 0,
      childPrice: isPrivate ? 0 : Number(childPrice) || 0,
      infPrice: isPrivate ? 0 : Number(infPrice) || 0,
      availabilityDayNo:
        availabilityDayNo.length > 0 ? availabilityDayNo : [0, 1, 2, 3, 4, 5, 6],
      name: normalizeTranslation(name),
      description: normalizeTranslation(description),
      highlights: highlights.filter((h) => h.en.trim()).map(normalizeTranslation),
      includes: includes.filter((i) => i.en.trim()).map(normalizeTranslation),
      excludes: excludes.filter((e) => e.en.trim()).map(normalizeTranslation),
      whatToBring: whatToBring
        .filter((w) => w.en.trim())
        .map(normalizeTranslation),
    };
  };

  return {
    destinationId,
    setDestinationId,
    tripTypeId,
    setTripTypeId,
    category,
    setCategory: handleCategoryChange,
    timeFrom,
    setTimeFrom,
    durationValue,
    setDurationValue,
    durationType,
    setDurationType,
    adultPrice,
    setAdultPrice,
    childPrice,
    setChildPrice,
    infPrice,
    setInfPrice,
    availabilityDayNo,
    handleDayToggle,
    handleSelectAllDays,
    name,
    setName,
    description,
    setDescription,
    highlights,
    setHighlights,
    includes,
    setIncludes,
    excludes,
    setExcludes,
    whatToBring,
    setWhatToBring,
    initialFiles,
    setInitialFiles,
    buildPayload,
  };
}
