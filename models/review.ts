export const DUMMY_REVIEW_PHONE = "0123456789";

export interface TripReviewItem {
  id: number;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  rate: number;
  createdAt: string;
  tripName: string;
  description: string;
  markerID: string;
  destination: string;
  tripTypeName: string;
  adultPrice: number;
  childPrice: number;
  currencyName: string;
}

export interface CreateTripReviewDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tripId: number;
  comment: string;
  rate: number;
}

export interface TripReviewsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  TripId?: number;
}

export interface TripReviewAverage {
  averageRate: number;
  totalReviews: number;
}
