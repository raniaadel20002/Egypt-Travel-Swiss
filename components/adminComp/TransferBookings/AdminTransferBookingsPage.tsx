"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiCalendar, FiClock, FiCheck, FiCheckCircle, FiDollarSign, FiPlus } from "react-icons/fi";
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
  const { data: allBookings = [] } = useTransferBookingsQuery({ pageSize: 1000 });
  const updateStatusMutation = useUpdateTransferBookingStatusMutation();

  const handleStatusChange = async (id: string, newStatus: TransferBookingStatusEnum) => {
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
  const totalCount = metricsSource.length;
  const pendingCount = metricsSource.filter(
    (b) =>
      parseTransferStatus(b.status) === TransferBookingStatusEnum.Pending &&
      !b.isCompleted
  ).length;
  const confirmedCount = metricsSource.filter(
    (b) =>
      parseTransferStatus(b.status) === TransferBookingStatusEnum.Confirmed &&
      !b.isCompleted
  ).length;
  const completedCount = metricsSource.filter(
    (b) => isTransferBookingCompleted(b)
  ).length;
  const totalRevenue = metricsSource.reduce((acc, b) => {
    const val = b.pricing?.finalPriceConverted ?? b.pricing?.finalPriceUsd ?? 0;
    return acc + Number(val || 0);
  }, 0);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
              <FiCalendar className="w-5 h-5 text-[#E8B34A]" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Total
              </span>
              <span className="text-xl font-extrabold text-[#013E51]">{totalCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <FiClock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Pending
              </span>
              <span className="text-xl font-extrabold text-amber-700">{pendingCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <FiCheck className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Confirmed
              </span>
              <span className="text-xl font-extrabold text-sky-700">{confirmedCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <FiCheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Completed
              </span>
              <span className="text-xl font-extrabold text-emerald-700">{completedCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
              <span className="text-lg font-black text-[#E8B34A] leading-none">&euro;</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Revenue (EUR)
              </span>
              <span className="text-xl font-extrabold text-[#013E51]">
                &euro;{totalRevenue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

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
