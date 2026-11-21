"use client";

import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "sonner";
import { AdminRecord } from "@/models/admin";
import { useDeleteAdminMutation } from "@/features/admin/useAdmins";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";

interface AdminDeleteModalProps {
  admin: AdminRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDeleteModal({
  admin,
  isOpen,
  onClose,
}: AdminDeleteModalProps) {
  const deleteMutation = useDeleteAdminMutation();

  useModalDismiss({ isOpen, onClose });

  if (!isOpen || !admin) return null;

  const handleDelete = () => {
    deleteMutation.mutate(admin.id, {
      onSuccess: () => {
        toast.success(`Administrator ${admin.firstName} ${admin.lastName} removed.`);
        onClose();
      },
      onError: (err: unknown) => {
        const errObj = err as {
          response?: { data?: { Message?: string; message?: string } };
        };
        toast.error(
          errObj.response?.data?.Message ||
            errObj.response?.data?.message ||
            "Failed to delete administrator account."
        );
      },
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Confirm Admin Deletion"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01232e]/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#013E51]/10 space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
          <FiAlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
            Delete Administrator?
          </h3>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-1.5 leading-relaxed">
            Are you sure you want to remove{" "}
            <span className="font-bold text-[#013E51]">
              {admin.firstName} {admin.lastName}
            </span>{" "}
            ({admin.email})? This staff account will immediately lose all access to the admin portal.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer disabled:opacity-50"
          >
            <span>{deleteMutation.isPending ? "Deleting..." : "Delete Account"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
