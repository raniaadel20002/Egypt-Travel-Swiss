"use client";

interface TripsPriceFilterFieldsProps {
  minPrice?: number;
  maxPrice?: number;
  onMinPriceChange: (val: number | undefined) => void;
  onMaxPriceChange: (val: number | undefined) => void;
}

export default function TripsPriceFilterFields({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: TripsPriceFilterFieldsProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onMinPriceChange(undefined);
    } else {
      const parsed = parseFloat(raw);
      onMinPriceChange(isNaN(parsed) || parsed < 0 ? undefined : parsed);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onMaxPriceChange(undefined);
    } else {
      const parsed = parseFloat(raw);
      onMaxPriceChange(isNaN(parsed) || parsed < 0 ? undefined : parsed);
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Min Price */}
      <div className="relative flex-1 min-w-0">
        <span className="absolute inset-y-0 left-2.5 sm:left-3 flex items-center text-xs font-semibold text-[#013E51]/60 pointer-events-none">
          &euro;
        </span>
        <input
          type="number"
          min="0"
          step="5"
          placeholder="Min"
          value={minPrice !== undefined ? minPrice : ""}
          onChange={handleMinChange}
          aria-label="Minimum price in EUR"
          className="w-full pl-6 sm:pl-7 pr-2 py-2.5 text-xs sm:text-[13px] xl:text-sm rounded-xl border border-gray-200 bg-[#F8F9FA] text-[#013E51] placeholder:text-[#013E51]/40 focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51] outline-hidden transition-colors"
        />
      </div>

      <span className="text-gray-400 text-xs font-medium shrink-0">-</span>

      {/* Max Price */}
      <div className="relative flex-1 min-w-0">
        <span className="absolute inset-y-0 left-2.5 sm:left-3 flex items-center text-xs font-semibold text-[#013E51]/60 pointer-events-none">
          &euro;
        </span>
        <input
          type="number"
          min="0"
          step="5"
          placeholder="Max"
          value={maxPrice !== undefined ? maxPrice : ""}
          onChange={handleMaxChange}
          aria-label="Maximum price in EUR"
          className="w-full pl-6 sm:pl-7 pr-2 py-2.5 text-xs sm:text-[13px] xl:text-sm rounded-xl border border-gray-200 bg-[#F8F9FA] text-[#013E51] placeholder:text-[#013E51]/40 focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51] outline-hidden transition-colors"
        />
      </div>
    </div>
  );
}
