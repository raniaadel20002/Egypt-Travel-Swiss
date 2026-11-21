import {
  TransferBookingStatusEnum,
  TransferCommunicationMethodEnum,
} from "@/models/transferBooking";

export const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

export function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseTransferStatus(status: unknown): TransferBookingStatusEnum {
  if (typeof status === "number") {
    return status in TransferBookingStatusEnum
      ? (status as TransferBookingStatusEnum)
      : TransferBookingStatusEnum.Pending;
  }
  if (typeof status === "string") {
    const s = status.trim().toLowerCase();
    if (s === "0" || s === "pending") return TransferBookingStatusEnum.Pending;
    if (s === "1" || s === "confirmed") return TransferBookingStatusEnum.Confirmed;
    if (s === "2" || s === "completed" || s === "finished") return TransferBookingStatusEnum.Completed;
    if (s === "3" || s === "cancelled" || s === "canceled") return TransferBookingStatusEnum.Cancelled;
    const num = Number(status);
    if (!isNaN(num) && num in TransferBookingStatusEnum) {
      return num as TransferBookingStatusEnum;
    }
  }
  return TransferBookingStatusEnum.Pending;
}

export function isTransferBookingCompleted(booking: {
  isCompleted?: boolean;
  status?: unknown;
}): boolean {
  if (booking.isCompleted) return true;
  return parseTransferStatus(booking.status) === TransferBookingStatusEnum.Completed;
}

export function getCommunicationLabel(
  method: TransferCommunicationMethodEnum | number
): string {
  switch (Number(method)) {
    case TransferCommunicationMethodEnum.Email:
      return "Email";
    case TransferCommunicationMethodEnum.WhatsApp:
      return "WhatsApp";
    case TransferCommunicationMethodEnum.Viber:
      return "Viber";
    case TransferCommunicationMethodEnum.Phone:
      return "Phone Call";
    default:
      return "Direct Contact";
  }
}
