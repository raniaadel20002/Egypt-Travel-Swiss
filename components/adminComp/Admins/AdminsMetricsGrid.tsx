import { FiShield, FiUsers, FiUserCheck, FiFilter } from "react-icons/fi";
import { AdminRecord } from "@/models/admin";

interface AdminsMetricsGridProps {
  admins: AdminRecord[];
  filteredCount: number;
}

export default function AdminsMetricsGrid({
  admins,
  filteredCount,
}: AdminsMetricsGridProps) {
  const total = admins.length;
  const superAdmins = admins.filter(
    (a) => a.role?.toLowerCase() === "superadmin"
  ).length;
  const staffAdmins = admins.filter(
    (a) => a.role?.toLowerCase() === "admin"
  ).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Staff */}
      <div className="group bg-white rounded-2xl p-5 border border-[#013E51]/10 shadow-[0px_4px_20px_rgba(1,62,81,0.03)] hover:shadow-md transition-all duration-200 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#013E51]/5 text-[#013E51] group-hover:bg-[#013E51] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
          <FiUsers className="w-5 h-5 transition-transform group-hover:scale-110" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block truncate">
            Total Staff
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {total}
          </span>
        </div>
      </div>

      {/* 2. Super Administrators */}
      <div className="group bg-white rounded-2xl p-5 border border-[#013E51]/10 shadow-[0px_4px_20px_rgba(1,62,81,0.03)] hover:shadow-md transition-all duration-200 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#E8B34A]/15 text-[#013E51] group-hover:bg-[#E8B34A] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
          <FiShield className="w-5 h-5 text-[#E8B34A] group-hover:text-white transition-transform group-hover:scale-110" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block truncate">
            Super Admins
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {superAdmins}
          </span>
        </div>
      </div>

      {/* 3. Operational Staff Admins */}
      <div className="group bg-white rounded-2xl p-5 border border-[#013E51]/10 shadow-[0px_4px_20px_rgba(1,62,81,0.03)] hover:shadow-md transition-all duration-200 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
          <FiUserCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block truncate">
            Staff Admins
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {staffAdmins}
          </span>
        </div>
      </div>

      {/* 4. Filtered Matching Count */}
      <div className="group bg-white rounded-2xl p-5 border border-[#013E51]/10 shadow-[0px_4px_20px_rgba(1,62,81,0.03)] hover:shadow-md transition-all duration-200 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#013E51] group-hover:bg-[#013E51] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
          <FiFilter className="w-5 h-5 transition-transform group-hover:scale-110" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block truncate">
            Matching
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {filteredCount}
          </span>
        </div>
      </div>
    </div>
  );
}
