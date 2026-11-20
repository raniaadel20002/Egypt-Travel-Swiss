"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { ServiceApiItem } from "@/models/service";
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/features/services/useServices";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import ServicesTable from "./ServicesTable";
import ServiceFormDrawer from "./ServiceFormDrawer";
import ServiceImagesDrawer from "./ServiceImagesDrawer";
import ServiceDeleteModal from "./ServiceDeleteModal";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export default function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    item: ServiceApiItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [imagesDrawer, setImagesDrawer] = useState<{
    isOpen: boolean;
    service: ServiceApiItem | null;
  }>({
    isOpen: false,
    service: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: ServiceApiItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const servicesQuery = useServicesQuery({ language: "EN" });
  const deleteMutation = useDeleteServiceMutation();

  const services = servicesQuery.data || [];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return services;

    return services.filter((item) => {
      const matchName = item.name?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchId = String(item.id).includes(q);
      return matchName || matchDesc || matchId;
    });
  }, [services, searchQuery]);

  const handleCreate = () => {
    setFormDrawer({
      isOpen: true,
      mode: "create",
      item: null,
    });
  };

  const handleEdit = (item: ServiceApiItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "edit",
      item,
    });
  };

  const handleManageImages = (item: ServiceApiItem) => {
    setImagesDrawer({
      isOpen: true,
      service: item,
    });
  };

  const handleDeletePrompt = (item: ServiceApiItem) => {
    setDeleteModal({
      isOpen: true,
      item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item) return;

    try {
      await deleteMutation.mutateAsync(deleteModal.item.id);
      toast.success("Service deleted successfully.");
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete service."));
    }
  };

  return (
    <AdminShell
      eyebrow="Tours & Content"
      title="Trip Services"
      subtitle="Manage add-ons, extras, and bespoke service packages available for group and private excursions."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Service</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search & Stats Bar */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by title, description, or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#013E51]/10 self-start sm:self-auto">
            Total Services: <span className="font-bold">{services.length}</span>
          </div>
        </div>

        {/* Error Banner */}
        {servicesQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              servicesQuery.error,
              "Failed to load services from Touristy server."
            )}
          </div>
        )}

        {/* Table */}
        <ServicesTable
          items={filteredItems}
          isLoading={servicesQuery.isLoading}
          onEdit={handleEdit}
          onManageImages={handleManageImages}
          onDelete={handleDeletePrompt}
        />

        {/* Form Drawer */}
        <ServiceFormDrawer
          isOpen={formDrawer.isOpen}
          mode={formDrawer.mode}
          item={formDrawer.item}
          onClose={() => setFormDrawer((prev) => ({ ...prev, isOpen: false }))}
        />

        {/* Images Drawer */}
        <ServiceImagesDrawer
          isOpen={imagesDrawer.isOpen}
          service={
            services.find((s) => s.id === imagesDrawer.service?.id) ||
            imagesDrawer.service
          }
          onClose={() => setImagesDrawer({ isOpen: false, service: null })}
        />

        {/* Delete Modal */}
        <ServiceDeleteModal
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
