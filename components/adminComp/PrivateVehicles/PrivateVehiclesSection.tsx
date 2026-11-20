"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import {
  useDeletePrivateVehicleMutation,
  usePrivateVehiclesQuery,
} from "@/features/privateVehicles/usePrivateVehicles";
import { PrivateVehicleApiItem } from "@/models/privateVehicle";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import PrivateVehiclesTable from "./PrivateVehiclesTable";
import PrivateVehicleFormDrawer from "./PrivateVehicleFormDrawer";
import PrivateVehicleDeleteModal from "./PrivateVehicleDeleteModal";

export default function PrivateVehiclesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    item: PrivateVehicleApiItem | null;
  }>({
    isOpen: false,
    item: null,
  });
  const [deletingItem, setDeletingItem] =
    useState<PrivateVehicleApiItem | null>(null);

  const vehiclesQuery = usePrivateVehiclesQuery();
  const deleteMutation = useDeletePrivateVehicleMutation();

  const vehicles = vehiclesQuery.data || [];

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return vehicles;
    const q = searchQuery.toLowerCase().trim();
    return vehicles.filter(
      (v) => v.name.toLowerCase().includes(q) || String(v.id).includes(q)
    );
  }, [vehicles, searchQuery]);

  const handleCreate = () => {
    setFormDrawer({ isOpen: true, item: null });
  };

  const handleEdit = (item: PrivateVehicleApiItem) => {
    setFormDrawer({ isOpen: true, item });
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    await deleteMutation.mutateAsync(deletingItem.id);
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vehicle name or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#013E51]/10 flex items-center gap-2">
            <FaCar className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>
              Total Classes: <strong className="font-bold">{vehicles.length}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            <FiPlus className="w-4 h-4 text-[#E8B34A]" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {vehiclesQuery.isError && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
          {extractErrorMessage(
            vehiclesQuery.error,
            "Failed to load private vehicles from server."
          )}
        </div>
      )}

      <PrivateVehiclesTable
        items={filteredItems}
        isLoading={vehiclesQuery.isLoading}
        onEdit={handleEdit}
        onDelete={setDeletingItem}
      />

      <PrivateVehicleFormDrawer
        isOpen={formDrawer.isOpen}
        item={formDrawer.item}
        onClose={() => setFormDrawer({ isOpen: false, item: null })}
      />

      <PrivateVehicleDeleteModal
        isOpen={Boolean(deletingItem)}
        item={deletingItem}
        isLoading={deleteMutation.isPending}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
