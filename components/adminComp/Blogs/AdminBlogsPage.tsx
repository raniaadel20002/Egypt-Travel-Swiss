"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { BlogApiItem } from "@/models/blog";
import {
  useBlogsQuery,
  useDeleteBlogMutation,
} from "@/features/blogs/useBlogs";
import BlogsMetricsGrid from "./BlogsMetricsGrid";
import BlogsFiltersBar from "./BlogsFiltersBar";
import BlogsTable from "./BlogsTable";
import BlogDetailsDrawer from "./BlogDetailsDrawer";
import BlogFormDrawer from "./BlogFormDrawer";
import BlogDeleteModal from "./BlogDeleteModal";

export default function AdminBlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasImageFilter, setHasImageFilter] = useState<
    "all" | "with-image" | "no-image"
  >("all");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedBlog, setSelectedBlog] = useState<BlogApiItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogApiItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [deletingBlog, setDeletingBlog] = useState<BlogApiItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: rawBlogs = [],
    isLoading,
    isFetching,
  } = useBlogsQuery({
    PageNumber: pageNumber,
    PageSize: pageSize,
    language: selectedLanguage,
  });

  const { data: allBlogs = [] } = useBlogsQuery({
    PageSize: 100,
    language: selectedLanguage,
  });
  const deleteMutation = useDeleteBlogMutation();

  // Client-side search and media filtering
  const filteredBlogs = useMemo(() => {
    return rawBlogs.filter((b) => {
      if (hasImageFilter === "with-image" && !b.imageUrl) return false;
      if (hasImageFilter === "no-image" && b.imageUrl) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const inTitle = (b.title || "").toLowerCase().includes(q);
        const inContent = (b.content || "").toLowerCase().includes(q);
        const inSections = (b.blogSections || []).some(
          (s) =>
            (s.title || "").toLowerCase().includes(q) ||
            (s.content || "").toLowerCase().includes(q)
        );
        if (!inTitle && !inContent && !inSections) return false;
      }
      return true;
    });
  }, [rawBlogs, hasImageFilter, searchQuery]);

  // Metrics summary
  const metricsSource = allBlogs.length > 0 ? allBlogs : rawBlogs;
  const metrics = useMemo(() => {
    let withCoverImage = 0;
    let totalSections = 0;

    metricsSource.forEach((b) => {
      if (b.imageUrl) withCoverImage += 1;
      totalSections += b.blogSections?.length || 0;
    });

    const totalBlogs = metricsSource.length;
    const avgSectionsPerBlog =
      totalBlogs > 0 ? totalSections / totalBlogs : 0;

    return {
      totalBlogs,
      withCoverImage,
      totalSections,
      avgSectionsPerBlog,
    };
  }, [metricsSource]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setHasImageFilter("all");
    setSelectedLanguage("en");
    setPageNumber(1);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBlog) return;
    try {
      await deleteMutation.mutateAsync(deletingBlog.id);
      toast.success(`Article #${deletingBlog.id} deleted.`);
      setIsDeleteModalOpen(false);
      setDeletingBlog(null);
    } catch {
      toast.error("Failed to delete article.");
    }
  };

  return (
    <AdminShell
      eyebrow="Content Management"
      title="Articles & Travel Blogs"
      subtitle="Publish, edit, and organize destination travel guides, sections, and tourist insights across 5 languages."
      action={
        <button
          type="button"
          onClick={() => {
            setEditingBlog(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013E51] text-white text-xs sm:text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Article</span>
        </button>
      }
    >
      <div className="space-y-6 font-[family-name:var(--font-lato)]">
        <BlogsMetricsGrid metrics={metrics} />

        <BlogsFiltersBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setPageNumber(1);
          }}
          hasImageFilter={hasImageFilter}
          onHasImageChange={(val) => {
            setHasImageFilter(val);
            setPageNumber(1);
          }}
          selectedLanguage={selectedLanguage}
          onLanguageChange={(val) => {
            setSelectedLanguage(val);
            setPageNumber(1);
          }}
          pageSize={pageSize}
          onPageSizeChange={(val) => {
            setPageSize(val);
            setPageNumber(1);
          }}
          onResetFilters={handleResetFilters}
        />

        <BlogsTable
          blogs={filteredBlogs}
          isLoading={isLoading || isFetching}
          onViewDetails={(item) => {
            setSelectedBlog(item);
            setIsDetailsOpen(true);
          }}
          onEdit={(item) => {
            setEditingBlog(item);
            setIsFormOpen(true);
          }}
          onDelete={(item) => {
            setDeletingBlog(item);
            setIsDeleteModalOpen(true);
          }}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] text-xs text-gray-600">
          <span>Page {pageNumber}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={rawBlogs.length < pageSize}
              onClick={() => setPageNumber((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Drawers and Modals */}
        <BlogDetailsDrawer
          blog={selectedBlog}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={(item) => {
            setEditingBlog(item);
            setIsFormOpen(true);
          }}
        />

        <BlogFormDrawer
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingBlog(null);
          }}
          editingBlog={editingBlog}
        />

        <BlogDeleteModal
          blog={deletingBlog}
          isOpen={isDeleteModalOpen}
          isDeleting={deleteMutation.isPending}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingBlog(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </AdminShell>
  );
}
