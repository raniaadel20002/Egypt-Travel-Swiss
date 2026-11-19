export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[] | Record<string, string[]> | string | null;
}

export interface PaginatedResult<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationParams {
  PageNumber?: number;
  PageSize?: number;
}
