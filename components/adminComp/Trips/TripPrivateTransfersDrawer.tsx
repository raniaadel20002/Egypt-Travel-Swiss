"use client";

import { useMemo, useState } from "react";
import {
  FiCompass,
  FiDollarSign,
  FiEdit2,
  FiLoader,
  FiPlus,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { TripApiItem } from "@/models/trip";
import {
  useDeletePrivateVehicleTransferMutation,
  usePrivateVehicleTransfersQuery,
} from "@/features/privateVehicles/usePrivateVehicleTransfers";
import { PrivateVehicleTransferApiItem } from "@/models/privateVehicle";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import PrivateTransferFormDrawer from "@/components/adminComp/PrivateVehicles/PrivateTransferFormDrawer";
import PrivateTransferDeleteModal from "@/components/adminComp/PrivateVehicles/PrivateTransferDeleteModal";

interface TripPrivateTransfersDrawerProps {
  isOpen: boolean;
  trip: TripApiItem | null;
  onClose: () => void;
}

export default function TripPrivateTransfersDrawer({
  isOpen,
  trip,
  onClose,
}: TripPrivateTransfersDrawerProps) {
  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    item: PrivateVehicleTransferApiItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const [deletingItem, setDeletingItem] =
    useState<PrivateVehicleTransferApiItem | null>(null);

  const transfersQuery = usePrivateVehicleTransfersQuery(
    trip ? { tripId: trip.id } : undefined
  );
  const deleteMutation = useDeletePrivateVehicleTransferMutation();

  const rates = transfersQuery.data || [];

  if (!isOpen || !trip) return null;

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
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow={`ID #${trip.id} • Private Excursion`}
      title="Private Transfer Pricing"
      subtitle={`Configure vehicle classes & passenger capacity rates for "${trip.name}".`}
      widthClassName="max-w-2xl sm:max-w-3xl"
      footer={
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs font-semibold text-[#013E51]">
            <span className="font-bold text-[#E8B34A]">{rates.length}</span>{" "}
            Transfer Tiers Configured
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Summary & Add Rate Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#013E51]/10">
          <div className="text-xs text-[#013E51]">
            <span className="font-bold block">Base Excursion Price: €0</span>
            <span className="text-[11px] text-gray-500">
              Booking price = Attached Services + Matched Transfer Tier below.
            </span>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <FiPlus className="w-4 h-4 text-[#E8B34A]" />
            <span>Add Transfer Tier</span>
          </button>
        </div>

        {/* Existing Rates Table */}
        {transfersQuery.isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs text-gray-400">
            <FiLoader className="w-5 h-5 animate-spin text-[#013E51]" />
            <span>Loading transfer rates...</span>
          </div>
        ) : rates.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center">
            <FaCar className="w-10 h-10 text-gray-300 mb-2" />
            <h4 className="font-bold text-[#013E51] text-sm">
              No Transfer Rates Set for this Trip
            </h4>
            <p className="text-xs text-gray-500 max-w-sm mt-1 mb-4">
              Add at least one transfer tier so travelers can book this private excursion.
            </p>
            <button
              type="button"
              onClick={handleCreate}
              className="px-4 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#025670] transition cursor-pointer"
            >
              Add First Rate
            </button>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#013E51]/70 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Passenger Range</th>
                  <th className="py-3 px-4">Rate (EUR)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-[#FAF7F2]/50 transition">
                    <td className="py-3 px-4 font-bold text-[#013E51]">
                      {rate.vehicleName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[11px] font-semibold">
                        <FiUsers className="w-3 h-3 text-[#013E51]" />
                        <span>{rate.from} - {rate.to} Persons</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-extrabold text-emerald-800">
                      &euro;{rate.price}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(rate)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
                          title="Edit tier"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingItem(rate)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                          title="Delete tier"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <PrivateTransferFormDrawer
        isOpen={formDrawer.isOpen}
        item={formDrawer.item}
        defaultTripId={trip.id}
        onClose={() => setFormDrawer({ isOpen: false, item: null })}
      />

      <PrivateTransferDeleteModal
        isOpen={Boolean(deletingItem)}
        item={deletingItem}
        isLoading={deleteMutation.isPending}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminDrawer>
  );
}
