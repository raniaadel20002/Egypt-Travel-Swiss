"use client";

import { FiMail, FiPhone, FiUser, FiGlobe, FiPackage } from "react-icons/fi";

const NATIONALITIES = [
  "Germany",
  "United Kingdom",
  "Egypt",
  "Russia",
  "Poland",
  "Czech Republic",
  "Italy",
  "France",
  "United States",
  "Canada",
  "Netherlands",
  "Switzerland",
  "Austria",
  "Belgium",
  "Saudi Arabia",
  "United Arab Emirates",
  "Other",
];

const CONTACT_METHODS = [
  "WhatsApp",
  "Phone Call",
  "Email",
  "Telegram",
];

interface TransferCustomerFormProps {
  name: string;
  nationality: string;
  email: string;
  preferredContactMethod: string;
  phone: string;
  luggagePieces: number;
  onNameChange: (val: string) => void;
  onNationalityChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onContactMethodChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onLuggageChange: (count: number) => void;
}

export default function TransferCustomerForm({
  name,
  nationality,
  email,
  preferredContactMethod,
  phone,
  luggagePieces,
  onNameChange,
  onNationalityChange,
  onEmailChange,
  onContactMethodChange,
  onPhoneChange,
  onLuggageChange,
}: TransferCustomerFormProps) {
  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10">
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] pb-4 mb-6 border-b border-gray-100">
        Customer Information
      </h2>

      <div className="space-y-5">
        {/* Name & Nationality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Full Name <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. John Smith"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiUser className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Nationality <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <select
                value={nationality}
                onChange={(e) => onNationalityChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              >
                <option value="" disabled>
                  Select Nationality
                </option>
                {NATIONALITIES.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>
              <FiGlobe className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Email & Preferred Contact Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Email Address <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiMail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Preferred Contact Method <span className="text-[#E8B34A]">*</span>
            </label>
            <select
              value={preferredContactMethod}
              onChange={(e) => onContactMethodChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            >
              {CONTACT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Phone & Luggage Pieces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Phone (prefer WhatsApp) <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+20 100 000 0000"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiPhone className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              Luggage Pieces
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={30}
                value={luggagePieces}
                onChange={(e) => onLuggageChange(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiPackage className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
