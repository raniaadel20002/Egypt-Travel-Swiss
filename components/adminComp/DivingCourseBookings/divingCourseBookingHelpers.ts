import { DivingBookingStatusEnum } from "@/models/divingCourseBooking";

export function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDivingBookingStatus(
  status: unknown
): DivingBookingStatusEnum {
  if (typeof status === "number") {
    return status in DivingBookingStatusEnum
      ? (status as DivingBookingStatusEnum)
      : DivingBookingStatusEnum.Pending;
  }
  if (typeof status === "string") {
    const s = status.trim().toLowerCase();
    if (s === "0" || s === "pending") return DivingBookingStatusEnum.Pending;
    if (s === "1" || s === "confirmed") return DivingBookingStatusEnum.Confirmed;
    if (s === "2" || s === "finished" || s === "completed") {
      return DivingBookingStatusEnum.Finished;
    }
    if (s === "3" || s === "cancelled" || s === "canceled") {
      return DivingBookingStatusEnum.Cancelled;
    }
    const num = Number(status);
    if (!isNaN(num) && num in DivingBookingStatusEnum) {
      return num as DivingBookingStatusEnum;
    }
  }
  return DivingBookingStatusEnum.Pending;
}

export function getDivingBookingStatusLabel(
  status: unknown
): string {
  const parsed = parseDivingBookingStatus(status);
  switch (parsed) {
    case DivingBookingStatusEnum.Pending:
      return "Pending";
    case DivingBookingStatusEnum.Confirmed:
      return "Confirmed";
    case DivingBookingStatusEnum.Finished:
      return "Finished";
    case DivingBookingStatusEnum.Cancelled:
      return "Cancelled";
  }
}

export function formatPriceEur(amount?: number | null): string {
  return `${Number(amount || 0).toFixed(2)} \u20AC`;
}
