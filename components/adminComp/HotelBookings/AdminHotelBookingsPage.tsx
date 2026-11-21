"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import {
  HotelBookingApiItem,
  HotelBookingStatusEnum,
} from "@/models/hotelBooking";
import {
  useDeleteHotelBookingMutation,
  useHotelBookingsQuery,
  useUpdateHotelBookingStatusMutation,
} from "@/features/hotels/useHotelBookings";
import { useHotelsQuery } from "@/features/hotels/useHotels";
import HotelBookingsFiltersBar from "./HotelBookingsFiltersBar";
import HotelBookingsTable from "./HotelBookingsTable";
import HotelBookingDetailsDrawer from "./HotelBookingDetailsDrawer";
import HotelBookingCreateDrawer from "./HotelBookingCreateDrawer";
import HotelBookingDeleteModal from "./HotelBookingDeleteModal";
import HotelBookingsMetricsGrid from "./HotelBookingsMetricsGrid";
import { parseHotelBookingStatus } from "./hotelBookingHelpers";

export default function AdminHotelBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<
    HotelBookingStatusEnum | "all"
  >("all");
  const [hotelIdFilter, setHotelIdFilter] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedBooking, setSelectedBooking] =
    useState<HotelBookingApiItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingBooking, setDeletingBooking] =
    useState<HotelBookingApiItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Queries
  const { data: rawBookings = [], isLoading } = useHotelBookingsQuery({
    HotelId: hotelIdFilter === "all" ? undefined : hotelIdFilter,
    Status: statusFilter === "all" ? undefined : statusFilter,
    Nationality: nationalityFilter.trim() || undefined,
  });

  const { data: allBookings = [] } = useHotelBookingsQuery({});
  const { data: hotels = [] } = useHotelsQuery({ PageSize: 100 });

  const updateStatusMutation = useUpdateHotelBookingStatusMutation();
  const deleteMutation = useDeleteHotelBookingMutation();

  // Client-side search across guest name, email, WhatsApp, hotel name
  const filteredBookings = useMemo(() => {
    if (!searchQuery.trim()) return rawBookings;
    const q = searchQuery.trim().toLowerCase();
    return rawBookings.filter((b) => {
      const inGuest =
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.whatsApp.toLowerCase().includes(q);
      const inHotel = (b.hotelName || "").toLowerCase().includes(q);
      const inNat = (b.nationality || "").toLowerCase().includes(q);
      return inGuest || inHotel || inNat;
    });
  }, [rawBookings, searchQuery]);

  // Pagination slice
  const totalCount = filteredBookings.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const paginatedBookings = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, pageNumber, pageSize]);

  // Overview metrics (calculated from unfiltered allBookings)
  const metricsSource = allBookings.length > 0 ? allBookings : rawBookings;
  const metrics = useMemo(() => {
    let pending = 0;
    let confirmed = 0;
    let finished = 0;
    let cancelled = 0;

    metricsSource.forEach((b) => {
      const s = parseHotelBookingStatus(b.status);
      if (s === HotelBookingStatusEnum.Pending) pending += 1;
      else if (s === HotelBookingStatusEnum.Confirmed) confirmed += 1;
      else if (s === HotelBookingStatusEnum.Finished) finished += 1;
      else if (s === HotelBookingStatusEnum.Cancelled) cancelled += 1;
    });

    return {
      total: metricsSource.length,
      pending,
      confirmed,
      finished,
      cancelled,
    };
  }, [metricsSource]);

  const handleStatusChange = async (
    id: number,
    newStatus: HotelBookingStatusEnum
  ) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      toast.success("Hotel booking status updated.");
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBooking) return;
    try {
      await deleteMutation.mutateAsync(deletingBooking.id);
      toast.success("Hotel reservation deleted.");
      setIsDeleteModalOpen(false);
      setDeletingBooking(null);
    } catch {
      toast.error("Failed to delete hotel booking.");
    }
  };

  return (
    <AdminShell
      eyebrow="Reservations"
      title="Hotel & Resort Bookings"
      subtitle="Review guest reservations, stay details, room rate plans, and booking statuses."
      action={
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013E51] text-white text-xs sm:text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Hotel Booking</span>
        </button>
      }
    >
      <div className="space-y-6 font-[family-name:var(--font-lato)]">
        {/* Top Metric Cards */}
        <HotelBookingsMetricsGrid metrics={metrics} />

        {/* Filters */}
        <HotelBookingsFiltersBar
          statusFilter={statusFilter}
          onStatusChange={(val) => {
            setStatusFilter(val);
            setPageNumber(1);
          }}
          hotelIdFilter={hotelIdFilter}
          onHotelIdChange={(val) => {
            setHotelIdFilter(val);
            setPageNumber(1);
          }}
          hotels={hotels}
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setPageNumber(1);
          }}
          nationalityFilter={nationalityFilter}
          onNationalityChange={(val) => {
            setNationalityFilter(val);
            setPageNumber(1);
          }}
          pageSize={pageSize}
          onPageSizeChange={(val) => {
            setPageSize(val);
            setPageNumber(1);
          }}
          onCreateClick={() => setIsCreateOpen(true)}
        />

        {/* Table */}
        <HotelBookingsTable
          bookings={paginatedBookings}
          isLoading={isLoading}
          onViewDetails={(item) => {
            setSelectedBooking(item);
            setIsDetailsOpen(true);
          }}
          onStatusChange={handleStatusChange}
          onDeleteClick={(item) => {
            setDeletingBooking(item);
            setIsDeleteModalOpen(true);
          }}
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] text-xs text-gray-600">
            <span>
              Showing Page <strong>{pageNumber}</strong> of{" "}
              <strong>{totalPages}</strong> ({totalCount} total)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={pageNumber >= totalPages}
                onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Drawer */}
      <HotelBookingDetailsDrawer
        booking={selectedBooking}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onStatusChange={handleStatusChange}
      />

      {/* Create Drawer */}
      <HotelBookingCreateDrawer
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Delete Modal */}
      <HotelBookingDeleteModal
        booking={deletingBooking}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingBooking(null);
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />
    </AdminShell>
  );
}
