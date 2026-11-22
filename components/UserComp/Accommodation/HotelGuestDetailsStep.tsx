"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiCalendar, FiClock, FiMinus, FiPlus, FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

export interface GuestDetailsState {
  checkInDate: string;
  nightsCount: number;
  fullName: string;
  email: string;
  whatsApp: string;
  nationality: string;
}

interface HotelGuestDetailsStepProps {
  details: GuestDetailsState;
  isSubmitting: boolean;
  canSubmit: boolean;
  onChangeField: <K extends keyof GuestDetailsState>(
    field: K,
    value: GuestDetailsState[K]
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function HotelGuestDetailsStep({
  details,
  isSubmitting,
  canSubmit,
  onChangeField,
  onSubmit,
}: HotelGuestDetailsStepProps) {
  const { dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const b = dictionary.accommodation.detail.booking;
  const minCheckInDate = getTomorrowDateString();

  const handleNightsChange = (delta: number) => {
    const next = Math.max(1, Math.min(30, details.nightsCount + delta));
    onChangeField("nightsCount", next);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-6">
      {/* Step Header */}
      <div className="flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-full bg-[#013E51] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-xs">
          2
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {b.step2Heading}
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-0.5">
            {b.step2Subheading}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Stay Dates Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          {/* Check-in Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#E8B34A]" />
              {b.checkInDate} *
            </label>
            <input
              type="date"
              required
              min={minCheckInDate}
              value={details.checkInDate}
              onChange={(e) => onChangeField("checkInDate", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-[#013E51] bg-white focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          {/* Duration of Stay Stepper */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5 text-[#E8B34A]" />
              {b.duration}
            </label>
            <div className="flex items-center justify-between px-4 py-2 rounded-xl border border-slate-300 bg-white">
              <button
                type="button"
                onClick={() => handleNightsChange(-1)}
                disabled={details.nightsCount <= 1}
                aria-label="Decrease nights"
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#013E51] disabled:opacity-40 transition-colors cursor-pointer"
              >
                <FiMinus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-[#013E51]">
                {details.nightsCount} {details.nightsCount === 1 ? b.nightSingle : b.nightPlural}
              </span>
              <button
                type="button"
                onClick={() => handleNightsChange(1)}
                disabled={details.nightsCount >= 30}
                aria-label="Increase nights"
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#013E51] disabled:opacity-40 transition-colors cursor-pointer"
              >
                <FiPlus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Primary Guest Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider mb-1">
              {b.fullName} *
            </label>
            <input
              type="text"
              required
              value={details.fullName}
              onChange={(e) => onChangeField("fullName", e.target.value)}
              placeholder={b.fullNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider mb-1">
              {b.email} *
            </label>
            <input
              type="email"
              required
              value={details.email}
              onChange={(e) => onChangeField("email", e.target.value)}
              placeholder="sophie.laurent@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider mb-1">
              {b.whatsApp} *
            </label>
            <input
              type="tel"
              required
              value={details.whatsApp}
              onChange={(e) => onChangeField("whatsApp", e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider mb-1">
              {b.nationality} *
            </label>
            <input
              type="text"
              required
              value={details.nationality}
              onChange={(e) => onChangeField("nationality", e.target.value)}
              placeholder={b.nationalityPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
        </div>

        <p className="text-[11px] text-[#888888]">
          {b.phoneHelp}
        </p>

        {/* CTA Button */}
        <motion.button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          whileHover={shouldReduce ? undefined : { scale: 1.01 }}
          whileTap={shouldReduce ? undefined : { scale: 0.99 }}
          className="w-full bg-[#013E51] hover:bg-[#024f67] text-white font-[family-name:var(--font-lato)] font-bold text-sm uppercase tracking-wider py-4 rounded-2xl transition-all duration-200 text-center cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? (
            <span>{b.submitting}</span>
          ) : (
            <>
              <span>{b.confirmCta}</span>
              <FiArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
