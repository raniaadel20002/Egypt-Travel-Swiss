import { FiEye, FiTrash2, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiMoon } from "react-icons/fi";
import {
  HotelBookingApiItem,
  HotelBookingStatusEnum,
} from "@/models/hotelBooking";
import HotelBookingStatusBadge from "./HotelBookingStatusBadge";
import { parseHotelBookingStatus } from "./hotelBookingHelpers";

interface HotelBookingsTableProps {
  bookings: HotelBookingApiItem[];
  isLoading: boolean;
  onViewDetails: (item: HotelBookingApiItem) => void;
  onStatusChange: (id: number, newStatus: HotelBookingStatusEnum) => void;
  onDeleteClick: (item: HotelBookingApiItem) => void;
}

export default function HotelBookingsTable({
  bookings,
  isLoading,
  onViewDetails,
  onStatusChange,
  onDeleteClick,
}: HotelBookingsTableProps) {
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
          No hotel reservations found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#013E51]/10 overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] font-[family-name:var(--font-lato)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#F8F9FA] border-b border-gray-200 text-[#013E51] font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Booking</th>
              <th className="py-3.5 px-4">Guest</th>
              <th className="py-3.5 px-4">Hotel / Resort</th>
              <th className="py-3.5 px-4">Stay & Dates</th>
              <th className="py-3.5 px-4">Guests</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => {
              const currentStatus = parseHotelBookingStatus(booking.status);

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-[#F8F9FA]/60 transition-colors"
                >
                  {/* Booking ID & Creation */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-bold text-[#013E51] block">
                      #{booking.id}
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </td>

                  {/* Guest Info */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#013E51]">
                        <FiUser className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{booking.name}</span>
                        {booking.nationality && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 font-normal">
                            {booking.nationality}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FiMail className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-0.5">
                        <FiPhone className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{booking.whatsApp}</span>
                      </div>
                    </div>
                  </td>

                  {/* Hotel Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-[#013E51] text-xs">
                      <FiMapPin className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
                      <span>{booking.hotelName || `Hotel #${booking.hotelId}`}</span>
                    </div>
                    <span className="text-[11px] text-gray-500 block pt-0.5">
                      {booking.roomsCount || booking.rooms?.length || 1} Room(s)
                    </span>
                  </td>

                  {/* Stay & Dates */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-[#013E51] text-xs">
                        <FiCalendar className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>
                          {booking.bookingDate
                            ? new Date(booking.bookingDate).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <FiMoon className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{booking.nightsCount} Night(s)</span>
                      </div>
                    </div>
                  </td>

                  {/* Guests */}
                  <td className="py-3.5 px-4 text-xs font-semibold text-[#013E51]">
                    <div>{booking.adults} Adults</div>
                    {(booking.children > 0 || booking.infants > 0) && (
                      <div className="text-[11px] text-gray-500 font-normal">
                        {booking.children} Child, {booking.infants} Inf
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <HotelBookingStatusBadge status={booking.status} />
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

                      {/* Quick Status Selector */}
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          onStatusChange(
                            booking.id,
                            Number(e.target.value) as HotelBookingStatusEnum
                          )
                        }
                        className="py-1 px-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-[#013E51] bg-white cursor-pointer focus:outline-hidden"
                      >
                        <option value={HotelBookingStatusEnum.Pending}>Pending</option>
                        <option value={HotelBookingStatusEnum.Confirmed}>Confirmed</option>
                        <option value={HotelBookingStatusEnum.Finished}>Finished</option>
                        <option value={HotelBookingStatusEnum.Cancelled}>Cancelled</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => onDeleteClick(booking)}
                        title="Delete Booking"
                        className="p-1.5 rounded-lg border border-gray-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
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
