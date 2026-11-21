import { ApiResponse } from "./api";
import { AdminRole } from "./auth";

export * from "./auth";
export type { ApiResponse };

export interface AdminRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminRole;
  phone: string;
  nationality: string;
  notes: string;
  createdAt: string;
}

export interface CreateAdminPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  password?: string;
  notes?: string;
}

export interface UpdateAdminPayload {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AdminsQueryParams {
  PageNumber?: number;
  PageSize?: number;
}

// Backward compatibility aliases
export interface AdminUserItem {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  role?: AdminRole;
  roles?: AdminRole[];
}

export interface PaginatedAdminsData {
  items: AdminRecord[] | AdminUserItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
