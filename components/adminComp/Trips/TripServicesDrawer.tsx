"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiCheck,
  FiExternalLink,
  FiLayers,
  FiLoader,
  FiSearch,
} from "react-icons/fi";
import { toast } from "sonner";
import { TripApiItem } from "@/models/trip";
import {
  useAssociateTripServicesMutation,
  useServicesQuery,
  useTripServicesQuery,
} from "@/features/services/useServices";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import TripServiceSelectCard from "./TripServiceSelectCard";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface TripServicesDrawerProps {
  isOpen: boolean;
  trip: TripApiItem | null;
  onClose: () => void;
}

export default function TripServicesDrawer({
  isOpen,
  trip,
  onClose,
}: TripServicesDrawerProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const allServicesQuery = useServicesQuery({ language: "EN" });
  const tripServicesQuery = useTripServicesQuery(
    trip?.id || null,
    isOpen && Boolean(trip?.id)
  );

  const associateMutation = useAssociateTripServicesMutation();

  const allServices = allServicesQuery.data || [];
  const assignedServices = tripServicesQuery.data || [];

  // Initialize selected IDs with currently assigned services once query resolves
  useEffect(() => {
    if (!isOpen) {
      setSelectedIds(new Set());
      setSearchQuery("");
      return;
    }

    if (tripServicesQuery.data) {
      const initialSet = new Set(tripServicesQuery.data.map((s) => s.id));
      setSelectedIds(initialSet);
    }
  }, [isOpen, tripServicesQuery.data]);

  const toggleService = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    const allIds = filteredServices.map((s) => s.id);
    setSelectedIds(new Set(allIds));
  };

  const handleClearAll = () => {
    setSelectedIds(new Set());
  };

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allServices;

    return allServices.filter((s) => {
      const matchName = s.name?.toLowerCase().includes(q);
      const matchDesc = s.description?.toLowerCase().includes(q);
      const matchId = String(s.id).includes(q);
      return matchName || matchDesc || matchId;
    });
  }, [allServices, searchQuery]);

  const handleSave = async () => {
    if (!trip) return;

    try {
      await associateMutation.mutateAsync({
        tripId: trip.id,
        serviceIds: Array.from(selectedIds),
      });
      toast.success(
        `Updated ${selectedIds.size} ${
          selectedIds.size === 1 ? "service" : "services"
        } for "${trip.name}".`
      );
      onClose();
    } catch (err) {
      toast.error(
        extractErrorMessage(err, "Failed to update associated services.")
      );
    }
  };

  const isLoadingData =
    (isOpen && allServicesQuery.isLoading) ||
    (isOpen && tripServicesQuery.isLoading);
  const isSaving = associateMutation.isPending;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSaving}
      eyebrow={trip ? `ID #${trip.id} • Private Excursion` : "Private Excursion"}
      title="Private Services"
      subtitle={
        trip
          ? `Select add-on services bundled with "${trip.name}".`
          : "Manage private excursion services."
      }
      widthClassName="max-w-2xl sm:max-w-3xl"
      footer={
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs font-semibold text-[#013E51]">
            <span className="font-bold text-[#E8B34A]">{selectedIds.size}</span>{" "}
            of {allServices.length} Selected
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                  <span>Save Services</span>
                </>
              )}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Bulk Selection Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search available services..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-500 hover:bg-gray-100 transition cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#888888]">
            <span>
              Currently active on excursion: {assignedServices.length}
            </span>
            <Link
              href="/admin/services"
              className="inline-flex items-center gap-1 font-bold text-[#013E51] hover:text-[#E8B34A] transition"
            >
              <span>Manage Service Catalog</span>
              <FiExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingData ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-sm text-[#013E51]">
            <FiLoader className="w-6 h-6 animate-spin text-[#E8B34A]" />
            <span>Loading services for excursion...</span>
          </div>
        ) : allServices.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center">
            <FiLayers className="w-10 h-10 text-gray-300 mb-3" />
            <h4 className="font-bold text-[#013E51] text-base">
              No Services in Catalog
            </h4>
            <p className="text-xs text-gray-500 max-w-sm mt-1 mb-4">
              Create services first in the Private Services module before associating them with private excursions.
            </p>
            <Link
              href="/admin/services"
              className="px-4 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#025670] transition"
            >
              Go to Private Services
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredServices.map((service) => (
              <TripServiceSelectCard
                key={service.id}
                service={service}
                isSelected={selectedIds.has(service.id)}
                onToggle={toggleService}
              />
            ))}
          </div>
        )}
      </div>
    </AdminDrawer>
  );
}
