"use client";

import { useState } from "react";
import {
  FiStar,
  FiSearch,
  FiTrash2,
  FiLoader,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiCalendar,
} from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import {
  useReviewsProjectList,
  useDeleteReviewProject,
} from "@/features/reviews/useReviewsProject";
import { ReviewProjectItem } from "@/models/reviewsProject";

const PAGE_SIZE = 10;

export default function AdminReviewsProjectPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<ReviewProjectItem | null>(null);

  const { data, isLoading, isError } = useReviewsProjectList({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const deleteMutation = useDeleteReviewProject();
  const reviews: ReviewProjectItem[] = data?.data ?? [];

  // Filter reviews by rating and search
  const filtered = reviews.filter((item) => {
    const matchesSearch = searchQuery.trim()
      ? `${item.firstName} ${item.lastName} ${item.email} ${item.phone} ${item.comment}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;

    if (!matchesSearch) return false;

    if (ratingFilter === "5") return Math.round(item.rate) === 5;
    if (ratingFilter === "4") return Math.round(item.rate) === 4;
    if (ratingFilter === "3") return Math.round(item.rate) <= 3;
    return true;
  });

  const filterTabs = [
    { id: "all", label: "All Ratings" },
    { id: "5", label: "5 Stars" },
    { id: "4", label: "4 Stars" },
    { id: "3", label: "3 Stars & Below" },
  ];

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
        title="Platform Reviews (ReviewsProject)"
        subtitle="Manage website testimonials, overall traveler satisfaction ratings, and review submissions."
      >
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search reviewer, email, or comment..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setRatingFilter(tab.id);
                    setPage(1);
                  }}
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

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-[24px] p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col items-center justify-center gap-3">
              <FiLoader className="w-8 h-8 text-[#013E51] animate-spin" />
              <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                Loading platform reviews...
              </p>
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="bg-white rounded-[24px] p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-red-100 flex flex-col items-center justify-center gap-3">
              <FiAlertCircle className="w-8 h-8 text-red-400" />
              <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                Failed to load reviews from API.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-10 sm:p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mb-4">
                <FiStar className="w-8 h-8 text-[#E8B34A]" />
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                {searchQuery || ratingFilter !== "all"
                  ? "No Matching Reviews"
                  : "No Platform Reviews Found"}
              </h2>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-2">
                {searchQuery || ratingFilter !== "all"
                  ? "Try adjusting your search criteria or rating filter."
                  : "Platform feedback and traveler ratings submitted through the homepage will appear here."}
              </p>
            </div>
          )}

          {/* Reviews List */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div className="bg-white rounded-[24px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 overflow-hidden">
              <div className="p-5 border-b border-[#013E51]/10 flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51]">
                  Platform Reviews
                </h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#013E51] border border-[#013E51]/10">
                  {filtered.length} Reviews
                </span>
              </div>

              <div className="divide-y divide-[#013E51]/6">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-[#FAF7F2]/60 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[#888888] bg-[#013E51]/5 px-2 py-0.5 rounded-md">
                          #{item.id}
                        </span>
                        <h3 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-xl font-bold text-[#013E51]">
                          {item.firstName} {item.lastName}
                        </h3>
                        <div className="flex items-center gap-0.5 ml-2">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <FiStar
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s < item.rate
                                  ? "fill-[#E8B34A] text-[#E8B34A]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/80 leading-relaxed mb-3">
                        {item.comment}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#888888] font-[family-name:var(--font-lato)]">
                        {item.email && (
                          <span className="flex items-center gap-1">
                            <FiMail className="w-3 h-3 text-[#013E51]/50" />
                            <span>{item.email}</span>
                          </span>
                        )}
                        {item.phone && (
                          <span className="flex items-center gap-1">
                            <FiPhone className="w-3 h-3 text-[#013E51]/50" />
                            <span>{item.phone}</span>
                          </span>
                        )}
                        {item.createdAt && (
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3 h-3 text-[#013E51]/50" />
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Delete review from ${item.firstName}`}
                      disabled={deleteMutation.isPending}
                      className="p-2 rounded-xl text-[#888888] hover:bg-red-50 hover:text-red-600 transition cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
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
        title="Delete Platform Review"
        description={
          deleteTarget
            ? `Are you sure you want to delete the review by ${deleteTarget.firstName} ${deleteTarget.lastName}? This action cannot be undone.`
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
