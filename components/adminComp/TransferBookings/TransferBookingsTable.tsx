import { FiEye, FiCheckCircle, FiArrowRight, FiUser, FiPhone, FiMail } from "react-icons/fi";
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

interface TransferBookingsTableProps {
  bookings: TransferBookingApiItem[];
  isLoading: boolean;
  onViewDetails: (item: TransferBookingApiItem) => void;
  onStatusChange: (id: string, newStatus: TransferBookingStatusEnum) => void;
  onCompleteClick: (item: TransferBookingApiItem) => void;
}

export default function TransferBookingsTable({
  bookings,
  isLoading,
  onViewDetails,
  onStatusChange,
  onCompleteClick,
}: TransferBookingsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-[#013E51]/10 p-6 space-y-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] font-[family-name:var(--font-lato)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#013E51]/10 p-12 text-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] font-[family-name:var(--font-lato)]">
        <p className="text-gray-500 font-semibold text-sm">
          No transfer bookings found matching your criteria.
        </p>
      </div>
    );
  }

  const handleStatusSelect = (booking: TransferBookingApiItem, valStr: string) => {
    const nextStatus = Number(valStr) as TransferBookingStatusEnum;
    if (nextStatus === TransferBookingStatusEnum.Completed) {
      onCompleteClick(booking);
      return;
    }
    onStatusChange(booking.id, nextStatus);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#013E51]/10 overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] font-[family-name:var(--font-lato)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#F8F9FA] border-b border-gray-200 text-[#013E51] font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Booking</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Route & Trip</th>
              <th className="py-3.5 px-4">Schedule</th>
              <th className="py-3.5 px-4">Vehicle & Pax</th>
              <th className="py-3.5 px-4">Price (EUR)</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => {
              const commLabel = getCommunicationLabel(booking.communicationMethod);
              const priceEur =
                booking.pricing?.finalPriceConverted ??
                booking.pricing?.finalPriceUsd ??
                0;
              const isCompleted = isTransferBookingCompleted(booking);

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-[#F8F9FA]/60 transition-colors"
                >
                  {/* Booking ID & Creation */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-bold text-[#013E51] block">
                      #{booking.id.slice(0, 8)}
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </td>

                  {/* Customer Info */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#013E51]">
                        <FiUser className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{booking.customerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FiMail className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <FiPhone className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{booking.phoneNumber}</span>
                        </span>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold border bg-gray-50 text-gray-700 border-gray-200">
                          {commLabel}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Route & Trip Type */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-[#013E51] text-xs">
                        <span>{booking.fromLocationName || "From Origin"}</span>
                        <FiArrowRight className="w-3 h-3 text-[#E8B34A] shrink-0" />
                        <span>{booking.toLocationName || "To Destination"}</span>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#013E51]/5 text-[#013E51] text-[11px] font-semibold">
                        {booking.tripType || "One Way"}
                      </span>
                    </div>
                  </td>

                  {/* Schedule */}
                  <td className="py-3.5 px-4">
                    <span className="block font-semibold text-[#013E51] text-xs">
                      {booking.tripDate
                        ? new Date(booking.tripDate).toLocaleDateString()
                        : "-"}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      {booking.tripTime || "Anytime"}
                    </span>
                  </td>

                  {/* Vehicle & Pax */}
                  <td className="py-3.5 px-4">
                    <span className="block font-bold text-[#013E51] text-xs">
                      {booking.vehicleName || "Transfer Vehicle"}
                    </span>
                    <span className="text-[11px] text-gray-500 block">
                      {booking.adults} Adults, {booking.children} Children
                    </span>
                    {booking.luggageCount > 0 && (
                      <span className="text-[11px] text-gray-400 block">
                        {booking.luggageCount} Luggage
                      </span>
                    )}
                  </td>

                  {/* Price in EUR */}
                  <td className="py-3.5 px-4 font-bold text-[#013E51] whitespace-nowrap">
                    {Number(priceEur).toFixed(2)} &euro;
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <TransferBookingStatusBadge
                      status={booking.status}
                      isCompleted={booking.isCompleted}
                    />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewDetails(booking)}
                        title="View Details"
                        className="p-1.5 rounded-lg border border-gray-200 text-[#013E51] hover:bg-[#013E51] hover:text-white transition-colors cursor-pointer"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>

                      {/* Quick Status Selector & Complete for Non-Completed Bookings */}
                      {!isCompleted && (
                        <>
                          <select
                            value={parseTransferStatus(booking.status)}
                            onChange={(e) => handleStatusSelect(booking, e.target.value)}
                            className="py-1 px-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-[#013E51] bg-white cursor-pointer focus:outline-hidden"
                          >
                            <option value={TransferBookingStatusEnum.Pending}>Pending</option>
                            <option value={TransferBookingStatusEnum.Confirmed}>Confirmed</option>
                            <option value={TransferBookingStatusEnum.Completed}>Completed</option>
                            <option value={TransferBookingStatusEnum.Cancelled}>Cancelled</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => onCompleteClick(booking)}
                            title="Complete Booking"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <FiCheckCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
