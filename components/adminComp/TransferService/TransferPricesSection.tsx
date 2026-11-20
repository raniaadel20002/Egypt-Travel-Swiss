"use client";

import { useMemo, useState } from "react";
import { FiDollarSign, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import {
  useDeleteTransferVehiclePriceMutation,
  useTransferVehiclePricesQuery,
} from "@/features/transfers/useTransferPrices";
import { useTransferLocationsQuery } from "@/features/transfers/useTransferLocations";
import { useVehicleTypeTransfersQuery } from "@/features/transfers/useTransferVehicles";
import { TransferVehiclePriceApiItem } from "@/models/transferService";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import TransferPricesTable from "./TransferPricesTable";
import TransferPriceFormDrawer from "./TransferPriceFormDrawer";
import TransferPriceDeleteModal from "./TransferPriceDeleteModal";

interface TransferPricesSectionProps {
  isFormOpen: boolean;
  onOpenCreate: () => void;
  onCloseForm: () => void;
}

export default function TransferPricesSection({
  isFormOpen,
  onOpenCreate,
  onCloseForm,
}: TransferPricesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFromId, setFilterFromId] = useState("");
  const [filterToId, setFilterToId] = useState("");
  const [filterVehicleId, setFilterVehicleId] = useState("");

  const [editingItem, setEditingItem] =
    useState<TransferVehiclePriceApiItem | null>(null);
  const [deletingItem, setDeletingItem] =
    useState<TransferVehiclePriceApiItem | null>(null);

  const pricesQuery = useTransferVehiclePricesQuery({ language: "en" });
  const fromLocationsQuery = useTransferLocationsQuery("from", { language: "en" });
  const toLocationsQuery = useTransferLocationsQuery("to", { language: "en" });
  const vehiclesQuery = useVehicleTypeTransfersQuery({ language: "en" });

  const deleteMutation = useDeleteTransferVehiclePriceMutation();

  const prices = pricesQuery.data?.data || [];
  const fromLocations = fromLocationsQuery.data?.data || [];
  const toLocations = toLocationsQuery.data?.data || [];
  const vehicles = vehiclesQuery.data?.data || [];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return prices.filter((p) => {
      if (filterFromId && p.fromId !== filterFromId) return false;
      if (filterToId && p.toId !== filterToId) return false;
      if (filterVehicleId && p.vehicleTypeTransferId !== filterVehicleId) return false;

      if (!q) return true;
      return (
        p.fromLocation?.toLowerCase().includes(q) ||
        p.toLocation?.toLowerCase().includes(q) ||
        p.vehicleName?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q)
      );
    });
  }, [prices, searchQuery, filterFromId, filterToId, filterVehicleId]);

  const handleEdit = (item: TransferVehiclePriceApiItem) => {
    setEditingItem(item);
    onOpenCreate();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    try {
      await deleteMutation.mutateAsync(deletingItem.id);
      toast.success("Route price deleted successfully.");
      setDeletingItem(null);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete route price."));
    }
  };

  const handleDrawerClose = () => {
    setEditingItem(null);
    onCloseForm();
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search route origin, destination, vehicle, or UUID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#013E51]/10 flex items-center gap-2 self-start sm:self-auto">
            <FiDollarSign className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>
              Total Tariffs: <strong className="font-bold">{prices.length}</strong>
            </span>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-gray-100">
          <select
            value={filterFromId}
            onChange={(e) => setFilterFromId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-white font-medium text-[#013E51] focus:outline-hidden"
          >
            <option value="">All Pick-up Points (From)</option>
            {fromLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                From: {loc.name}
              </option>
            ))}
          </select>

          <select
            value={filterToId}
            onChange={(e) => setFilterToId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-white font-medium text-[#013E51] focus:outline-hidden"
          >
            <option value="">All Drop-off Points (To)</option>
            {toLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                To: {loc.name}
              </option>
            ))}
          </select>

          <select
            value={filterVehicleId}
            onChange={(e) => setFilterVehicleId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-white font-medium text-[#013E51] focus:outline-hidden"
          >
            <option value="">All Vehicle Types</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {pricesQuery.isError && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
          {extractErrorMessage(
            pricesQuery.error,
            "Failed to load transfer prices from server."
          )}
        </div>
      )}

      <TransferPricesTable
        items={filteredItems}
        isLoading={pricesQuery.isLoading}
        onEdit={handleEdit}
        onDelete={setDeletingItem}
      />

      {isFormOpen && (
        <TransferPriceFormDrawer
          isOpen={isFormOpen}
          mode={editingItem ? "edit" : "create"}
          item={editingItem}
          onClose={handleDrawerClose}
        />
      )}

      {deletingItem && (
        <TransferPriceDeleteModal
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
