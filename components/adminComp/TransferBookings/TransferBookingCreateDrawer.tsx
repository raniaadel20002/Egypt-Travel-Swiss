import { useState } from "react";
import { FiX, FiPlus, FiDollarSign } from "react-icons/fi";
import { toast } from "sonner";
import {
  CreateTransferBookingPayload,
  TransferCommunicationMethodEnum,
  TransferTripTypeEnum,
} from "@/models/transferBooking";
import {
  useCreateTransferBookingMutation,
  useTransferPreviewQuery,
} from "@/features/transfers/useTransferBookings";
import { useTransferLocationsQuery } from "@/features/transfers/useTransferLocations";
import { useCountryTransfersQuery } from "@/features/transfers/useCountryTransfers";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import TransferBookingRouteFields from "./TransferBookingRouteFields";
import TransferBookingScheduleFields from "./TransferBookingScheduleFields";
import TransferBookingCustomerFields from "./TransferBookingCustomerFields";
import { getTomorrowDateString } from "./transferBookingHelpers";

interface TransferBookingCreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransferBookingCreateDrawer({
  isOpen,
  onClose,
}: TransferBookingCreateDrawerProps) {
  const [fromLocationId, setFromLocationId] = useState("");
  const [toLocationId, setToLocationId] = useState("");
  const [tripType, setTripType] = useState<TransferTripTypeEnum>(TransferTripTypeEnum.OneWay);
  const [countryTransferId, setCountryTransferId] = useState<number>(0);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [tripDate, setTripDate] = useState("");
  const [tripTime, setTripTime] = useState("10:00");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [communicationMethod, setCommunicationMethod] = useState<TransferCommunicationMethodEnum>(
    TransferCommunicationMethodEnum.WhatsApp
  );
  const [luggageCount, setLuggageCount] = useState<number>(1);
  const [notes, setNotes] = useState("");

  const { data: fromLocsRes } = useTransferLocationsQuery("from");
  const { data: toLocsRes } = useTransferLocationsQuery("to");
  const { data: countryTransfers = [] } = useCountryTransfersQuery();

  const fromLocations = fromLocsRes?.data || [];
  const toLocations = toLocsRes?.data || [];

  const previewPayload =
    fromLocationId && toLocationId && adults > 0
      ? {
          fromLocationId,
          toLocationId,
          adults,
          children,
          tripType,
          additionalHours: 0,
        }
      : null;

  const { data: previewData, isLoading: isPreviewLoading } =
    useTransferPreviewQuery(previewPayload);

  const createMutation = useCreateTransferBookingMutation();

  useModalDismiss({ isOpen, onClose });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocationId || !toLocationId) {
      toast.error("Please select both From and To locations.");
      return;
    }
    if (!tripDate) {
      toast.error("Please select a trip date.");
      return;
    }
    const minSelectableDate = getTomorrowDateString();
    if (tripDate < minSelectableDate) {
      toast.error("Trip date must be in the future (from tomorrow onwards).");
      return;
    }
    if (!customerName.trim() || !email.trim() || !phoneNumber.trim()) {
      toast.error("Please fill in customer name, email, and phone number.");
      return;
    }

    try {
      const payload: CreateTransferBookingPayload = {
        fromLocationId,
        toLocationId,
        adults: Number(adults) || 1,
        children: Number(children) || 0,
        tripType,
        tripDate: new Date(tripDate).toISOString(),
        tripTime,
        customerName: customerName.trim(),
        countryTransferId: Number(countryTransferId) || 0,
        email: email.trim(),
        communicationMethod: Number(communicationMethod) as TransferCommunicationMethodEnum,
        phoneNumber: phoneNumber.replace(/\s+/g, "").trim(),
        luggageCount: Number(luggageCount) || 0,
        notes: notes.trim() || undefined,
      };

      await createMutation.mutateAsync(payload);
      toast.success("Transfer booking successfully created.");
      onClose();
    } catch {
      toast.error("Failed to create transfer booking. Please check the inputs.");
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
              <h2 className="text-lg font-bold">Create New Transfer Booking</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            <TransferBookingRouteFields
              fromLocationId={fromLocationId}
              setFromLocationId={setFromLocationId}
              toLocationId={toLocationId}
              setToLocationId={setToLocationId}
              tripType={tripType}
              setTripType={setTripType}
              fromLocations={fromLocations}
              toLocations={toLocations}
            />

            <TransferBookingScheduleFields
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              luggageCount={luggageCount}
              setLuggageCount={setLuggageCount}
              tripTime={tripTime}
              setTripTime={setTripTime}
              tripDate={tripDate}
              setTripDate={setTripDate}
            />

            <TransferBookingCustomerFields
              customerName={customerName}
              setCustomerName={setCustomerName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              countryTransferId={countryTransferId}
              setCountryTransferId={setCountryTransferId}
              countryTransfers={countryTransfers}
              communicationMethod={communicationMethod}
              setCommunicationMethod={setCommunicationMethod}
              notes={notes}
              setNotes={setNotes}
            />

            {/* Price Preview Card in EUR */}
            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Estimated Price</span>
                <span className="text-lg font-extrabold text-[#013E51]">
                  {isPreviewLoading ? (
                    "Calculating..."
                  ) : previewData?.pricing?.finalPrice ? (
                    `${Number(previewData.pricing.finalPrice).toFixed(2)} \u20AC`
                  ) : (
                    "Select route to calculate"
                  )}
                </span>
                {previewData?.vehicleName && (
                  <span className="text-[11px] text-gray-400 block">
                    Vehicle: {previewData.vehicleName}
                  </span>
                )}
              </div>
              <FiDollarSign className="w-8 h-8 text-[#E8B34A]" />
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
                <span>{createMutation.isPending ? "Creating..." : "Create Booking"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
