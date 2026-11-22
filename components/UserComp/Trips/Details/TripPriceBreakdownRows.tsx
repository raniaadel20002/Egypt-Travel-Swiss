"use client";

import React from "react";
import { FiTruck } from "react-icons/fi";
import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripPriceBreakdownRowsProps {
  isOnContact: boolean;
  noAdult: number;
  adultTotal: number;
  noChild: number;
  childTotal: number;
  noInf: number;
  infantTotal: number;
  isPrivate: boolean;
  transferPrice: number;
  vehicleName?: string;
  servicesTotal: number;
  discountAmount: number;
  dict: Dictionary["tripDetails"];
}

export default function TripPriceBreakdownRows({
  isOnContact,
  noAdult,
  adultTotal,
  noChild,
  childTotal,
  noInf,
  infantTotal,
  isPrivate,
  transferPrice,
  vehicleName,
  servicesTotal,
  discountAmount,
  dict,
}: TripPriceBreakdownRowsProps) {
  return (
    <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-slate-600">
      {isOnContact ? (
        <div className="flex justify-between font-semibold text-[#013E51]">
          <span>{dict.adultsLabel} ({noAdult}x)</span>
          <span>{dict.onContact || "On contact"}</span>
        </div>
      ) : (
        <div className="flex justify-between">
          <span>{dict.adultsLabel} ({noAdult}x)</span>
          <span className="font-semibold text-slate-900">{adultTotal} &euro;</span>
        </div>
      )}

      {!isOnContact && noChild > 0 && (
        <div className="flex justify-between">
          <span>{dict.childrenLabel} ({noChild}x)</span>
          <span className="font-semibold text-slate-900">{childTotal} &euro;</span>
        </div>
      )}

      {!isOnContact && noInf > 0 && (
        <div className="flex justify-between">
          <span>{dict.infantsLabel} ({noInf}x)</span>
          <span className="font-semibold text-slate-900">
            {infantTotal > 0 ? `${infantTotal} €` : dict.free}
          </span>
        </div>
      )}

      {isPrivate && transferPrice > 0 && (
        <div className="flex justify-between text-[#013E51] font-semibold">
          <span className="flex items-center gap-1">
            <FiTruck className="text-[#E8B34A]" />
            {dict.privateTransfer || "Private Transfer"}
            {vehicleName ? ` (${vehicleName})` : ""}
          </span>
          <span>+{transferPrice} &euro;</span>
        </div>
      )}

      {servicesTotal > 0 && (
        <div className="flex justify-between text-[#013E51] font-semibold">
          <span>{dict.selectedServices}</span>
          <span>+{servicesTotal} &euro;</span>
        </div>
      )}

      {discountAmount > 0 && (
        <div className="flex justify-between text-emerald-700 font-bold">
          <span>{dict.discount || "Discount"}</span>
          <span>-{discountAmount.toFixed(0)} &euro;</span>
        </div>
      )}
    </div>
  );
}
