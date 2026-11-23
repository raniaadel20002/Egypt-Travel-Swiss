"use client";

import { FiCalendar, FiCheck, FiCheckCircle, FiClock, FiHome, FiLoader, FiMail, FiMapPin, FiPhone, FiTrash2, FiUser } from "react-icons/fi";
import { useBookingByIdQuery } from "@/features/bookings/useBookings";
import { useBookingPaymentsQuery } from "@/features/payments/usePayments";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import AdminBookingPaymentsSection from "@/components/adminComp/Common/AdminBookingPaymentsSection";
import BookingStatusBadge from "./BookingStatusBadge";

interface BookingDetailsDrawerProps {
  isOpen: boolean;
  bookingId: number | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
  onFinish: (id: number) => void;
  onDelete: (id: number) => void;
  isActionPending?: boolean;
}

export default function BookingDetailsDrawer({
  isOpen,
  bookingId,
  onClose,
  onConfirm,
  onFinish,
  onDelete,
  isActionPending = false,
}: BookingDetailsDrawerProps) {
  const query = useBookingByIdQuery(bookingId, isOpen);
  const booking = query.data;
  const paymentsQuery = useBookingPaymentsQuery(bookingId, isOpen);

  const payments = paymentsQuery.data || [];
  const hasPaidDeposit = payments.some((p) =>
    ["completed", "paid", "captured"].includes((p.status || "").toLowerCase())
  );
  const depositTarget = (booking?.totalPrice || 0) * 0.5;
  const paidOnlineTotal = hasPaidDeposit ? depositTarget : 0;

  const isPending = booking?.status?.toLowerCase() === "pending";
  const isConfirmed = booking?.status?.toLowerCase() === "confirmed";

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow={booking ? `Booking #${booking.id}` : "Tour Booking"}
      title={booking ? `${booking.firstName} ${booking.lastName}` : "Booking Details"}
      subtitle="Excursion reservation details, hotel room assignment, and pricing in EUR (&euro;)."
      widthClassName="max-w-xl sm:max-w-2xl"
      footer={
        booking && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onDelete(booking.id)}
              disabled={isActionPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition cursor-pointer disabled:opacity-50"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              <span>Delete Booking</span>
            </button>

            <div className="flex items-center gap-2">
              {isPending && (
                <button
                  type="button"
                  onClick={() => onConfirm(booking.id)}
                  disabled={isActionPending}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <FiCheck className="w-3.5 h-3.5" />
                  <span>Confirm Booking</span>
                </button>
              )}

              {isConfirmed && (
                <button
                  type="button"
                  onClick={() => onFinish(booking.id)}
                  disabled={isActionPending}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <FiCheckCircle className="w-3.5 h-3.5" />
                  <span>Mark as Finished</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#013E51] text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )
      }
    >
      {query.isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
          <FiLoader className="w-6 h-6 animate-spin text-[#013E51]" />
          <span className="text-xs font-medium">Loading booking information...</span>
        </div>
      ) : !booking ? (
        <div className="py-12 text-center text-xs text-gray-500">
          Booking record could not be loaded.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Summary Card */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                Reservation Status
              </span>
              <BookingStatusBadge status={booking.status} />
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                Total Price (EUR)
              </span>
              <span className="font-[family-name:var(--font-cormorant)] text-3xl font-extrabold text-[#013E51]">
                &euro;{booking.totalPrice?.toLocaleString() ?? 0}
              </span>
            </div>
          </div>

          {/* Customer & Hotel Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-1.5">
                <FiUser className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Customer Profile</span>
              </h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="font-bold text-[#013E51] text-sm">
                  {booking.firstName} {booking.lastName}
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{booking.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{booking.phone}</span>
                </div>
                {booking.nationality && (
                  <div className="flex items-center gap-2 text-[#013E51] font-semibold">
                    <FiMapPin className="w-3 h-3 text-gray-400 shrink-0" />
                    <span>Nationality: {booking.nationality}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hotel & Timestamps */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-1.5">
                <FiHome className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Resort & Stay</span>
              </h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="font-bold text-[#013E51]">
                  {booking.hotelName || "No hotel specified"}
                </div>
                <div className="text-xs">
                  Room: <span className="font-mono font-bold text-[#013E51]">{booking.roomNo || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-1">
                  <FiClock className="w-3 h-3 text-gray-400" />
                  <span>Booked: {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "—"}</span>
                </div>
                <div className="text-[11px] text-gray-400">
                  Created: {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Online Payments & 50% Deposit Breakdown */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <AdminBookingPaymentsSection
              bookingType="trip"
              bookingId={booking.id}
              totalPrice={booking.totalPrice || 0}
              currency="EUR"
              depositPercentage={50}
              depositAmount={(booking.totalPrice || 0) * 0.5}
              paidAmount={paidOnlineTotal}
              remainingAmount={Math.max(0, (booking.totalPrice || 0) - paidOnlineTotal)}
              paymentStatus={booking.paymentStatus}
              payments={payments}
              isLoading={paymentsQuery.isLoading}
              onRefresh={() => paymentsQuery.refetch()}
            />
          </div>

          {/* Booked Excursions Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>Booked Excursions ({booking.tripsBookings?.length || 0})</span>
            </h4>

            <div className="space-y-3">
              {booking.tripsBookings?.map((trip, idx) => (
                <div
                  key={trip.id || idx}
                  className="p-4 rounded-2xl border border-[#013E51]/15 bg-white space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#013E51] text-sm">
                        {trip.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Trip ID: #{trip.tripId} &bull; Departure:{" "}
                        <span className="font-semibold text-[#013E51]">
                          {trip.leaveDate || "—"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-gray-400 block">Subtotal</span>
                      <span className="font-bold text-[#013E51] text-base">
                        &euro;{trip.subTotal?.toLocaleString() ?? 0}
                      </span>
                    </div>
                  </div>

                  {/* Guests & Unit Pricing Breakdown */}
                  <div className="pt-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-[#FAF7F2]">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Adults</span>
                      <span className="font-bold text-[#013E51]">
                        {trip.noAdult} &times; &euro;{trip.priceForAdult}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#FAF7F2]">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Children</span>
                      <span className="font-bold text-[#013E51]">
                        {trip.noChild} &times; &euro;{trip.priceForChild}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#FAF7F2]">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Infants</span>
                      <span className="font-bold text-[#013E51]">
                        {trip.noInf} (Free)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminDrawer>
  );
}
