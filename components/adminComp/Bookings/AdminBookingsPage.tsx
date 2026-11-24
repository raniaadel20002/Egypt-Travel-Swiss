"use client";

import { useMemo, useState } from "react";
import { FiAlertCircle, FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import {
  BookingApiItem,
  BookingsQueryParams,
  BookingStatusFilter,
} from "@/models/booking";
import {
  useBookingsQuery,
  useConfirmBookingMutation,
  useDeleteBookingMutation,
  useFinishBookingMutation,
} from "@/features/bookings/useBookings";
import { useTripsQuery } from "@/features/trips/useTrips";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import BookingMetricsGrid from "./BookingMetricsGrid";
import BookingsFiltersBar from "./BookingsFiltersBar";
import BookingsTable from "./BookingsTable";
import BookingPaginationBar from "./BookingPaginationBar";
import BookingDetailsDrawer from "./BookingDetailsDrawer";
import BookingCreateDrawer from "./BookingCreateDrawer";

const PAGE_SIZE = 50;

export default function AdminBookingsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>("all");
  const [tripIdFilter, setTripIdFilter] = useState<number | "all">("all");
  const [dateFilter, setDateFilter] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");

  const [activeBookingId, setActiveBookingId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingBooking, setDeletingBooking] = useState<BookingApiItem | null>(null);

  const queryParams: BookingsQueryParams = useMemo(() => {
    const p: BookingsQueryParams = {
      PageNumber: pageNumber,
      PageSize: PAGE_SIZE,
    };
    if (searchQuery.trim()) p.SearchItem = searchQuery.trim();
    if (tripIdFilter !== "all") p.TripId = tripIdFilter;
    if (dateFilter.trim()) p.Date = dateFilter.trim();
    if (nationalityFilter.trim()) p.Nationality = nationalityFilter.trim();
    if (phoneFilter.trim()) p.Phone = phoneFilter.trim();
    return p;
  }, [
    pageNumber,
    searchQuery,
    tripIdFilter,
    dateFilter,
    nationalityFilter,
    phoneFilter,
  ]);

  const bookingsQuery = useBookingsQuery(queryParams);
  const tripsQuery = useTripsQuery({ language: "EN" });

  const confirmMutation = useConfirmBookingMutation();
  const finishMutation = useFinishBookingMutation();
  const deleteMutation = useDeleteBookingMutation();

  const isActionPending =
    confirmMutation.isPending || finishMutation.isPending || deleteMutation.isPending;

  const bookings = bookingsQuery.data || [];
  const trips = tripsQuery.data || [];

  const stats = useMemo(() => {
    let pending = 0;
    let confirmed = 0;
    let finished = 0;
    let revenue = 0;

    bookings.forEach((b) => {
      const s = b.status?.toLowerCase().trim();
      if (s === "pending") pending += 1;
      else if (s === "confirmed") confirmed += 1;
      else if (s === "finished") finished += 1;
      revenue += b.totalPrice || 0;
    });

    return { total: bookings.length, pending, confirmed, finished, revenue };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (statusFilter === "all") return bookings;
    return bookings.filter(
      (b) => b.status?.toLowerCase().trim() === statusFilter
    );
  }, [bookings, statusFilter]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTripIdFilter("all");
    setDateFilter("");
    setNationalityFilter("");
    setPhoneFilter("");
    setPageNumber(1);
  };

  const handleConfirm = async (bookingOrId: BookingApiItem | number) => {
    const id = typeof bookingOrId === "number" ? bookingOrId : bookingOrId.id;
    try {
      await confirmMutation.mutateAsync(id);
      toast.success(`Booking #${id} confirmed.`);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to confirm booking."));
    }
  };

  const handleFinish = async (bookingOrId: BookingApiItem | number) => {
    const id = typeof bookingOrId === "number" ? bookingOrId : bookingOrId.id;
    try {
      await finishMutation.mutateAsync(id);
      toast.success(`Booking #${id} marked as finished.`);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to finish booking."));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBooking) return;
    try {
      await deleteMutation.mutateAsync(deletingBooking.id);
      toast.success(`Booking #${deletingBooking.id} deleted.`);
      if (activeBookingId === deletingBooking.id) {
        setActiveBookingId(null);
      }
      setDeletingBooking(null);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete booking."));
    }
  };

  return (
    <AdminShell
      eyebrow="Reservations"
      title="Tour Bookings & Excursions"
      subtitle="Review, confirm, or modify traveler bookings across Egyptian tours and marine safaris in EUR (&euro;)."
      // action={
      //   <button
      //     type="button"
      //     onClick={() => setIsCreateOpen(true)}
      //     className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
      //   >
      //     <FiPlus className="w-4 h-4 text-[#E8B34A]" />
      //     <span>New Booking</span>
      //   </button>
      // }
    >
      <div className="space-y-6">
        {/* Metric Badges */}
        <BookingMetricsGrid stats={stats} />

        {/* Filters Bar */}
        <BookingsFiltersBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setPageNumber(1);
          }}
          statusFilter={statusFilter}
          onStatusChange={(val) => {
            setStatusFilter(val);
            setPageNumber(1);
          }}
          tripIdFilter={tripIdFilter}
          onTripIdChange={(val) => {
            setTripIdFilter(val);
            setPageNumber(1);
          }}
          dateFilter={dateFilter}
          onDateChange={(val) => {
            setDateFilter(val);
            setPageNumber(1);
          }}
          nationalityFilter={nationalityFilter}
          onNationalityChange={(val) => {
            setNationalityFilter(val);
            setPageNumber(1);
          }}
          phoneFilter={phoneFilter}
          onPhoneChange={(val) => {
            setPhoneFilter(val);
            setPageNumber(1);
          }}
          trips={trips}
          onReset={handleResetFilters}
        />

        {/* Error Banner */}
        {bookingsQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700 flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{extractErrorMessage(bookingsQuery.error, "Failed to load tour bookings.")}</span>
          </div>
        )}

        {/* Bookings Table */}
        <BookingsTable
          items={filteredBookings}
          isLoading={bookingsQuery.isLoading}
          onViewDetails={(b) => setActiveBookingId(b.id)}
          onConfirm={handleConfirm}
          onFinish={handleFinish}
          onDelete={(b) => setDeletingBooking(b)}
        />

        {/* Pagination Bar */}
        <BookingPaginationBar
          pageNumber={pageNumber}
          count={filteredBookings.length}
          pageSize={PAGE_SIZE}
          onPrev={() => setPageNumber((p) => Math.max(1, p - 1))}
          onNext={() => setPageNumber((p) => p + 1)}
        />

        {/* Details Drawer */}
        <BookingDetailsDrawer
          isOpen={Boolean(activeBookingId)}
          bookingId={activeBookingId}
          onClose={() => setActiveBookingId(null)}
          onConfirm={handleConfirm}
          onFinish={handleFinish}
          onDelete={(id) => {
            const found = bookings.find((b) => b.id === id);
            if (found) setDeletingBooking(found);
          }}
          isActionPending={isActionPending}
        />

        {/* Create Manual Booking Drawer */}
        <BookingCreateDrawer
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          trips={trips}
          onCreated={() => bookingsQuery.refetch()}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteDialog
          isOpen={Boolean(deletingBooking)}
          title={`Delete Booking #${deletingBooking?.id || ""}`}
          description={`Are you sure you want to delete the reservation for ${
            deletingBooking?.firstName || ""
          } ${
            deletingBooking?.lastName || ""
          }? This action will permanently remove this record.`}
          confirmLabel="Delete Booking"
          isPending={deleteMutation.isPending}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingBooking(null)}
        />
      </div>
    </AdminShell>
  );
}
