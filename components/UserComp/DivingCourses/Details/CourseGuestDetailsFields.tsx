"use client";

import React from "react";
import { FiUser, FiMail, FiPhone, FiHome } from "react-icons/fi";

interface CourseGuestDetailsFieldsProps {
  fullName: string;
  onFullNameChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  hotelName: string;
  onHotelNameChange: (val: string) => void;
  roomNo: string;
  onRoomNoChange: (val: string) => void;
  labels: Record<string, string>;
}

export default function CourseGuestDetailsFields({
  fullName,
  onFullNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  hotelName,
  onHotelNameChange,
  roomNo,
  onRoomNoChange,
  labels,
}: CourseGuestDetailsFieldsProps) {
  return (
    <div className="border-t border-slate-100 pt-4 space-y-3">
      <span className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
        Lead Diver Information
      </span>

      {/* Full Name */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#013E51]/40">
          <FiUser className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder={`${labels.fullName} *`}
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          required
          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] text-xs font-medium text-[#013E51] placeholder:text-[#013E51]/40 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#013E51]/40">
          <FiMail className="w-4 h-4" />
        </div>
        <input
          type="email"
          placeholder={`${labels.email} *`}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] text-xs font-medium text-[#013E51] placeholder:text-[#013E51]/40 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#013E51]/40">
          <FiPhone className="w-4 h-4" />
        </div>
        <input
          type="tel"
          placeholder={`${labels.phone} *`}
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          required
          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] text-xs font-medium text-[#013E51] placeholder:text-[#013E51]/40 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
        />
      </div>

      {/* Hotel Name & Room Number (2 columns) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#013E51]/40">
            <FiHome className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder={labels.hotel}
            value={hotelName}
            onChange={(e) => onHotelNameChange(e.target.value)}
            className="w-full pl-8 pr-2.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] text-[11px] font-medium text-[#013E51] placeholder:text-[#013E51]/40 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
          />
        </div>
        <input
          type="text"
          placeholder={labels.room}
          value={roomNo}
          onChange={(e) => onRoomNoChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] text-[11px] font-medium text-[#013E51] placeholder:text-[#013E51]/40 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A]"
        />
      </div>
    </div>
  );
}
