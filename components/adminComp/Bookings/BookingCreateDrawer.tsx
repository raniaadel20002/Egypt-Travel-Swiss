"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader, FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { BookingApiItem, CreateBookingPayload, CreateTripBookingItemPayload } from "@/models/booking";
import { TripApiItem } from "@/models/trip";
import { useCreateBookingMutation } from "@/features/bookings/useBookings";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import BookingCustomerFields from "./BookingCustomerFields";
import BookingTripRowField from "./BookingTripRowField";

interface BookingCreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trips: TripApiItem[];
  onCreated?: (booking: BookingApiItem) => void;
}

const initialTripBooking = (): CreateTripBookingItemPayload => ({
  tripId: 0,
  noAdult: 2,
  noChild: 0,
  noInf: 0,
  leaveDate: new Date().toISOString().split("T")[0],
  serviceIds: [],
});

export default function BookingCreateDrawer({
  isOpen,
  onClose,
  trips,
  onCreated,
}: BookingCreateDrawerProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [code, setCode] = useState<string>("");
  const [tripsBookings, setTripsBookings] = useState<CreateTripBookingItemPayload[]>([
    initialTripBooking(),
  ]);

  const createMutation = useCreateBookingMutation();
  const isSubmitting = createMutation.isPending;

  useEffect(() => {
    if (isOpen) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNationality("");
      setHotelName("");
      setRoomNo("");
      setCode("");
      setTripsBookings([initialTripBooking()]);
    }
  }, [isOpen]);

  const handleTripChange = (idx: number, updated: CreateTripBookingItemPayload) => {
    setTripsBookings((prev) => prev.map((t, i) => (i === idx ? updated : t)));
  };

  const handleAddTrip = () => {
    setTripsBookings((prev) => [...prev, initialTripBooking()]);
  };

  const handleRemoveTrip = (idx: number) => {
    setTripsBookings((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tripsBookings.some((t) => !t.tripId || t.tripId === 0)) {
      toast.error("Please select an excursion for each booked trip.");
      return;
    }
    if (tripsBookings.some((t) => !t.leaveDate)) {
      toast.error("Please provide a departure date for each excursion.");
      return;
    }

    const numericCode = code.trim() ? Number(code.trim()) : null;

    const payload: CreateBookingPayload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      nationality: nationality.trim(),
      hotelName: hotelName.trim(),
      roomNo: roomNo.trim(),
      code: numericCode,
      tripsBookings,
    };

    try {
      const res = await createMutation.mutateAsync(payload);
      toast.success(
        `Booking #${res?.id || ""} created successfully for ${firstName} ${lastName}!`
      );
      if (onCreated && res) {
        onCreated(res);
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to create booking."));
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      eyebrow="Manual Reservation"
      title="Create Tour Booking"
      subtitle="Book excursions on behalf of customers with hotel assignment, optional promo voucher, and add-on services."
      widthClassName="max-w-2xl sm:max-w-3xl"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="booking-create-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                <span>Creating Booking...</span>
              </>
            ) : (
              <>
                <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                <span>Submit Booking</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <form id="booking-create-form" onSubmit={handleSubmit} className="space-y-6">
        <BookingCustomerFields
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          nationality={nationality}
          setNationality={setNationality}
          hotelName={hotelName}
          setHotelName={setHotelName}
          roomNo={roomNo}
          setRoomNo={setRoomNo}
          code={code}
          setCode={setCode}
        />

        {/* Excursions Booked List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
              Excursions ({tripsBookings.length})
            </h4>
            <button
              type="button"
              onClick={handleAddTrip}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
            >
              <FiPlus className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>Add Another Excursion</span>
            </button>
          </div>

          <div className="space-y-4">
            {tripsBookings.map((tb, idx) => (
              <BookingTripRowField
                key={idx}
                index={idx}
                trips={trips}
                value={tb}
                onChange={(updated) => handleTripChange(idx, updated)}
                onRemove={() => handleRemoveTrip(idx)}
                canRemove={tripsBookings.length > 1}
              />
            ))}
          </div>
        </div>
      </form>
    </AdminDrawer>
  );
}
