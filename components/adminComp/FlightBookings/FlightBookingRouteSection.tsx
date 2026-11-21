import {
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import { CityApiItem, CountryApiItem } from "@/models/flightLocation";

interface FlightBookingRouteSectionProps {
  bookingType: FlightBookingTypeEnum;
  onBookingTypeChange: (val: FlightBookingTypeEnum) => void;
  tripType: FlightTripTypeEnum;
  onTripTypeChange: (val: FlightTripTypeEnum) => void;
  fromCountryId: number | null;
  onFromCountryChange: (val: number | null) => void;
  fromCityId: number | null;
  onFromCityChange: (val: number | null) => void;
  toCountryId: number | null;
  onToCountryChange: (val: number | null) => void;
  toCityId: number | null;
  onToCityChange: (val: number | null) => void;
  countries: CountryApiItem[];
  fromCities: CityApiItem[];
  toCities: CityApiItem[];
}

export default function FlightBookingRouteSection({
  bookingType,
  onBookingTypeChange,
  tripType,
  onTripTypeChange,
  fromCountryId,
  onFromCountryChange,
  fromCityId,
  onFromCityChange,
  toCountryId,
  onToCountryChange,
  toCityId,
  onToCityChange,
  countries,
  fromCities,
  toCities,
}: FlightBookingRouteSectionProps) {
  return (
    <div className="space-y-3.5 font-[family-name:var(--font-lato)]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Flight Direction & Route
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Booking Type *
          </label>
          <select
            value={bookingType}
            onChange={(e) =>
              onBookingTypeChange(Number(e.target.value) as FlightBookingTypeEnum)
            }
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white cursor-pointer"
          >
            <option value={FlightBookingTypeEnum.EgyptToCountry}>
              Egypt to Country (International Outbound)
            </option>
            <option value={FlightBookingTypeEnum.CountryToEgypt}>
              Country to Egypt (International Inbound)
            </option>
            <option value={FlightBookingTypeEnum.Local}>
              Local (Domestic Within Egypt)
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Trip Type *</label>
          <select
            value={tripType}
            onChange={(e) =>
              onTripTypeChange(Number(e.target.value) as FlightTripTypeEnum)
            }
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white cursor-pointer"
          >
            <option value={FlightTripTypeEnum.OneWay}>One Way</option>
            <option value={FlightTripTypeEnum.RoundTrip}>Round Trip</option>
          </select>
        </div>
      </div>

      {/* Conditional Country & City Selectors */}
      {bookingType === FlightBookingTypeEnum.EgyptToCountry && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-sky-50/50 p-3.5 rounded-xl border border-sky-100">
          <div>
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              To Country *
            </label>
            <select
              value={toCountryId ?? ""}
              onChange={(e) => {
                const v = e.target.value ? Number(e.target.value) : null;
                onToCountryChange(v);
                onToCityChange(null);
              }}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
            >
              <option value="">Select destination country...</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              To City *
            </label>
            <select
              value={toCityId ?? ""}
              onChange={(e) =>
                onToCityChange(e.target.value ? Number(e.target.value) : null)
              }
              disabled={!toCountryId}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer disabled:opacity-50"
            >
              <option value="">
                {toCountryId ? "Select destination city..." : "Select country first"}
              </option>
              {toCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {bookingType === FlightBookingTypeEnum.CountryToEgypt && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
          <div>
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              From Country *
            </label>
            <select
              value={fromCountryId ?? ""}
              onChange={(e) => {
                const v = e.target.value ? Number(e.target.value) : null;
                onFromCountryChange(v);
                onFromCityChange(null);
              }}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
            >
              <option value="">Select origin country...</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 font-semibold mb-1">
              From City *
            </label>
            <select
              value={fromCityId ?? ""}
              onChange={(e) =>
                onFromCityChange(e.target.value ? Number(e.target.value) : null)
              }
              disabled={!fromCountryId}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer disabled:opacity-50"
            >
              <option value="">
                {fromCountryId ? "Select origin city..." : "Select country first"}
              </option>
              {fromCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {bookingType === FlightBookingTypeEnum.Local && (
        <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-800">
          Domestic local flight within Egypt. Country and city IDs are automatically
          excluded; specify the departure and arrival airports below.
        </div>
      )}
    </div>
  );
}
