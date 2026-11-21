import {
  FiSend,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

export interface FlightBookingsMetrics {
  total: number;
  egyptToCountry: number;
  countryToEgypt: number;
  local: number;
  totalPassengers: number;
}

interface FlightBookingsMetricsGridProps {
  metrics: FlightBookingsMetrics;
}

export default function FlightBookingsMetricsGrid({
  metrics,
}: FlightBookingsMetricsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 font-[family-name:var(--font-lato)]">
      {/* Total Bookings */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
          <FiSend className="w-5 h-5 text-[#E8B34A]" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Total Bookings
          </span>
          <span className="text-xl font-extrabold text-[#013E51]">
            {metrics.total}
          </span>
        </div>
      </div>

      {/* Egypt to Country */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
          <FiArrowUpRight className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Egypt to Country
          </span>
          <span className="text-xl font-extrabold text-sky-700">
            {metrics.egyptToCountry}
          </span>
        </div>
      </div>

      {/* Country to Egypt */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <FiArrowDownLeft className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Country to Egypt
          </span>
          <span className="text-xl font-extrabold text-amber-700">
            {metrics.countryToEgypt}
          </span>
        </div>
      </div>

      {/* Local Flights */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <FiMapPin className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Local Flights
          </span>
          <span className="text-xl font-extrabold text-emerald-700">
            {metrics.local}
          </span>
        </div>
      </div>

      {/* Total Passengers */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3 col-span-2 sm:col-span-1">
        <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
          <FiUsers className="w-5 h-5 text-[#E8B34A]" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Total Passengers
          </span>
          <span className="text-xl font-extrabold text-[#013E51]">
            {metrics.totalPassengers}
          </span>
        </div>
      </div>
    </div>
  );
}
