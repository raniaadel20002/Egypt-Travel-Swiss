import { FiCalendar, FiClock, FiCheck, FiCheckCircle, FiXCircle } from "react-icons/fi";

export interface TransferBookingsMetrics {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  revenueEur: number;
}

interface TransferBookingsMetricsGridProps {
  metrics: TransferBookingsMetrics;
}

export default function TransferBookingsMetricsGrid({
  metrics,
}: TransferBookingsMetricsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 font-[family-name:var(--font-lato)]">
      {/* Total Bookings */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
          <FiCalendar className="w-5 h-5 text-[#E8B34A]" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Total
          </span>
          <span className="text-xl font-extrabold text-[#013E51]">
            {metrics.total}
          </span>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <FiClock className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Pending
          </span>
          <span className="text-xl font-extrabold text-amber-700">
            {metrics.pending}
          </span>
        </div>
      </div>

      {/* Confirmed */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
          <FiCheck className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Confirmed
          </span>
          <span className="text-xl font-extrabold text-sky-700">
            {metrics.confirmed}
          </span>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <FiCheckCircle className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Completed
          </span>
          <span className="text-xl font-extrabold text-emerald-700">
            {metrics.completed}
          </span>
        </div>
      </div>

      {/* Cancelled */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
          <FiXCircle className="w-5 h-5 text-rose-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Cancelled
          </span>
          <span className="text-xl font-extrabold text-rose-700">
            {metrics.cancelled}
          </span>
        </div>
      </div>

      {/* Revenue (EUR) */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3 col-span-2 sm:col-span-1">
        <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
          <span className="text-lg font-black text-[#E8B34A] leading-none">&euro;</span>
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Revenue (EUR)
          </span>
          <span className="text-xl font-extrabold text-[#013E51]">
            &euro;{metrics.revenueEur.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
