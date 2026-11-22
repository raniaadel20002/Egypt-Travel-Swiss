"use client";

import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripGuestStepperProps {
  noAdult: number;
  onAdultChange: (count: number) => void;
  adultPrice: number;
  noChild: number;
  onChildChange: (count: number) => void;
  childPrice: number;
  noInf: number;
  onInfChange: (count: number) => void;
  infantPrice: number;
  dict: Dictionary["tripDetails"];
}

export const TripGuestStepper: React.FC<TripGuestStepperProps> = ({
  noAdult,
  onAdultChange,
  adultPrice,
  noChild,
  onChildChange,
  childPrice,
  noInf,
  onInfChange,
  infantPrice,
  dict,
}) => {
  return (
    <div className="space-y-3 font-[family-name:var(--font-lato)]">
      <div className="text-xs font-bold text-[#013E51] uppercase tracking-wider">
        {dict.guests}
      </div>

      {/* Adults */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/25">
        <div>
          <div className="text-sm font-bold text-[#013E51]">
            {dict.adultsLabel}
          </div>
          <div className="text-xs text-slate-500">
            {adultPrice > 0 ? `${adultPrice} € ${dict.person}` : (dict.onContact || "On contact")}
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onAdultChange(Math.max(1, noAdult - 1))}
            disabled={noAdult <= 1}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            <FiMinus className="text-xs" />
          </button>
          <span className="w-6 text-center font-bold text-sm text-[#013E51]">
            {noAdult}
          </span>
          <button
            type="button"
            onClick={() => onAdultChange(noAdult + 1)}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <FiPlus className="text-xs" />
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/25">
        <div>
          <div className="text-sm font-bold text-[#013E51]">
            {dict.childrenLabel}
          </div>
          <div className="text-xs text-slate-500">
            {childPrice > 0 ? `${childPrice} € ${dict.person}` : adultPrice > 0 ? dict.free : (dict.onContact || "On contact")}
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onChildChange(Math.max(0, noChild - 1))}
            disabled={noChild <= 0}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            <FiMinus className="text-xs" />
          </button>
          <span className="w-6 text-center font-bold text-sm text-[#013E51]">
            {noChild}
          </span>
          <button
            type="button"
            onClick={() => onChildChange(noChild + 1)}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <FiPlus className="text-xs" />
          </button>
        </div>
      </div>

      {/* Infants */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/25">
        <div>
          <div className="text-sm font-bold text-[#013E51]">
            {dict.infantsLabel}
          </div>
          <div className="text-xs text-slate-500">
            {infantPrice > 0 ? `${infantPrice} € ${dict.person}` : dict.free}
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onInfChange(Math.max(0, noInf - 1))}
            disabled={noInf <= 0}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            <FiMinus className="text-xs" />
          </button>
          <span className="w-6 text-center font-bold text-sm text-[#013E51]">
            {noInf}
          </span>
          <button
            type="button"
            onClick={() => onInfChange(noInf + 1)}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <FiPlus className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripGuestStepper;
