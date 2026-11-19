"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiCheck, FiEdit2, FiLoader, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import { TeamMemberApiItem } from "@/models/teamMember";
import {
  useCreateTeamMemberMutation,
  useTeamMemberDetailQuery,
  useUpdateTeamMemberMutation,
} from "@/features/teamMembers/useTeamMembers";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import TeamMemberPhotoUpload from "./TeamMemberPhotoUpload";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface TeamMemberFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit" | "view";
  item: TeamMemberApiItem | null;
  onClose: () => void;
  onSwitchToEdit?: () => void;
}

export default function TeamMemberFormDrawer({
  isOpen,
  mode,
  item,
  onClose,
  onSwitchToEdit,
}: TeamMemberFormDrawerProps) {
  const isCreate = mode === "create";
  const isView = mode === "view";

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const detailQuery = useTeamMemberDetailQuery(
    item?.id || null,
    isOpen && !isCreate
  );

  const createMutation = useCreateTeamMemberMutation();
  const updateMutation = useUpdateTeamMemberMutation();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setJobTitle("");
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    if (!isCreate) {
      const activeData = detailQuery.data || item;
      if (activeData) {
        setName(activeData.name || "");
        setJobTitle(activeData.jobTitle || "");
        setPreviewUrl(
          activeData.imageUrl ? resolveApiImageUrl(activeData.imageUrl) : ""
        );
      }
      setSelectedFile(null);
    } else {
      setName("");
      setJobTitle("");
      setSelectedFile(null);
      setPreviewUrl("");
    }
  }, [isOpen, isCreate, item, detailQuery.data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    const activeData = detailQuery.data || item;
    setPreviewUrl(
      activeData?.imageUrl ? resolveApiImageUrl(activeData.imageUrl) : ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Team member name is required.");
      return;
    }

    if (!jobTitle.trim()) {
      toast.error("Job title is required.");
      return;
    }

    if (isCreate && !selectedFile) {
      toast.error("Please upload a portrait image for the team member.");
      return;
    }

    try {
      if (isCreate && selectedFile) {
        await createMutation.mutateAsync({
          name: name.trim(),
          jobTitle: jobTitle.trim(),
          imageFile: selectedFile,
        });
        toast.success("Team member created successfully.");
        onClose();
      } else if (!isCreate && item) {
        await updateMutation.mutateAsync({
          id: item.id,
          name: name.trim(),
          jobTitle: jobTitle.trim(),
          imageFile: selectedFile,
        });
        toast.success("Team member updated successfully.");
        onClose();
      }
    } catch {
      // QueryProvider global cache handles error toast
    }
  };

  const currentItem = detailQuery.data || item;
  const fullImageUrl = resolveApiImageUrl(currentItem?.imageUrl);

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      eyebrow={currentItem?.id ? `ID #${currentItem.id.slice(0, 8)}...` : "Staff"}
      title={
        isCreate
          ? "New Team Member"
          : isView
          ? "Team Member Details"
          : "Edit Team Member"
      }
      subtitle={
        isCreate
          ? "Add a staff member profile, role title, and official portrait."
          : isView
          ? "Review team member public credentials and role assignment."
          : "Update name, job title, or replace profile portrait."
      }
      footer={
        isView ? (
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
            >
              Close
            </button>
            {onSwitchToEdit && (
              <button
                type="button"
                onClick={onSwitchToEdit}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <FiEdit2 className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="team-member-form"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                  <span>{isCreate ? "Create Member" : "Save Changes"}</span>
                </>
              )}
            </button>
          </div>
        )
      }
    >
      {isView && currentItem ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#FAF7F2]/60 border border-[#013E51]/10 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-white border border-[#013E51]/15 shrink-0 flex items-center justify-center shadow-xs">
              {fullImageUrl ? (
                <Image
                  src={fullImageUrl}
                  alt={currentItem.name}
                  fill
                  sizes="112px"
                  className="object-cover object-top"
                  unoptimized
                />
              ) : (
                <FiUser className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#013E51]/10 text-[#013E51]">
                {currentItem.jobTitle}
              </span>
              <h3 className="text-xl font-bold text-[#013E51] font-[family-name:var(--font-cormorant)]">
                {currentItem.name}
              </h3>
              <p className="text-[11px] font-mono text-gray-400 break-all">
                UUID: {currentItem.id}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form id="team-member-form" onSubmit={handleSubmit} className="space-y-6">
          <TeamMemberPhotoUpload
            previewUrl={previewUrl}
            isEdit={!isCreate}
            isRequired={isCreate}
            onFileChange={handleFileChange}
            onResetFile={handleResetFile}
            hasStagedFile={Boolean(selectedFile)}
          />

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pola Nabil"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Job Title / Position *
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Tour Guide / Operation Manager"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>
          </div>
        </form>
      )}
    </AdminDrawer>
  );
}
