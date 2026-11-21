"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import {
  TransferBookingApiItem,
  TransferBookingStatusEnum,
} from "@/models/transferBooking";
import {
  useTransferBookingsQuery,
  useUpdateTransferBookingStatusMutation,
} from "@/features/transfers/useTransferBookings";
import {
  parseTransferStatus,
  isTransferBookingCompleted,
} from "./transferBookingHelpers";
import TransferBookingsMetricsGrid from "./TransferBookingsMetricsGrid";
import TransferBookingsFiltersBar from "./TransferBookingsFiltersBar";
import TransferBookingsTable from "./TransferBookingsTable";
import TransferBookingDetailsDrawer from "./TransferBookingDetailsDrawer";
import TransferBookingCompleteModal from "./TransferBookingCompleteModal";
import TransferBookingCreateDrawer from "./TransferBookingCreateDrawer";

export default function AdminTransferBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<TransferBookingStatusEnum | "all">("all");
  const [searchEmail, setSearchEmail] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedBooking, setSelectedBooking] = useState<TransferBookingApiItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [completingBooking, setCompletingBooking] = useState<TransferBookingApiItem | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const queryParams = {
    status: statusFilter === "all" ? undefined : statusFilter,
    email: searchEmail.trim() || undefined,
    pageNumber,
    pageSize,
  };

  const { data: bookings = [], isLoading, isFetching } = useTransferBookingsQuery(queryParams);
  const { data: allBookings = [] } = useTransferBookingsQuery({ pageSize: 100 });
  const updateStatusMutation = useUpdateTransferBookingStatusMutation();

  const handleStatusChange = async (id: string, newStatus: TransferBookingStatusEnum) => {
    const existing =
      bookings.find((b) => b.id === id) ||
      allBookings.find((b) => b.id === id) ||
      (selectedBooking?.id === id ? selectedBooking : null);

    if (existing && isTransferBookingCompleted(existing)) {
      toast.error("Completed transfer bookings cannot be modified.");
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      toast.success("Transfer booking status updated.");
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleViewDetails = (item: TransferBookingApiItem) => {
    setSelectedBooking(item);
    setIsDetailsOpen(true);
  };

  const handleOpenComplete = (item: TransferBookingApiItem) => {
    setCompletingBooking(item);
    setIsCompleteModalOpen(true);
  };

  // Metrics summary
  const metricsSource = allBookings.length > 0 ? allBookings : bookings;

  const metrics = useMemo(() => {
    let pending = 0;
    let confirmed = 0;
    let completed = 0;
    let cancelled = 0;
    let revenueEur = 0;

    metricsSource.forEach((b) => {
      const isComp = isTransferBookingCompleted(b);
      const s = parseTransferStatus(b.status);

      if (isComp) {
        completed += 1;
      } else if (s === TransferBookingStatusEnum.Pending) {
        pending += 1;
      } else if (s === TransferBookingStatusEnum.Confirmed) {
        confirmed += 1;
      } else if (s === TransferBookingStatusEnum.Cancelled) {
        cancelled += 1;
      }

      if (s !== TransferBookingStatusEnum.Cancelled) {
        const val = b.pricing?.finalPriceConverted ?? b.pricing?.finalPriceUsd ?? 0;
        revenueEur += Number(val || 0);
      }
    });

    return {
      total: metricsSource.length,
      pending,
      confirmed,
      completed,
      cancelled,
      revenueEur,
    };
  }, [metricsSource]);

  return (
    <AdminShell
      eyebrow="Reservations"
      title="Transfer Bookings"
      subtitle="Manage and monitor all airport and intercity passenger transfer reservations in EUR (&euro;)."
      action={
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013E51] text-white text-xs sm:text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Transfer Booking</span>
        </button>
      }
    >
      <div className="space-y-6 font-[family-name:var(--font-lato)]">
        {/* Metrics Grid */}
        <TransferBookingsMetricsGrid metrics={metrics} />

        {/* Filters Bar */}
        <TransferBookingsFiltersBar
          statusFilter={statusFilter}
          onStatusChange={(val) => {
            setStatusFilter(val);
            setPageNumber(1);
          }}
          searchEmail={searchEmail}
          onSearchChange={(val) => {
            setSearchEmail(val);
            setPageNumber(1);
          }}
          pageSize={pageSize}
          onPageSizeChange={(val) => {
            setPageSize(val);
            setPageNumber(1);
          }}
          onCreateClick={() => setIsCreateOpen(true)}
        />

        {/* Bookings Table */}
        <TransferBookingsTable
          bookings={bookings}
          isLoading={isLoading || isFetching}
          onViewDetails={handleViewDetails}
          onStatusChange={handleStatusChange}
          onCompleteClick={handleOpenComplete}
        />

        {/* Pagination Bar */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] text-xs text-gray-600">
          <span>Page {pageNumber}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={bookings.length < pageSize}
              onClick={() => setPageNumber((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Drawers and Modals */}
        <TransferBookingDetailsDrawer
          booking={selectedBooking}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onStatusChange={handleStatusChange}
          onCompleteClick={handleOpenComplete}
        />

        <TransferBookingCompleteModal
          booking={completingBooking}
          isOpen={isCompleteModalOpen}
          onClose={() => setIsCompleteModalOpen(false)}
        />

        <TransferBookingCreateDrawer
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      </div>
    </AdminShell>
  );
}
