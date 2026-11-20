"use client";

import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus, FiSearch } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { DivingCourseApiItem } from "@/models/divingCourse";
import {
  useDeleteDivingCourseMutation,
  useDivingCoursesQuery,
} from "@/features/divingCourses/useDivingCourses";
import DivingCoursesTable from "./DivingCoursesTable";
import DivingCourseFormDrawer from "./DivingCourseFormDrawer";
import DivingCourseImagesDrawer from "./DivingCourseImagesDrawer";
import DivingCourseFacilitiesReorderDrawer from "./DivingCourseFacilitiesReorderDrawer";
import DivingCourseReviewsDrawer from "./DivingCourseReviewsDrawer";
import DivingCourseDeleteModal from "./DivingCourseDeleteModal";

export default function AdminDivingCoursesPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [search, setSearch] = useState("");

  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const [selectedCourseForImages, setSelectedCourseForImages] =
    useState<DivingCourseApiItem | null>(null);
  const [selectedCourseForFacilities, setSelectedCourseForFacilities] =
    useState<DivingCourseApiItem | null>(null);
  const [selectedCourseForReviews, setSelectedCourseForReviews] =
    useState<DivingCourseApiItem | null>(null);
  const [deletingCourse, setDeletingCourse] =
    useState<DivingCourseApiItem | null>(null);

  const { data: coursesData, isLoading } = useDivingCoursesQuery({
    pageNumber: page,
    pageSize,
    language: "en",
  });

  const deleteMutation = useDeleteDivingCourseMutation();

  const allCourses = coursesData?.data || [];
  const totalCount = coursesData?.totalCount || allCourses.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return allCourses;
    const q = search.toLowerCase();
    return allCourses.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [allCourses, search]);

  const handleCreateNew = () => {
    setEditingCourseId(null);
    setFormDrawerOpen(true);
  };

  const handleEdit = (course: DivingCourseApiItem) => {
    setEditingCourseId(course.id);
    setFormDrawerOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCourse) return;
    await deleteMutation.mutateAsync(deletingCourse.id);
    setDeletingCourse(null);
  };

  return (
    <AdminShell
      eyebrow="Courses & Training"
      title="Diving Courses"
      subtitle="Manage scuba diving certifications, features, gallery photos, and reviews"
      action={
        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013E51] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#013E51]/90 transition cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Course</span>
        </button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Showing <span className="font-bold text-[#013E51]">{filteredCourses.length}</span> of{" "}
            <span className="font-bold text-[#013E51]">{totalCount}</span> courses
          </div>
        </div>

        <DivingCoursesTable
          courses={filteredCourses}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={setDeletingCourse}
          onOpenImages={setSelectedCourseForImages}
          onOpenFacilities={setSelectedCourseForFacilities}
          onOpenReviews={setSelectedCourseForReviews}
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-[#013E51] px-2">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {formDrawerOpen && (
        <DivingCourseFormDrawer
          courseId={editingCourseId}
          isOpen={formDrawerOpen}
          onClose={() => {
            setFormDrawerOpen(false);
            setEditingCourseId(null);
          }}
        />
      )}

      {selectedCourseForImages && (
        <DivingCourseImagesDrawer
          course={selectedCourseForImages}
          isOpen={true}
          onClose={() => setSelectedCourseForImages(null)}
        />
      )}

      {selectedCourseForFacilities && (
        <DivingCourseFacilitiesReorderDrawer
          course={selectedCourseForFacilities}
          isOpen={true}
          onClose={() => setSelectedCourseForFacilities(null)}
        />
      )}

      {selectedCourseForReviews && (
        <DivingCourseReviewsDrawer
          course={selectedCourseForReviews}
          isOpen={true}
          onClose={() => setSelectedCourseForReviews(null)}
        />
      )}

      {deletingCourse && (
        <DivingCourseDeleteModal
          course={deletingCourse}
          isOpen={true}
          isPending={deleteMutation.isPending}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingCourse(null)}
        />
      )}
    </AdminShell>
  );
}
