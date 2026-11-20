"use client";

import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiLoader,
  FiMessageSquare,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import { useTripsQuery } from "@/features/trips/useTrips";
import {
  useDeleteTripReview,
  useTripReviewAverage,
  useTripReviewsList,
} from "@/features/reviews/useTripReviews";
import { TripReviewItem } from "@/models/review";
import TripReviewCard from "./TripReviewCard";

const PAGE_SIZE = 15;

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [selectedTripId, setSelectedTripId] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<TripReviewItem | null>(null);

  const tripsQuery = useTripsQuery({ language: "EN" });
  const trips = tripsQuery.data || [];

  const queryParams = useMemo(() => {
    return {
      PageNumber: page,
      PageSize: PAGE_SIZE,
      TripId: selectedTripId === "all" ? undefined : selectedTripId,
    };
  }, [page, selectedTripId]);

  const reviewsQuery = useTripReviewsList(queryParams);
  const deleteMutation = useDeleteTripReview();

  const activeTripId = selectedTripId === "all" ? null : selectedTripId;
  const averageQuery = useTripReviewAverage(activeTripId, Boolean(activeTripId));

  const reviews = reviewsQuery.data?.data || [];

  const filterTabs = [
    { id: "all", label: "All Ratings" },
    { id: "5", label: "5 Stars" },
    { id: "4", label: "4 Stars" },
    { id: "3", label: "3 Stars & Below" },
  ];

  const filtered = useMemo(() => {
    return reviews.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const matches =
          `${item.firstName} ${item.lastName} ${item.email} ${item.comment} ${item.tripName} ${item.destination}`
            .toLowerCase()
            .includes(q);
        if (!matches) return false;
      }

      if (ratingFilter === "5") return Math.round(item.rate) === 5;
      if (ratingFilter === "4") return Math.round(item.rate) === 4;
      if (ratingFilter === "3") return Math.round(item.rate) <= 3;
      return true;
    });
  }, [reviews, searchQuery, ratingFilter]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Review deleted successfully.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete review. Please try again.");
    }
  };

  return (
    <>
      <AdminShell
        eyebrow="Quality & Feedback"
        title="Trip Reviews"
        subtitle="Manage customer feedback, verified traveler ratings, and excursion reviews across Egypt."
      >
        <div className="space-y-6">
          {/* Controls: Search, Trip Filter, Rating Tabs */}
          <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviewer, excursion, or comment..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                />
                <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Trip Selector */}
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <FiFilter className="w-4 h-4 text-[#013E51]/60 shrink-0" />
                <select
                  value={selectedTripId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedTripId(val === "all" ? "all" : Number(val));
                    setPage(1);
                  }}
                  className="w-full lg:w-64 px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20"
                >
                  <option value="all">All Trips & Excursions</option>
                  {trips.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.name} (ID: {trip.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRatingFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      ratingFilter === tab.id
                        ? "bg-[#013E51] text-white"
                        : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Average Banner (Active when specific trip selected) */}
            {activeTripId && averageQuery.data?.data && (
              <div className="bg-[#FAF7F2] rounded-xl p-3.5 border border-[#013E51]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#013E51] font-semibold">
                  <FiStar className="w-4 h-4 fill-[#E8B34A] text-[#E8B34A]" />
                  <span>
                    Average Rating:{" "}
                    <strong className="font-bold">
                      {averageQuery.data.data.averageRate.toFixed(1)} / 5.0
                    </strong>
                  </span>
                  <span className="text-[#888888] font-normal">
                    ({averageQuery.data.data.totalReviews} Total Reviews)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {reviewsQuery.isLoading && (
            <div className="bg-white rounded-[24px] p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col items-center justify-center gap-3">
              <FiLoader className="w-8 h-8 text-[#013E51] animate-spin" />
              <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                Loading trip reviews...
              </p>
            </div>
          )}

          {/* Error State */}
          {reviewsQuery.isError && !reviewsQuery.isLoading && (
            <div className="bg-white rounded-[24px] p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-red-100 flex flex-col items-center justify-center gap-3">
              <FiAlertCircle className="w-8 h-8 text-red-400" />
              <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                Failed to load trip reviews from API.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!reviewsQuery.isLoading && !reviewsQuery.isError && filtered.length === 0 && (
            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-10 sm:p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mb-4">
                <FiMessageSquare className="w-8 h-8 text-[#013E51]" />
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                {searchQuery || ratingFilter !== "all" || selectedTripId !== "all"
                  ? "No Matching Trip Reviews"
                  : "No Trip Reviews Found"}
              </h2>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-2">
                {searchQuery || ratingFilter !== "all" || selectedTripId !== "all"
                  ? "Try adjusting your search criteria, excursion filter, or rating level."
                  : "Traveler ratings and feedback submitted on excursion pages will appear here."}
              </p>
            </div>
          )}

          {/* Reviews List */}
          {!reviewsQuery.isLoading && !reviewsQuery.isError && filtered.length > 0 && (
            <div className="bg-white rounded-[24px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 overflow-hidden">
              <div className="p-5 border-b border-[#013E51]/10 flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51]">
                  Verified Trip Reviews
                </h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#013E51] border border-[#013E51]/10">
                  {filtered.length} Reviews
                </span>
              </div>

              <div className="divide-y divide-[#013E51]/6">
                {filtered.map((item) => (
                  <TripReviewCard
                    key={item.id}
                    item={item}
                    isDeleting={deleteMutation.isPending}
                    onDelete={(target) => setDeleteTarget(target)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="px-5 py-4 border-t border-[#013E51]/10 flex items-center justify-between gap-3">
                <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888]">
                  Page {page}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg text-[#013E51] hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={reviews.length < PAGE_SIZE}
                    className="p-2 rounded-lg text-[#013E51] hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminShell>

      <ConfirmDeleteDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Trip Review"
        description={
          deleteTarget
            ? `Are you sure you want to delete the review for "${deleteTarget.tripName || "Trip"}" by ${deleteTarget.firstName} ${deleteTarget.lastName}? This action cannot be undone.`
            : undefined
        }
        isPending={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          if (!deleteMutation.isPending) {
            setDeleteTarget(null);
          }
        }}
      />
    </>
  );
}
