import { FiEye, FiEdit2, FiTrash2, FiShield, FiUser, FiPhone, FiGlobe } from "react-icons/fi";
import { AdminRecord } from "@/models/admin";
import { formatAdminDate } from "./adminHelpers";

interface AdminsTableProps {
  admins: AdminRecord[];
  currentUserId?: string;
  onView: (admin: AdminRecord) => void;
  onEdit: (admin: AdminRecord) => void;
  onDelete: (admin: AdminRecord) => void;
}

export default function AdminsTable({
  admins,
  currentUserId,
  onView,
  onEdit,
  onDelete,
}: AdminsTableProps) {
  if (admins.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-[#013E51]/10 space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-2">
          <FiUser className="w-6 h-6 text-[#013E51]/60" />
        </div>
        <p className="text-sm text-[#013E51] font-bold">
          No administrator accounts found
        </p>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Try adjusting your search criteria or role filters to view other accounts.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#013E51]/10 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#FAF7F2] border-b border-gray-200/80 text-[11px] font-bold uppercase tracking-wider text-[#013E51]/80">
            <tr>
              <th className="py-3.5 px-4">Administrator</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Phone</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Nationality</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Registered</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {admins.map((admin) => {
              const isSuper = admin.role?.toLowerCase() === "superadmin";
              const isSelf = String(admin.id) === currentUserId;

              return (
                <tr
                  key={admin.id}
                  onClick={() => onView(admin)}
                  className="hover:bg-[#FAF7F2]/50 transition cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#013E51] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        {isSuper ? (
                          <FiShield className="w-4 h-4 text-[#E8B34A]" />
                        ) : (
                          <FiUser className="w-4 h-4 text-[#E8B34A]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#013E51] truncate group-hover:text-[#E8B34A] transition-colors">
                            {admin.firstName} {admin.lastName}
                          </span>
                          {isSelf && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 block truncate">
                          {admin.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        isSuper
                          ? "bg-[#E8B34A]/15 text-[#013E51] border border-[#E8B34A]/30"
                          : "bg-[#013E51]/10 text-[#013E51] border border-[#013E51]/15"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">
                    {admin.phone ? (
                      <span className="inline-flex items-center gap-1.5">
                        <FiPhone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{admin.phone}</span>
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-gray-600 hidden lg:table-cell">
                    {admin.nationality ? (
                      <span className="inline-flex items-center gap-1.5">
                        <FiGlobe className="w-3.5 h-3.5 text-gray-400" />
                        <span>{admin.nationality}</span>
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-gray-500 hidden sm:table-cell">
                    {formatAdminDate(admin.createdAt)}
                  </td>

                  <td
                    className="py-3.5 px-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onView(admin)}
                        title="View Full Profile"
                        className="p-2 rounded-lg text-gray-500 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(admin)}
                        title="Edit Admin"
                        className="p-2 rounded-lg text-gray-500 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        disabled={isSelf || isSuper}
                        onClick={() => onDelete(admin)}
                        title={
                          isSelf
                            ? "Cannot delete your own active session"
                            : isSuper
                              ? "SuperAdmin accounts cannot be deleted"
                              : "Delete Admin"
                        }
                        className="p-2 rounded-lg text-gray-400 hover:text-red-700 hover:bg-red-50 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
