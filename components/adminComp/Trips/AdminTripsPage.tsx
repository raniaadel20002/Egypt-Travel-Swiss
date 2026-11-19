"use client";

import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { TripApiItem } from "@/models/trip";
import {
  useDeactivateTripMutation,
  useReactivateTripMutation,
  useTripsQuery,
} from "@/features/trips/useTrips";
import { useDestinationsQuery } from "@/features/destinations/useDestinations";
import { useTripTypesQuery } from "@/features/tripTypes/useTripTypes";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import TripsFiltersBar from "./TripsFiltersBar";
import TripsTable from "./TripsTable";
import TripFormDrawer from "./TripFormDrawer";
import TripImagesDrawer from "./TripImagesDrawer";
import TripServicesDrawer from "./TripServicesDrawer";
import TripStatusModal from "./TripStatusModal";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export default function AdminTripsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "deactivated">("all");
  const [destinationId, setDestinationId] = useState<number | "all">("all");
  const [typeId, setTypeId] = useState<number | "all">("all");
  const [category, setCategory] = useState<number | "all">("all");

  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    item: TripApiItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [imagesDrawer, setImagesDrawer] = useState<{
    isOpen: boolean;
    trip: TripApiItem | null;
  }>({
    isOpen: false,
    trip: null,
  });

  const [servicesDrawer, setServicesDrawer] = useState<{
    isOpen: boolean;
    trip: TripApiItem | null;
  }>({
    isOpen: false,
    trip: null,
  });

  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    item: TripApiItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const tripsQuery = useTripsQuery({
    includeInactive: true,
    language: "EN",
  });
  const destinationsQuery = useDestinationsQuery({ language: "EN" });
  const tripTypesQuery = useTripTypesQuery({ language: "EN" });

  const deactivateMutation = useDeactivateTripMutation();
  const reactivateMutation = useReactivateTripMutation();

  const trips = tripsQuery.data || [];
  const destinations = destinationsQuery.data || [];
  const tripTypes = tripTypesQuery.data || [];

  const counts = useMemo(() => {
    const active = trips.filter((t) => t.isActive).length;
    return {
      all: trips.length,
      active,
      deactivated: trips.length - active,
    };
  }, [trips]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    statusFilter !== "all" ||
    destinationId !== "all" ||
    typeId !== "all" ||
    category !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDestinationId("all");
    setTypeId("all");
    setCategory("all");
  };

  const filteredItems = useMemo(() => {
    return trips.filter((item) => {
      if (statusFilter === "active" && !item.isActive) return false;
      if (statusFilter === "deactivated" && item.isActive) return false;

      if (destinationId !== "all") {
        if (item.destinationInfo?.id !== destinationId) return false;
      }

      if (typeId !== "all") {
        const matchedType = tripTypes.find((t) => t.id === typeId);
        if (
          matchedType &&
          item.tripTypeName?.toLowerCase() !== matchedType.name.toLowerCase()
        ) {
          return false;
        }
      }

      if (category !== "all") {
        const isPrivate = item.categoryName?.toLowerCase() === "private";
        if (category === 1 && !isPrivate) return false;
        if (category === 0 && isPrivate) return false;
      }

      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const matchName = item.name?.toLowerCase().includes(q);
        const matchMarker = item.markerID?.toLowerCase().includes(q);
        const matchDest = item.destinationInfo?.name?.toLowerCase().includes(q);
        const matchId = String(item.id).includes(q);
        if (!matchName && !matchMarker && !matchDest && !matchId) {
          return false;
        }
      }

      return true;
    });
  }, [trips, statusFilter, destinationId, typeId, category, searchQuery, tripTypes]);

  const handleCreate = () => {
    setFormDrawer({
      isOpen: true,
      mode: "create",
      item: null,
    });
  };

  const handleEdit = (item: TripApiItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "edit",
      item,
    });
  };

  const handleManageImages = (item: TripApiItem) => {
    setImagesDrawer({
      isOpen: true,
      trip: item,
    });
  };

  const handleManageServices = (item: TripApiItem) => {
    setServicesDrawer({
      isOpen: true,
      trip: item,
    });
  };

  const handleToggleStatusPrompt = (item: TripApiItem) => {
    setStatusModal({
      isOpen: true,
      item,
    });
  };

  const handleToggleStatusConfirm = async () => {
    if (!statusModal.item) return;

    const item = statusModal.item;
    try {
      if (item.isActive) {
        await deactivateMutation.mutateAsync(item.id);
        toast.success(`"${item.name}" deactivated.`);
      } else {
        await reactivateMutation.mutateAsync(item.id);
        toast.success(`"${item.name}" reactivated.`);
      }
      setStatusModal({ isOpen: false, item: null });
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          `Failed to ${item.isActive ? "deactivate" : "reactivate"} excursion.`
        )
      );
    }
  };

  return (
    <AdminShell
      eyebrow="Tours & Content"
      title="Trips & Excursions"
      subtitle="Publish, edit, and maintain itineraries, pricing tiers, and activity programs across Egypt."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Excursion</span>
        </button>
      }
    >
      <div className="space-y-6">
        <TripsFiltersBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          destinationId={destinationId}
          onDestinationChange={setDestinationId}
          typeId={typeId}
          onTypeChange={setTypeId}
          category={category}
          onCategoryChange={setCategory}
          destinations={destinations}
          tripTypes={tripTypes}
          counts={counts}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {tripsQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              tripsQuery.error,
              "Failed to load excursions from Touristy server."
            )}
          </div>
        )}

        <TripsTable
          items={filteredItems}
          isLoading={tripsQuery.isLoading}
          onEdit={handleEdit}
          onManageImages={handleManageImages}
          onManageServices={handleManageServices}
          onToggleStatus={handleToggleStatusPrompt}
        />

        <TripFormDrawer
          isOpen={formDrawer.isOpen}
          mode={formDrawer.mode}
          item={formDrawer.item}
          destinations={destinations}
          tripTypes={tripTypes}
          onClose={() => setFormDrawer((prev) => ({ ...prev, isOpen: false }))}
        />

        <TripImagesDrawer
          isOpen={imagesDrawer.isOpen}
          trip={
            trips.find((t) => t.id === imagesDrawer.trip?.id) ||
            imagesDrawer.trip
          }
          onClose={() => setImagesDrawer({ isOpen: false, trip: null })}
        />

        <TripServicesDrawer
          isOpen={servicesDrawer.isOpen}
          trip={
            trips.find((t) => t.id === servicesDrawer.trip?.id) ||
            servicesDrawer.trip
          }
          onClose={() => setServicesDrawer({ isOpen: false, trip: null })}
        />

        <TripStatusModal
          isOpen={statusModal.isOpen}
          item={statusModal.item}
          isLoading={
            deactivateMutation.isPending || reactivateMutation.isPending
          }
          onClose={() => setStatusModal({ isOpen: false, item: null })}
          onConfirm={handleToggleStatusConfirm}
        />
      </div>
    </AdminShell>
  );
}
