interface DivingCourseBookingCustomerFieldsProps {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  hotelName: string;
  setHotelName: (val: string) => void;
  roomNo: string;
  setRoomNo: (val: string) => void;
}

export default function DivingCourseBookingCustomerFields({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  hotelName,
  setHotelName,
  roomNo,
  setRoomNo,
}: DivingCourseBookingCustomerFieldsProps) {
  return (
    <div className="space-y-3 font-[family-name:var(--font-lato)]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Customer & Stay Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Customer full name"
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
            placeholder="customer@example.com"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Phone Number (No spaces) *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))}
            placeholder="+20123456789"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Hotel Name *
          </label>
          <input
            type="text"
            required
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            placeholder="e.g. Steigenberger Resort"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Room Number *
          </label>
          <input
            type="text"
            required
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            placeholder="e.g. 204"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
      </div>
    </div>
  );
}
