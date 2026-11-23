"use client";

import { useMemo, useState } from "react";
import { FiCalendar, FiClock, FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import {
  DivingBookingStatusEnum,
  DivingCourseBookingApiItem,
} from "@/models/divingCourseBooking";
import { useDivingCourseBookingsQuery } from "@/features/divingCourses/useDivingCourseBookings";
import DivingCourseBookingsFiltersBar from "./DivingCourseBookingsFiltersBar";
import DivingCourseBookingsTable from "./DivingCourseBookingsTable";
import DivingCourseBookingDetailsDrawer from "./DivingCourseBookingDetailsDrawer";
import DivingCourseBookingCreateDrawer from "./DivingCourseBookingCreateDrawer";
import {
  parseDivingBookingStatus,
  formatPriceEur,
} from "./divingCourseBookingHelpers";

export default function AdminDivingCourseBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<
    DivingBookingStatusEnum | "all"
  >("all");
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | "Pending" | "Paid"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedBooking, setSelectedBooking] =
    useState<DivingCourseBookingApiItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Paginated query for table
  const { data: bookingsRes, isLoading } = useDivingCourseBookingsQuery({
    pageNumber,
    pageSize,
  });

  // Overview query for consistent top metric cards
  const { data: allBookingsRes } = useDivingCourseBookingsQuery({
    pageSize: 1000,
  });

  const rawBookings = bookingsRes?.data || [];
  const allBookings = allBookingsRes?.data || rawBookings;
  const totalCount = bookingsRes?.totalCount || rawBookings.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Client-side filtering across status, payment, and search query
  const filteredBookings = useMemo(() => {
    return rawBookings.filter((b) => {
      if (statusFilter !== "all") {
        if (parseDivingBookingStatus(b.status) !== statusFilter) return false;
      }
      if (paymentFilter !== "all") {
        const s = String(b.paymentStatus || "").trim().toLowerCase();
        if (paymentFilter === "Paid" && s !== "paid") return false;
        if (paymentFilter === "Pending" && s !== "pending") return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const inCustomer =
          b.fullName.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q);
        const inHotel =
          (b.hotelName || "").toLowerCase().includes(q) ||
          (b.roomNo || "").toLowerCase().includes(q);
        const inCourses = (b.items || []).some((item) =>
          (item.courseName || "").toLowerCase().includes(q)
        );
        if (!inCustomer && !inHotel && !inCourses) return false;
      }
      return true;
    });
  }, [rawBookings, statusFilter, paymentFilter, searchQuery]);

  // Top Metrics Calculation
  const metrics = useMemo(() => {
    let pendingCount = 0;
    let totalRevenue = 0;
    let totalPaid = 0;
    let totalRemaining = 0;

    allBookings.forEach((b) => {
      if (parseDivingBookingStatus(b.status) === DivingBookingStatusEnum.Pending) {
        pendingCount += 1;
      }
      totalRevenue += Number(b.totalPrice || 0);
      totalPaid += Number(b.paidAmount || 0);
      totalRemaining += Number(b.remainingAmount || 0);
    });

    return {
      total: allBookings.length,
      pendingCount,
      totalRevenue,
      totalPaid,
      totalRemaining,
    };
  }, [allBookings]);

  const handleViewDetails = (item: DivingCourseBookingApiItem) => {
    setSelectedBooking(item);
    setIsDetailsOpen(true);
  };

  return (
    <AdminShell
      eyebrow="Reservations"
      title="Diving Course Bookings"
      subtitle="Monitor and manage all diving course reservations and payments in EUR (&euro;)."
      // action={
      //   <button
      //     type="button"
      //     onClick={() => setIsCreateOpen(true)}
      //     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013E51] text-white text-xs sm:text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs cursor-pointer"
      //   >
      //     <FiPlus className="w-4 h-4 text-[#E8B34A]" />
      //     <span>New Course Booking</span>
      //   </button>
      // }
    >
      <div className="space-y-6 font-[family-name:var(--font-lato)]">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
              <FiCalendar className="w-5 h-5 text-[#E8B34A]" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Total
              </span>
              <span className="text-xl font-extrabold text-[#013E51]">
                {metrics.total}
              </span>
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
              <span className="text-xl font-extrabold text-amber-700">
                {metrics.pendingCount}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
              <span className="text-lg font-black text-[#E8B34A] leading-none">&euro;</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Revenue (EUR)
              </span>
              <span className="text-xl font-extrabold text-[#013E51]">
                {formatPriceEur(metrics.totalRevenue)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="text-lg font-black text-emerald-600 leading-none">&euro;</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Paid (EUR)
              </span>
              <span className="text-xl font-extrabold text-emerald-700">
                {formatPriceEur(metrics.totalPaid)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <span className="text-lg font-black text-amber-600 leading-none">&euro;</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Remaining (EUR)
              </span>
              <span className="text-xl font-extrabold text-amber-700">
                {formatPriceEur(metrics.totalRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <DivingCourseBookingsFiltersBar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          paymentFilter={paymentFilter}
          onPaymentFilterChange={setPaymentFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          pageSize={pageSize}
          onPageSizeChange={(val) => {
            setPageSize(val);
            setPageNumber(1);
          }}
          onCreateClick={() => setIsCreateOpen(true)}
        />

        {/* Table */}
        <DivingCourseBookingsTable
          bookings={filteredBookings}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
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
      <DivingCourseBookingDetailsDrawer
        booking={selectedBooking}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Create Booking Drawer */}
      <DivingCourseBookingCreateDrawer
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </AdminShell>
  );
}
