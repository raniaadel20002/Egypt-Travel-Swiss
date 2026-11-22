"use client";

import React from "react";
import { FiPlus, FiUser } from "react-icons/fi";
import {
  BaggageTypeEnum,
  CreateFlightPassengerPayload,
  PassengerTypeEnum,
} from "@/models/flightBooking";
import { useLocale } from "@/shared/providers/LocaleProvider";
import FlightPassengerCard from "./FlightPassengerCard";

interface FlightPassengersStepProps {
  passengers: CreateFlightPassengerPayload[];
  onChange: (passengers: CreateFlightPassengerPayload[]) => void;
}

export default function FlightPassengersStep({
  passengers,
  onChange,
}: FlightPassengersStepProps) {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  const handleAddPassenger = () => {
    const newPassenger: CreateFlightPassengerPayload = {
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
    onChange([...passengers, newPassenger]);
  };

  const handleUpdatePassenger = (
    idx: number,
    updated: CreateFlightPassengerPayload
  ) => {
    onChange(passengers.map((p, i) => (i === idx ? updated : p)));
  };

  const handleRemovePassenger = (idx: number) => {
    if (passengers.length <= 1) return;
    onChange(passengers.filter((_, i) => i !== idx));
  };

  return (
    <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-[#E5DDD0] space-y-5">
      {/* Step Header */}
      <div className="flex items-start gap-3.5">
        <span className="w-7 h-7 rounded-full bg-[#013E51] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          3
        </span>
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] leading-tight">
            {t.step3Title}
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/65 mt-0.5">
            {t.step3Subtitle}
          </p>
        </div>
      </div>

      {/* Passenger Counter + Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-bold text-[#013E51]">
          <FiUser className="w-3.5 h-3.5" />
          <span>
            {passengers.length}{" "}
            {passengers.length === 1
              ? t.passengerCountSingular
              : t.passengerCountPlural}
          </span>
        </span>

        <button
          type="button"
          onClick={handleAddPassenger}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#013E51] hover:bg-[#022c3a] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>{t.addPassenger}</span>
        </button>
      </div>

      {/* Passenger Cards */}
      <div className="space-y-4">
        {passengers.map((pax, idx) => (
          <FlightPassengerCard
            key={`pax-${idx}`}
            index={idx}
            passenger={pax}
            canRemove={passengers.length > 1}
            onChange={(updated) => handleUpdatePassenger(idx, updated)}
            onRemove={() => handleRemovePassenger(idx)}
          />
        ))}
      </div>
    </section>
  );
}
