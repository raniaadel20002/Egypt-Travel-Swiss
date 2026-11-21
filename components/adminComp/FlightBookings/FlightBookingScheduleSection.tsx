import { FlightTripTypeEnum } from "@/models/flightBooking";

interface FlightBookingScheduleSectionProps {
  tripType: FlightTripTypeEnum;
  departureAirport: string;
  setDepartureAirport: (val: string) => void;
  arrivalAirport: string;
  setArrivalAirport: (val: string) => void;
  departureDate: string;
  setDepartureDate: (val: string) => void;
  returnDepartureAirport: string;
  setReturnDepartureAirport: (val: string) => void;
  returnArrivalAirport: string;
  setReturnArrivalAirport: (val: string) => void;
  returnDate: string;
  setReturnDate: (val: string) => void;
}

export default function FlightBookingScheduleSection({
  tripType,
  departureAirport,
  setDepartureAirport,
  arrivalAirport,
  setArrivalAirport,
  departureDate,
  setDepartureDate,
  returnDepartureAirport,
  setReturnDepartureAirport,
  returnArrivalAirport,
  setReturnArrivalAirport,
  returnDate,
  setReturnDate,
}: FlightBookingScheduleSectionProps) {
  const isRoundTrip = tripType === FlightTripTypeEnum.RoundTrip;

  return (
    <div className="space-y-4 font-[family-name:var(--font-lato)]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Airports & Schedule
      </h3>

      {/* Outbound Flight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Departure Airport *
          </label>
          <input
            type="text"
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
            placeholder="e.g. Cairo (CAI)"
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Arrival Airport *
          </label>
          <input
            type="text"
            value={arrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value)}
            placeholder="e.g. Zurich (ZRH)"
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Departure Date *
          </label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] cursor-pointer"
          />
        </div>
      </div>

      {/* Return Flight (Shown ONLY when RoundTrip) */}
      {isRoundTrip && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-purple-50/40 p-3.5 rounded-xl border border-purple-100">
          <div>
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              Return Departure Airport *
            </label>
            <input
              type="text"
              value={returnDepartureAirport}
              onChange={(e) => setReturnDepartureAirport(e.target.value)}
              placeholder="e.g. Zurich (ZRH)"
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              Return Arrival Airport *
            </label>
            <input
              type="text"
              value={returnArrivalAirport}
              onChange={(e) => setReturnArrivalAirport(e.target.value)}
              placeholder="e.g. Cairo (CAI)"
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              Return Date *
            </label>
            <input
              type="date"
              min={departureDate || undefined}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
