import { FiSearch, FiRotateCcw, FiGlobe } from "react-icons/fi";
import { BLOG_LANGUAGES } from "./blogHelpers";

interface BlogsFiltersBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  hasImageFilter: "all" | "with-image" | "no-image";
  onHasImageChange: (val: "all" | "with-image" | "no-image") => void;
  selectedLanguage: string;
  onLanguageChange: (val: string) => void;
  pageSize: number;
  onPageSizeChange: (val: number) => void;
  onResetFilters: () => void;
}

export default function BlogsFiltersBar({
  searchQuery,
  onSearchChange,
  hasImageFilter,
  onHasImageChange,
  selectedLanguage,
  onLanguageChange,
  pageSize,
  onPageSizeChange,
  onResetFilters,
}: BlogsFiltersBarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    hasImageFilter !== "all" ||
    selectedLanguage !== "en";

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-[family-name:var(--font-lato)]">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles by title, content or section..."
          className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] placeholder:text-gray-400 focus:outline-hidden focus:border-[#013E51]"
        />
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
        <div className="relative inline-flex items-center">
          <FiGlobe className="w-3.5 h-3.5 text-[#E8B34A] absolute left-3 pointer-events-none" />
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Filter language"
            className="pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white focus:outline-hidden cursor-pointer"
          >
            {BLOG_LANGUAGES.map((lang) => (
              <option key={lang.key} value={lang.key}>
                {lang.code} - {lang.label}
              </option>
            ))}
          </select>
        </div>

        <select
          value={hasImageFilter}
          onChange={(e) =>
            onHasImageChange(
              e.target.value as "all" | "with-image" | "no-image"
            )
          }
          className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white focus:outline-hidden cursor-pointer"
        >
          <option value="all">All Media</option>
          <option value="with-image">With Cover Image</option>
          <option value="no-image">No Cover Image</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FiRotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white focus:outline-hidden cursor-pointer"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>
    </div>
  );
}
