"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { HotelRatePlanApiItem } from "@/models/hotel";
import { useLocale } from "@/shared/providers/LocaleProvider";

export interface SelectedRoomItem {
  id: string;
  ratePlanId: number;
  ratePlanName: string;
  adults: number;
  children: number;
  infants: number;
}

interface HotelRoomSelectionStepProps {
  availableRatePlans: HotelRatePlanApiItem[];
  selectedRooms: SelectedRoomItem[];
  onAddRoom: (ratePlan: HotelRatePlanApiItem) => void;
  onRemoveRoom: (roomId: string) => void;
  onUpdateOccupancy: (
    roomId: string,
    field: "adults" | "children" | "infants",
    delta: number
  ) => void;
  onUpdateRatePlan: (roomId: string, newPlanId: number) => void;
}

function getBoardCode(name: string): string {
  const upper = name.toUpperCase();
  if (upper.includes("ULTRA ALL") || upper.includes("UAI")) return "UAI";
  if (upper.includes("ALL INCLUSIVE") || upper.includes("AI")) return "AI";
  if (upper.includes("HALF BOARD") || upper.includes("HB")) return "HB";
  if (upper.includes("FULL BOARD") || upper.includes("FB")) return "FB";
  if (upper.includes("BREAKFAST") || upper.includes("BB")) return "BB";
  return "RO";
}

export default function HotelRoomSelectionStep({
  availableRatePlans,
  selectedRooms,
  onAddRoom,
  onRemoveRoom,
  onUpdateOccupancy,
  onUpdateRatePlan,
}: HotelRoomSelectionStepProps) {
  const { dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const b = dictionary.accommodation.detail.booking;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-6">
      {/* Step Header */}
      <div className="flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-full bg-[#013E51] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-xs">
          1
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {b.step1Heading}
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-0.5">
            {b.step1Subheading}
          </p>
        </div>
      </div>

      {/* Available Rate Plan Cards */}
      {availableRatePlans.length === 0 ? (
        <div className="p-6 rounded-2xl bg-[#F7EDE1]/50 border border-[#E8B34A]/30 text-center space-y-2">
          <p className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#013E51]">
            {b.plansInPrepTitle}
          </p>
          <p className="font-[family-name:var(--font-lato)] text-xs text-[#555555] max-w-md mx-auto leading-relaxed">
            {b.plansInPrepDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {availableRatePlans.map((plan) => {
            const boardCode = getBoardCode(plan.name);

            return (
              <div
                key={plan.id}
                className="p-5 rounded-2xl bg-[#F7EDE1]/30 border border-[#E8B34A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#E8B34A] transition-all"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#013E51] text-[#E8B34A] text-xs font-bold uppercase tracking-wider">
                      {boardCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white text-[#013E51] text-[11px] font-semibold border border-[#013E51]/15">
                      {b.roomBadge}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51]">
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#4b5563] leading-relaxed max-w-2xl">
                      {plan.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onAddRoom(plan)}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#013E51] text-white text-xs sm:text-sm font-semibold hover:bg-[#024f67] transition-colors shrink-0 cursor-pointer self-start sm:self-center shadow-xs"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  <span>{b.addRoom}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Rooms Section */}
      {selectedRooms.length > 0 && (
        <div className="pt-6 border-t border-[#888888]/15 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] flex items-center gap-2">
              <span className="text-[#E8B34A]">|||</span>
              <span>{b.selectedRoomsTitle}</span>
            </h3>
            <span className="px-3 py-1 rounded-full bg-[#F7EDE1] text-[#013E51] text-xs font-bold border border-[#E8B34A]/40">
              {selectedRooms.length} {selectedRooms.length === 1 ? b.roomSingle : b.roomPlural}
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {selectedRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
                  animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                  exit={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                  className="p-5 rounded-2xl bg-white border border-[#013E51]/15 shadow-xs space-y-4"
                >
                  {/* Room Header & Rate Plan Picker */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5 flex-1">
                      <span className="px-2.5 py-1 rounded-md bg-[#013E51] text-white text-xs font-bold uppercase tracking-wider shrink-0">
                        {b.roomPrefix}{index + 1}
                      </span>
                      <select
                        value={room.ratePlanId}
                        onChange={(e) => onUpdateRatePlan(room.id, Number(e.target.value))}
                        aria-label={`Select rate plan for ${b.roomPrefix}${index + 1}`}
                        className="w-full max-w-sm px-3 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold text-[#013E51] bg-slate-50 focus:outline-hidden focus:border-[#013E51]"
                      >
                        {availableRatePlans.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveRoom(room.id)}
                      aria-label={`Remove ${b.roomPrefix}${index + 1}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors self-end sm:self-center cursor-pointer"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>{b.remove}</span>
                    </button>
                  </div>

                  {/* 3 Steppers: Adults, Children, Infants */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Adult */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center space-y-1.5">
                      <span className="block text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                        {b.adult}
                      </span>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onUpdateOccupancy(room.id, "adults", -1)}
                          disabled={room.adults <= 1}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[#013E51] hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm text-[#013E51] w-4">
                          {room.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateOccupancy(room.id, "adults", 1)}
                          disabled={room.adults >= 6}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[#013E51] hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center space-y-1.5">
                      <span className="block text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                        {b.children}
                      </span>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onUpdateOccupancy(room.id, "children", -1)}
                          disabled={room.children <= 0}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[#013E51] hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm text-[#013E51] w-4">
                          {room.children}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateOccupancy(room.id, "children", 1)}
                          disabled={room.children >= 4}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[#013E51] hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center space-y-1.5">
                      <span className="block text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                        {b.infants}
                      </span>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onUpdateOccupancy(room.id, "infants", -1)}
                          disabled={room.infants <= 0}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[#013E51] hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm text-[#013E51] w-4">
                          {room.infants}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateOccupancy(room.id, "infants", 1)}
                          disabled={room.infants >= 3}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[#013E51] hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
