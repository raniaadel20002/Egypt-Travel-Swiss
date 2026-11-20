import { FiCalendar, FiCheck, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

interface BookingMetricsGridProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    finished: number;
    revenue: number;
  };
}

export default function BookingMetricsGrid({ stats }: BookingMetricsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
          <FiCalendar className="w-5 h-5 text-[#E8B34A]" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Bookings
          </span>
          <span className="text-xl font-extrabold text-[#013E51]">{stats.total}</span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <FiClock className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Pending
          </span>
          <span className="text-xl font-extrabold text-amber-700">{stats.pending}</span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
          <FiCheck className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Confirmed
          </span>
          <span className="text-xl font-extrabold text-sky-700">{stats.confirmed}</span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <FiCheckCircle className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Finished
          </span>
          <span className="text-xl font-extrabold text-emerald-700">{stats.finished}</span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3 col-span-2 sm:col-span-1">
        <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
          <FiDollarSign className="w-5 h-5 text-[#E8B34A]" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Total (EUR)
          </span>
          <span className="text-xl font-extrabold text-[#013E51]">
            &euro;{stats.revenue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
