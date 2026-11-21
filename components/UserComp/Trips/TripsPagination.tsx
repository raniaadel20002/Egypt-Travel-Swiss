"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface TripsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TripsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TripsPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 pt-6 sm:pt-8 font-[family-name:var(--font-lato)]">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center hover:border-[#013E51] hover:text-[#013E51] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) => {
        if (typeof page === "string") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-10 flex items-center justify-center text-gray-400 font-bold select-none"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full text-sm font-semibold transition-all shadow-xs cursor-pointer ${
              isActive
                ? "bg-[#013E51] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:text-[#013E51]"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center hover:border-[#013E51] hover:text-[#013E51] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
