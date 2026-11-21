import { FiX, FiCheckCircle, FiUser, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import {
  TransferBookingApiItem,
  TransferBookingStatusEnum,
} from "@/models/transferBooking";
import TransferBookingStatusBadge from "./TransferBookingStatusBadge";
import {
  getCommunicationLabel,
  parseTransferStatus,
  isTransferBookingCompleted,
} from "./transferBookingHelpers";

interface TransferBookingDetailsDrawerProps {
  booking: TransferBookingApiItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: TransferBookingStatusEnum) => void;
  onCompleteClick: (item: TransferBookingApiItem) => void;
}

export default function TransferBookingDetailsDrawer({
  booking,
  isOpen,
  onClose,
  onStatusChange,
  onCompleteClick,
}: TransferBookingDetailsDrawerProps) {
  useModalDismiss({ isOpen, onClose });

  if (!isOpen || !booking) return null;

  const isCompleted = isTransferBookingCompleted(booking);

  const priceEur =
    booking.pricing?.finalPriceConverted ??
    booking.pricing?.finalPriceUsd ??
    0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-[family-name:var(--font-lato)]">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#013E51] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B34A] font-bold block">
                Transfer Booking Details
              </span>
              <h2 className="text-lg font-bold font-mono">#{booking.id}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status & Quick Actions Bar */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 font-bold block">Current Status</span>
                <div className="mt-1">
                  <TransferBookingStatusBadge
                    status={booking.status}
                    isCompleted={booking.isCompleted}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={parseTransferStatus(booking.status)}
                  onChange={(e) =>
                    onStatusChange(
                      booking.id,
                      Number(e.target.value) as TransferBookingStatusEnum
                    )
                  }
                  className="py-1.5 px-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#013E51] bg-white cursor-pointer"
                >
                  <option value={TransferBookingStatusEnum.Pending}>Pending</option>
                  <option value={TransferBookingStatusEnum.Confirmed}>Confirmed</option>
                  <option value={TransferBookingStatusEnum.Completed}>Completed</option>
                  <option value={TransferBookingStatusEnum.Cancelled}>Cancelled</option>
                </select>

                {!isCompleted && (
                  <button
                    type="button"
                    onClick={() => onCompleteClick(booking)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiUser className="w-4 h-4 text-[#E8B34A]" />
                <span>Customer Information</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block">Name</span>
                  <span className="font-bold text-[#013E51]">{booking.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Email</span>
                  <span className="font-bold text-[#013E51] break-all">{booking.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Phone</span>
                  <span className="font-bold text-[#013E51]">{booking.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Preferred Contact</span>
                  <span className="font-bold text-[#013E51]">
                    {getCommunicationLabel(booking.communicationMethod)}
                  </span>
                </div>
                {booking.countryTransferName && (
                  <div className="col-span-2">
                    <span className="text-gray-400 block">Customer Country / Dial Code</span>
                    <span className="font-bold text-[#013E51]">{booking.countryTransferName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Route & Schedule */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-[#E8B34A]" />
                <span>Route & Schedule</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block">From Location</span>
                  <span className="font-bold text-[#013E51]">
                    {booking.fromLocationName || booking.fromLocationId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">To Location</span>
                  <span className="font-bold text-[#013E51]">
                    {booking.toLocationName || booking.toLocationId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Trip Type</span>
                  <span className="font-bold text-[#013E51]">{booking.tripType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Luggage Count</span>
                  <span className="font-bold text-[#013E51]">{booking.luggageCount}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Trip Date</span>
                  <span className="font-bold text-[#013E51] flex items-center gap-1 mt-0.5">
                    <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
                    {booking.tripDate
                      ? new Date(booking.tripDate).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Trip Time</span>
                  <span className="font-bold text-[#013E51] flex items-center gap-1 mt-0.5">
                    <FiClock className="w-3.5 h-3.5 text-gray-400" />
                    {booking.tripTime || "Anytime"}
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle & Passengers */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51]">
                Vehicle & Capacity
              </h3>
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Vehicle Name:</span>
                  <span className="font-bold text-[#013E51]">{booking.vehicleName || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vehicle Range:</span>
                  <span className="font-bold text-[#013E51]">
                    {booking.vehicleFromPerson ?? 1} - {booking.vehicleToPerson ?? 4} persons
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Passengers:</span>
                  <span className="font-bold text-[#013E51]">
                    {booking.totalPersons} total ({booking.adults} adults, {booking.children} children)
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            {booking.pricing && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                  <span className="font-bold text-[#E8B34A] text-sm">&euro;</span>
                  <span>Pricing Breakdown (EUR)</span>
                </h3>
                <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Outbound Price:</span>
                    <span className="font-semibold text-gray-700">
                      {Number(booking.pricing.outboundPriceUsd).toFixed(2)} &euro;
                    </span>
                  </div>
                  {booking.pricing.returnPriceUsd > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Return Price:</span>
                      <span className="font-semibold text-gray-700">
                        {Number(booking.pricing.returnPriceUsd).toFixed(2)} &euro;
                      </span>
                    </div>
                  )}
                  {booking.pricing.discountAmountUsd > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({booking.pricing.discountPercentage}%):</span>
                      <span>-{Number(booking.pricing.discountAmountUsd).toFixed(2)} &euro;</span>
                    </div>
                  )}
                  {booking.pricing.additionalHours > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Additional Hours ({booking.pricing.additionalHours}h @ {booking.pricing.additionalHoursRateUsd}&euro;):
                      </span>
                      <span className="font-semibold text-gray-700">
                        +{Number(booking.pricing.additionalHoursCostUsd).toFixed(2)} &euro;
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between items-center text-sm">
                    <span className="font-bold text-[#013E51]">Final Total:</span>
                    <span className="font-extrabold text-[#013E51] text-base">
                      {Number(priceEur).toFixed(2)} &euro;
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {booking.notes && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51]">
                  Customer Notes
                </h3>
                <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                  {booking.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
