import { FiX, FiUser, FiMapPin, FiCalendar, FiMoon, FiHome } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import {
  HotelBookingApiItem,
  HotelBookingStatusEnum,
} from "@/models/hotelBooking";
import { useHotelBookingDetailQuery } from "@/features/hotels/useHotelBookings";
import HotelBookingStatusBadge from "./HotelBookingStatusBadge";
import { parseHotelBookingStatus } from "./hotelBookingHelpers";

interface HotelBookingDetailsDrawerProps {
  booking: HotelBookingApiItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: number, newStatus: HotelBookingStatusEnum) => void;
}

export default function HotelBookingDetailsDrawer({
  booking,
  isOpen,
  onClose,
  onStatusChange,
}: HotelBookingDetailsDrawerProps) {
  useModalDismiss({ isOpen, onClose });

  const { data: freshDetail } = useHotelBookingDetailQuery(
    isOpen && booking?.id ? booking.id : undefined
  );

  if (!isOpen || !booking) return null;

  const b = freshDetail || booking;
  const currentStatus = parseHotelBookingStatus(b.status);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-[family-name:var(--font-lato)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#013E51] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B34A] font-bold block">
                Hotel Reservation
              </span>
              <h2 className="text-lg font-bold font-mono">#{b.id}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status Bar */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 font-bold block">
                  Current Status
                </span>
                <div className="mt-1">
                  <HotelBookingStatusBadge status={b.status} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-semibold">
                  Change:
                </span>
                <select
                  value={currentStatus}
                  onChange={(e) =>
                    onStatusChange(
                      b.id,
                      Number(e.target.value) as HotelBookingStatusEnum
                    )
                  }
                  className="py-1.5 px-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#013E51] bg-white cursor-pointer"
                >
                  <option value={HotelBookingStatusEnum.Pending}>Pending</option>
                  <option value={HotelBookingStatusEnum.Confirmed}>Confirmed</option>
                  <option value={HotelBookingStatusEnum.Finished}>Finished</option>
                  <option value={HotelBookingStatusEnum.Cancelled}>Cancelled</option>
                </select>
              </div>
            </div>

            {/* Guest Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiUser className="w-4 h-4 text-[#E8B34A]" />
                <span>Guest Information</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block">Full Name</span>
                  <span className="font-bold text-[#013E51]">{b.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Email Address</span>
                  <span className="font-bold text-[#013E51] break-all">{b.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">WhatsApp / Phone</span>
                  <span className="font-bold text-[#013E51]">{b.whatsApp}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Nationality</span>
                  <span className="font-bold text-[#013E51]">
                    {b.nationality || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Created At</span>
                  <span className="font-bold text-[#013E51]">
                    {b.createdAt ? new Date(b.createdAt).toLocaleString() : "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Last Updated</span>
                  <span className="font-bold text-[#013E51]">
                    {b.updatedAt ? new Date(b.updatedAt).toLocaleString() : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stay & Hotel Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiHome className="w-4 h-4 text-[#E8B34A]" />
                <span>Stay & Property Information</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs">
                <div className="col-span-2">
                  <span className="text-gray-400 block">Hotel / Resort</span>
                  <span className="font-bold text-[#013E51] text-sm">
                    {b.hotelName || `Hotel #${b.hotelId}`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Check-in Date</span>
                  <span className="font-bold text-[#013E51]">
                    {b.bookingDate
                      ? new Date(b.bookingDate).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Duration</span>
                  <span className="font-bold text-[#013E51]">
                    {b.nightsCount} Night(s)
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Total Rooms</span>
                  <span className="font-bold text-[#013E51]">
                    {b.roomsCount || b.rooms?.length || 1} Room(s)
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Total Guests</span>
                  <span className="font-bold text-[#013E51]">
                    {b.adults} Adults, {b.children} Children, {b.infants} Infants
                  </span>
                </div>
              </div>
            </div>

            {/* Rooms & Rate Plans Breakdown */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#E8B34A]" />
                <span>Reserved Rooms ({b.rooms?.length || 0})</span>
              </h3>
              <div className="space-y-2.5">
                {(b.rooms || []).map((room, idx) => (
                  <div
                    key={room.id || idx}
                    className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-xs space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-[#013E51]">
                      <span>Room #{idx + 1}: {room.ratePlanName || `Plan #${room.ratePlanId}`}</span>
                    </div>
                    <div className="text-gray-500 text-[11px]">
                      Guests: {room.adults} Adults, {room.children} Children, {room.infants} Infants
                    </div>
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
