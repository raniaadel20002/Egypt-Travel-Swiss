"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FiClock, FiCalendar, FiCompass, FiAward } from "react-icons/fi";
import { TripApiItem } from "@/models/trip";
import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripOverviewCardProps {
  trip: TripApiItem;
  dict: Dictionary["tripDetails"];
}

export default function TripOverviewCard({
  trip,
  dict,
}: TripOverviewCardProps) {
  const destination = trip.destination || trip.destinationInfo?.name || "Hurghada, Red Sea";
  const tripType = trip.tripTypeName || "Tour";

  // Duration label
  const durationUnit =
    trip.durationTypeName?.toLowerCase() === "days"
      ? dict.days
      : dict.hours;
  const durationText = `${trip.durationValue || 8} ${durationUnit}`;

  // Availability label
  const availabilityText =
    trip.availableDays && trip.availableDays.length === 7
      ? `${dict.daily} (Sun - Sat)`
      : trip.availableDays && trip.availableDays.length > 0
      ? trip.availableDays.slice(0, 3).join(", ")
      : `${dict.daily} (Sun - Sat)`;

  // Departure label
  const departureText = trip.timeFrom || "07:00 AM";

  // Experience label
  const isPrivate = trip.categoryName?.toLowerCase().includes("private");
  const experienceText = isPrivate ? dict.privateTrip : dict.guidedTour;

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8B34A]/30 shadow-xs space-y-6 font-[family-name:var(--font-lato)]">
      {/* Title & Category Line */}
      <div className="space-y-3">
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#013E51] leading-tight tracking-tight">
          {trip.name}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#013E51]/80 font-semibold">
            <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
            <span>{destination}</span>
          </div>

          <span className="px-3.5 py-1 rounded-full bg-gray-100 text-[#013E51] text-xs font-bold tracking-wider uppercase">
            {tripType}
          </span>
        </div>
      </div>

      {/* 4-Column Stat Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#F8FAFB] border border-[#013E51]/10 text-center">
        {/* Duration */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#E8B34A]">
            <FiClock className="w-4 h-4" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {dict.duration}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#013E51]">
            {durationText}
          </p>
        </div>

        {/* Availability */}
        <div className="space-y-1 border-l border-gray-200/80">
          <div className="flex items-center justify-center gap-1.5 text-[#E8B34A]">
            <FiCalendar className="w-4 h-4" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {dict.availability}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#013E51] truncate px-1">
            {availabilityText}
          </p>
        </div>

        {/* Departure */}
        <div className="space-y-1 md:border-l border-gray-200/80">
          <div className="flex items-center justify-center gap-1.5 text-[#E8B34A]">
            <FiCompass className="w-4 h-4" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {dict.departure}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#013E51]">
            {departureText}
          </p>
        </div>

        {/* Experience */}
        <div className="space-y-1 border-l border-gray-200/80">
          <div className="flex items-center justify-center gap-1.5 text-[#E8B34A]">
            <FiAward className="w-4 h-4" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {dict.experience}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#013E51]">
            {experienceText}
          </p>
        </div>
      </div>

      {/* About This Trip Narrative */}
      <div className="space-y-3 pt-2">
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {dict.aboutThisTrip}
        </h2>
        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-3">
          <p>{trip.description}</p>
        </div>
      </div>
    </div>
  );
}
