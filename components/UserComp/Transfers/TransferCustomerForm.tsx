"use client";

import { FiMail, FiPhone, FiUser, FiMessageCircle } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { CountryTransferItem } from "@/models/countryTransfer";
import { TransferCommunicationMethodEnum } from "@/models/transferBooking";

interface TransferCustomerFormProps {
  name: string;
  countryTransferId: number;
  countries: CountryTransferItem[];
  email: string;
  communicationMethod: TransferCommunicationMethodEnum;
  phone: string;
  onNameChange: (val: string) => void;
  onCountryChange: (id: number) => void;
  onEmailChange: (val: string) => void;
  onCommunicationMethodChange: (method: TransferCommunicationMethodEnum) => void;
  onPhoneChange: (val: string) => void;
}

export default function TransferCustomerForm({
  name,
  countryTransferId,
  countries,
  email,
  communicationMethod,
  phone,
  onNameChange,
  onCountryChange,
  onEmailChange,
  onCommunicationMethodChange,
  onPhoneChange,
}: TransferCustomerFormProps) {
  const { dictionary: dict } = useLocale();
  const t = dict.transfers.customer;

  const methods = [
    { id: TransferCommunicationMethodEnum.WhatsApp, label: t.methods.whatsapp },
    { id: TransferCommunicationMethodEnum.Phone, label: t.methods.phone },
    { id: TransferCommunicationMethodEnum.Email, label: t.methods.email },
    { id: TransferCommunicationMethodEnum.Viber, label: t.methods.viber },
  ];

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10">
      {/* Step Header */}
      <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-gray-100">
        <span className="w-7 h-7 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center font-mono text-xs font-bold">
          4
        </span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {t.heading}
        </h2>
      </div>

      <div className="space-y-5">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.fullName} <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={t.fullNamePlaceholder}
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiUser className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.email} <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiMail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Preferred Contact & Phone with Country Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.preferredContact} <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="relative">
              <select
                value={communicationMethod}
                onChange={(e) =>
                  onCommunicationMethodChange(
                    Number(e.target.value) as TransferCommunicationMethodEnum
                  )
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer"
              >
                {methods.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
              <FiMessageCircle className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
              {t.phone} <span className="text-[#E8B34A]">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={countryTransferId}
                onChange={(e) => onCountryChange(Number(e.target.value))}
                className="w-36 sm:w-44 px-3 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-xs sm:text-sm text-[#013E51] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] cursor-pointer shrink-0 truncate"
                title="Country Phone Code"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code ? `${c.code} ${c.name}` : c.name}
                  </option>
                ))}
              </select>

              <div className="relative flex-1">
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                />
                <FiPhone className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
