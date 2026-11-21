import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiArrowRight,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";
import {
  FlightBookingApiItem,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import {
  formatFlightRouteSummary,
  getFlightBookingTypeLabel,
  getFlightTripTypeLabel,
  parseFlightTripType,
} from "./flightBookingHelpers";

interface FlightBookingsTableProps {
  bookings: FlightBookingApiItem[];
  isLoading: boolean;
  onViewDetails: (item: FlightBookingApiItem) => void;
  onEdit: (item: FlightBookingApiItem) => void;
  onDelete: (item: FlightBookingApiItem) => void;
}

export default function FlightBookingsTable({
  bookings,
  isLoading,
  onViewDetails,
  onEdit,
  onDelete,
}: FlightBookingsTableProps) {
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
          No flight bookings found matching your criteria.
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
              <th className="py-3.5 px-4">Type & Trip</th>
              <th className="py-3.5 px-4">Route (Origin / Destination)</th>
              <th className="py-3.5 px-4">Airports</th>
              <th className="py-3.5 px-4">Schedule</th>
              <th className="py-3.5 px-4">Passengers</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => {
              const bTypeInfo = getFlightBookingTypeLabel(booking.bookingType);
              const tTypeInfo = getFlightTripTypeLabel(booking.tripType);
              const routeSummary = formatFlightRouteSummary(booking);
              const isRoundTrip =
                parseFlightTripType(booking.tripType) ===
                FlightTripTypeEnum.RoundTrip;
              const leadPassenger = booking.passengers?.[0];

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-[#F8F9FA]/60 transition-colors"
                >
                  {/* ID & Created Date */}
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

                  {/* Booking Type & Trip Type */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold border ${bTypeInfo.badgeClass}`}
                      >
                        {bTypeInfo.label}
                      </span>
                      <div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${tTypeInfo.badgeClass}`}
                        >
                          {tTypeInfo.label}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Route Summary */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#013E51] text-xs">
                      <span>{routeSummary.originLabel}</span>
                      <FiArrowRight className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
                      <span>{routeSummary.destinationLabel}</span>
                    </div>
                  </td>

                  {/* Airports */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1 font-semibold text-[#013E51]">
                        <span>{booking.departureAirport || "-"}</span>
                        <FiArrowRight className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{booking.arrivalAirport || "-"}</span>
                      </div>
                      {isRoundTrip &&
                        (booking.returnDepartureAirport ||
                          booking.returnArrivalAirport) && (
                          <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <span>Ret:</span>
                            <span>{booking.returnDepartureAirport || "-"}</span>
                            <FiArrowRight className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                            <span>{booking.returnArrivalAirport || "-"}</span>
                          </div>
                        )}
                    </div>
                  </td>

                  {/* Schedule */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 text-xs">
                      <span className="flex items-center gap-1 font-semibold text-[#013E51]">
                        <FiCalendar className="w-3 h-3 text-[#E8B34A] shrink-0" />
                        <span>
                          Dep:{" "}
                          {booking.departureDate
                            ? new Date(booking.departureDate).toLocaleDateString()
                            : "-"}
                        </span>
                      </span>
                      {isRoundTrip && booking.returnDate && (
                        <span className="block text-[11px] text-gray-500 pl-4">
                          Ret: {new Date(booking.returnDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Passengers */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#013E51] text-xs">
                        <FiUsers className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
                        <span>
                          {booking.numberOfPeople ||
                            booking.passengers?.length ||
                            0}{" "}
                          Pax
                        </span>
                      </div>
                      {leadPassenger && (
                        <span className="block text-[11px] text-gray-500 truncate max-w-[160px]">
                          Lead: {leadPassenger.fullName}
                        </span>
                      )}
                    </div>
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

                      <button
                        type="button"
                        onClick={() => onEdit(booking)}
                        title="Edit Booking"
                        className="p-1.5 rounded-lg border border-gray-200 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(booking)}
                        title="Delete Booking"
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
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
