"use client";

import { FiCalendar, FiCheck, FiCheckCircle, FiEye, FiTrash2 } from "react-icons/fi";
import { BookingApiItem } from "@/models/booking";
import BookingStatusBadge from "./BookingStatusBadge";
import AdminBookingPaidCell from "../Common/AdminBookingPaidCell";

interface BookingsTableProps {
  items: BookingApiItem[];
  isLoading: boolean;
  onViewDetails: (item: BookingApiItem) => void;
  onConfirm: (item: BookingApiItem) => void;
  onFinish: (item: BookingApiItem) => void;
  onDelete: (item: BookingApiItem) => void;
}

export default function BookingsTable({
  items,
  isLoading,
  onViewDetails,
  onConfirm,
  onFinish,
  onDelete,
}: BookingsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-100 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-12 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-3">
          <FiCalendar className="w-6 h-6 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Tour Bookings Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-sm mx-auto mt-1">
          No bookings match the selected filters. Use &quot;New Booking&quot; to manually enter an excursion reservation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#013E51]/10 bg-[#FAF7F2]/60 text-[11px] font-bold uppercase tracking-wider text-[#013E51]/60 font-[family-name:var(--font-lato)]">
              <th className="py-4 px-4 sm:px-5 w-16">ID</th>
              <th className="py-4 px-4 sm:px-5">Customer</th>
              <th className="py-4 px-4 sm:px-5">Accommodation</th>
              <th className="py-4 px-4 sm:px-5">Excursion(s)</th>
              <th className="py-4 px-4 sm:px-5">Guests</th>
              <th className="py-4 px-4 sm:px-5">Total (EUR)</th>
              <th className="py-4 px-4 sm:px-5">Paid Amount</th>
              <th className="py-4 px-4 sm:px-5">Status</th>
              <th className="py-4 px-4 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#013E51]/6 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((booking) => {
              const primaryTrip = booking.tripsBookings?.[0];
              const extraTripsCount = (booking.tripsBookings?.length || 0) - 1;
              const totalAdults = booking.tripsBookings?.reduce(
                (sum, t) => sum + (t.noAdult || 0),
                0
              ) || 0;
              const totalChildren = booking.tripsBookings?.reduce(
                (sum, t) => sum + (t.noChild || 0),
                0
              ) || 0;
              const totalInfants = booking.tripsBookings?.reduce(
                (sum, t) => sum + (t.noInf || 0),
                0
              ) || 0;

              const isPending = booking.status?.toLowerCase() === "pending";
              const isConfirmed = booking.status?.toLowerCase() === "confirmed";

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-[#FAF7F2]/40 transition-colors"
                >
                  {/* ID */}
                  <td className="py-4 px-4 sm:px-5">
                    <span className="font-mono text-xs font-extrabold text-[#013E51] bg-[#FAF7F2] px-2 py-1 rounded-md border border-[#013E51]/10">
                      #{booking.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-4 sm:px-5">
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#013E51]">
                        {booking.firstName} {booking.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{booking.email}</div>
                      <div className="text-[11px] text-[#888888] flex items-center gap-2">
                        <span>{booking.phone}</span>
                        {booking.nationality && (
                          <span className="font-semibold text-[#013E51]/80">
                            &bull; {booking.nationality}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Accommodation */}
                  <td className="py-4 px-4 sm:px-5">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-[#013E51]">
                        {booking.hotelName || "—"}
                      </div>
                      {booking.roomNo && (
                        <div className="text-xs text-gray-500">
                          Room: {booking.roomNo}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Excursions */}
                  <td className="py-4 px-4 sm:px-5">
                    {primaryTrip ? (
                      <div className="space-y-0.5">
                        <div className="font-semibold text-[#013E51] line-clamp-1">
                          {primaryTrip.title}
                          {extraTripsCount > 0 && (
                            <span className="ml-1.5 font-bold text-[10px] text-[#E8B34A] bg-[#013E51] px-1.5 py-0.5 rounded-sm">
                              +{extraTripsCount} more
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Leave: {primaryTrip.leaveDate || "—"}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No trips</span>
                    )}
                  </td>

                  {/* Guests */}
                  <td className="py-4 px-4 sm:px-5">
                    <div className="text-xs text-[#013E51] space-y-0.5">
                      <div className="font-semibold">{totalAdults} Adults</div>
                      {(totalChildren > 0 || totalInfants > 0) && (
                        <div className="text-[11px] text-gray-500">
                          {totalChildren} Child{totalChildren !== 1 && "ren"}
                          {totalInfants > 0 && ` • ${totalInfants} Inf`}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Total EUR */}
                  <td className="py-4 px-4 sm:px-5">
                    <span className="font-extrabold text-[#013E51] text-sm whitespace-nowrap">
                      &euro;{booking.totalPrice?.toLocaleString() ?? 0}
                    </span>
                  </td>

                  {/* Paid Amount */}
                  <td className="py-4 px-4 sm:px-5">
                    <AdminBookingPaidCell
                      bookingType="trip"
                      bookingId={booking.id}
                      totalPrice={booking.totalPrice || 0}
                      initialPaid={booking.paidAmount}
                    />
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 sm:px-5">
                    <BookingStatusBadge status={booking.status} />
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 sm:px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* View Details */}
                      <button
                        type="button"
                        onClick={() => onViewDetails(booking)}
                        title="View booking details"
                        className="p-2 rounded-xl text-[#013E51] hover:bg-[#FAF7F2] hover:text-[#E8B34A] transition cursor-pointer"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>

                      {/* Confirm (if Pending) */}
                      {isPending && (
                        <button
                          type="button"
                          onClick={() => onConfirm(booking)}
                          title="Confirm reservation"
                          className="p-2 rounded-xl text-sky-600 hover:bg-sky-50 transition cursor-pointer"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      )}

                      {/* Finish (if Confirmed) */}
                      {isConfirmed && (
                        <button
                          type="button"
                          onClick={() => onFinish(booking)}
                          title="Mark reservation finished"
                          className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(booking)}
                        title="Delete booking"
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer"
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
