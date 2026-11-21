import { HotelApiItem } from "@/models/hotel";

interface HotelBookingCustomerFieldsProps {
  hotelId: number;
  setHotelId: (id: number) => void;
  hotels: HotelApiItem[];
  bookingDate: string;
  setBookingDate: (val: string) => void;
  nightsCount: number;
  setNightsCount: (val: number) => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  whatsApp: string;
  setWhatsApp: (val: string) => void;
  nationality: string;
  setNationality: (val: string) => void;
  totalAdults: number;
  totalChildren: number;
  totalInfants: number;
  tomorrowStr: string;
}

export default function HotelBookingCustomerFields({
  hotelId,
  setHotelId,
  hotels,
  bookingDate,
  setBookingDate,
  nightsCount,
  setNightsCount,
  name,
  setName,
  email,
  setEmail,
  whatsApp,
  setWhatsApp,
  nationality,
  setNationality,
  totalAdults,
  totalChildren,
  totalInfants,
  tomorrowStr,
}: HotelBookingCustomerFieldsProps) {
  return (
    <div className="space-y-4 font-[family-name:var(--font-lato)]">
      {/* Property & Stay */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Resort & Stay Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">
              Select Hotel / Resort *
            </label>
            <select
              required
              value={hotelId || ""}
              onChange={(e) => setHotelId(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
            >
              <option value="">Choose a property...</option>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} {h.location ? `(${h.location})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Check-in Date *
            </label>
            <input
              type="date"
              required
              min={tomorrowStr}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Nights Count *
            </label>
            <input
              type="number"
              min={1}
              required
              value={nightsCount}
              onChange={(e) => setNightsCount(Math.max(1, Number(e.target.value) || 1))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Guest Information */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Guest Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">
              Primary Guest Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="guest@example.com"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              WhatsApp / Phone (No spaces) *
            </label>
            <input
              type="tel"
              required
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value.replace(/\s+/g, ""))}
              placeholder="+20123456789"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">
              Nationality *
            </label>
            <input
              type="text"
              required
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="e.g. Swiss, German, Egyptian"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
            />
          </div>
        </div>
      </div>

      {/* Auto-Calculated Guest Totals Banner */}
      <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#013E51]/10 text-xs text-[#013E51] flex items-center justify-between">
        <span className="font-semibold text-gray-600">
          Total Guests (Auto-calculated from rooms):
        </span>
        <span className="font-extrabold text-[#013E51]">
          {totalAdults} Adults &bull; {totalChildren} Children &bull; {totalInfants} Infants
        </span>
      </div>
    </div>
  );
}
