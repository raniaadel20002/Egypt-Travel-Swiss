"use client";

import { useMemo, useState } from "react";
import { FiMapPin, FiNavigation, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import {
  useDeleteTransferLocationMutation,
  useTransferLocationsQuery,
} from "@/features/transfers/useTransferLocations";
import {
  TransferLocationItem,
  TransferLocationType,
} from "@/models/transferLocation";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import TransferLocationsTable from "@/components/adminComp/TransferLocations/TransferLocationsTable";
import TransferLocationFormDrawer from "@/components/adminComp/TransferLocations/TransferLocationFormDrawer";
import TransferLocationDeleteModal from "@/components/adminComp/TransferLocations/TransferLocationDeleteModal";

interface TransferLocationsSectionProps {
  type: TransferLocationType;
  isFormOpen: boolean;
  onOpenCreate: () => void;
  onCloseForm: () => void;
}

export default function TransferLocationsSection({
  type,
  isFormOpen,
  onOpenCreate,
  onCloseForm,
}: TransferLocationsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] =
    useState<TransferLocationItem | null>(null);
  const [deletingItem, setDeletingItem] =
    useState<TransferLocationItem | null>(null);

  const locationsQuery = useTransferLocationsQuery(type, { language: "en" });
  const deleteMutation = useDeleteTransferLocationMutation(type);

  const locations = locationsQuery.data?.data || [];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter(
      (loc) =>
        loc.name?.toLowerCase().includes(q) ||
        loc.id?.toLowerCase().includes(q)
    );
  }, [locations, searchQuery]);

  const handleEdit = (item: TransferLocationItem) => {
    setEditingItem(item);
    onOpenCreate();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    try {
      await deleteMutation.mutateAsync(deletingItem.id);
      toast.success(
        `${type === "from" ? "Pick-up" : "Drop-off"} point deleted successfully.`
      );
      setDeletingItem(null);
    } catch (err) {
      toast.error(
        extractErrorMessage(err, "Failed to delete transfer location.")
      );
    }
  };

  const handleDrawerClose = () => {
    setEditingItem(null);
    onCloseForm();
  };

  const typeLabel =
    type === "from" ? "Pick-up Point (From)" : "Drop-off Point (To)";

  return (
    <div className="space-y-4">
      {/* Search & Info */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${typeLabel} or UUID...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#013E51]/10 flex items-center gap-2 self-start sm:self-auto">
          {type === "from" ? (
            <FiNavigation className="w-3.5 h-3.5 text-[#E8B34A]" />
          ) : (
            <FiMapPin className="w-3.5 h-3.5 text-teal-600" />
          )}
          <span>
            Total {type === "from" ? "Pick-up" : "Drop-off"} Points:{" "}
            <strong className="font-bold">{locations.length}</strong>
          </span>
        </div>
      </div>

      {locationsQuery.isError && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
          {extractErrorMessage(
            locationsQuery.error,
            "Failed to load transfer locations from server."
          )}
        </div>
      )}

      <TransferLocationsTable
        items={filteredItems}
        isLoading={locationsQuery.isLoading}
        type={type}
        onEdit={handleEdit}
        onDelete={setDeletingItem}
      />

      {isFormOpen && (
        <TransferLocationFormDrawer
          isOpen={isFormOpen}
          mode={editingItem ? "edit" : "create"}
          type={type}
          item={editingItem}
          onClose={handleDrawerClose}
        />
      )}

      {deletingItem && (
        <TransferLocationDeleteModal
          isOpen={Boolean(deletingItem)}
          item={deletingItem}
          type={type}
          isPending={deleteMutation.isPending}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
