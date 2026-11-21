import { HotelBookingStatusEnum } from "@/models/hotelBooking";

export function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseHotelBookingStatus(
  status: unknown
): HotelBookingStatusEnum {
  if (typeof status === "number") {
    return status in HotelBookingStatusEnum
      ? (status as HotelBookingStatusEnum)
      : HotelBookingStatusEnum.Pending;
  }
  if (typeof status === "string") {
    const s = status.trim().toLowerCase();
    if (s === "0" || s === "pending") return HotelBookingStatusEnum.Pending;
    if (s === "1" || s === "confirmed") return HotelBookingStatusEnum.Confirmed;
    if (s === "2" || s === "finished" || s === "completed") {
      return HotelBookingStatusEnum.Finished;
    }
    if (s === "3" || s === "cancelled" || s === "canceled") {
      return HotelBookingStatusEnum.Cancelled;
    }
    const num = Number(status);
    if (!isNaN(num) && num in HotelBookingStatusEnum) {
      return num as HotelBookingStatusEnum;
    }
  }
  return HotelBookingStatusEnum.Pending;
}

export function getHotelBookingStatusLabel(status: unknown): string {
  const parsed = parseHotelBookingStatus(status);
  switch (parsed) {
    case HotelBookingStatusEnum.Pending:
      return "Pending";
    case HotelBookingStatusEnum.Confirmed:
      return "Confirmed";
    case HotelBookingStatusEnum.Finished:
      return "Finished";
    case HotelBookingStatusEnum.Cancelled:
      return "Cancelled";
  }
}
