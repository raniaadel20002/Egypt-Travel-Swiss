"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import { toast } from "sonner";
import { AdminRecord } from "@/models/admin";
import { useAuthStore, isSuperAdminSession } from "@/features/auth/useAuthStore";
import { useAdminsQuery } from "@/features/admin/useAdmins";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import AdminsMetricsGrid from "./AdminsMetricsGrid";
import AdminsFiltersBar from "./AdminsFiltersBar";
import AdminsTable from "./AdminsTable";
import AdminDetailsDrawer from "./AdminDetailsDrawer";
import AdminFormDrawer from "./AdminFormDrawer";
import AdminDeleteModal from "./AdminDeleteModal";
import { filterAdminsList } from "./adminHelpers";

export default function AdminAdminsPage() {
  const router = useRouter();
  const { user, accessToken, hasHydrated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedAdmin, setSelectedAdmin] = useState<AdminRecord | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [adminToDelete, setAdminToDelete] = useState<AdminRecord | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSuperAdmin = mounted ? isSuperAdminSession(user, accessToken) : false;

  useEffect(() => {
    if (mounted && hasHydrated && !isSuperAdmin) {
      toast.error("Access restricted to Super Administrators.");
      router.replace("/admin/dashboard");
    }
  }, [mounted, hasHydrated, isSuperAdmin, router]);

  const { data: adminsResponse, isLoading } = useAdminsQuery(undefined, {
    enabled: isSuperAdmin,
  });

  const allAdmins = useMemo(() => {
    return adminsResponse?.data || [];
  }, [adminsResponse]);

  const filteredAdmins = useMemo(() => {
    return filterAdminsList(allAdmins, search, roleFilter);
  }, [allAdmins, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAdmins.length / pageSize));
  const paginatedAdmins = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAdmins.slice(start, start + pageSize);
  }, [filteredAdmins, currentPage, pageSize]);

  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedAdmin(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (admin: AdminRecord) => {
    setFormMode("edit");
    setSelectedAdmin(admin);
    setIsFormOpen(true);
  };

  const handleOpenView = (admin: AdminRecord) => {
    setSelectedAdmin(admin);
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (admin: AdminRecord) => {
    setAdminToDelete(admin);
  };

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <AdminShell
      eyebrow="Access & Security"
      title="System Administrators"
      subtitle="Manage authorized staff, assign portal roles, and review security credentials."
      action={
        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiUserPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Administrator</span>
        </button>
      }
    >
      <div className="space-y-6">
        <AdminsMetricsGrid
          admins={allAdmins}
          filteredCount={filteredAdmins.length}
        />

        <AdminsFiltersBar
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setCurrentPage(1);
          }}
          roleFilter={roleFilter}
          onRoleFilterChange={(v) => {
            setRoleFilter(v);
            setCurrentPage(1);
          }}
          pageSize={pageSize}
          onPageSizeChange={(sz) => {
            setPageSize(sz);
            setCurrentPage(1);
          }}
          onReset={() => {
            setSearch("");
            setRoleFilter("ALL");
            setCurrentPage(1);
          }}
        />

        {isLoading ? (
          <div className="bg-white rounded-2xl p-6 border border-[#013E51]/10 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-2">
                <div className="w-9 h-9 rounded-xl bg-gray-200 animate-pulse shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <AdminsTable
            admins={paginatedAdmins}
            currentUserId={user?.id}
            onView={handleOpenView}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-2 pt-1 text-xs font-semibold text-[#013E51]">
            <span>
              Page {currentPage} of {totalPages} ({filteredAdmins.length} staff accounts)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 cursor-pointer shadow-2xs"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 cursor-pointer shadow-2xs"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <AdminDetailsDrawer
          admin={selectedAdmin}
          isOpen={isDetailsOpen}
          currentUserId={user?.id}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />

        <AdminFormDrawer
          isOpen={isFormOpen}
          mode={formMode}
          admin={selectedAdmin}
          onClose={() => setIsFormOpen(false)}
        />

        <AdminDeleteModal
          admin={adminToDelete}
          isOpen={Boolean(adminToDelete)}
          onClose={() => setAdminToDelete(null)}
        />
      </div>
    </AdminShell>
  );
}
