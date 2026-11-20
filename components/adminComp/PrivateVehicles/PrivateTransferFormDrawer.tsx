"use client";

import { useEffect, useMemo, useState } from "react";
import { FiCheck, FiCompass, FiLoader, FiX } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { toast } from "sonner";
import { useTripsQuery } from "@/features/trips/useTrips";
import { usePrivateVehiclesQuery } from "@/features/privateVehicles/usePrivateVehicles";
import {
  useCreatePrivateVehicleTransferMutation,
  useUpdatePrivateVehicleTransferMutation,
} from "@/features/privateVehicles/usePrivateVehicleTransfers";
import {
  CreatePrivateVehicleTransferPayload,
  PrivateVehicleTransferApiItem,
  UpdatePrivateVehicleTransferPayload,
} from "@/models/privateVehicle";

interface PrivateTransferFormDrawerProps {
  isOpen: boolean;
  item: PrivateVehicleTransferApiItem | null;
  defaultTripId?: number | null;
  onClose: () => void;
}

export default function PrivateTransferFormDrawer({
  isOpen,
  item,
  defaultTripId,
  onClose,
}: PrivateTransferFormDrawerProps) {
  const isEdit = Boolean(item);

  const [tripId, setTripId] = useState<number>(0);
  const [privateVehicleId, setPrivateVehicleId] = useState<number>(0);
  const [from, setFrom] = useState<number>(1);
  const [to, setTo] = useState<number>(4);
  const [price, setPrice] = useState<number>(20);

  const tripsQuery = useTripsQuery({
    PageNumber: 1,
    PageSize: 100,
    language: "EN",
  });
  const vehiclesQuery = usePrivateVehiclesQuery({ language: "EN" });

  const createMutation = useCreatePrivateVehicleTransferMutation();
  const updateMutation = useUpdatePrivateVehicleTransferMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Filter to private trips only
  const privateTrips = useMemo(() => {
    const all = tripsQuery.data || [];
    return all.filter((t) => t.categoryName?.toLowerCase() === "private");
  }, [tripsQuery.data]);

  const vehicles = vehiclesQuery.data || [];

  useEffect(() => {
    if (isEdit && item) {
      setTripId(item.tripId);
      setPrivateVehicleId(item.privateVehicleId);
      setFrom(item.from);
      setTo(item.to);
      setPrice(item.price);
    } else if (!isEdit && isOpen) {
      setTripId(defaultTripId || privateTrips[0]?.id || 0);
      setPrivateVehicleId(vehicles[0]?.id || 0);
      setFrom(1);
      setTo(4);
      setPrice(20);
    }
  }, [isEdit, item, defaultTripId, privateTrips, vehicles, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tripId) {
      toast.error("Please select a private excursion.");
      return;
    }
    if (!privateVehicleId) {
      toast.error("Please select a vehicle class.");
      return;
    }
    if (from < 1) {
      toast.error("Minimum passengers must be at least 1.");
      return;
    }
    if (to < from) {
      toast.error("Max passengers cannot be less than Min passengers.");
      return;
    }
    if (price <= 0) {
      toast.error("Please enter a valid price in EUR.");
      return;
    }

    if (isEdit && item) {
      const payload: UpdatePrivateVehicleTransferPayload = {
        id: item.id,
        tripId,
        privateVehicleId,
        from,
        to,
        price,
      };
      await updateMutation.mutateAsync(payload);
    } else {
      const payload: CreatePrivateVehicleTransferPayload = {
        tripId,
        privateVehicleId,
        from,
        to,
        price,
      };
      await createMutation.mutateAsync(payload);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-[#013E51]/40 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/10 flex items-center justify-center text-[#013E51]">
              <FaCar className="w-5 h-5 text-[#E8B34A]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#013E51]">
                {isEdit ? "Edit Transfer Rate" : "Add Transfer Rate"}
              </h2>
              <p className="text-xs text-[#888888]">
                Configure vehicle class and passenger capacity pricing in EUR (&euro;).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close drawer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Private Trip Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
                Private Excursion *
              </label>
              <select
                required
                value={tripId || ""}
                onChange={(e) => setTripId(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-semibold focus:outline-hidden focus:border-[#013E51] cursor-pointer"
              >
                <option value="" disabled>
                  Select Private Excursion
                </option>
                {privateTrips.map((t) => (
                  <option key={t.id} value={t.id}>
                    #{t.id} - {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Class Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
                Vehicle Class *
              </label>
              <select
                required
                value={privateVehicleId || ""}
                onChange={(e) => setPrivateVehicleId(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-semibold focus:outline-hidden focus:border-[#013E51] cursor-pointer"
              >
                <option value="" disabled>
                  Select Vehicle Class
                </option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    #{v.id} - {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Passenger Count Range */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/10">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#013E51] block">
                  Min Persons (From) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={from}
                  onChange={(e) => setFrom(parseInt(e.target.value) || 1)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#013E51] block">
                  Max Persons (To) *
                </label>
                <input
                  type="number"
                  min={from}
                  required
                  value={to}
                  onChange={(e) => setTo(parseInt(e.target.value) || 1)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
                />
              </div>
            </div>

            {/* Price in EUR */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
                Transfer Rate (EUR / &euro;) *
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                required
                value={price || ""}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 35"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white text-[#013E51] font-mono font-bold focus:outline-hidden focus:border-[#013E51]"
              />
              <span className="block text-[11px] text-gray-500">
                This vehicle transfer price will be added to selected services for private bookings of {from} to {to} passengers.
              </span>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-[#FAF7F2] flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#013E51]/90 transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <FiLoader className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FiCheck className="w-3.5 h-3.5 text-[#E8B34A]" />
              )}
              <span>{isEdit ? "Update Rate" : "Save Rate"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
