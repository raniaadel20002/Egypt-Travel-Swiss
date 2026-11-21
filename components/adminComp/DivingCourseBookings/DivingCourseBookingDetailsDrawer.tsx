import { FiX, FiUser, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { DivingCourseBookingApiItem } from "@/models/divingCourseBooking";
import { useDivingCourseBookingDetailQuery } from "@/features/divingCourses/useDivingCourseBookings";
import DivingCourseBookingStatusBadge from "./DivingCourseBookingStatusBadge";
import { formatPriceEur } from "./divingCourseBookingHelpers";

interface DivingCourseBookingDetailsDrawerProps {
  booking: DivingCourseBookingApiItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DivingCourseBookingDetailsDrawer({
  booking,
  isOpen,
  onClose,
}: DivingCourseBookingDetailsDrawerProps) {
  useModalDismiss({ isOpen, onClose });

  const { data: freshDetail } = useDivingCourseBookingDetailQuery(
    isOpen && booking?.id ? booking.id : undefined
  );

  if (!isOpen || !booking) return null;

  const b = freshDetail || booking;

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
                Diving Course Reservation
              </span>
              <h2 className="text-lg font-bold font-mono">#{b.id.slice(0, 8)}</h2>
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
            {/* Statuses Bar */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 font-bold block">
                  Booking Status
                </span>
                <div className="mt-1">
                  <DivingCourseBookingStatusBadge status={b.status} />
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-bold block">
                  Payment Status
                </span>
                <div className="mt-1">
                  <DivingCourseBookingStatusBadge
                    status={b.paymentStatus}
                    type="payment"
                  />
                </div>
              </div>
            </div>

            {/* Customer & Stay Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiUser className="w-4 h-4 text-[#E8B34A]" />
                <span>Customer & Hotel Information</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block">Full Name</span>
                  <span className="font-bold text-[#013E51]">{b.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Email Address</span>
                  <span className="font-bold text-[#013E51] break-all">
                    {b.email}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Phone Number</span>
                  <span className="font-bold text-[#013E51]">{b.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Created At</span>
                  <span className="font-bold text-[#013E51]">
                    {b.createdAt ? new Date(b.createdAt).toLocaleString() : "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Hotel Name</span>
                  <span className="font-bold text-[#013E51]">
                    {b.hotelName || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Room Number</span>
                  <span className="font-bold text-[#013E51]">
                    {b.roomNo || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Items List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#E8B34A]" />
                <span>Booked Courses ({b.items?.length || 0})</span>
              </h3>
              <div className="space-y-2.5">
                {(b.items || []).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-xs space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-[#013E51]">
                      <span>{item.courseName || "Diving Course"}</span>
                      <span>{formatPriceEur(item.totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500 text-[11px]">
                      <span>
                        Date:{" "}
                        {item.bookingDate
                          ? new Date(item.bookingDate).toLocaleDateString()
                          : "-"}
                      </span>
                      <span>
                        {item.numberOfParticipants} Pax @{" "}
                        {formatPriceEur(item.unitPrice)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Breakdown (EUR) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                <span className="font-bold text-[#E8B34A] text-sm">&euro;</span>
                <span>Financial Breakdown (EUR)</span>
              </h3>
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Price:</span>
                  <span className="font-semibold text-gray-700">
                    {formatPriceEur(b.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Deposit ({b.depositPercentage || 50}%):
                  </span>
                  <span className="font-semibold text-gray-700">
                    {formatPriceEur(b.depositAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Paid Amount:</span>
                  <span className="font-semibold text-emerald-700">
                    {formatPriceEur(b.paidAmount)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-500 font-bold">
                    Remaining Amount:
                  </span>
                  <span className="font-bold text-amber-700">
                    {formatPriceEur(b.remainingAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
