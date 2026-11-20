"use client";

import { useMemo } from "react";
import { FiCalendar, FiPlus, FiTrash2, FiUsers } from "react-icons/fi";
import { CreateTripBookingItemPayload } from "@/models/booking";
import { TripApiItem } from "@/models/trip";
import { useTripServicesQuery } from "@/features/services/useServices";

interface BookingTripRowFieldProps {
  index: number;
  trips: TripApiItem[];
  value: CreateTripBookingItemPayload;
  onChange: (updated: CreateTripBookingItemPayload) => void;
  onRemove?: () => void;
  canRemove: boolean;
}

export default function BookingTripRowField({
  index,
  trips,
  value,
  onChange,
  onRemove,
  canRemove,
}: BookingTripRowFieldProps) {
  const selectedTrip = useMemo(
    () => trips.find((t) => t.id === value.tripId) || null,
    [trips, value.tripId]
  );

  const tripServicesQuery = useTripServicesQuery(
    value.tripId || null,
    Boolean(value.tripId)
  );
  const availableServices = tripServicesQuery.data || [];

  const handleTripChange = (tripId: number) => {
    onChange({
      ...value,
      tripId,
      serviceIds: [],
    });
  };

  const toggleService = (serviceId: number) => {
    const current = new Set(value.serviceIds || []);
    if (current.has(serviceId)) {
      current.delete(serviceId);
    } else {
      current.add(serviceId);
    }
    onChange({
      ...value,
      serviceIds: Array.from(current),
    });
  };

  // Estimated subtotal in EUR
  const estimatedSubtotal = useMemo(() => {
    if (!selectedTrip) return 0;
    const adultCost = (selectedTrip.adultPrice || 0) * (value.noAdult || 0);
    const childCost = (selectedTrip.childPrice || 0) * (value.noChild || 0);
    const selectedServiceItems = availableServices.filter((s) =>
      value.serviceIds?.includes(s.id)
    );
    const servicesCost = selectedServiceItems.reduce(
      (sum, s) => sum + (s.adultPrice || 0) * (value.noAdult || 0),
      0
    );
    return adultCost + childCost + servicesCost;
  }, [selectedTrip, value.noAdult, value.noChild, value.serviceIds, availableServices]);

  return (
    <div className="p-4 rounded-2xl border border-[#013E51]/20 bg-[#FAF7F2]/40 space-y-3 relative">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Excursion #{index + 1}
        </span>
        {canRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            title="Remove excursion"
            className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Select Excursion */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-gray-600 block">
          Select Excursion *
        </label>
        <select
          required
          value={value.tripId || ""}
          onChange={(e) => handleTripChange(Number(e.target.value))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
        >
          <option value="">-- Choose an excursion --</option>
          {trips.map((t) => (
            <option key={t.id} value={t.id}>
              #{t.id} - {t.name} (&euro;{t.adultPrice}/adult)
            </option>
          ))}
        </select>
      </div>

      {/* Leave Date */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-gray-600 block">
          Departure Date (leaveDate) *
        </label>
        <div className="relative">
          <input
            type="date"
            required
            value={value.leaveDate}
            onChange={(e) => onChange({ ...value, leaveDate: e.target.value })}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          />
          <FiCalendar className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Guests Breakdown: Adults, Children, Infants */}
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
            Adults *
          </label>
          <input
            type="number"
            min={1}
            required
            value={value.noAdult}
            onChange={(e) =>
              onChange({ ...value, noAdult: Math.max(1, Number(e.target.value)) })
            }
            className="w-full px-2.5 py-1.5 text-xs text-center font-bold rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
            Children
          </label>
          <input
            type="number"
            min={0}
            value={value.noChild}
            onChange={(e) =>
              onChange({ ...value, noChild: Math.max(0, Number(e.target.value)) })
            }
            className="w-full px-2.5 py-1.5 text-xs text-center font-bold rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
            Infants
          </label>
          <input
            type="number"
            min={0}
            value={value.noInf}
            onChange={(e) =>
              onChange({ ...value, noInf: Math.max(0, Number(e.target.value)) })
            }
            className="w-full px-2.5 py-1.5 text-xs text-center font-bold rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          />
        </div>
      </div>

      {/* Associated Add-on Services Checkboxes */}
      {availableServices.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-gray-200">
          <span className="text-[11px] font-bold text-[#013E51] block">
            Add-on Services (Optional)
          </span>
          <div className="space-y-1">
            {availableServices.map((service) => {
              const isChecked = value.serviceIds?.includes(service.id) || false;
              return (
                <label
                  key={service.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-200 text-xs text-[#013E51] cursor-pointer hover:bg-[#FAF7F2]"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleService(service.id)}
                      className="rounded text-[#013E51] focus:ring-[#013E51]"
                    />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <span className="font-bold text-[#E8B34A]">
                    +&euro;{service.adultPrice}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtotal preview */}
      {selectedTrip && (
        <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
          <span className="text-gray-500">Estimated Subtotal:</span>
          <span className="font-extrabold text-[#013E51]">
            &euro;{estimatedSubtotal.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
