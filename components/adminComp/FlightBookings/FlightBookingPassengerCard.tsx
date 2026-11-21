import { FiPlus, FiTrash2, FiBriefcase } from "react-icons/fi";
import {
  BaggageTypeEnum,
  CreateFlightPassengerBaggagePayload,
  CreateFlightPassengerPayload,
  PassengerTypeEnum,
} from "@/models/flightBooking";

interface FlightBookingPassengerCardProps {
  index: number;
  passenger: CreateFlightPassengerPayload;
  canRemove: boolean;
  onChange: (updated: CreateFlightPassengerPayload) => void;
  onRemove: () => void;
}

export default function FlightBookingPassengerCard({
  index,
  passenger,
  canRemove,
  onChange,
  onRemove,
}: FlightBookingPassengerCardProps) {
  const handleAddBaggage = () => {
    const nextBaggages: CreateFlightPassengerBaggagePayload[] = [
      ...passenger.baggages,
      {
        baggageType: BaggageTypeEnum.CarryOn,
        quantity: 1,
        weightPerItem: 7,
      },
    ];
    onChange({ ...passenger, baggages: nextBaggages });
  };

  const handleUpdateBaggage = (
    bagIdx: number,
    updatedBag: CreateFlightPassengerBaggagePayload
  ) => {
    const nextBaggages = passenger.baggages.map((b, i) =>
      i === bagIdx ? updatedBag : b
    );
    onChange({ ...passenger, baggages: nextBaggages });
  };

  const handleRemoveBaggage = (bagIdx: number) => {
    const nextBaggages = passenger.baggages.filter((_, i) => i !== bagIdx);
    onChange({ ...passenger, baggages: nextBaggages });
  };

  return (
    <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-gray-200 space-y-3.5 font-[family-name:var(--font-lato)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#013E51]">
          Passenger #{index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>Remove Passenger</span>
          </button>
        )}
      </div>

      {/* Passenger Core Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={passenger.fullName}
            onChange={(e) =>
              onChange({ ...passenger, fullName: e.target.value })
            }
            placeholder="Passenger full name"
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            Passport Number *
          </label>
          <input
            type="text"
            value={passenger.passportNumber}
            onChange={(e) =>
              onChange({ ...passenger, passportNumber: e.target.value })
            }
            placeholder="e.g. A12345678"
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white font-mono"
          />
        </div>

        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            Passenger Type *
          </label>
          <select
            value={passenger.passengerType}
            onChange={(e) =>
              onChange({
                ...passenger,
                passengerType: Number(e.target.value) as PassengerTypeEnum,
              })
            }
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          >
            <option value={PassengerTypeEnum.Adult}>Adult</option>
            <option value={PassengerTypeEnum.Child}>Child</option>
            <option value={PassengerTypeEnum.Infant}>Infant</option>
          </select>
        </div>
      </div>

      {/* Baggage List */}
      <div className="pt-2 border-t border-gray-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-gray-600">
            <FiBriefcase className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>Baggage Items ({passenger.baggages.length})</span>
          </span>
          <button
            type="button"
            onClick={handleAddBaggage}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-[11px] font-bold text-[#013E51] hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <FiPlus className="w-3 h-3 text-[#E8B34A]" />
            <span>Add Baggage</span>
          </button>
        </div>

        {passenger.baggages.length > 0 && (
          <div className="space-y-2">
            {passenger.baggages.map((bag, bIdx) => (
              <div
                key={bIdx}
                className="grid grid-cols-12 gap-2 items-end bg-white p-2.5 rounded-xl border border-gray-200"
              >
                <div className="col-span-5">
                  <label className="block text-[10px] text-gray-400 mb-0.5">
                    Baggage Type
                  </label>
                  <select
                    value={bag.baggageType}
                    onChange={(e) =>
                      handleUpdateBaggage(bIdx, {
                        ...bag,
                        baggageType: Number(e.target.value) as BaggageTypeEnum,
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
                  >
                    <option value={BaggageTypeEnum.CarryOn}>Carry-On</option>
                    <option value={BaggageTypeEnum.PersonalItem}>
                      Personal Item
                    </option>
                    <option value={BaggageTypeEnum.CheckedBaggage}>
                      Checked Baggage
                    </option>
                    <option value={BaggageTypeEnum.SpecialBaggage}>
                      Special Baggage
                    </option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="block text-[10px] text-gray-400 mb-0.5">
                    Qty
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={bag.quantity}
                    onChange={(e) =>
                      handleUpdateBaggage(bIdx, {
                        ...bag,
                        quantity: Math.max(1, Number(e.target.value)),
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-[#013E51]"
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-[10px] text-gray-400 mb-0.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="0.5"
                    value={bag.weightPerItem}
                    onChange={(e) =>
                      handleUpdateBaggage(bIdx, {
                        ...bag,
                        weightPerItem: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-[#013E51]"
                  />
                </div>

                <div className="col-span-1 flex justify-end pb-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveBaggage(bIdx)}
                    title="Remove Baggage"
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
