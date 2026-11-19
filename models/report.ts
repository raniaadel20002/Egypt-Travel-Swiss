export type ReportPeriod = "daily" | "monthly" | "yearly";

export interface TripReportItem {
  tripTitle?: string;
  bookingCount: number;
}

export interface ReportData {
  totalBookings: number;
  totalRevenue: number;
  newCustomers?: number;
  topTrips?: TripReportItem[];
}

export interface ReportApiResponse {
  success: boolean;
  message?: string;
  data: ReportData;
}
