import { useState } from "react";
import { FiX, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import {
  TransferBookingApiItem,
  TransferTripTypeEnum,
} from "@/models/transferBooking";
import {
  useCompleteTransferBookingMutation,
  useTransferPreviewQuery,
} from "@/features/transfers/useTransferBookings";

interface TransferBookingCompleteModalProps {
  booking: TransferBookingApiItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TransferBookingCompleteModal({
  booking,
  isOpen,
  onClose,
}: TransferBookingCompleteModalProps) {
  const [additionalHours, setAdditionalHours] = useState<number>(0);
  const completeMutation = useCompleteTransferBookingMutation();

  const previewPayload =
    booking && booking.fromLocationId && booking.toLocationId
      ? {
          fromLocationId: booking.fromLocationId,
          toLocationId: booking.toLocationId,
          adults: booking.adults || 1,
          children: booking.children || 0,
          tripType:
            booking.tripType?.toLowerCase().includes("round")
              ? TransferTripTypeEnum.RoundTrip
              : TransferTripTypeEnum.OneWay,
          additionalHours: Number(additionalHours) || 0,
        }
      : null;

  const { data: previewData, isLoading: isPreviewLoading } =
    useTransferPreviewQuery(previewPayload);

  useModalDismiss({ isOpen, onClose, disabled: completeMutation.isPending });

  if (!isOpen || !booking) return null;

  const currentFinalEur =
    booking.pricing?.finalPriceConverted ??
    booking.pricing?.finalPriceUsd ??
    0;

  const previewFinalEur = previewData?.pricing?.finalPrice;
  const previewAddCostEur = previewData?.pricing?.additionalHoursCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await completeMutation.mutateAsync({
        bookingId: booking.id,
        payload: { additionalHours: Number(additionalHours) || 0 },
      });
      toast.success(
        `Booking #${booking.id.slice(0, 8)} successfully marked as completed.`
      );
      onClose();
    } catch {
      toast.error("Failed to complete transfer booking. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-[family-name:var(--font-lato)]">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#013E51] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Complete Transfer Booking</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-[#F8F9FA] p-3 rounded-xl border border-gray-100 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking ID:</span>
              <span className="font-mono font-bold text-[#013E51]">
                #{booking.id.slice(0, 8)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer:</span>
              <span className="font-bold text-[#013E51]">{booking.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle:</span>
              <span className="font-bold text-[#013E51]">
                {booking.vehicleName || "Transfer Vehicle"}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-gray-200/60">
              <span className="text-gray-500">Base Price (EUR):</span>
              <span className="font-bold text-[#013E51]">
                &euro;{Number(currentFinalEur).toFixed(2)}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#013E51] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>Additional Waiting Hours (if any)</span>
            </label>
            <input
              type="number"
              min={0}
              max={48}
              value={additionalHours}
              onChange={(e) => setAdditionalHours(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#013E51] focus:outline-hidden focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51]"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Enter any extra waiting or service hours to be added to the final completed invoice.
            </p>
          </div>

          {/* Live Preview Pricing Card */}
          {additionalHours > 0 && (
            <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-amber-900 font-bold">
                <span className="flex items-center gap-1">
                  <FiDollarSign className="w-3.5 h-3.5 text-[#E8B34A]" />
                  <span>Waiting Hours Cost:</span>
                </span>
                <span>
                  {isPreviewLoading
                    ? "Calculating..."
                    : previewAddCostEur !== undefined
                    ? `+€${Number(previewAddCostEur).toFixed(2)}`
                    : "Included in invoice"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#013E51] font-extrabold text-sm pt-1 border-t border-amber-200/60">
                <span>Updated Final Total:</span>
                <span>
                  {isPreviewLoading
                    ? "Calculating..."
                    : previewFinalEur !== undefined
                    ? `€${Number(previewFinalEur).toFixed(2)}`
                    : `€${Number(currentFinalEur).toFixed(2)}`}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={completeMutation.isPending}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={completeMutation.isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
            >
              <FiCheckCircle className="w-4 h-4" />
              <span>{completeMutation.isPending ? "Completing..." : "Confirm Completion"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
