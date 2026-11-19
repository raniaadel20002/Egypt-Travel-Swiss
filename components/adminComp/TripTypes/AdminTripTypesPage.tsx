"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { TripTypeItem } from "@/models/tripType";
import {
  useDeleteTripTypeMutation,
  useTripTypesQuery,
} from "@/features/tripTypes/useTripTypes";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import TripTypesTable from "./TripTypesTable";
import TripTypeFormModal from "./TripTypeFormModal";
import TripTypeDeleteModal from "./TripTypeDeleteModal";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export default function AdminTripTypesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit-full" | "edit-image";
    item: TripTypeItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: TripTypeItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const tripTypesQuery = useTripTypesQuery({ language: "EN" });
  const deleteMutation = useDeleteTripTypeMutation();

  const tripTypes = tripTypesQuery.data || [];

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tripTypes;

    return tripTypes.filter((item) => {
      const matchName = item.name?.toLowerCase().includes(query);
      const matchId = String(item.id).includes(query);
      return matchName || matchId;
    });
  }, [tripTypes, searchQuery]);

  const handleCreate = () => {
    setFormModal({
      isOpen: true,
      mode: "create",
      item: null,
    });
  };

  const handleEdit = (item: TripTypeItem) => {
    setFormModal({
      isOpen: true,
      mode: "edit-full",
      item,
    });
  };

  const handleEditImage = (item: TripTypeItem) => {
    setFormModal({
      isOpen: true,
      mode: "edit-image",
      item,
    });
  };

  const handleDeletePrompt = (item: TripTypeItem) => {
    setDeleteModal({
      isOpen: true,
      item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item) return;

    try {
      await deleteMutation.mutateAsync(deleteModal.item.id);
      toast.success("Trip type deleted successfully.");
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete trip type."));
    }
  };

  return (
    <AdminShell
      eyebrow="Tours & Content"
      title="Trip Types & Categories"
      subtitle="Manage excursion classifications, activity styles, and 5-language category names."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Trip Type</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by English name or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="text-xs font-bold text-[#888888] hidden sm:block">
            {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}
          </div>
        </div>

        {/* Error Banner */}
        {tripTypesQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              tripTypesQuery.error,
              "Failed to load trip types from Touristy server."
            )}
          </div>
        )}

        {/* Trip Types Data Table */}
        <TripTypesTable
          items={filteredItems}
          isLoading={tripTypesQuery.isLoading}
          onEdit={handleEdit}
          onEditImage={handleEditImage}
          onDelete={handleDeletePrompt}
        />

        {/* Create / Edit Form Modal */}
        <TripTypeFormModal
          isOpen={formModal.isOpen}
          mode={formModal.mode}
          item={formModal.item}
          onClose={() =>
            setFormModal((prev) => ({ ...prev, isOpen: false }))
          }
        />

        {/* Delete Confirmation Modal */}
        <TripTypeDeleteModal
          isOpen={deleteModal.isOpen}
          item={deleteModal.item}
          isLoading={deleteMutation.isPending}
          onClose={() => setDeleteModal({ isOpen: false, item: null })}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </AdminShell>
  );
}
