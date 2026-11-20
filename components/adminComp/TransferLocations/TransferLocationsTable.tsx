import { useState } from "react";
import { FiCheck, FiCopy, FiEdit2, FiMapPin, FiTrash2 } from "react-icons/fi";
import {
  TransferLocationItem,
  TransferLocationType,
} from "@/models/transferLocation";

interface TransferLocationsTableProps {
  items: TransferLocationItem[];
  isLoading: boolean;
  type: TransferLocationType;
  onEdit: (item: TransferLocationItem) => void;
  onDelete: (item: TransferLocationItem) => void;
}

export default function TransferLocationsTable({
  items,
  isLoading,
  type,
  onEdit,
  onDelete,
}: TransferLocationsTableProps) {
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
          <FiMapPin className="w-6 h-6 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Transfer Locations Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-sm mx-auto mt-1">
          No {type === "from" ? "pick-up" : "drop-off"} locations match your
          search or filter criteria. Click &quot;Add Location&quot; to create one.
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
              <th className="py-4 px-5 sm:px-6">Location Name</th>
              <th className="py-4 px-5 sm:px-6">Type</th>
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
                  {/* Name */}
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

                  {/* Type Badge */}
                  <td className="py-4 px-5 sm:px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        type === "from"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-teal-50 text-teal-800 border-teal-200"
                      }`}
                    >
                      {type === "from" ? "Pick-up (From)" : "Drop-off (To)"}
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
