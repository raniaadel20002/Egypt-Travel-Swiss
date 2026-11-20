"use client";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { PrivateVehicleApiItem } from "@/models/privateVehicle";

interface PrivateVehiclesTableProps {
  items: PrivateVehicleApiItem[];
  isLoading: boolean;
  onEdit: (item: PrivateVehicleApiItem) => void;
  onDelete: (item: PrivateVehicleApiItem) => void;
}

export default function PrivateVehiclesTable({
  items,
  isLoading,
  onEdit,
  onDelete,
}: PrivateVehiclesTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-100 rounded-xl w-full" />
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
          No Private Vehicles Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-sm mx-auto mt-1">
          No private vehicle classes registered yet. Click &quot;Add Vehicle&quot; to configure fleet classes for private excursions.
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
              <th className="py-4 px-5 sm:px-6 w-24">ID</th>
              <th className="py-4 px-5 sm:px-6">Vehicle Class</th>
              <th className="py-4 px-5 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#013E51]/6 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-[#FAF7F2]/40 transition-colors"
              >
                <td className="py-4 px-5 sm:px-6">
                  <span className="font-mono text-xs font-extrabold text-[#013E51] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#013E51]/10">
                    #{item.id}
                  </span>
                </td>

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

                <td className="py-4 px-5 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      title="Edit vehicle class"
                      className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#E8B34A] transition cursor-pointer"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      title="Delete vehicle class"
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer"
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
