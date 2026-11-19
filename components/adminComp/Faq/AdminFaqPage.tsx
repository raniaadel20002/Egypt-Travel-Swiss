"use client";

import { useState } from "react";
import {
  FiHelpCircle,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLoader,
  FiAlertCircle,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import FaqSidebarForm from "./FaqSidebarForm";
import { useFaqList, useDeleteQuestion } from "@/features/faq/useFaq";
import { QuestionItem } from "@/models/question";

const PAGE_SIZE = 10;

export default function AdminFaqPage() {
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<QuestionItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<QuestionItem | null>(null);

  const { data, isLoading, isError } = useFaqList({
    PageNumber: page,
    PageSize: PAGE_SIZE,
  });

  const deleteMutation = useDeleteQuestion();
  const questions: QuestionItem[] = data?.data ?? [];

  const handleOpenAdd = () => {
    setEditTarget(null);
    setIsSidebarOpen(true);
  };

  const handleOpenEdit = (item: QuestionItem) => {
    setEditTarget(item);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setEditTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Question deleted successfully.");
      if (editTarget?.id === deleteTarget.id) {
        handleCloseSidebar();
      }
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete question. Please try again.");
    }
  };

  return (
    <>
      <AdminShell
        eyebrow="Help & Support"
        title="FAQ & Traveler Questions"
        subtitle="Manage visitor questions and multilingual answers in a full-height side panel."
        action={
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            <FiPlus className="w-4 h-4 text-[#E8B34A]" />
            <span>Add Question</span>
          </button>
        }
      >
        <div className="space-y-4">
          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-[24px] p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col items-center justify-center gap-3">
              <FiLoader className="w-8 h-8 text-[#013E51] animate-spin" />
              <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                Loading questions...
              </p>
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="bg-white rounded-[24px] p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-red-100 flex flex-col items-center justify-center gap-3">
              <FiAlertCircle className="w-8 h-8 text-red-400" />
              <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                Failed to load FAQ questions. Please try again.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && questions.length === 0 && (
            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-10 sm:p-14 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mb-3">
                <FiHelpCircle className="w-7 h-7 text-[#013E51]" />
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
                No questions have been added yet.
              </h2>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-1.5 mb-6">
                Click the button below to open the side panel and add your first FAQ question.
              </p>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-6 py-3 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <FiPlus className="w-4 h-4 text-[#E8B34A]" />
                <span>Add First Question</span>
              </button>
            </div>
          )}

          {/* Questions List (Vertically one below another, no filters) */}
          {!isLoading && !isError && questions.length > 0 && (
            <div className="bg-white rounded-[24px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 overflow-hidden">
              <div className="p-5 border-b border-[#013E51]/10 flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51]">
                  FAQ Questions
                </h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#013E51] border border-[#013E51]/10">
                  {questions.length} Items
                </span>
              </div>

              <div className="divide-y divide-[#013E51]/6">
                {questions.map((item) => {
                  const isSelected = isSidebarOpen && editTarget?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 transition-all duration-200 ${
                        isSelected
                          ? "bg-[#FAF7F2] border-l-4 border-l-[#013E51]"
                          : "hover:bg-[#FAF7F2]/60"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-[#888888] bg-[#013E51]/5 px-2 py-0.5 rounded-md">
                            #{item.id}
                          </span>
                          <p className="font-[family-name:var(--font-cormorant)] text-lg sm:text-xl font-bold text-[#013E51] leading-snug truncate">
                            {item.text}
                          </p>
                        </div>
                        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed line-clamp-2">
                          {item.answer}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          aria-label={`Edit question ${item.id}`}
                          className={`p-2 rounded-xl transition cursor-pointer ${
                            isSelected
                              ? "bg-[#013E51] text-[#E8B34A] shadow-xs"
                              : "text-[#013E51] hover:bg-[#013E51]/8"
                          }`}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          aria-label={`Delete question ${item.id}`}
                          disabled={deleteMutation.isPending}
                          className="p-2 rounded-xl text-[#888888] hover:bg-red-50 hover:text-red-600 transition cursor-pointer disabled:opacity-50"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                    disabled={questions.length < PAGE_SIZE}
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

      {/* Full-Height Side Panel Attached to Screen Edge */}
      <FaqSidebarForm
        isOpen={isSidebarOpen}
        editTarget={editTarget}
        onClose={handleCloseSidebar}
      />

      <ConfirmDeleteDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Question"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.text}"? This action cannot be undone.`
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
