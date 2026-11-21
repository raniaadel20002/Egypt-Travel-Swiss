import { FiSearch, FiRotateCcw } from "react-icons/fi";

interface AdminsFiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  onReset: () => void;
}

export default function AdminsFiltersBar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  pageSize,
  onPageSizeChange,
  onReset,
}: AdminsFiltersBarProps) {
  const isFiltered = Boolean(search.trim() || roleFilter !== "ALL");

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
      <div className="relative flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, phone, nationality..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
        />
        <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <select
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          aria-label="Filter by role"
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
        >
          <option value="ALL">All Roles</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Admin">Admin</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Items per page"
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-[#013E51] transition cursor-pointer"
          >
            <FiRotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
