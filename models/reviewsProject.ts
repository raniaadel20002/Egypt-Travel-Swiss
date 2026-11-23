export const DUMMY_PROJECT_REVIEW_PHONE = "0123456789";

export interface ReviewProjectItem {
  id: number;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  rate: number;
  createdAt: string;
}

export interface CreateReviewProjectDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  comment: string;
  rate: number;
}

export interface ReviewsProjectQueryParams {
  pageNumber?: number;
  pageSize?: number;
}
