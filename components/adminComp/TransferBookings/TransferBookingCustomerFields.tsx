import { TransferCommunicationMethodEnum } from "@/models/transferBooking";
import { CountryTransferItem } from "@/models/countryTransfer";

interface TransferBookingCustomerFieldsProps {
  customerName: string;
  setCustomerName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  countryTransferId: number;
  setCountryTransferId: (val: number) => void;
  countryTransfers: CountryTransferItem[];
  communicationMethod: TransferCommunicationMethodEnum;
  setCommunicationMethod: (val: TransferCommunicationMethodEnum) => void;
  notes: string;
  setNotes: (val: string) => void;
}

export default function TransferBookingCustomerFields({
  customerName,
  setCustomerName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  countryTransferId,
  setCountryTransferId,
  countryTransfers,
  communicationMethod,
  setCommunicationMethod,
  notes,
  setNotes,
}: TransferBookingCustomerFieldsProps) {
  const handleCountryChange = (id: number) => {
    setCountryTransferId(id);
    const selected = countryTransfers.find((ct) => ct.id === id);
    if (!selected || !selected.code) return;

    const raw = selected.code.trim().replace(/\s+/g, "");
    const dialCode = raw.startsWith("+") ? raw : `+${raw}`;

    if (!phoneNumber || phoneNumber.trim() === "") {
      setPhoneNumber(dialCode);
      return;
    }

    const cleaned = phoneNumber.replace(/\s+/g, "");
    if (cleaned.startsWith("+")) {
      const matchingOld = countryTransfers
        .map((c) => {
          const cCode = c.code.trim().replace(/\s+/g, "");
          return cCode.startsWith("+") ? cCode : `+${cCode}`;
        })
        .filter((code) => cleaned.startsWith(code))
        .sort((a, b) => b.length - a.length)[0];

      if (matchingOld) {
        const remaining = cleaned.slice(matchingOld.length);
        setPhoneNumber(`${dialCode}${remaining}`);
      } else {
        const match = cleaned.match(/^\+\d{1,4}(.*)$/);
        const rest = match ? match[1] : "";
        setPhoneNumber(`${dialCode}${rest}`);
      }
    } else {
      setPhoneNumber(`${dialCode}${cleaned}`);
    }
  };

  return (
    <div className="space-y-3 font-[family-name:var(--font-lato)]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Customer Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Full Name *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer full name"
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="customer@example.com"
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Preferred Communication</label>
          <select
            value={communicationMethod}
            onChange={(e) =>
              setCommunicationMethod(
                Number(e.target.value) as TransferCommunicationMethodEnum
              )
            }
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          >
            <option value={TransferCommunicationMethodEnum.WhatsApp}>WhatsApp</option>
            <option value={TransferCommunicationMethodEnum.Email}>Email</option>
            <option value={TransferCommunicationMethodEnum.Viber}>Viber</option>
            <option value={TransferCommunicationMethodEnum.Phone}>Phone Call</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Country / Dial Code *</label>
          <select
            value={countryTransferId}
            onChange={(e) => handleCountryChange(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          >
            <option value={0}>Select Country / Dial Code...</option>
            {countryTransfers.map((ct) => {
              const codeDisplay = ct.code.startsWith("+") ? ct.code : `+${ct.code}`;
              return (
                <option key={ct.id} value={ct.id}>
                  {ct.name} ({codeDisplay})
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Phone Number *</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\s+/g, ""))}
            placeholder="+20123456789"
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Notes / Flight Info</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes or flight number..."
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
      </div>
    </div>
  );
}
