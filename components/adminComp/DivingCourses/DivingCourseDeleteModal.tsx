"use client";

import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import { DivingCourseApiItem } from "@/models/divingCourse";

interface DivingCourseDeleteModalProps {
  course: DivingCourseApiItem | null;
  isOpen: boolean;
  isPending: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function DivingCourseDeleteModal({
  course,
  isOpen,
  isPending,
  onConfirm,
  onClose,
}: DivingCourseDeleteModalProps) {
  if (!isOpen || !course) return null;

  return (
    <ConfirmDeleteDialog
      isOpen={isOpen}
      isPending={isPending}
      title="Delete Diving Course"
      description={`Are you sure you want to delete "${course.name}"? All associated facilities, photos, and reviews will be permanently removed.`}
      confirmLabel="Delete Course"
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
