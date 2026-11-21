import { FiRepeat } from "react-icons/fi";
import { toast } from "sonner";
import { TransferLocationItem } from "@/models/transferLocation";
import { TransferTripTypeEnum } from "@/models/transferBooking";

interface TransferBookingRouteFieldsProps {
  fromLocationId: string;
  setFromLocationId: (val: string) => void;
  toLocationId: string;
  setToLocationId: (val: string) => void;
  tripType: TransferTripTypeEnum;
  setTripType: (val: TransferTripTypeEnum) => void;
  fromLocations: TransferLocationItem[];
  toLocations: TransferLocationItem[];
}

export default function TransferBookingRouteFields({
  fromLocationId,
  setFromLocationId,
  toLocationId,
  setToLocationId,
  tripType,
  setTripType,
  fromLocations,
  toLocations,
}: TransferBookingRouteFieldsProps) {
  const handleSwapLocations = () => {
    if (!fromLocationId || !toLocationId) {
      toast.error("Please select both origin and destination before swapping.");
      return;
    }

    const canSwapFromTo = toLocations.some((loc) => loc.id === fromLocationId);
    const canSwapToFrom = fromLocations.some((loc) => loc.id === toLocationId);

    if (!canSwapFromTo || !canSwapToFrom) {
      toast.error("Cannot swap: reverse route is not available for these locations.");
      return;
    }

    const prevFrom = fromLocationId;
    const prevTo = toLocationId;
    setFromLocationId(prevTo);
    setToLocationId(prevFrom);
    toast.success("Locations swapped successfully.");
  };

  return (
    <div className="space-y-3 font-[family-name:var(--font-lato)]">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Route & Transfer Type
        </h3>
        <button
          type="button"
          onClick={handleSwapLocations}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#013E51] hover:text-[#E8B34A] transition-colors cursor-pointer"
          title="Swap Pickup and Drop-off locations if reverse route is available"
        >
          <FiRepeat className="w-3.5 h-3.5" />
          <span>Swap Route</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">From Location *</label>
          <select
            value={fromLocationId}
            onChange={(e) => setFromLocationId(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          >
            <option value="">Select origin...</option>
            {fromLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">To Location *</label>
          <select
            value={toLocationId}
            onChange={(e) => setToLocationId(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          >
            <option value="">Select destination...</option>
            {toLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Trip Type</label>
          <select
            value={tripType}
            onChange={(e) => setTripType(Number(e.target.value) as TransferTripTypeEnum)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          >
            <option value={TransferTripTypeEnum.OneWay}>One Way</option>
            <option value={TransferTripTypeEnum.RoundTrip}>Round Trip</option>
          </select>
        </div>
      </div>
    </div>
  );
}
