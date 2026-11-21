import { TIME_OPTIONS, getTomorrowDateString } from "./transferBookingHelpers";

interface TransferBookingScheduleFieldsProps {
  adults: number;
  setAdults: (val: number) => void;
  children: number;
  setChildren: (val: number) => void;
  luggageCount: number;
  setLuggageCount: (val: number) => void;
  tripTime: string;
  setTripTime: (val: string) => void;
  tripDate: string;
  setTripDate: (val: string) => void;
}

export default function TransferBookingScheduleFields({
  adults,
  setAdults,
  children,
  setChildren,
  luggageCount,
  setLuggageCount,
  tripTime,
  setTripTime,
  tripDate,
  setTripDate,
}: TransferBookingScheduleFieldsProps) {
  return (
    <div className="space-y-3 font-[family-name:var(--font-lato)]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Schedule & Passengers
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Adults *</label>
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Children</label>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Luggage Bags</label>
          <input
            type="number"
            min={0}
            value={luggageCount}
            onChange={(e) => setLuggageCount(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51]"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Trip Time *</label>
          <select
            value={tripTime}
            onChange={(e) => setTripTime(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          >
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 sm:col-span-4">
          <label className="block text-xs text-gray-500 mb-1">
            Trip Date (Tomorrow onwards) *
          </label>
          <input
            type="date"
            min={getTomorrowDateString()}
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
