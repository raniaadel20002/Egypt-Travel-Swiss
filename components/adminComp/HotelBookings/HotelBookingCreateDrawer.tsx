import { useEffect, useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { useHotelsQuery } from "@/features/hotels/useHotels";
import { getHotelById } from "@/clientApi/hotelsApi";
import { useCreateHotelBookingMutation } from "@/features/hotels/useHotelBookings";
import { HotelRatePlanApiItem } from "@/models/hotel";
import {
  CreateHotelBookingPayload,
  CreateHotelBookingRoomPayload,
} from "@/models/hotelBooking";
import { getTomorrowDateString } from "./hotelBookingHelpers";
import HotelBookingCustomerFields from "./HotelBookingCustomerFields";
import HotelBookingRoomRow, {
  HotelRoomFormState,
} from "./HotelBookingRoomRow";

interface HotelBookingCreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HotelBookingCreateDrawer({
  isOpen,
  onClose,
}: HotelBookingCreateDrawerProps) {
  const [hotelId, setHotelId] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState("");
  const [nightsCount, setNightsCount] = useState<number>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [nationality, setNationality] = useState("");

  const tomorrowStr = getTomorrowDateString();
  const [rooms, setRooms] = useState<HotelRoomFormState[]>([
    {
      ratePlanId: 0,
      adults: 2,
      children: 0,
      infants: 0,
    },
  ]);

  const [availableRatePlans, setAvailableRatePlans] = useState<
    HotelRatePlanApiItem[]
  >([]);

  const { data: hotels = [] } = useHotelsQuery({ PageSize: 100 });
  const createMutation = useCreateHotelBookingMutation();

  useModalDismiss({ isOpen, onClose });

  // When hotel changes, fetch rate plans for that hotel
  useEffect(() => {
    if (!hotelId) {
      setAvailableRatePlans([]);
      return;
    }
    let cancelled = false;
    getHotelById(hotelId, "EN", true)
      .then((res) => {
        if (!cancelled) {
          const plans = res?.ratePlans || [];
          setAvailableRatePlans(plans);
          // If rooms had ratePlanId not in plans, reset to first plan if available
          if (plans.length > 0) {
            setRooms((prev) =>
              prev.map((r) => ({
                ...r,
                ratePlanId: plans.some((p) => p.id === r.ratePlanId)
                  ? r.ratePlanId
                  : plans[0].id,
              }))
            );
          }
        }
      })
      .catch(() => {
        if (!cancelled) setAvailableRatePlans([]);
      });

    return () => {
      cancelled = true;
    };
  }, [hotelId]);

  if (!isOpen) return null;

  // Auto-calculated guest totals
  const totalAdults = rooms.reduce((sum, r) => sum + (Number(r.adults) || 0), 0);
  const totalChildren = rooms.reduce((sum, r) => sum + (Number(r.children) || 0), 0);
  const totalInfants = rooms.reduce((sum, r) => sum + (Number(r.infants) || 0), 0);

  const handleAddRoom = () => {
    setRooms((prev) => [
      ...prev,
      {
        ratePlanId: availableRatePlans[0]?.id || 0,
        adults: 1,
        children: 0,
        infants: 0,
      },
    ]);
  };

  const handleRemoveRoom = (index: number) => {
    if (rooms.length <= 1) {
      toast.error("At least one room is required.");
      return;
    }
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRoomChange = (
    index: number,
    field: keyof HotelRoomFormState,
    value: number
  ) => {
    setRooms((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hotelId) {
      toast.error("Please select a hotel / resort.");
      return;
    }
    if (!bookingDate || bookingDate < tomorrowStr) {
      toast.error("Check-in date must be tomorrow onwards.");
      return;
    }
    if (!name.trim() || !email.trim() || !whatsApp.trim() || !nationality.trim()) {
      toast.error("Please fill in all guest contact details.");
      return;
    }

    const validRooms: CreateHotelBookingRoomPayload[] = [];
    for (let i = 0; i < rooms.length; i++) {
      const r = rooms[i];
      if (!r.ratePlanId) {
        toast.error(`Please select a rate plan for Room #${i + 1}.`);
        return;
      }
      validRooms.push({
        ratePlanId: Number(r.ratePlanId),
        adults: Math.max(1, Number(r.adults) || 1),
        children: Math.max(0, Number(r.children) || 0),
        infants: Math.max(0, Number(r.infants) || 0),
      });
    }

    try {
      const payload: CreateHotelBookingPayload = {
        hotelId: Number(hotelId),
        name: name.trim(),
        email: email.trim(),
        whatsApp: whatsApp.replace(/\s+/g, "").trim(),
        nationality: nationality.trim(),
        adults: totalAdults,
        children: totalChildren,
        infants: totalInfants,
        nightsCount: Math.max(1, Number(nightsCount) || 1),
        bookingDate: new Date(bookingDate).toISOString(),
        rooms: validRooms,
      };

      await createMutation.mutateAsync(payload);
      toast.success("Hotel reservation created successfully.");
      onClose();
    } catch {
      toast.error("Failed to create hotel booking. Please check your inputs.");
    }
  };

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
                Reservations
              </span>
              <h2 className="text-lg font-bold">New Hotel Reservation</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-5"
          >
            <HotelBookingCustomerFields
              hotelId={hotelId}
              setHotelId={setHotelId}
              hotels={hotels}
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              nightsCount={nightsCount}
              setNightsCount={setNightsCount}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              whatsApp={whatsApp}
              setWhatsApp={setWhatsApp}
              nationality={nationality}
              setNationality={setNationality}
              totalAdults={totalAdults}
              totalChildren={totalChildren}
              totalInfants={totalInfants}
              tomorrowStr={tomorrowStr}
            />

            {/* Rooms Builder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
                  Reserved Rooms ({rooms.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddRoom}
                  disabled={availableRatePlans.length === 0}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#013E51] hover:underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FiPlus className="w-3.5 h-3.5 text-[#E8B34A]" />
                  <span>Add Room</span>
                </button>
              </div>

              <div className="space-y-3">
                {rooms.map((room, idx) => (
                  <HotelBookingRoomRow
                    key={idx}
                    index={idx}
                    room={room}
                    ratePlans={availableRatePlans}
                    canRemove={rooms.length > 1}
                    onRemove={handleRemoveRoom}
                    onChange={handleRoomChange}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
              >
                <FiPlus className="w-4 h-4 text-[#E8B34A]" />
                <span>
                  {createMutation.isPending ? "Creating..." : "Create Reservation"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
