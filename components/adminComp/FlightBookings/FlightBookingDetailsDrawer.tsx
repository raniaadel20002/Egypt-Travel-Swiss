import {
  FiX,
  FiEdit2,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiArrowRight,
} from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import {
  FlightBookingApiItem,
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import { useFlightBookingDetailQuery } from "@/features/flights/useFlightBookings";
import {
  formatFlightRouteSummary,
  getBaggageTypeLabel,
  getFlightBookingTypeLabel,
  getFlightTripTypeLabel,
  getPassengerTypeLabel,
  parseFlightBookingType,
  parseFlightTripType,
} from "./flightBookingHelpers";

interface FlightBookingDetailsDrawerProps {
  booking: FlightBookingApiItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: FlightBookingApiItem) => void;
}

export default function FlightBookingDetailsDrawer({
  booking,
  isOpen,
  onClose,
  onEdit,
}: FlightBookingDetailsDrawerProps) {
  useModalDismiss({ isOpen, onClose });

  const { data: freshBooking } = useFlightBookingDetailQuery(
    isOpen && booking?.id ? booking.id : undefined
  );
  const activeBooking = freshBooking || booking;

  if (!isOpen || !activeBooking) return null;

  const bTypeInfo = getFlightBookingTypeLabel(activeBooking.bookingType);
  const tTypeInfo = getFlightTripTypeLabel(activeBooking.tripType);
  const routeSummary = formatFlightRouteSummary(activeBooking);
  const bType = parseFlightBookingType(activeBooking.bookingType);
  const isRoundTrip =
    parseFlightTripType(activeBooking.tripType) === FlightTripTypeEnum.RoundTrip;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-[family-name:var(--font-lato)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#013E51] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B34A] font-bold block">
                Flight Reservation Details
              </span>
              <h2 className="text-lg font-bold font-mono">
                Booking #{activeBooking.id}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(activeBooking);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8B34A] text-[#013E51] text-xs font-bold hover:bg-[#d9a43d] transition-colors cursor-pointer"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Summary Banner */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${bTypeInfo.badgeClass}`}>
                  {bTypeInfo.label}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${tTypeInfo.badgeClass}`}>
                  {tTypeInfo.label}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-semibold">
                Total People:{" "}
                <span className="font-extrabold text-[#013E51] text-sm">
                  {activeBooking.numberOfPeople || activeBooking.passengers?.length || 0}
                </span>
              </div>
            </div>

            {/* Route & Geography */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-[#E8B34A]" />
                <span>Geography & Route</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block">Origin</span>
                  <span className="font-bold text-[#013E51]">{routeSummary.originLabel}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Destination</span>
                  <span className="font-bold text-[#013E51]">{routeSummary.destinationLabel}</span>
                </div>
                {bType === FlightBookingTypeEnum.CountryToEgypt && (
                  <>
                    <div>
                      <span className="text-gray-400 block">From Country</span>
                      <span className="font-bold text-[#013E51]">
                        {activeBooking.fromCountryName || activeBooking.fromCountryId || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">From City</span>
                      <span className="font-bold text-[#013E51]">
                        {activeBooking.fromCityName || activeBooking.fromCityId || "-"}
                      </span>
                    </div>
                  </>
                )}
                {bType === FlightBookingTypeEnum.EgyptToCountry && (
                  <>
                    <div>
                      <span className="text-gray-400 block">To Country</span>
                      <span className="font-bold text-[#013E51]">
                        {activeBooking.toCountryName || activeBooking.toCountryId || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">To City</span>
                      <span className="font-bold text-[#013E51]">
                        {activeBooking.toCityName || activeBooking.toCityId || "-"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Flight Schedule & Airports */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#E8B34A]" />
                <span>Airports & Schedule</span>
              </h3>
              <div className="space-y-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200/70">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gray-400 block">
                      Outbound Flight
                    </span>
                    <div className="flex items-center gap-2 font-bold text-[#013E51] text-sm mt-0.5">
                      <span>{activeBooking.departureAirport || "-"}</span>
                      <FiArrowRight className="w-4 h-4 text-[#E8B34A]" />
                      <span>{activeBooking.arrivalAirport || "-"}</span>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-gray-400 block">Departure Date</span>
                    <span className="font-bold text-[#013E51]">
                      {activeBooking.departureDate
                        ? new Date(activeBooking.departureDate).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>

                {isRoundTrip && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-purple-600 block">
                        Return Flight
                      </span>
                      <div className="flex items-center gap-2 font-bold text-[#013E51] text-sm mt-0.5">
                        <span>{activeBooking.returnDepartureAirport || "-"}</span>
                        <FiArrowRight className="w-4 h-4 text-[#E8B34A]" />
                        <span>{activeBooking.returnArrivalAirport || "-"}</span>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-gray-400 block">Return Date</span>
                      <span className="font-bold text-[#013E51]">
                        {activeBooking.returnDate
                          ? new Date(activeBooking.returnDate).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Passengers & Baggages */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiUser className="w-4 h-4 text-[#E8B34A]" />
                <span>Passengers ({activeBooking.passengers?.length || 0})</span>
              </h3>
              <div className="space-y-3">
                {(activeBooking.passengers || []).map((pax, idx) => (
                  <div
                    key={pax.id || idx}
                    className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#013E51] text-sm">
                          {idx + 1}. {pax.fullName}
                        </span>
                        <span className="block text-gray-500 font-mono text-[11px]">
                          Passport: {pax.passportNumber}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#013E51]/10 text-[#013E51] font-bold text-[11px]">
                        {getPassengerTypeLabel(pax.passengerType)}
                      </span>
                    </div>

                    {pax.baggages && pax.baggages.length > 0 ? (
                      <div className="pt-2 border-t border-gray-200/60 space-y-1.5">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase">
                          <FiBriefcase className="w-3 h-3 text-[#E8B34A]" />
                          <span>Baggage Allowance ({pax.baggages.length})</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pax.baggages.map((bag, bIdx) => (
                            <div
                              key={bag.id || bIdx}
                              className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between"
                            >
                              <span className="font-semibold text-[#013E51]">
                                {getBaggageTypeLabel(bag.baggageType)}
                              </span>
                              <span className="text-gray-500 font-mono">
                                {bag.quantity}x ({bag.weightPerItem} kg)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-gray-400 italic pt-1 border-t border-gray-200/50">
                        No baggage items listed for this passenger.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
