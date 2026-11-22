"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { HotelApiItem } from "@/models/hotel";
import {
  useDeleteHotelMutation,
  useHotelsQuery,
} from "@/features/hotels/useHotels";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import HotelsTable from "./HotelsTable";
import HotelFormDrawer from "./HotelFormDrawer";
import HotelFacilitiesReorderDrawer from "./HotelFacilitiesReorderDrawer";
import HotelImagesDrawer from "./HotelImagesDrawer";
import HotelRatePlansDrawer from "./HotelRatePlansDrawer";
import HotelDeleteModal from "./HotelDeleteModal";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export default function AdminHotelsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    item: HotelApiItem | null;
  }>({ isOpen: false, mode: "create", item: null });

  const [reorderDrawer, setReorderDrawer] = useState<{
    isOpen: boolean;
    hotel: HotelApiItem | null;
  }>({ isOpen: false, hotel: null });

  const [imagesDrawer, setImagesDrawer] = useState<{
    isOpen: boolean;
    hotel: HotelApiItem | null;
  }>({ isOpen: false, hotel: null });

  const [ratePlansDrawer, setRatePlansDrawer] = useState<{
    isOpen: boolean;
    hotel: HotelApiItem | null;
  }>({ isOpen: false, hotel: null });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: HotelApiItem | null;
  }>({ isOpen: false, item: null });

  const hotelsQuery = useHotelsQuery({ Language: "EN" });
  const deleteMutation = useDeleteHotelMutation();

  const hotels = hotelsQuery.data || [];

  const filteredItems = useMemo(() => {
    let result = hotels;

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((item) => {
        const matchName = item.name?.toLowerCase().includes(q);
        const matchLoc = item.location?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchId = String(item.id).includes(q);
        return matchName || matchLoc || matchDesc || matchId;
      });
    }

    return result;
  }, [hotels, searchQuery]);

  const handleCreate = () => {
    setFormDrawer({
      isOpen: true,
      mode: "create",
      item: null,
    });
  };

  const handleEdit = (item: HotelApiItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "edit",
      item,
    });
  };

  const handleReorderFacilities = (item: HotelApiItem) => {
    setReorderDrawer({
      isOpen: true,
      hotel: item,
    });
  };

  const handleManageImages = (item: HotelApiItem) => {
    setImagesDrawer({
      isOpen: true,
      hotel: item,
    });
  };

  const handleManageRatePlans = (item: HotelApiItem) => {
    setRatePlansDrawer({
      isOpen: true,
      hotel: item,
    });
  };

  const handleDeletePrompt = (item: HotelApiItem) => {
    setDeleteModal({
      isOpen: true,
      item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item) return;

    try {
      await deleteMutation.mutateAsync(deleteModal.item.id);
      toast.success("Hotel deleted successfully.");
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete hotel."));
    }
  };

  return (
    <AdminShell
      eyebrow="Accommodation & Lodging"
      title="Hotels & Resorts"
      subtitle="Publish and manage luxury resorts, beach hotels, and Nile cruisers with multilingual amenities."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Hotel</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotel name, location, or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#013E51]/10 self-start sm:self-auto shrink-0">
            Total Hotels: <span className="font-bold">{hotels.length}</span>
          </div>
        </div>

        {/* Error Banner */}
        {hotelsQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              hotelsQuery.error,
              "Failed to load hotels from server."
            )}
          </div>
        )}

        {/* Table */}
        <HotelsTable
          items={filteredItems}
          isLoading={hotelsQuery.isLoading}
          onEdit={handleEdit}
          onManageRatePlans={handleManageRatePlans}
          onReorderFacilities={handleReorderFacilities}
          onManageImages={handleManageImages}
          onDelete={handleDeletePrompt}
        />

        {/* Form Drawer */}
        <HotelFormDrawer
          isOpen={formDrawer.isOpen}
          mode={formDrawer.mode}
          item={formDrawer.item}
          onClose={() => setFormDrawer((prev) => ({ ...prev, isOpen: false }))}
        />

        {/* Rate Plans Drawer */}
        <HotelRatePlansDrawer
          isOpen={ratePlansDrawer.isOpen}
          hotel={
            hotels.find((h) => h.id === ratePlansDrawer.hotel?.id) ||
            ratePlansDrawer.hotel
          }
          onClose={() =>
            setRatePlansDrawer({
              isOpen: false,
              hotel: null,
            })
          }
        />

        {/* Reorder Facilities Drawer */}
        <HotelFacilitiesReorderDrawer
          isOpen={reorderDrawer.isOpen}
          hotel={
            hotels.find((h) => h.id === reorderDrawer.hotel?.id) ||
            reorderDrawer.hotel
          }
          onClose={() =>
            setReorderDrawer({
              isOpen: false,
              hotel: null,
            })
          }
        />

        {/* Manage Images Drawer */}
        <HotelImagesDrawer
          isOpen={imagesDrawer.isOpen}
          hotel={
            hotels.find((h) => h.id === imagesDrawer.hotel?.id) ||
            imagesDrawer.hotel
          }
          onClose={() =>
            setImagesDrawer({
              isOpen: false,
              hotel: null,
            })
          }
        />

        {/* Delete Modal */}
        <HotelDeleteModal
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
