"use client";

import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import { AdminRecord } from "@/models/admin";
import {
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from "@/features/admin/useAdmins";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import AdminFormPasswordSection from "./AdminFormPasswordSection";
import { validatePasswordStrength } from "./adminHelpers";

interface AdminFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  admin: AdminRecord | null;
  onClose: () => void;
}

export default function AdminFormDrawer({
  isOpen,
  mode,
  admin,
  onClose,
}: AdminFormDrawerProps) {
  const isEdit = mode === "edit";
  const createMutation = useCreateAdminMutation();
  const updateMutation = useUpdateAdminMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (isEdit && admin) {
        setFirstName(admin.firstName || "");
        setLastName(admin.lastName || "");
        setEmail(admin.email || "");
        setPhone(admin.phone || "");
        setNationality(admin.nationality || "");
        setNotes(admin.notes || "");
        setPassword("");
      } else {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setNationality("Egyptian");
        setPassword("");
        setNotes("");
      }
    }
  }, [isOpen, isEdit, admin]);

  const pwdChecks = validatePasswordStrength(password);
  const isCreateValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().includes("@") &&
    phone.trim().length > 0 &&
    pwdChecks.isValid;

  const isEditValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phone.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && admin) {
      if (!isEditValid) {
        toast.error("Please fill in first name, last name, and phone.");
        return;
      }
      updateMutation.mutate(
        {
          id: admin.id,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
        },
        {
          onSuccess: () => {
            toast.success("Administrator updated successfully.");
            onClose();
          },
          onError: (err: unknown) => {
            const errObj = err as {
              response?: { data?: { Message?: string; message?: string } };
            };
            toast.error(
              errObj.response?.data?.Message ||
                errObj.response?.data?.message ||
                "Failed to update administrator."
            );
          },
        }
      );
    } else {
      if (!isCreateValid) {
        toast.error("Please complete all required fields and satisfy password rules.");
        return;
      }
      createMutation.mutate(
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          nationality: nationality.trim() || "Egyptian",
          password,
          notes: notes.trim(),
        },
        {
          onSuccess: () => {
            toast.success("Administrator account created successfully.");
            onClose();
          },
          onError: (err: unknown) => {
            const errObj = err as {
              response?: { data?: { Message?: string; message?: string } };
            };
            toast.error(
              errObj.response?.data?.Message ||
                errObj.response?.data?.message ||
                "Failed to create administrator."
            );
          },
        }
      );
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow="Access Control"
      title={isEdit ? "Edit Administrator" : "New Administrator"}
      subtitle={
        isEdit
          ? `Update details for ${admin?.email}`
          : "Create a staff administrator account with full operational access."
      }
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="admin-form"
            disabled={isSaving || (isEdit ? !isEditValid : !isCreateValid)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheck className="w-4 h-4 text-[#E8B34A]" />
            <span>{isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Account"}</span>
          </button>
        </div>
      }
    >
      <form id="admin-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
              First Name *
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Sarah"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Hassan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Email Address {isEdit ? "(Read-only)" : "*"}
          </label>
          <input
            type="email"
            required={!isEdit}
            disabled={isEdit}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
              Phone Number *
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
              Nationality {isEdit && "(Fixed)"}
            </label>
            <input
              type="text"
              disabled={isEdit}
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Egyptian"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>
        </div>

        {!isEdit && (
          <AdminFormPasswordSection
            password={password}
            onPasswordChange={setPassword}
          />
        )}

        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Notes
          </label>
          <textarea
            rows={3}
            disabled={isEdit}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Operational notes, duties or credentials..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
        </div>
      </form>
    </AdminDrawer>
  );
}
