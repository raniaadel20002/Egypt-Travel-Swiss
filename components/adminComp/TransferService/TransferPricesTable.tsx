import { useState } from "react";
import { FiArrowRight, FiCheck, FiCopy, FiDollarSign, FiEdit2, FiMapPin, FiTrash2 } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { TransferVehiclePriceApiItem } from "@/models/transferService";

interface TransferPricesTableProps {
  items: TransferVehiclePriceApiItem[];
  isLoading: boolean;
  onEdit: (item: TransferVehiclePriceApiItem) => void;
  onDelete: (item: TransferVehiclePriceApiItem) => void;
}

export default function TransferPricesTable({
  items,
  isLoading,
  onEdit,
  onDelete,
}: TransferPricesTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 1500);
  };

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
          <FiDollarSign className="w-6 h-6 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Route Prices Configured
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-sm mx-auto mt-1">
          No route pricing matching your filters. Click &quot;Add Route Price&quot; to configure transfer tariffs in EUR.
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
              <th className="py-4 px-5 sm:px-6">Transfer Route (From &rarr; To)</th>
              <th className="py-4 px-5 sm:px-6">Vehicle Type</th>
              <th className="py-4 px-5 sm:px-6">Price (EUR)</th>
              <th className="py-4 px-5 sm:px-6">UUID Identifier</th>
              <th className="py-4 px-5 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#013E51]/6 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAF7F2]/40 transition-colors"
                >
                  {/* Route */}
                  <td className="py-4 px-5 sm:px-6">
                    <div className="flex items-center gap-2 max-w-md">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <FiMapPin className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
                        <span className="font-bold text-[#013E51] truncate">
                          {item.fromLocation || "Pick-up"}
                        </span>
                      </div>
                      <FiArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0 mx-1" />
                      <div className="flex items-center gap-1.5 min-w-0">
                        <FiMapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-bold text-[#013E51] truncate">
                          {item.toLocation || "Drop-off"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td className="py-4 px-5 sm:px-6">
                    <div className="flex items-center gap-1.5">
                      <FaCar className="w-3.5 h-3.5 text-[#013E51]/70" />
                      <span className="font-semibold text-[#013E51]">
                        {item.vehicleName || "Vehicle"}
                      </span>
                    </div>
                  </td>

                  {/* Price in EUR */}
                  <td className="py-4 px-5 sm:px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-extrabold font-mono">
                      &euro;{Number(item.priceUsd || 0).toLocaleString()}
                    </span>
                  </td>

                  {/* UUID */}
                  <td className="py-4 px-5 sm:px-6">
                    <button
                      type="button"
                      onClick={() => handleCopyId(item.id)}
                      title="Click to copy UUID"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#888888] hover:text-[#013E51] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#013E51]/10 cursor-pointer transition"
                    >
                      <span>
                        {item.id.slice(0, 8)}...{item.id.slice(-6)}
                      </span>
                      {isCopied ? (
                        <FiCheck className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <FiCopy className="w-3 h-3 text-gray-400" />
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        aria-label="Edit price"
                        className="p-2 rounded-xl text-[#013E51]/70 hover:text-[#013E51] hover:bg-[#FAF7F2] cursor-pointer transition"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        aria-label="Delete price"
                        className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
