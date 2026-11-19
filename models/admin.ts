import { ApiResponse } from "./api";
import { AdminRole } from "./auth";

export * from "./auth";
export type { ApiResponse };

export interface AdminUserItem {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  role?: AdminRole;
  roles?: AdminRole[];
}

export interface PaginatedAdminsData {
  items: AdminUserItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminsQueryParams {
  PageNumber?: number;
  PageSize?: number;
}
