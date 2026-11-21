import { AdminRecord } from "@/models/admin";

export function formatAdminDate(dateStr?: string | null): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "-";
  }
}

export function validatePasswordStrength(password: string): {
  hasMinLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasSpecial: boolean;
  isValid: boolean;
} {
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isValid = hasMinLength && hasUpper && hasLower && hasSpecial;
  return { hasMinLength, hasUpper, hasLower, hasSpecial, isValid };
}

export function filterAdminsList(
  admins: AdminRecord[],
  search: string,
  roleFilter: string
): AdminRecord[] {
  const q = search.trim().toLowerCase();
  return admins.filter((admin) => {
    if (roleFilter !== "ALL" && admin.role !== roleFilter) {
      return false;
    }
    if (!q) return true;
    const nameMatch = `${admin.firstName || ""} ${admin.lastName || ""}`
      .toLowerCase()
      .includes(q);
    const emailMatch = (admin.email || "").toLowerCase().includes(q);
    const phoneMatch = (admin.phone || "").toLowerCase().includes(q);
    const nationalityMatch = (admin.nationality || "").toLowerCase().includes(q);
    return nameMatch || emailMatch || phoneMatch || nationalityMatch;
  });
}
