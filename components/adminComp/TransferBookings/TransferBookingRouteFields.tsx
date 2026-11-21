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
  return (
    <div className="space-y-3 font-[family-name:var(--font-lato)]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Route & Transfer Type
      </h3>
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
