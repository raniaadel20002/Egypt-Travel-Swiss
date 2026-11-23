"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiCalendar, FiUsers, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCreateHotelBookingMutation } from "@/features/hotels/useHotelBookings";
import { HotelApiItem } from "@/models/hotel";

interface AccommodationBookingCardProps {
  hotel: HotelApiItem;
}

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function AccommodationBookingCard({
  hotel,
}: AccommodationBookingCardProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const minCheckIn = getTomorrowDateString();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [nationality, setNationality] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [nightsCount, setNightsCount] = useState(3);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const createBookingMutation = useCreateHotelBookingMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !whatsApp.trim()) {
      toast.error("Please fill in your name, email, and WhatsApp number.");
      return;
    }

    try {
      const created = await createBookingMutation.mutateAsync({
        hotelId: hotel.id,
        name: name.trim(),
        email: email.trim(),
        whatsApp: whatsApp.trim(),
        nationality: nationality.trim() || "International",
        adults: Math.max(1, adults),
        children: Math.max(0, children),
        infants: 0,
        nightsCount: Math.max(1, nightsCount),
        bookingDate: bookingDate
          ? new Date(bookingDate).toISOString()
          : new Date().toISOString(),
        rooms: [
          {
            ratePlanId: hotel.ratePlans?.[0]?.id || 0,
            adults: Math.max(1, adults),
            children: Math.max(0, children),
            infants: 0,
          },
        ],
      });

      toast.success(
        "Reservation inquiry sent! Redirecting to confirmation voucher..."
      );
      setName("");
      setEmail("");
      setWhatsApp("");
      setNationality("");

      const params = new URLSearchParams({
        type: "hotel",
        id: String(created?.id || ""),
        hotel: hotel.name,
        location: hotel.location,
        checkIn: bookingDate,
        nights: String(nightsCount),
        rooms: "1",
        adults: String(adults),
        children: String(children),
        name: name.trim(),
      });
      router.push(`/${locale}/booking-success?${params.toString()}`);
    } catch {
      toast.error("Failed to submit inquiry. Please try again or reach out on WhatsApp.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#013E51]/10 sticky top-24">
      <div className="mb-6 pb-6 border-b border-slate-100">
        <span className="block font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-widest text-[#E8B34A] mb-1">
          Reserve Your Stay
        </span>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          Reserve Your Stay
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] mt-1">
          Best rates guaranteed directly with Egypt Travel Swiss Concierge.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1">
              WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
              placeholder="+41 79 123"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1">
              Nationality
            </label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Country"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1 flex items-center gap-1">
              <FiCalendar className="w-3 h-3 text-[#E8B34A]" />
              Check-in
            </label>
            <input
              type="date"
              min={minCheckIn}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1">
              Nights
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={nightsCount}
              onChange={(e) => setNightsCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1 flex items-center gap-1">
              <FiUsers className="w-3 h-3 text-[#E8B34A]" />
              Adults
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1">
              Children
            </label>
            <input
              type="number"
              min={0}
              max={10}
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={createBookingMutation.isPending}
          className="w-full bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all duration-200 text-center cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
        >
          {createBookingMutation.isPending ? (
            <span>Sending Request...</span>
          ) : (
            <>
              <FiCheck className="w-4 h-4" />
              <span>Send Reservation Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
