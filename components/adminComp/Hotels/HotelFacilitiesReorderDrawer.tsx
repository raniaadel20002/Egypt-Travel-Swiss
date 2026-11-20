"use client";

import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { HotelApiItem, HotelFacilityApiItem } from "@/models/hotel";
import { useReorderHotelFacilitiesMutation } from "@/features/hotels/useHotels";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import HotelFacilityIcon from "./HotelFacilityIcon";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface HotelFacilitiesReorderDrawerProps {
  isOpen: boolean;
  hotel: HotelApiItem | null;
  onClose: () => void;
}

export default function HotelFacilitiesReorderDrawer({
  isOpen,
  hotel,
  onClose,
}: HotelFacilitiesReorderDrawerProps) {
  const [facilities, setFacilities] = useState<HotelFacilityApiItem[]>([]);
  const reorderMutation = useReorderHotelFacilitiesMutation();

  useEffect(() => {
    if (hotel?.facilities) {
      setFacilities([...hotel.facilities]);
    } else {
      setFacilities([]);
    }
  }, [hotel]);

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...facilities];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setFacilities(next);
  };

  const handleMoveDown = (index: number) => {
    if (index >= facilities.length - 1) return;
    const next = [...facilities];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setFacilities(next);
  };

  const handleSaveOrder = async () => {
    if (!hotel) return;

    const facilityIds = facilities
      .map((f) => f.id)
      .filter((id): id is string => Boolean(id));

    if (facilityIds.length !== facilities.length) {
      toast.error(
        "Some facilities are missing an ID and cannot be reordered until saved."
      );
      return;
    }

    try {
      await reorderMutation.mutateAsync({
        hotelId: hotel.id,
        facilityIds,
      });
      toast.success("Facility sequence reordered successfully.");
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to reorder facilities."));
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow={`Hotel #${hotel?.id}`}
      title="Reorder Facilities"
      subtitle={`Rearrange display order of facilities for ${hotel?.name || "Hotel"}.`}
      widthClassName="max-w-lg sm:max-w-xl"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={reorderMutation.isPending}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveOrder}
            disabled={reorderMutation.isPending || facilities.length <= 1}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {reorderMutation.isPending ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                <span>Save Sequence</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-xs text-gray-500">
          Use the arrow buttons to shift facilities up or down. The sequence will be updated immediately upon saving.
        </p>

        {facilities.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-400">
            This hotel currently has no facilities configured.
          </div>
        ) : (
          <div className="space-y-2">
            {facilities.map((fac, idx) => (
              <div
                key={fac.id || idx}
                className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#013E51]/10 text-[#013E51] text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <HotelFacilityIcon
                      iconKey={fac.icon}
                      className="w-4 h-4 text-[#013E51]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#013E51]">
                        {fac.name}
                      </h4>
                      {fac.values && fac.values.length > 0 && (
                        <p className="text-[11px] text-gray-500 line-clamp-1">
                          {fac.values.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0 || reorderMutation.isPending}
                    aria-label="Move up"
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-[#FAF7F2] text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <FiArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(idx)}
                    disabled={
                      idx === facilities.length - 1 ||
                      reorderMutation.isPending
                    }
                    aria-label="Move down"
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-[#FAF7F2] text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <FiArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDrawer>
  );
}
