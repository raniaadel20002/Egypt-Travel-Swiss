import { FiCalendar, FiEdit2, FiGlobe, FiMapPin, FiTrash2 } from "react-icons/fi";
import { CityApiItem } from "@/models/flightLocation";

interface CitiesTableProps {
  items: CityApiItem[];
  isLoading: boolean;
  onEdit: (item: CityApiItem) => void;
  onDelete: (item: CityApiItem) => void;
}

export default function CitiesTable({
  items,
  isLoading,
  onEdit,
  onDelete,
}: CitiesTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-100 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-12 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-3">
          <FiMapPin className="w-6 h-6 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Cities Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-sm mx-auto mt-1">
          No flight transfer cities match your filter. Click &quot;Add City&quot; to create one.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#013E51]/10 bg-[#FAF7F2]/60 text-[11px] font-bold uppercase tracking-wider text-[#013E51]/60 font-[family-name:var(--font-lato)]">
              <th className="py-4 px-5 sm:px-6">ID</th>
              <th className="py-4 px-5 sm:px-6">City Name</th>
              <th className="py-4 px-5 sm:px-6">Country</th>
              <th className="py-4 px-5 sm:px-6">Created Date</th>
              <th className="py-4 px-5 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#013E51]/6 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-[#FAF7F2]/40 transition-colors"
              >
                {/* ID */}
                <td className="py-4 px-5 sm:px-6 font-mono text-xs font-bold text-[#888888]">
                  #{item.id}
                </td>

                {/* City Name */}
                <td className="py-4 px-5 sm:px-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
                      <FiMapPin className="w-4 h-4 text-[#013E51]" />
                    </div>
                    <span className="font-bold text-[#013E51] text-sm">
                      {item.name}
                    </span>
                  </div>
                </td>

                {/* Country Badge */}
                <td className="py-4 px-5 sm:px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <FiGlobe className="w-3 h-3 text-emerald-600" />
                    <span>{item.countryName || `Country #${item.countryId}`}</span>
                  </span>
                </td>

                {/* Created Date */}
                <td className="py-4 px-5 sm:px-6 text-xs text-[#888888]">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5 text-[#013E51]/40" />
                    <span>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-5 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      aria-label={`Edit ${item.name}`}
                      className="p-2 rounded-xl text-[#013E51]/70 hover:text-[#013E51] hover:bg-[#FAF7F2] cursor-pointer transition"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      aria-label={`Delete ${item.name}`}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
