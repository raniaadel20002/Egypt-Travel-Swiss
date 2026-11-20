"use client";

import { useMemo, useState } from "react";
import { FiMapPin, FiNavigation, FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import {
  useDeleteTransferLocationMutation,
  useTransferLocationsQuery,
} from "@/features/transfers/useTransferLocations";
import {
  TransferLocationItem,
  TransferLocationType,
} from "@/models/transferLocation";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import TransferLocationsTable from "./TransferLocationsTable";
import TransferLocationFormDrawer from "./TransferLocationFormDrawer";
import TransferLocationDeleteModal from "./TransferLocationDeleteModal";

export default function AdminTransferLocationsPage() {
  const [activeType, setActiveType] = useState<TransferLocationType>("from");
  const [searchQuery, setSearchQuery] = useState("");

  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    item: TransferLocationItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: TransferLocationItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const locationsQuery = useTransferLocationsQuery(activeType, {
    language: "en",
  });
  const deleteMutation = useDeleteTransferLocationMutation(activeType);

  const locations = locationsQuery.data?.data || [];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter((loc) => {
      const matchName = loc.name?.toLowerCase().includes(q);
      const matchId = loc.id?.toLowerCase().includes(q);
      return matchName || matchId;
    });
  }, [locations, searchQuery]);

  const handleCreate = () => {
    setFormDrawer({
      isOpen: true,
      mode: "create",
      item: null,
    });
  };

  const handleEdit = (item: TransferLocationItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "edit",
      item,
    });
  };

  const handleDeletePrompt = (item: TransferLocationItem) => {
    setDeleteModal({
      isOpen: true,
      item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item) return;
    try {
      await deleteMutation.mutateAsync(deleteModal.item.id);
      toast.success("Location deleted successfully.");
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      toast.error(
        extractErrorMessage(err, "Failed to delete transfer location.")
      );
    }
  };

  const typeLabel =
    activeType === "from" ? "Pick-up Location" : "Drop-off Location";

  return (
    <AdminShell
      eyebrow="Transfers & Transport"
      title="Transfer Locations"
      subtitle="Manage pick-up origins and drop-off destinations across Egypt with 5-language localization."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>Add {typeLabel}</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Type Toggle Tabs & Controls */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col gap-4">
          {/* Main Category Tabs: Pick-up (From) vs Drop-off (To) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#013E51]/10 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveType("from");
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeType === "from"
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
                }`}
              >
                <FiNavigation className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Pick-up Locations (From)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveType("to");
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeType === "to"
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
                }`}
              >
                <FiMapPin className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Drop-off Locations (To)</span>
              </button>
            </div>

            <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#013E51]/10 self-start sm:self-auto">
              Total {activeType === "from" ? "Pick-up" : "Drop-off"} Points:{" "}
              <strong className="font-bold">{locations.length}</strong>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location name or UUID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Error Banner */}
        {locationsQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              locationsQuery.error,
              "Failed to load transfer locations from server."
            )}
          </div>
        )}

        {/* Table */}
        <TransferLocationsTable
          items={filteredItems}
          isLoading={locationsQuery.isLoading}
          type={activeType}
          onEdit={handleEdit}
          onDelete={handleDeletePrompt}
        />

        {/* Form Drawer */}
        <TransferLocationFormDrawer
          isOpen={formDrawer.isOpen}
          mode={formDrawer.mode}
          type={activeType}
          item={formDrawer.item}
          onClose={() =>
            setFormDrawer({
              isOpen: false,
              mode: "create",
              item: null,
            })
          }
        />

        {/* Delete Modal */}
        <TransferLocationDeleteModal
          isOpen={deleteModal.isOpen}
          item={deleteModal.item}
          type={activeType}
          isPending={deleteMutation.isPending}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteModal({ isOpen: false, item: null })}
        />
      </div>
    </AdminShell>
  );
}
