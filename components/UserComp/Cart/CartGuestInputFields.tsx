"use client";

import React from "react";
import { FiUser, FiMail, FiPhone, FiGlobe, FiHome, FiKey } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface CartGuestInputFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    hotelName: string;
    roomNo: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CartGuestInputFields({
  formData,
  onChange,
}: CartGuestInputFieldsProps) {
  const { dictionary } = useLocale();
  const t = dictionary.cartPage;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51] mb-1">
          <FiUser className="w-3.5 h-3.5 text-[#E8B34A]" />
          {t?.firstName || "First Name"} *
        </label>
        <input
          type="text"
          name="firstName"
          required
          value={formData.firstName}
          onChange={onChange}
          placeholder="John"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] text-sm text-[#013E51] focus:bg-white focus:border-[#013E51] outline-hidden transition-all"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51] mb-1">
          <FiUser className="w-3.5 h-3.5 text-[#E8B34A]" />
          {t?.lastName || "Last Name"} *
        </label>
        <input
          type="text"
          name="lastName"
          required
          value={formData.lastName}
          onChange={onChange}
          placeholder="Doe"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] text-sm text-[#013E51] focus:bg-white focus:border-[#013E51] outline-hidden transition-all"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51] mb-1">
          <FiMail className="w-3.5 h-3.5 text-[#E8B34A]" />
          {t?.email || "Email Address"} *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={onChange}
          placeholder="john.doe@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] text-sm text-[#013E51] focus:bg-white focus:border-[#013E51] outline-hidden transition-all"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51] mb-1">
          <FiPhone className="w-3.5 h-3.5 text-[#E8B34A]" />
          {t?.phone || "Phone / WhatsApp"} *
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={onChange}
          placeholder="+49 151 2345678"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] text-sm text-[#013E51] focus:bg-white focus:border-[#013E51] outline-hidden transition-all"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51] mb-1">
          <FiGlobe className="w-3.5 h-3.5 text-[#E8B34A]" />
          {t?.nationality || "Nationality"} *
        </label>
        <input
          type="text"
          name="nationality"
          required
          value={formData.nationality}
          onChange={onChange}
          placeholder="e.g. Swiss, German, British..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] text-sm text-[#013E51] focus:bg-white focus:border-[#013E51] outline-hidden transition-all"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51] mb-1">
          <FiHome className="w-3.5 h-3.5 text-[#E8B34A]" />
          {t?.hotelName || "Hotel / Resort Name (Pickup Location)"} *
        </label>
        <input
          type="text"
          name="hotelName"
          required
          value={formData.hotelName}
          onChange={onChange}
          placeholder="e.g. Steigenberger ALDAU Beach Hotel"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] text-sm text-[#013E51] focus:bg-white focus:border-[#013E51] outline-hidden transition-all"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#013E51] mb-1">
          <FiKey className="w-3.5 h-3.5 text-[#E8B34A]" />
          {t?.roomNo || "Room Number (Optional)"}
        </label>
        <input
          type="text"
          name="roomNo"
          value={formData.roomNo}
          onChange={onChange}
          placeholder="e.g. 204"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F9FA] text-sm text-[#013E51] focus:bg-white focus:border-[#013E51] outline-hidden transition-all"
        />
      </div>
    </div>
  );
}
