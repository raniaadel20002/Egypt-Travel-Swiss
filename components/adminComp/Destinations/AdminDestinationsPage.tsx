"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { DestinationApiItem } from "@/models/destination";
import {
  useDeleteDestinationMutation,
  useDestinationsQuery,
} from "@/features/destinations/useDestinations";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import DestinationsTable from "./DestinationsTable";
import DestinationFormDrawer from "./DestinationFormDrawer";
import DestinationDeleteModal from "./DestinationDeleteModal";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

type FilterTab = "all" | "featured" | "standard";

export default function AdminDestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit-full" | "edit-image";
    item: DestinationApiItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: DestinationApiItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const destinationsQuery = useDestinationsQuery({ language: "EN" });
  const deleteMutation = useDeleteDestinationMutation();

  const destinations = destinationsQuery.data || [];

  const counts = useMemo(() => {
    const featured = destinations.filter((d) => d.isFeatured).length;
    return {
      all: destinations.length,
      featured,
      standard: destinations.length - featured,
    };
  }, [destinations]);

  const filteredItems = useMemo(() => {
    let result = destinations;

    if (activeTab === "featured") {
      result = result.filter((item) => item.isFeatured);
    } else if (activeTab === "standard") {
      result = result.filter((item) => !item.isFeatured);
    }

    const query = searchQuery.trim().toLowerCase();
    if (!query) return result;

    return result.filter((item) => {
      const matchName = item.name?.toLowerCase().includes(query);
      const matchId = String(item.id).includes(query);
      return matchName || matchId;
    });
  }, [destinations, activeTab, searchQuery]);

  const handleCreate = () => {
    setFormDrawer({
      isOpen: true,
      mode: "create",
      item: null,
    });
  };

  const handleEdit = (item: DestinationApiItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "edit-full",
      item,
    });
  };

  const handleEditImage = (item: DestinationApiItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "edit-image",
      item,
    });
  };

  const handleDeletePrompt = (item: DestinationApiItem) => {
    setDeleteModal({
      isOpen: true,
      item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item) return;

    try {
      await deleteMutation.mutateAsync(deleteModal.item.id);
      toast.success("Destination deleted successfully.");
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete destination."));
    }
  };

  return (
    <AdminShell
      eyebrow="Tours & Content"
      title="Destination Management"
      subtitle="Configure Egyptian tourist hubs, featured cities, and regional guides across all 5 languages."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Destination</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Tabs Bar */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city name or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                activeTab === "all"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#013E51] hover:bg-gray-200/60"
              }`}
            >
              <span>All</span>
              <span className="text-[11px] opacity-80">({counts.all})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("featured")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                activeTab === "featured"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#013E51] hover:bg-gray-200/60"
              }`}
            >
              <span>Featured</span>
              <span className="text-[11px] opacity-80">({counts.featured})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("standard")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                activeTab === "standard"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#013E51] hover:bg-gray-200/60"
              }`}
            >
              <span>Standard</span>
              <span className="text-[11px] opacity-80">({counts.standard})</span>
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {destinationsQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              destinationsQuery.error,
              "Failed to load destinations from Touristy server."
            )}
          </div>
        )}

        {/* Destinations Data Table */}
        <DestinationsTable
          items={filteredItems}
          isLoading={destinationsQuery.isLoading}
          onEdit={handleEdit}
          onEditImage={handleEditImage}
          onDelete={handleDeletePrompt}
        />

        {/* Create / Edit Form Drawer */}
        <DestinationFormDrawer
          isOpen={formDrawer.isOpen}
          mode={formDrawer.mode}
          item={formDrawer.item}
          onClose={() =>
            setFormDrawer((prev) => ({ ...prev, isOpen: false }))
          }
        />

        {/* Delete Confirmation Modal */}
        <DestinationDeleteModal
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
