import { FiX, FiUser, FiMapPin, FiCalendar, FiClock, FiCreditCard } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { DivingCourseBookingApiItem } from "@/models/divingCourseBooking";
import { useDivingCourseBookingDetailQuery } from "@/features/divingCourses/useDivingCourseBookings";
import { useDivingBookingPaymentsQuery } from "@/features/payments/usePayments";
import AdminBookingPaymentsSection from "@/components/adminComp/Common/AdminBookingPaymentsSection";
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

  const bookingId = isOpen && booking?.id ? booking.id : undefined;

  const { data: freshDetail } = useDivingCourseBookingDetailQuery(bookingId);

  const b = freshDetail || booking;

  const paymentsQuery = useDivingBookingPaymentsQuery(
    isOpen && b?.id ? b.id : null,
    Boolean(isOpen && b?.id)
  );

  if (!isOpen || !booking || !b) return null;

  const rawPayments = paymentsQuery.data || [];
  const payments =
    rawPayments.length > 0
      ? rawPayments
      : b.payPalOrderId || b.paidAmount > 0
      ? [
          {
            paymentId: 1,
            bookingId: 0,
            status: b.paymentStatus || "Paid",
            amount: b.paidAmount || b.depositAmount || b.totalPrice * 0.5,
            currency: b.currency || "EUR",
            provider: "PayPal",
            payPalOrderId: b.payPalOrderId || "—",
            payPalCaptureId: b.payPalCaptureId || "—",
            createdAt: b.createdAt,
            paidAt: b.paidAmount > 0 ? b.createdAt : null,
          },
        ]
      : [];

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

            {/* Direct Pay Link for Unpaid Booking */}
            {(b.paidAmount === 0 || b.paymentStatus === "Pending") && (
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between gap-3">
                <div className="text-xs text-amber-900">
                  <span className="font-bold block">50% Deposit Unpaid</span>
                  <span className="text-[11px] text-amber-800/80">Process online payment for this client.</span>
                </div>
                <a
                  href={`/en/checkout/payment?type=diving&bookingId=${b.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#013E51] text-white text-xs font-bold hover:bg-[#022c3a] transition cursor-pointer"
                >
                  <FiCreditCard className="w-3.5 h-3.5 text-[#E8B34A]" />
                  <span>Open Payment Gateway</span>
                </a>
              </div>
            )}

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

            {/* Financial Breakdown & Online Payments (EUR) */}
            <div className="p-4 rounded-xl border border-gray-100 bg-white">
              <AdminBookingPaymentsSection
                bookingType="diving"
                bookingId={b.id}
                totalPrice={b.totalPrice || 0}
                currency={b.currency || "EUR"}
                depositPercentage={b.depositPercentage || 50}
                depositAmount={b.depositAmount || (b.totalPrice || 0) * 0.5}
                paidAmount={b.paidAmount || 0}
                remainingAmount={b.remainingAmount || (b.totalPrice || 0) * 0.5}
                paymentStatus={b.paymentStatus}
                payments={payments}
                isLoading={paymentsQuery.isLoading}
                onRefresh={() => paymentsQuery.refetch()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
