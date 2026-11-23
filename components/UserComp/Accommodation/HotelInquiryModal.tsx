"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiX, FiCalendar, FiUsers, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCreateHotelBookingMutation } from "@/features/hotels/useHotelBookings";
import { HotelApiItem } from "@/models/hotel";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface HotelInquiryModalProps {
  hotel: HotelApiItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_IMAGE =
  "/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg";

export default function HotelInquiryModal({
  hotel,
  isOpen,
  onClose,
}: HotelInquiryModalProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [nationality, setNationality] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [nightsCount, setNightsCount] = useState(3);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const createBookingMutation = useCreateHotelBookingMutation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !hotel) return null;

  const primaryImg =
    hotel.images?.find((img) => img.isPrimary)?.imageUrl ||
    hotel.images?.[0]?.imageUrl;
  const imageSrc = primaryImg ? resolveApiImageUrl(primaryImg) : FALLBACK_IMAGE;

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
        "Inquiry submitted successfully! Redirecting to confirmation voucher..."
      );
      onClose();

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
      toast.error("Failed to submit inquiry. Please try again or contact us directly.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Preview */}
        <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
          <Image
            src={imageSrc}
            alt={hotel.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#013E51] via-[#013E51]/60 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold leading-tight">
              {hotel.name}
            </h3>
            <p className="font-[family-name:var(--font-lato)] text-xs text-white/80">
              {hotel.location}
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1">
                WhatsApp / Phone *
              </label>
              <input
                type="tel"
                required
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
                placeholder="+41 79 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
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
                placeholder="Swiss / German / etc."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1 flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5 text-[#E8B34A]" />
                Check-in Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#013E51] uppercase mb-1 flex items-center gap-1">
                <FiUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
                Adults
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#013E51]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={createBookingMutation.isPending}
              className="w-full bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all duration-200 text-center cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {createBookingMutation.isPending ? (
                <span>Submitting Inquiry...</span>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>Send Reservation Inquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
