import { FiTrash2 } from "react-icons/fi";
import { HotelRatePlanApiItem } from "@/models/hotel";

export interface HotelRoomFormState {
  ratePlanId: number;
  adults: number;
  children: number;
  infants: number;
}

interface HotelBookingRoomRowProps {
  index: number;
  room: HotelRoomFormState;
  ratePlans: HotelRatePlanApiItem[];
  canRemove: boolean;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    field: keyof HotelRoomFormState,
    value: number
  ) => void;
}

export default function HotelBookingRoomRow({
  index,
  room,
  ratePlans,
  canRemove,
  onRemove,
  onChange,
}: HotelBookingRoomRowProps) {
  return (
    <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3 relative font-[family-name:var(--font-lato)]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-500 uppercase">
          Room #{index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Select Room Rate Plan *
        </label>
        <select
          required
          value={room.ratePlanId || ""}
          onChange={(e) => onChange(index, "ratePlanId", Number(e.target.value))}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
        >
          <option value="">
            {ratePlans.length > 0
              ? "Choose a room rate plan..."
              : "No rate plans available for this hotel"}
          </option>
          {ratePlans.map((rp) => (
            <option key={rp.id} value={rp.id}>
              {rp.name} {rp.description ? `- ${rp.description}` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            Adults *
          </label>
          <input
            type="number"
            min={1}
            required
            value={room.adults}
            onChange={(e) =>
              onChange(index, "adults", Math.max(1, Number(e.target.value) || 1))
            }
            className="w-full px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            Children
          </label>
          <input
            type="number"
            min={0}
            value={room.children}
            onChange={(e) =>
              onChange(index, "children", Math.max(0, Number(e.target.value) || 0))
            }
            className="w-full px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            Infants
          </label>
          <input
            type="number"
            min={0}
            value={room.infants}
            onChange={(e) =>
              onChange(index, "infants", Math.max(0, Number(e.target.value) || 0))
            }
            className="w-full px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
          />
        </div>
      </div>
    </div>
  );
}
