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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
      {pages.map((page) => {
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
