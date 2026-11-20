"use client";

import { FiTag, FiUser } from "react-icons/fi";

interface BookingCustomerFieldsProps {
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  nationality: string;
  setNationality: (val: string) => void;
  hotelName: string;
  setHotelName: (val: string) => void;
  roomNo: string;
  setRoomNo: (val: string) => void;
  code: string;
  setCode: (val: string) => void;
}

export default function BookingCustomerFields({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  nationality,
  setNationality,
  hotelName,
  setHotelName,
  roomNo,
  setRoomNo,
  code,
  setCode,
}: BookingCustomerFieldsProps) {
  return (
    <div className="space-y-5">
      {/* Customer Information */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-1.5 border-b border-gray-100 pb-2">
          <FiUser className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>Customer Profile</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 block">First Name *</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Ahmed"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 block">Last Name *</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Mohamed"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 block">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. customer@example.com"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 block">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +201001234567"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-[11px] font-bold text-gray-600 block">Nationality *</label>
            <input
              type="text"
              required
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="e.g. Swiss, German, Egyptian"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
        </div>
      </div>

      {/* Accommodation Info */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#013E51] border-b border-gray-100 pb-2">
          Resort / Accommodation Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 block">Hotel Name *</label>
            <input
              type="text"
              required
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="e.g. Red Sea Paradise Resort"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 block">Room Number *</label>
            <input
              type="text"
              required
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              placeholder="e.g. 305"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
        </div>
      </div>

      {/* Optional Promo Voucher Code */}
      <div className="space-y-1 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/15">
        <label className="text-xs font-bold text-[#013E51] flex items-center gap-1.5">
          <FiTag className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>Promo Code Voucher (Optional)</span>
        </label>
        <input
          type="number"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. 821418 (6-digit numeric promo code)"
          className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
        />
      </div>
    </div>
  );
}
