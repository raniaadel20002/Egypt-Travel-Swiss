"use client";

import { useMemo, useState } from "react";
import { FiDollarSign, FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { useTripsQuery } from "@/features/trips/useTrips";
import { usePrivateVehiclesQuery } from "@/features/privateVehicles/usePrivateVehicles";
import {
  useDeletePrivateVehicleTransferMutation,
  usePrivateVehicleTransfersQuery,
} from "@/features/privateVehicles/usePrivateVehicleTransfers";
import { PrivateVehicleTransferApiItem } from "@/models/privateVehicle";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import PrivateTransfersTable from "./PrivateTransfersTable";
import PrivateTransferFormDrawer from "./PrivateTransferFormDrawer";
import PrivateTransferDeleteModal from "./PrivateTransferDeleteModal";

export default function PrivateTransfersSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTripFilter, setSelectedTripFilter] = useState<number | "all">("all");
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState<number | "all">("all");

  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    item: PrivateVehicleTransferApiItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const [deletingItem, setDeletingItem] =
    useState<PrivateVehicleTransferApiItem | null>(null);

  const tripsQuery = useTripsQuery({
    PageNumber: 1,
    PageSize: 100,
    language: "EN",
  });
  const vehiclesQuery = usePrivateVehiclesQuery({ language: "EN" });
  const transfersQuery = usePrivateVehicleTransfersQuery({
    tripId: selectedTripFilter !== "all" ? selectedTripFilter : undefined,
    vehicleId: selectedVehicleFilter !== "all" ? selectedVehicleFilter : undefined,
  });

  const deleteMutation = useDeletePrivateVehicleTransferMutation();

  const privateTrips = useMemo(() => {
    const all = tripsQuery.data || [];
    return all.filter((t) => t.categoryName?.toLowerCase() === "private");
  }, [tripsQuery.data]);

  const vehicles = vehiclesQuery.data || [];
  const rates = transfersQuery.data || [];

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return rates;
    const q = searchQuery.toLowerCase().trim();
    return rates.filter(
      (r) =>
        r.tripName?.toLowerCase().includes(q) ||
        r.vehicleName?.toLowerCase().includes(q) ||
        String(r.tripId).includes(q) ||
        String(r.id).includes(q)
    );
  }, [rates, searchQuery]);

  const handleCreate = () => {
    setFormDrawer({ isOpen: true, item: null });
  };

  const handleEdit = (item: PrivateVehicleTransferApiItem) => {
    setFormDrawer({ isOpen: true, item });
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    await deleteMutation.mutateAsync(deletingItem.id);
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Search, Filters & Action Bar */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by trip, vehicle, or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              <FiPlus className="w-4 h-4 text-[#E8B34A]" />
              <span>Add Rate</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <FiFilter className="w-3.5 h-3.5" />
            <span>Filter by:</span>
          </div>

          <select
            value={selectedTripFilter}
            onChange={(e) =>
              setSelectedTripFilter(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-[#FAF7F2] text-[#013E51] font-semibold focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="all">All Private Trips</option>
            {privateTrips.map((t) => (
              <option key={t.id} value={t.id}>
                #{t.id} - {t.name}
              </option>
            ))}
          </select>

          <select
            value={selectedVehicleFilter}
            onChange={(e) =>
              setSelectedVehicleFilter(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-[#FAF7F2] text-[#013E51] font-semibold focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="all">All Vehicles</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                #{v.id} - {v.name}
              </option>
            ))}
          </select>

          <div className="ml-auto text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#013E51]/10">
            Total Rates: <strong className="font-bold">{rates.length}</strong>
          </div>
        </div>
      </div>

      {transfersQuery.isError && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
          {extractErrorMessage(
            transfersQuery.error,
            "Failed to load private transfer rates from server."
          )}
        </div>
      )}

      {/* Rates Table */}
      <PrivateTransfersTable
        items={filteredItems}
        isLoading={transfersQuery.isLoading}
        onEdit={handleEdit}
        onDelete={setDeletingItem}
      />

      {/* Form Drawer */}
      <PrivateTransferFormDrawer
        isOpen={formDrawer.isOpen}
        item={formDrawer.item}
        defaultTripId={
          selectedTripFilter !== "all" ? selectedTripFilter : undefined
        }
        onClose={() => setFormDrawer({ isOpen: false, item: null })}
      />

      {/* Delete Modal */}
      <PrivateTransferDeleteModal
        isOpen={Boolean(deletingItem)}
        item={deletingItem}
        isLoading={deleteMutation.isPending}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
