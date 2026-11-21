import { useEffect, useState } from "react";
import { FiX, FiPlus, FiSave, FiUsers } from "react-icons/fi";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import {
  CreateFlightPassengerPayload,
  FlightBookingApiItem,
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import {
  useCitiesQuery,
  useCountriesQuery,
} from "@/features/flightLocations/useFlightLocations";
import {
  useCreateFlightBookingMutation,
  useUpdateFlightBookingMutation,
} from "@/features/flights/useFlightBookings";
import {
  buildFlightBookingPayload,
  DEFAULT_PASSENGER,
  mapApiPassengersToPayload,
  parseFlightBookingType,
  parseFlightTripType,
  toDateInputString,
} from "./flightBookingHelpers";
import FlightBookingRouteSection from "./FlightBookingRouteSection";
import FlightBookingScheduleSection from "./FlightBookingScheduleSection";
import FlightBookingPassengerCard from "./FlightBookingPassengerCard";

interface FlightBookingFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingBooking: FlightBookingApiItem | null;
}

export default function FlightBookingFormDrawer({
  isOpen,
  onClose,
  editingBooking,
}: FlightBookingFormDrawerProps) {
  const [bookingType, setBookingType] = useState(FlightBookingTypeEnum.EgyptToCountry);
  const [tripType, setTripType] = useState(FlightTripTypeEnum.OneWay);
  const [fromCountryId, setFromCountryId] = useState<number | null>(null);
  const [fromCityId, setFromCityId] = useState<number | null>(null);
  const [toCountryId, setToCountryId] = useState<number | null>(null);
  const [toCityId, setToCityId] = useState<number | null>(null);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDepartureAirport, setReturnDepartureAirport] = useState("");
  const [returnArrivalAirport, setReturnArrivalAirport] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState<CreateFlightPassengerPayload[]>([
    { ...DEFAULT_PASSENGER },
  ]);

  const { data: countriesRes } = useCountriesQuery({ PageSize: 200 });
  const { data: fromCitiesRes } = useCitiesQuery(
    { CountryId: fromCountryId ?? undefined, PageSize: 200 },
    Boolean(fromCountryId)
  );
  const { data: toCitiesRes } = useCitiesQuery(
    { CountryId: toCountryId ?? undefined, PageSize: 200 },
    Boolean(toCountryId)
  );

  const countries = countriesRes?.data || [];
  const fromCities = fromCitiesRes?.data || [];
  const toCities = toCitiesRes?.data || [];

  const createMutation = useCreateFlightBookingMutation();
  const updateMutation = useUpdateFlightBookingMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useModalDismiss({ isOpen, onClose, disabled: isSubmitting });

  useEffect(() => {
    if (!isOpen) return;
    if (editingBooking) {
      setBookingType(parseFlightBookingType(editingBooking.bookingType));
      setTripType(parseFlightTripType(editingBooking.tripType));
      setFromCountryId(editingBooking.fromCountryId || null);
      setFromCityId(editingBooking.fromCityId || null);
      setToCountryId(editingBooking.toCountryId || null);
      setToCityId(editingBooking.toCityId || null);
      setDepartureAirport(editingBooking.departureAirport || "");
      setArrivalAirport(editingBooking.arrivalAirport || "");
      setDepartureDate(toDateInputString(editingBooking.departureDate));
      setReturnDepartureAirport(editingBooking.returnDepartureAirport || "");
      setReturnArrivalAirport(editingBooking.returnArrivalAirport || "");
      setReturnDate(toDateInputString(editingBooking.returnDate));
      setPassengers(mapApiPassengersToPayload(editingBooking));
    } else {
      setBookingType(FlightBookingTypeEnum.EgyptToCountry);
      setTripType(FlightTripTypeEnum.OneWay);
      setFromCountryId(null);
      setFromCityId(null);
      setToCountryId(null);
      setToCityId(null);
      setDepartureAirport("");
      setArrivalAirport("");
      setDepartureDate("");
      setReturnDepartureAirport("");
      setReturnArrivalAirport("");
      setReturnDate("");
      setPassengers([{ ...DEFAULT_PASSENGER }]);
    }
  }, [isOpen, editingBooking]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingType === FlightBookingTypeEnum.EgyptToCountry && (!toCountryId || !toCityId)) {
      toast.error("Please select both To Country and To City.");
      return;
    }
    if (bookingType === FlightBookingTypeEnum.CountryToEgypt && (!fromCountryId || !fromCityId)) {
      toast.error("Please select both From Country and From City.");
      return;
    }
    if (!departureAirport.trim() || !arrivalAirport.trim() || !departureDate) {
      toast.error("Please complete outbound airports and departure date.");
      return;
    }
    if (
      tripType === FlightTripTypeEnum.RoundTrip &&
      (!returnDepartureAirport.trim() || !returnArrivalAirport.trim() || !returnDate)
    ) {
      toast.error("Please complete return airports and return date for round-trip.");
      return;
    }

    const payload = buildFlightBookingPayload({
      bookingType,
      tripType,
      fromCountryId,
      fromCityId,
      toCountryId,
      toCityId,
      departureAirport,
      arrivalAirport,
      departureDate,
      returnDepartureAirport,
      returnArrivalAirport,
      returnDate,
      passengers,
    });

    try {
      if (editingBooking) {
        await updateMutation.mutateAsync({
          id: editingBooking.id,
          payload: { ...payload, id: editingBooking.id },
        });
        toast.success(`Flight booking #${editingBooking.id} updated.`);
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Flight booking created.");
      }
      onClose();
    } catch {
      toast.error("Failed to save flight booking. Please verify all inputs.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-[family-name:var(--font-lato)]">
      <div aria-hidden="true" className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
          <div className="px-6 py-5 bg-[#013E51] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B34A] font-bold block">
                Aviation Reservations
              </span>
              <h2 className="text-lg font-bold">
                {editingBooking ? `Edit Flight Booking #${editingBooking.id}` : "Create Flight Booking"}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            <FlightBookingRouteSection
              bookingType={bookingType}
              onBookingTypeChange={setBookingType}
              tripType={tripType}
              onTripTypeChange={setTripType}
              fromCountryId={fromCountryId}
              onFromCountryChange={setFromCountryId}
              fromCityId={fromCityId}
              onFromCityChange={setFromCityId}
              toCountryId={toCountryId}
              onToCountryChange={setToCountryId}
              toCityId={toCityId}
              onToCityChange={setToCityId}
              countries={countries}
              fromCities={fromCities}
              toCities={toCities}
            />

            <FlightBookingScheduleSection
              tripType={tripType}
              departureAirport={departureAirport}
              setDepartureAirport={setDepartureAirport}
              arrivalAirport={arrivalAirport}
              setArrivalAirport={setArrivalAirport}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDepartureAirport={returnDepartureAirport}
              setReturnDepartureAirport={setReturnDepartureAirport}
              returnArrivalAirport={returnArrivalAirport}
              setReturnArrivalAirport={setReturnArrivalAirport}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
                    Passengers & Baggages
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#013E51] text-white text-[11px] font-bold">
                    <FiUsers className="w-3 h-3 text-[#E8B34A]" />
                    <span>Total People: {passengers.length}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPassengers((prev) => [...prev, { ...DEFAULT_PASSENGER }])}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#013E51]/5 hover:bg-[#013E51]/10 text-[#013E51] text-xs font-bold transition-colors cursor-pointer"
                >
                  <FiPlus className="w-3.5 h-3.5 text-[#E8B34A]" />
                  <span>Add Passenger</span>
                </button>
              </div>

              <div className="space-y-3">
                {passengers.map((pax, idx) => (
                  <FlightBookingPassengerCard
                    key={idx}
                    index={idx}
                    passenger={pax}
                    canRemove={passengers.length > 1}
                    onChange={(updated) =>
                      setPassengers((prev) => prev.map((item, i) => (i === idx ? updated : item)))
                    }
                    onRemove={() => setPassengers((prev) => prev.filter((_, i) => i !== idx))}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
              >
                <FiSave className="w-4 h-4 text-[#E8B34A]" />
                <span>
                  {isSubmitting
                    ? "Saving..."
                    : editingBooking
                    ? "Update Flight Booking"
                    : "Create Flight Booking"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
