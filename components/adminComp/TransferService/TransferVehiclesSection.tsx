"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { toast } from "sonner";
import {
  useDeleteVehicleTypeTransferMutation,
  useVehicleTypeTransfersQuery,
} from "@/features/transfers/useTransferVehicles";
import { VehicleTypeTransferApiItem } from "@/models/transferService";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import TransferVehiclesTable from "./TransferVehiclesTable";
import TransferVehicleFormDrawer from "./TransferVehicleFormDrawer";
import TransferVehicleDeleteModal from "./TransferVehicleDeleteModal";

interface TransferVehiclesSectionProps {
  isFormOpen: boolean;
  onOpenCreate: () => void;
  onCloseForm: () => void;
}

export default function TransferVehiclesSection({
  isFormOpen,
  onOpenCreate,
  onCloseForm,
}: TransferVehiclesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] =
    useState<VehicleTypeTransferApiItem | null>(null);
  const [deletingItem, setDeletingItem] =
    useState<VehicleTypeTransferApiItem | null>(null);

  const vehiclesQuery = useVehicleTypeTransfersQuery({ language: "en" });
  const deleteMutation = useDeleteVehicleTypeTransferMutation();

  const vehicles = vehiclesQuery.data?.data || [];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter(
      (v) =>
        v.name?.toLowerCase().includes(q) ||
        v.id?.toLowerCase().includes(q)
    );
  }, [vehicles, searchQuery]);

  const handleEdit = (item: VehicleTypeTransferApiItem) => {
    setEditingItem(item);
    onOpenCreate();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    try {
      await deleteMutation.mutateAsync(deletingItem.id);
      toast.success("Vehicle type deleted successfully.");
      setDeletingItem(null);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete vehicle type."));
    }
  };

  const handleDrawerClose = () => {
    setEditingItem(null);
    onCloseForm();
  };

  return (
    <div className="space-y-4">
      {/* Search & Info Bar */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vehicle type or UUID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#013E51]/10 flex items-center gap-2 self-start sm:self-auto">
          <FaCar className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>
            Total Fleet Types: <strong className="font-bold">{vehicles.length}</strong>
          </span>
        </div>
      </div>

      {vehiclesQuery.isError && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
          {extractErrorMessage(
            vehiclesQuery.error,
            "Failed to load vehicle types from server."
          )}
        </div>
      )}

      <TransferVehiclesTable
        items={filteredItems}
        isLoading={vehiclesQuery.isLoading}
        onEdit={handleEdit}
        onDelete={setDeletingItem}
      />

      {isFormOpen && (
        <TransferVehicleFormDrawer
          isOpen={isFormOpen}
          mode={editingItem ? "edit" : "create"}
          item={editingItem}
          onClose={handleDrawerClose}
        />
      )}

      {deletingItem && (
        <TransferVehicleDeleteModal
          isOpen={Boolean(deletingItem)}
          item={deletingItem}
          isPending={deleteMutation.isPending}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
