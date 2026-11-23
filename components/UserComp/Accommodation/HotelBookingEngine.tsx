"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCreateHotelBookingMutation } from "@/features/hotels/useHotelBookings";
import { useRatePlansQuery } from "@/features/hotels/useRatePlans";
import { HotelApiItem, HotelRatePlanApiItem } from "@/models/hotel";
import HotelRoomSelectionStep, { SelectedRoomItem } from "./HotelRoomSelectionStep";
import HotelGuestDetailsStep, { GuestDetailsState } from "./HotelGuestDetailsStep";
import HotelReservationSummarySidebar from "./HotelReservationSummarySidebar";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface HotelBookingEngineProps {
  hotel: HotelApiItem;
}

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function HotelBookingEngine({ hotel }: HotelBookingEngineProps) {
  const router = useRouter();
  const { locale } = useLocale();

  // Query live rate plans for this hotel
  const ratePlansQuery = useRatePlansQuery({ HotelId: hotel.id });

  const availableRatePlans: HotelRatePlanApiItem[] = useMemo(() => {
    const live = ratePlansQuery.data;
    if (live && live.length > 0) return live;
    if (hotel.ratePlans && hotel.ratePlans.length > 0) return hotel.ratePlans;
    return [];
  }, [ratePlansQuery.data, hotel.ratePlans]);

  const [selectedRooms, setSelectedRooms] = useState<SelectedRoomItem[]>([]);

  // Initialize or re-sync selected room when plans load
  useEffect(() => {
    if (availableRatePlans.length > 0) {
      setSelectedRooms((prev) => {
        if (prev.length === 0) {
          const first = availableRatePlans[0];
          return [
            {
              id: "room-initial-1",
              ratePlanId: first.id,
              ratePlanName: first.name,
              adults: 1,
              children: 0,
              infants: 0,
            },
          ];
        }

        // Verify if existing rooms have valid ratePlanId in availableRatePlans
        const hasInvalid = prev.some(
          (r) => !availableRatePlans.some((p) => p.id === r.ratePlanId)
        );
        if (hasInvalid) {
          const fallback = availableRatePlans[0];
          return prev.map((r) =>
            availableRatePlans.some((p) => p.id === r.ratePlanId)
              ? r
              : { ...r, ratePlanId: fallback.id, ratePlanName: fallback.name }
          );
        }
        return prev;
      });
    }
  }, [availableRatePlans]);

  const [guestDetails, setGuestDetails] = useState<GuestDetailsState>({
    checkInDate: getTomorrowDateString(),
    nightsCount: 1,
    fullName: "",
    email: "",
    whatsApp: "",
    nationality: "",
  });

  const createBookingMutation = useCreateHotelBookingMutation();

  const handleAddRoom = (ratePlan: HotelRatePlanApiItem) => {
    const newRoom: SelectedRoomItem = {
      id: `room-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      ratePlanId: ratePlan.id,
      ratePlanName: ratePlan.name,
      adults: 1,
      children: 0,
      infants: 0,
    };
    setSelectedRooms((prev) => [...prev, newRoom]);
    toast.success(`Added ${ratePlan.name} to your reservation.`);
  };

  const handleRemoveRoom = (roomId: string) => {
    setSelectedRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  const handleUpdateOccupancy = (
    roomId: string,
    field: "adults" | "children" | "infants",
    delta: number
  ) => {
    setSelectedRooms((prev) =>
      prev.map((r) => {
        if (r.id !== roomId) return r;
        const current = r[field];
        const next = Math.max(0, current + delta);
        return { ...r, [field]: next };
      })
    );
  };

  const handleUpdateRatePlan = (roomId: string, newPlanId: number) => {
    const found = availableRatePlans.find((p) => p.id === newPlanId);
    if (!found) return;

    setSelectedRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? { ...r, ratePlanId: found.id, ratePlanName: found.name }
          : r
      )
    );
  };

  const handleChangeField = <K extends keyof GuestDetailsState>(
    field: K,
    value: GuestDetailsState[K]
  ) => {
    setGuestDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRooms.length === 0) {
      toast.error("Please add at least one room before confirming your stay.");
      return;
    }

    const tomorrowStr = getTomorrowDateString();
    if (!guestDetails.checkInDate || guestDetails.checkInDate < tomorrowStr) {
      toast.error("Check-in date must be from tomorrow onwards.");
      return;
    }

    if (
      !guestDetails.fullName.trim() ||
      !guestDetails.email.trim() ||
      !guestDetails.whatsApp.trim() ||
      !guestDetails.nationality.trim()
    ) {
      toast.error("Please fill in your name, email, WhatsApp, and nationality.");
      return;
    }

    const totalAdults = selectedRooms.reduce((acc, r) => acc + r.adults, 0);
    const totalChildren = selectedRooms.reduce((acc, r) => acc + r.children, 0);
    const totalInfants = selectedRooms.reduce((acc, r) => acc + r.infants, 0);

    try {
      const created = await createBookingMutation.mutateAsync({
        hotelId: hotel.id,
        name: guestDetails.fullName.trim(),
        email: guestDetails.email.trim(),
        whatsApp: guestDetails.whatsApp.trim(),
        nationality: guestDetails.nationality.trim() || "International",
        adults: Math.max(1, totalAdults),
        children: Math.max(0, totalChildren),
        infants: Math.max(0, totalInfants),
        nightsCount: Math.max(1, guestDetails.nightsCount),
        bookingDate: guestDetails.checkInDate
          ? new Date(guestDetails.checkInDate).toISOString()
          : new Date().toISOString(),
        rooms: selectedRooms.map((r) => ({
          ratePlanId: r.ratePlanId,
          adults: Math.max(1, r.adults),
          children: Math.max(0, r.children),
          infants: Math.max(0, r.infants),
        })),
      });

      toast.success(
        "Reservation confirmed! Redirecting to confirmation voucher..."
      );

      const params = new URLSearchParams({
        type: "hotel",
        id: String(created?.id || ""),
        hotel: hotel.name,
        location: hotel.location,
        checkIn: guestDetails.checkInDate,
        nights: String(guestDetails.nightsCount),
        rooms: String(selectedRooms.length),
        adults: String(totalAdults),
        children: String(totalChildren),
        infants: String(totalInfants),
        plan: selectedRooms[0]?.ratePlanName || "",
        name: guestDetails.fullName.trim(),
      });

      router.push(`/${locale}/booking-success?${params.toString()}`);
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Failed to submit reservation. Please verify your details or contact us."
        )
      );
    }
  };

  return (
    <div
      id="booking-section"
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-6 relative"
    >
      {/* Left Column: 2-Step Reservation Process (8 cols) */}
      <div className="lg:col-span-8 space-y-8">
        <HotelRoomSelectionStep
          availableRatePlans={availableRatePlans}
          selectedRooms={selectedRooms}
          onAddRoom={handleAddRoom}
          onRemoveRoom={handleRemoveRoom}
          onUpdateOccupancy={handleUpdateOccupancy}
          onUpdateRatePlan={handleUpdateRatePlan}
        />

        <HotelGuestDetailsStep
          details={guestDetails}
          isSubmitting={createBookingMutation.isPending}
          canSubmit={selectedRooms.length > 0}
          onChangeField={handleChangeField}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Right Column: Sticky Live Stay Overview (4 cols) */}
      <div className="lg:col-span-4 relative h-full">
        <HotelReservationSummarySidebar
          hotel={hotel}
          selectedRooms={selectedRooms}
          guestDetails={guestDetails}
        />
      </div>
    </div>
  );
}
