"use client";

import React from "react";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface FlightContactStepProps {
  email: string;
  onEmailChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  specialRequests: string;
  onSpecialRequestsChange: (val: string) => void;
  agreeTerms: boolean;
  onAgreeTermsChange: (val: boolean) => void;
  onClear: () => void;
  isSubmitting: boolean;
}

export default function FlightContactStep({
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  specialRequests,
  onSpecialRequestsChange,
  agreeTerms,
  onAgreeTermsChange,
  onClear,
  isSubmitting,
}: FlightContactStepProps) {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  return (
    <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-[#E5DDD0] space-y-5">
      {/* Step Header */}
      <div className="flex items-start gap-3.5">
        <span className="w-7 h-7 rounded-full bg-[#013E51] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          4
        </span>
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] leading-tight">
            {t.step4Title}
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/65 mt-0.5">
            {t.step4Subtitle}
          </p>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-1.5">
            {t.emailLabel} *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-1.5">
            {t.phoneLabel} *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder={t.phonePlaceholder}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
          />
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/70 mb-1.5">
          {t.specialRequestsLabel}
        </label>
        <textarea
          rows={3}
          value={specialRequests}
          onChange={(e) => onSpecialRequestsChange(e.target.value)}
          placeholder={t.specialRequestsPlaceholder}
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5DDD0] text-xs font-medium text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] resize-y"
        />
      </div>

      {/* Consent Checkbox */}
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={agreeTerms}
          onChange={(e) => onAgreeTermsChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded accent-[#013E51] cursor-pointer"
        />
        <span className="text-xs text-[#013E51]/80 leading-relaxed">
          {t.agreeTerms}
        </span>
      </label>

      {/* Bottom Action Bar */}
      <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClear}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-full border border-[#E5DDD0] bg-white text-xs font-bold text-[#013E51] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
        >
          {t.clearForm}
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#013E51] hover:bg-[#022c3a] text-white text-xs font-bold shadow-md transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
              <span>{t.submitting}</span>
            </>
          ) : (
            <>
              <span>{t.submitRequest}</span>
              <FiArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
