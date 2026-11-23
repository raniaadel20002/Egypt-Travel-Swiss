"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiCompass, FiLoader } from "react-icons/fi";
import { getTomorrowIsoDate, formatPriceAmount } from "@/shared/utils/cartPricing";
import { useCourseBookingSubmit } from "@/features/divingCourses/useCourseBookingSubmit";
import CourseGuestDetailsFields from "./CourseGuestDetailsFields";

interface CourseBookingSidebarProps {
  courseId: string;
  courseName: string;
  courseImage?: string;
  unitPrice: number;
  currency: string;
  locale: string;
  t: Record<string, string>;
}

const FALLBACK_THUMB =
  "/home/DivingCourses/f9ac485c9b51592a41c4e5df356b680e572f38b4.jpg";

export default function CourseBookingSidebar({
  courseId,
  courseName,
  courseImage,
  unitPrice,
  currency,
  locale,
  t,
}: CourseBookingSidebarProps) {
  const { isSubmitting, submitCourseBooking } = useCourseBookingSubmit();
  const [date, setDate] = useState(getTomorrowIsoDate());
  const [participants, setParticipants] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [roomNo, setRoomNo] = useState("");

  const code = (currency || "EUR").toUpperCase();
  const symbol =
    code === "USD" ? "$" : code === "EUR" ? "€" : code === "GBP" ? "£" : "$";
  const totalPrice = unitPrice * participants;

  const formattedDate = new Date(date).toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitCourseBooking({
      courseId,
      courseName,
      date,
      participants,
      unitPrice,
      totalPrice,
      currency,
      fullName,
      email,
      phone,
      hotelName,
      roomNo,
      locale,
      errorMessage: t.errorMessage,
    });
  };

  return (
    <div
      id="booking-sidebar"
      className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-7 shadow-sm border border-[#E5DDD0] lg:sticky lg:top-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div>
          <span className="block text-[11px] font-bold tracking-[0.2em] text-[#E8B34A] uppercase mb-0.5">
            {t.instantEnrollment}
          </span>
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
            {t.courseBooking}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#013E51] text-white flex items-center justify-center shrink-0">
          <FiCompass className="w-5 h-5 text-[#E8B34A]" />
        </div>
      </div>

      {/* Mini Course Preview Box */}
      <div className="flex items-center gap-3 p-3 rounded-[16px] bg-[#FAF7F2] border border-[#013E51]/5 mb-4">
        <div className="relative w-11 h-11 rounded-[10px] overflow-hidden shrink-0 bg-[#012533]">
          <Image
            src={courseImage || FALLBACK_THUMB}
            alt={courseName}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-cormorant)] text-sm font-bold text-[#013E51] truncate">
            {courseName}
          </p>
          <p className="font-[family-name:var(--font-lato)] text-[11px] font-semibold text-[#013E51]/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B34A]" />
            {t.accredited}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Preferred Start Date */}
        <div>
          <div className="flex items-center justify-between mb-1 text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
            <span>{t.preferredStartDate}</span>
            <span className="text-[10px] text-[#013E51]/50 font-semibold tracking-widest">
              {t.daily}
            </span>
          </div>
          <input
            type="date"
            min={getTomorrowIsoDate()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] text-xs font-medium text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
            required
          />
          <p className="text-[11px] text-[#013E51]/60 mt-1 font-medium pl-1">
            {formattedDate}
          </p>
        </div>

        {/* Number of Divers Stepper */}
        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
                {t.numberOfDivers}
              </p>
              <p className="text-[11px] text-[#013E51]/60 font-medium">
                {symbol}
                {unitPrice} {t.perPerson}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setParticipants((p) => Math.max(1, p - 1))}
                className="w-7 h-7 rounded-full border border-slate-300 hover:border-[#013E51] flex items-center justify-center text-sm font-bold text-[#013E51] transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-bold text-[#013E51] min-w-4 text-center">
                {participants}
              </span>
              <button
                type="button"
                onClick={() => setParticipants((p) => Math.min(10, p + 1))}
                className="w-7 h-7 rounded-full border border-slate-300 hover:border-[#013E51] flex items-center justify-center text-sm font-bold text-[#013E51] transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Inline Guest Details Fields */}
        <CourseGuestDetailsFields
          fullName={fullName}
          onFullNameChange={setFullName}
          email={email}
          onEmailChange={setEmail}
          phone={phone}
          onPhoneChange={setPhone}
          hotelName={hotelName}
          onHotelNameChange={setHotelName}
          roomNo={roomNo}
          onRoomNoChange={setRoomNo}
          labels={t}
        />

        {/* Price Breakdown */}
        <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-[#013E51]/75">
            <span>
              {t.numberOfDivers} ({participants} × {symbol}
              {unitPrice})
            </span>
            <span className="font-semibold text-[#013E51]">
              {symbol}
              {totalPrice}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#013E51]/75">
            <span>{t.equipmentAndBoat}</span>
            <span className="font-semibold text-[#013E51]">{t.included}</span>
          </div>
        </div>

        {/* Total Highlight Box */}
        <div className="p-3.5 rounded-[14px] bg-[#FAF7F2] border border-[#013E51]/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
              {t.totalCourseFee}
            </span>
            <div className="text-right">
              <span className="font-[family-name:var(--font-cormorant)] text-xl font-extrabold text-[#013E51]">
                {symbol}
                {totalPrice}
              </span>
              <span className="text-[11px] text-[#013E51]/60 font-medium ml-1">
                {t.total}
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#013E51]/10 flex items-center justify-between text-xs">
            <span className="text-[#013E51] font-semibold">50% Deposit Due Online:</span>
            <span className="font-bold text-[#E8B34A]">{symbol}{formatPriceAmount(totalPrice * 0.5)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#013E51]/60">
            <span>50% Due on Arrival:</span>
            <span className="font-semibold text-[#013E51]">{symbol}{formatPriceAmount(totalPrice * 0.5)}</span>
          </div>
        </div>

        {/* Primary Booking Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-[#013E51] hover:bg-[#022c3a] text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
              <span>{t.submitting}</span>
            </>
          ) : (
            <>
              <span>Pay 50% Deposit ({symbol}{formatPriceAmount(totalPrice * 0.5)})</span>
              <FiArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer Guarantee */}
      <p className="text-[11px] text-center text-[#013E51]/60 leading-relaxed mt-3">
        {t.bookingFooterNotice}
      </p>
    </div>
  );
}
