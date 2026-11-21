import { FiShield, FiUser, FiMail, FiPhone, FiGlobe, FiCalendar, FiFileText, FiEdit2, FiTrash2 } from "react-icons/fi";
import { AdminRecord } from "@/models/admin";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { formatAdminDate } from "./adminHelpers";

interface AdminDetailsDrawerProps {
  admin: AdminRecord | null;
  isOpen: boolean;
  currentUserId?: string;
  onClose: () => void;
  onEdit: (admin: AdminRecord) => void;
  onDelete: (admin: AdminRecord) => void;
}

export default function AdminDetailsDrawer({
  admin,
  isOpen,
  currentUserId,
  onClose,
  onEdit,
  onDelete,
}: AdminDetailsDrawerProps) {
  if (!admin) return null;

  const isSuper = admin.role?.toLowerCase() === "superadmin";
  const isSelf = String(admin.id) === currentUserId;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow="Staff Directory"
      title={`${admin.firstName} ${admin.lastName}`}
      subtitle={`Account ID #${admin.id} - ${admin.role}`}
      footer={
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={isSelf || isSuper}
            onClick={() => {
              onClose();
              onDelete(admin);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 border border-red-200 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-gray-50 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(admin);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              <FiEdit2 className="w-4 h-4 text-[#E8B34A]" />
              <span>Edit Account</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#013E51] text-white flex items-center justify-center shrink-0">
            {isSuper ? (
              <FiShield className="w-7 h-7 text-[#E8B34A]" />
            ) : (
              <FiUser className="w-7 h-7 text-[#E8B34A]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] truncate">
                {admin.firstName} {admin.lastName}
              </h3>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isSuper
                    ? "bg-[#E8B34A]/20 text-[#013E51]"
                    : "bg-[#013E51]/10 text-[#013E51]"
                }`}
              >
                {admin.role}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate mt-0.5">{admin.email}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-gray-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <FiMail className="w-3.5 h-3.5 text-[#013E51]" />
              Email Address
            </span>
            <p className="text-sm font-semibold text-[#013E51] break-all">
              {admin.email}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <FiPhone className="w-3.5 h-3.5 text-[#013E51]" />
              Phone Number
            </span>
            <p className="text-sm font-semibold text-[#013E51]">
              {admin.phone || "Not provided"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <FiGlobe className="w-3.5 h-3.5 text-[#013E51]" />
              Nationality
            </span>
            <p className="text-sm font-semibold text-[#013E51]">
              {admin.nationality || "Not specified"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#013E51]" />
              Registration Date
            </span>
            <p className="text-sm font-semibold text-[#013E51]">
              {formatAdminDate(admin.createdAt)}
            </p>
          </div>
        </div>

        {/* Administrative Notes */}
        <div className="p-4 rounded-xl bg-white border border-gray-100 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <FiFileText className="w-3.5 h-3.5 text-[#013E51]" />
            Administrative Notes
          </span>
          <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap">
            {admin.notes || "No notes attached to this administrator account."}
          </p>
        </div>
      </div>
    </AdminDrawer>
  );
}
