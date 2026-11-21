import { FiX, FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { BlogApiItem } from "@/models/blog";

interface BlogDeleteModalProps {
  blog: BlogApiItem | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BlogDeleteModal({
  blog,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: BlogDeleteModalProps) {
  useModalDismiss({ isOpen, onClose, disabled: isDeleting });

  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-[family-name:var(--font-lato)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-base">Delete Article</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to permanently delete{" "}
            <span className="font-bold text-[#013E51]">
              &ldquo;{blog.title}&rdquo;
            </span>{" "}
            (Blog #{blog.id}) along with all its sections and uploaded media? This action
            cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>{isDeleting ? "Deleting..." : "Delete Article"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
