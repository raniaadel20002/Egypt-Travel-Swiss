import { FiEye, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";
import { DivingCourseBookingApiItem } from "@/models/divingCourseBooking";
import DivingCourseBookingStatusBadge from "./DivingCourseBookingStatusBadge";
import { formatPriceEur } from "./divingCourseBookingHelpers";

interface DivingCourseBookingsTableProps {
  bookings: DivingCourseBookingApiItem[];
  isLoading: boolean;
  onViewDetails: (item: DivingCourseBookingApiItem) => void;
}

export default function DivingCourseBookingsTable({
  bookings,
  isLoading,
  onViewDetails,
}: DivingCourseBookingsTableProps) {
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
          No diving course bookings found matching your criteria.
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
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Hotel & Room</th>
              <th className="py-3.5 px-4">Courses & Date</th>
              <th className="py-3.5 px-4">Price (EUR)</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Payment</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => {
              const primaryItem = booking.items?.[0];
              const totalParticipants = (booking.items || []).reduce(
                (sum, item) => sum + (item.numberOfParticipants || 0),
                0
              );

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
                        <span>{booking.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FiMail className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-0.5">
                        <FiPhone className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{booking.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Hotel & Room */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-[#013E51] text-xs">
                      <FiMapPin className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
                      <span>{booking.hotelName || "-"}</span>
                    </div>
                    <span className="text-[11px] text-gray-500 block pt-0.5">
                      Room: {booking.roomNo || "-"}
                    </span>
                  </td>

                  {/* Courses & Booking Date */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-[#013E51] text-xs">
                        {primaryItem?.courseName || "Diving Course"}
                        {(booking.items?.length || 0) > 1 && (
                          <span className="ml-1 text-[11px] font-normal text-gray-400">
                            +{booking.items.length - 1} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <FiCalendar className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>
                          {primaryItem?.bookingDate
                            ? new Date(primaryItem.bookingDate).toLocaleDateString()
                            : "-"}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{totalParticipants} Pax</span>
                      </div>
                    </div>
                  </td>

                  {/* Pricing (EUR) */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#013E51] text-xs sm:text-sm block whitespace-nowrap">
                      {formatPriceEur(booking.totalPrice)}
                    </span>
                    <span className="text-[11px] text-gray-500 block">
                      Paid: {formatPriceEur(booking.paidAmount)}
                    </span>
                  </td>

                  {/* Booking Status */}
                  <td className="py-3.5 px-4">
                    <DivingCourseBookingStatusBadge status={booking.status} />
                  </td>

                  {/* Payment Status */}
                  <td className="py-3.5 px-4">
                    <DivingCourseBookingStatusBadge
                      status={booking.paymentStatus}
                      type="payment"
                    />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onViewDetails(booking)}
                      title="View Details"
                      className="p-1.5 rounded-lg border border-gray-200 text-[#013E51] hover:bg-[#013E51] hover:text-white transition-colors cursor-pointer"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
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
