"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { useTransferLocationsQuery } from "@/features/transfers/useTransferLocations";
import { useVehicleTypeTransfersQuery } from "@/features/transfers/useTransferVehicles";
import {
  useCreateTransferVehiclePriceMutation,
  useUpdateTransferVehiclePriceMutation,
} from "@/features/transfers/useTransferPrices";
import {
  TransferVehiclePriceApiItem,
} from "@/models/transferService";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface TransferPriceFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  item: TransferVehiclePriceApiItem | null;
  onClose: () => void;
}

export default function TransferPriceFormDrawer({
  isOpen,
  mode,
  item,
  onClose,
}: TransferPriceFormDrawerProps) {
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [vehicleTypeTransferId, setVehicleTypeTransferId] = useState("");
  const [priceUsd, setPriceUsd] = useState<number>(0);

  const fromLocationsQuery = useTransferLocationsQuery("from", {
    language: "en",
  });
  const toLocationsQuery = useTransferLocationsQuery("to", {
    language: "en",
  });
  const vehiclesQuery = useVehicleTypeTransfersQuery({ language: "en" });

  const createMutation = useCreateTransferVehiclePriceMutation();
  const updateMutation = useUpdateTransferVehiclePriceMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const fromLocations = fromLocationsQuery.data?.data || [];
  const toLocations = toLocationsQuery.data?.data || [];
  const vehicles = vehiclesQuery.data?.data || [];

  useEffect(() => {
    if (!isOpen) {
      setFromId("");
      setToId("");
      setVehicleTypeTransferId("");
      setPriceUsd(0);
      return;
    }

    if (mode === "edit" && item) {
      setFromId(item.fromId || "");
      setToId(item.toId || "");
      setVehicleTypeTransferId(item.vehicleTypeTransferId || "");
      setPriceUsd(item.priceUsd ?? 0);
    } else {
      setFromId(fromLocations[0]?.id || "");
      setToId(toLocations[0]?.id || "");
      setVehicleTypeTransferId(vehicles[0]?.id || "");
      setPriceUsd(0);
    }
  }, [isOpen, mode, item, fromLocations, toLocations, vehicles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromId) {
      toast.error("Please select a pick-up location.");
      return;
    }
    if (!toId) {
      toast.error("Please select a drop-off location.");
      return;
    }
    if (!vehicleTypeTransferId) {
      toast.error("Please select a vehicle type.");
      return;
    }
    if (priceUsd <= 0) {
      toast.error("Please enter a valid price in EUR (must be greater than 0).");
      return;
    }

    try {
      if (mode === "create") {
        await createMutation.mutateAsync({
          fromId,
          toId,
          vehicleTypeTransferId,
          priceUsd,
        });
        toast.success("Route price created successfully.");
      } else if (item) {
        await updateMutation.mutateAsync({
          id: item.id,
          fromId,
          toId,
          vehicleTypeTransferId,
          priceUsd,
        });
        toast.success("Route price updated successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(
        extractErrorMessage(err, "Failed to save transfer vehicle price.")
      );
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow="Transfer Service & Tariffs"
      title={mode === "create" ? "Add Route Price" : "Edit Route Price"}
      subtitle="Set fixed transfer rates in EUR (€) between pick-up and drop-off points."
      disableClose={isPending}
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="transfer-price-form"
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <>
                <FiLoader className="w-3.5 h-3.5 animate-spin text-[#E8B34A]" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiCheck className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>{mode === "create" ? "Create Price" : "Save Changes"}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <form
        id="transfer-price-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Pick-up Location Select */}
        <div>
          <label className="text-xs font-bold text-[#013E51] block mb-1">
            Pick-up Location (From) <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 bg-white font-medium text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          >
            <option value="">-- Choose Pick-up Origin --</option>
            {fromLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
          {fromLocations.length === 0 && (
            <p className="text-[11px] text-amber-700 mt-1">
              No pick-up points found. Please create pick-up locations first.
            </p>
          )}
        </div>

        {/* Drop-off Location Select */}
        <div>
          <label className="text-xs font-bold text-[#013E51] block mb-1">
            Drop-off Destination (To) <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 bg-white font-medium text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          >
            <option value="">-- Choose Drop-off Destination --</option>
            {toLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
          {toLocations.length === 0 && (
            <p className="text-[11px] text-amber-700 mt-1">
              No drop-off points found. Please create drop-off locations first.
            </p>
          )}
        </div>

        {/* Vehicle Type Select */}
        <div>
          <label className="text-xs font-bold text-[#013E51] block mb-1">
            Vehicle Fleet Type <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={vehicleTypeTransferId}
            onChange={(e) => setVehicleTypeTransferId(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 bg-white font-medium text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          >
            <option value="">-- Choose Vehicle Fleet Type --</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.fromPerson}-{v.toPerson} Persons)
              </option>
            ))}
          </select>
          {vehicles.length === 0 && (
            <p className="text-[11px] text-amber-700 mt-1">
              No vehicle types found. Please create vehicle types first.
            </p>
          )}
        </div>

        {/* Price in EUR */}
        <div className="p-4 rounded-2xl border border-gray-200 bg-[#FAF7F2]/50 space-y-2">
          <label className="text-xs font-bold text-[#013E51] block">
            Transfer Route Price (EUR / &euro;) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
              &euro;
            </span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              value={priceUsd || ""}
              onChange={(e) => setPriceUsd(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 35"
              className="w-full pl-8 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 bg-white font-bold text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
            />
          </div>
          <p className="text-[11px] text-gray-500">
            All prices are configured and processed in Euros (&euro;).
          </p>
        </div>
      </form>
    </AdminDrawer>
  );
}
