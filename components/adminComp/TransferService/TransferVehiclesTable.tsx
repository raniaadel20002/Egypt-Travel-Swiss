import { useState } from "react";
import { FiCheck, FiCopy, FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { VehicleTypeTransferApiItem } from "@/models/transferService";

interface TransferVehiclesTableProps {
  items: VehicleTypeTransferApiItem[];
  isLoading: boolean;
  onEdit: (item: VehicleTypeTransferApiItem) => void;
  onDelete: (item: VehicleTypeTransferApiItem) => void;
}

export default function TransferVehiclesTable({
  items,
  isLoading,
  onEdit,
  onDelete,
}: TransferVehiclesTableProps) {
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
          <FaCar className="w-6 h-6 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Vehicle Types Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-sm mx-auto mt-1">
          No vehicles registered yet. Click &quot;Add Vehicle&quot; to configure your fleet.
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
              <th className="py-4 px-5 sm:px-6">Vehicle Type</th>
              <th className="py-4 px-5 sm:px-6">Capacity</th>
              <th className="py-4 px-5 sm:px-6">Extra Hour Rate</th>
              <th className="py-4 px-5 sm:px-6">Round-Trip Discount</th>
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
                  <td className="py-4 px-5 sm:px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
                        <FaCar className="w-4 h-4 text-[#013E51]" />
                      </div>
                      <span className="font-bold text-[#013E51] text-sm">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-5 sm:px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#013E51]/5 text-[#013E51] border border-[#013E51]/10">
                      <FiUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
                      <span>
                        {item.fromPerson} - {item.toPerson} Persons
                      </span>
                    </span>
                  </td>

                  <td className="py-4 px-5 sm:px-6 font-bold text-[#013E51]">
                    &euro;{Number(item.additionalHoursUsd || 0).toLocaleString()} / hr
                  </td>

                  <td className="py-4 px-5 sm:px-6">
                    {Number(item.discountPercentage || 0) > 0 ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.discountPercentage}% OFF
                        </span>
                        <span className="block text-[10px] text-gray-400 font-medium">
                          Round-trip only
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No discount</span>
                    )}
                  </td>

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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
