import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import { HotelBookingApiItem } from "@/models/hotelBooking";

interface HotelBookingDeleteModalProps {
  booking: HotelBookingApiItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function HotelBookingDeleteModal({
  booking,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: HotelBookingDeleteModalProps) {
  if (!booking) return null;

  return (
    <ConfirmDeleteDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isPending={isLoading}
      title="Delete Hotel Reservation"
      description={`Are you sure you want to delete hotel booking #${booking.id} for "${booking.name}" at ${booking.hotelName}? This action cannot be undone.`}
      confirmLabel="Delete Reservation"
    />
  );
}
