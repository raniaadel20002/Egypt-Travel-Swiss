"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { TeamMemberApiItem } from "@/models/teamMember";
import {
  useDeleteTeamMemberMutation,
  useTeamMembersQuery,
} from "@/features/teamMembers/useTeamMembers";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import TeamMembersTable from "./TeamMembersTable";
import TeamMemberFormDrawer from "./TeamMemberFormDrawer";
import TeamMemberDeleteModal from "./TeamMemberDeleteModal";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export default function AdminTeamMembersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [formDrawer, setFormDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view";
    item: TeamMemberApiItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: TeamMemberApiItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const teamMembersQuery = useTeamMembersQuery();
  const deleteMutation = useDeleteTeamMemberMutation();

  const teamMembers = teamMembersQuery.data || [];

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return teamMembers;

    return teamMembers.filter((item) => {
      const matchName = item.name?.toLowerCase().includes(query);
      const matchJob = item.jobTitle?.toLowerCase().includes(query);
      const matchId = item.id?.toLowerCase().includes(query);
      return matchName || matchJob || matchId;
    });
  }, [teamMembers, searchQuery]);

  const handleCreate = () => {
    setFormDrawer({
      isOpen: true,
      mode: "create",
      item: null,
    });
  };

  const handleView = (item: TeamMemberApiItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "view",
      item,
    });
  };

  const handleEdit = (item: TeamMemberApiItem) => {
    setFormDrawer({
      isOpen: true,
      mode: "edit",
      item,
    });
  };

  const handleDeletePrompt = (item: TeamMemberApiItem) => {
    setDeleteModal({
      isOpen: true,
      item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item) return;

    try {
      await deleteMutation.mutateAsync(deleteModal.item.id);
      toast.success("Team member deleted successfully.");
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete team member."));
    }
  };

  return (
    <AdminShell
      eyebrow="Tours & Content"
      title="Team Members"
      subtitle="Manage agency staff profiles, tour leaders, specialists, and official portraits."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Team Member</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search & Stats Bar */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, position, or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#013E51]/10 self-start sm:self-auto">
            Total Staff: <span className="font-bold">{teamMembers.length}</span>
          </div>
        </div>

        {/* Error Banner */}
        {teamMembersQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              teamMembersQuery.error,
              "Failed to load team members from Touristy server."
            )}
          </div>
        )}

        {/* Table */}
        <TeamMembersTable
          items={filteredItems}
          isLoading={teamMembersQuery.isLoading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeletePrompt}
        />

        {/* Drawer */}
        <TeamMemberFormDrawer
          isOpen={formDrawer.isOpen}
          mode={formDrawer.mode}
          item={formDrawer.item}
          onClose={() => setFormDrawer((prev) => ({ ...prev, isOpen: false }))}
          onSwitchToEdit={() =>
            setFormDrawer((prev) => ({ ...prev, mode: "edit" }))
          }
        />

        {/* Delete Modal */}
        <TeamMemberDeleteModal
          isOpen={deleteModal.isOpen}
          item={deleteModal.item}
          isLoading={deleteMutation.isPending}
          onClose={() => setDeleteModal({ isOpen: false, item: null })}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </AdminShell>
  );
}
