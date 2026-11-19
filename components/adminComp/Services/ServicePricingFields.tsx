"use client";

interface ServicePricingFieldsProps {
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  onAdultPriceChange: (val: number) => void;
  onChildPriceChange: (val: number) => void;
  onInfPriceChange: (val: number) => void;
}

export default function ServicePricingFields({
  adultPrice,
  childPrice,
  infPrice,
  onAdultPriceChange,
  onChildPriceChange,
  onInfPriceChange,
}: ServicePricingFieldsProps) {
  return (
    <div className="p-4 rounded-2xl border border-[#013E51]/10 bg-[#FAF7F2]/50 space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Service Pricing (EUR)
      </label>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-600 uppercase">
            Adult (€) *
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={adultPrice}
            onChange={(e) => onAdultPriceChange(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-bold focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-600 uppercase">
            Child (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={childPrice}
            onChange={(e) => onChildPriceChange(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-600 uppercase">
            Infant (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={infPrice}
            onChange={(e) => onInfPriceChange(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-medium focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
        </div>
      </div>
    </div>
  );
}
