"use client";

import React from "react";
import { FiBriefcase, FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import {
  BaggageTypeEnum,
  CreateFlightPassengerBaggagePayload,
  CreateFlightPassengerPayload,
  PassengerTypeEnum,
} from "@/models/flightBooking";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface FlightPassengerCardProps {
  index: number;
  passenger: CreateFlightPassengerPayload;
  canRemove: boolean;
  onChange: (updated: CreateFlightPassengerPayload) => void;
  onRemove: () => void;
}

export default function FlightPassengerCard({
  index,
  passenger,
  canRemove,
  onChange,
  onRemove,
}: FlightPassengerCardProps) {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  const updateField = <K extends keyof CreateFlightPassengerPayload>(
    key: K,
    val: CreateFlightPassengerPayload[K]
  ) => {
    onChange({ ...passenger, [key]: val });
  };

  const handleAddBaggage = () => {
    const newBag: CreateFlightPassengerBaggagePayload = {
      baggageType: BaggageTypeEnum.CheckedBaggage,
      quantity: 1,
      weightPerItem: 23,
    };
    updateField("baggages", [...passenger.baggages, newBag]);
  };

  const handleUpdateBaggage = (
    bagIdx: number,
    patch: Partial<CreateFlightPassengerBaggagePayload>
  ) => {
    const next = passenger.baggages.map((b, i) =>
      i === bagIdx ? { ...b, ...patch } : b
    );
    updateField("baggages", next);
  };

  const handleRemoveBaggage = (bagIdx: number) => {
    const next = passenger.baggages.filter((_, i) => i !== bagIdx);
    updateField("baggages", next);
  };

  return (
    <div className="rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] p-4 sm:p-5 space-y-4">
      {/* Passenger Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-full bg-[#E8B34A] text-[#013E51] text-[10px] font-bold uppercase tracking-wider">
            {t.passengerBadge} #{index + 1}
          </span>
          {index === 0 && (
            <span className="text-xs font-medium text-[#013E51]/60">
              {t.leadTraveler}
            </span>
          )}
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove passenger"
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Identity Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-1">
            {t.fullNameLabel} *
          </label>
          <input
            type="text"
            required
            value={passenger.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder={t.fullNamePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-1">
            {t.passportLabel} *
          </label>
          <input
            type="text"
            required
            value={passenger.passportNumber}
            onChange={(e) => updateField("passportNumber", e.target.value)}
            placeholder={t.passportPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-1">
            {t.passengerTypeLabel} *
          </label>
          <select
            value={passenger.passengerType}
            onChange={(e) =>
              updateField(
                "passengerType",
                Number(e.target.value) as PassengerTypeEnum
              )
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] cursor-pointer"
          >
            <option value={PassengerTypeEnum.Adult}>{t.adult}</option>
            <option value={PassengerTypeEnum.Child}>{t.child}</option>
            <option value={PassengerTypeEnum.Infant}>{t.infant}</option>
          </select>
        </div>
      </div>

      {/* Baggage Items */}
      <div className="pt-2 border-t border-[#E5DDD0]/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#013E51]/70">
            <FiBriefcase className="w-3.5 h-3.5" />
            {t.baggageItems}
          </span>
          <button
            type="button"
            onClick={handleAddBaggage}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E5DDD0] text-[11px] font-bold text-[#013E51] hover:border-[#013E51] transition-colors cursor-pointer"
          >
            <FiPlus className="w-3 h-3" />
            <span>{t.addBaggage}</span>
          </button>
        </div>

        {passenger.baggages.map((bag, bagIdx) => (
          <div
            key={`bag-${bagIdx}`}
            className="grid grid-cols-12 gap-2.5 items-end bg-white p-3 rounded-xl border border-[#E5DDD0]"
          >
            <div className="col-span-12 sm:col-span-5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
                {t.luggageType}
              </label>
              <select
                value={bag.baggageType}
                onChange={(e) =>
                  handleUpdateBaggage(bagIdx, {
                    baggageType: Number(e.target.value) as BaggageTypeEnum,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-[#FAF7F2]/60 border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden cursor-pointer"
              >
                <option value={BaggageTypeEnum.CarryOn}>{t.carryOn}</option>
                <option value={BaggageTypeEnum.PersonalItem}>
                  {t.personalItem}
                </option>
                <option value={BaggageTypeEnum.CheckedBaggage}>
                  {t.checkedBaggage}
                </option>
                <option value={BaggageTypeEnum.SpecialBaggage}>
                  {t.specialBaggage}
                </option>
              </select>
            </div>

            <div className="col-span-5 sm:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
                {t.qty}
              </label>
              <div className="flex items-center justify-between px-2 py-1.5 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2]/60">
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateBaggage(bagIdx, {
                      quantity: Math.max(1, bag.quantity - 1),
                    })
                  }
                  className="p-0.5 text-[#013E51] hover:text-[#E8B34A] cursor-pointer"
                >
                  <FiMinus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-[#013E51]">
                  {bag.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateBaggage(bagIdx, {
                      quantity: Math.min(10, bag.quantity + 1),
                    })
                  }
                  className="p-0.5 text-[#013E51] hover:text-[#E8B34A] cursor-pointer"
                >
                  <FiPlus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="col-span-5 sm:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
                {t.weightKg}
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={bag.weightPerItem}
                onChange={(e) =>
                  handleUpdateBaggage(bagIdx, {
                    weightPerItem: Math.max(0, Number(e.target.value) || 0),
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2]/60 text-xs font-bold text-[#013E51] focus:outline-hidden"
              />
            </div>

            <div className="col-span-2 sm:col-span-1 flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveBaggage(bagIdx)}
                disabled={passenger.baggages.length <= 1}
                aria-label="Remove baggage"
                className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#013E51]/60 hover:text-red-500 hover:border-red-200 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
