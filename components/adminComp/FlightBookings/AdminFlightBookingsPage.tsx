"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import {
  FlightBookingApiItem,
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import { useCountriesQuery } from "@/features/flightLocations/useFlightLocations";
import {
  useDeleteFlightBookingMutation,
  useFlightBookingsCountQuery,
  useFlightBookingsQuery,
} from "@/features/flights/useFlightBookings";
import { parseFlightBookingType } from "./flightBookingHelpers";
import FlightBookingsMetricsGrid from "./FlightBookingsMetricsGrid";
import FlightBookingsFiltersBar from "./FlightBookingsFiltersBar";
import FlightBookingsTable from "./FlightBookingsTable";
import FlightBookingDetailsDrawer from "./FlightBookingDetailsDrawer";
import FlightBookingFormDrawer from "./FlightBookingFormDrawer";
import FlightBookingDeleteModal from "./FlightBookingDeleteModal";

export default function AdminFlightBookingsPage() {
  const [bookingTypeFilter, setBookingTypeFilter] = useState<
    FlightBookingTypeEnum | "all"
  >("all");
  const [tripTypeFilter, setTripTypeFilter] = useState<
    FlightTripTypeEnum | "all"
  >("all");
  const [countryFilter, setCountryFilter] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedBooking, setSelectedBooking] =
    useState<FlightBookingApiItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [editingBooking, setEditingBooking] =
    useState<FlightBookingApiItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [deletingBooking, setDeletingBooking] =
    useState<FlightBookingApiItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryParams = {
    BookingType: bookingTypeFilter === "all" ? undefined : bookingTypeFilter,
    TripType: tripTypeFilter === "all" ? undefined : tripTypeFilter,
    FromCountryId:
      countryFilter !== "all" &&
      bookingTypeFilter === FlightBookingTypeEnum.CountryToEgypt
        ? countryFilter
        : undefined,
    ToCountryId:
      countryFilter !== "all" &&
      bookingTypeFilter === FlightBookingTypeEnum.EgyptToCountry
        ? countryFilter
        : undefined,
    PageNumber: pageNumber,
    PageSize: pageSize,
  };

  const {
    data: rawBookings = [],
    isLoading,
    isFetching,
  } = useFlightBookingsQuery(queryParams);
  const { data: allBookings = [] } = useFlightBookingsQuery({ PageSize: 100 });
  const { data: totalCountApi } = useFlightBookingsCountQuery({});
  const { data: countriesRes } = useCountriesQuery({ PageSize: 200 });
  const deleteMutation = useDeleteFlightBookingMutation();

  const countries = countriesRes?.data || [];

  // Client-side search & country filter refinement
  const filteredBookings = useMemo(() => {
    return rawBookings.filter((b) => {
      if (countryFilter !== "all") {
        const matchesFrom = b.fromCountryId === countryFilter;
        const matchesTo = b.toCountryId === countryFilter;
        if (!matchesFrom && !matchesTo) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const inAirports =
          (b.departureAirport || "").toLowerCase().includes(q) ||
          (b.arrivalAirport || "").toLowerCase().includes(q) ||
          (b.returnDepartureAirport || "").toLowerCase().includes(q) ||
          (b.returnArrivalAirport || "").toLowerCase().includes(q);
        const inLocations =
          (b.fromCountryName || "").toLowerCase().includes(q) ||
          (b.fromCityName || "").toLowerCase().includes(q) ||
          (b.toCountryName || "").toLowerCase().includes(q) ||
          (b.toCityName || "").toLowerCase().includes(q);
        const inPassengers = (b.passengers || []).some(
          (p) =>
            (p.fullName || "").toLowerCase().includes(q) ||
            (p.passportNumber || "").toLowerCase().includes(q)
        );
        if (!inAirports && !inLocations && !inPassengers) return false;
      }
      return true;
    });
  }, [rawBookings, countryFilter, searchQuery]);

  // Top Overview Metrics
  const metricsSource = allBookings.length > 0 ? allBookings : rawBookings;
  const metrics = useMemo(() => {
    let egyptToCountry = 0;
    let countryToEgypt = 0;
    let local = 0;
    let totalPassengers = 0;

    metricsSource.forEach((b) => {
      const bType = parseFlightBookingType(b.bookingType);
      if (bType === FlightBookingTypeEnum.EgyptToCountry) egyptToCountry += 1;
      else if (bType === FlightBookingTypeEnum.CountryToEgypt)
        countryToEgypt += 1;
      else if (bType === FlightBookingTypeEnum.Local) local += 1;

      totalPassengers += Number(b.numberOfPeople || b.passengers?.length || 0);
    });

    return {
      total:
        totalCountApi && totalCountApi > metricsSource.length
          ? totalCountApi
          : metricsSource.length,
      egyptToCountry,
      countryToEgypt,
      local,
      totalPassengers,
    };
  }, [metricsSource, totalCountApi]);

  const handleResetFilters = () => {
    setBookingTypeFilter("all");
    setTripTypeFilter("all");
    setCountryFilter("all");
    setSearchQuery("");
    setPageNumber(1);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBooking) return;
    try {
      await deleteMutation.mutateAsync(deletingBooking.id);
      toast.success(`Flight booking #${deletingBooking.id} deleted.`);
      setIsDeleteModalOpen(false);
      setDeletingBooking(null);
    } catch {
      toast.error("Failed to delete flight booking.");
    }
  };

  return (
    <AdminShell
      eyebrow="Aviation & Transfers"
      title="Flight Bookings"
      subtitle="Manage international and domestic flight reservations, passenger manifests, and baggage allowances."
      action={
        <button
          type="button"
          onClick={() => {
            setEditingBooking(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013E51] text-white text-xs sm:text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Flight Booking</span>
        </button>
      }
    >
      <div className="space-y-6 font-[family-name:var(--font-lato)]">
        <FlightBookingsMetricsGrid metrics={metrics} />

        <FlightBookingsFiltersBar
          bookingTypeFilter={bookingTypeFilter}
          onBookingTypeChange={(val) => {
            setBookingTypeFilter(val);
            setPageNumber(1);
          }}
          tripTypeFilter={tripTypeFilter}
          onTripTypeChange={(val) => {
            setTripTypeFilter(val);
            setPageNumber(1);
          }}
          countryFilter={countryFilter}
          onCountryFilterChange={(val) => {
            setCountryFilter(val);
            setPageNumber(1);
          }}
          countries={countries}
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setPageNumber(1);
          }}
          pageSize={pageSize}
          onPageSizeChange={(val) => {
            setPageSize(val);
            setPageNumber(1);
          }}
          onResetFilters={handleResetFilters}
        />

        <FlightBookingsTable
          bookings={filteredBookings}
          isLoading={isLoading || isFetching}
          onViewDetails={(item) => {
            setSelectedBooking(item);
            setIsDetailsOpen(true);
          }}
          onEdit={(item) => {
            setEditingBooking(item);
            setIsFormOpen(true);
          }}
          onDelete={(item) => {
            setDeletingBooking(item);
            setIsDeleteModalOpen(true);
          }}
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
              disabled={rawBookings.length < pageSize}
              onClick={() => setPageNumber((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Drawers & Modals */}
        <FlightBookingDetailsDrawer
          booking={selectedBooking}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={(item) => {
            setEditingBooking(item);
            setIsFormOpen(true);
          }}
        />

        <FlightBookingFormDrawer
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingBooking(null);
          }}
          editingBooking={editingBooking}
        />

        <FlightBookingDeleteModal
          booking={deletingBooking}
          isOpen={isDeleteModalOpen}
          isDeleting={deleteMutation.isPending}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingBooking(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </AdminShell>
  );
}
