"use client";

import Image from "next/image";
import { FiUsers, FiCheck } from "react-icons/fi";
import { TransferVehicleItem } from "@/models/transfer";

interface TransferCardProps {
  vehicle: TransferVehicleItem;
  onSelect?: (vehicle: TransferVehicleItem) => void;
}

export default function TransferCard({
  vehicle,
  onSelect,
}: TransferCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(vehicle);
    } else {
      const el = document.getElementById("inquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white rounded-[28px] sm:rounded-[34px] p-5 sm:p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer border border-[#888888]/15"
    >
      <div>
        {/* Vehicle Icon / Illustration Container */}
        <div className="relative w-full h-48 sm:h-52 rounded-[22px] sm:rounded-[26px] overflow-hidden mb-5 bg-[#F7EDE1]/40 border border-[#888888]/15 flex items-center justify-center p-6 group-hover:bg-[#F7EDE1]/70 transition-colors duration-300">
          <Image
            src={vehicle.icon}
            alt={vehicle.name}
            width={120}
            height={80}
            className="w-24 sm:w-28 h-auto object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Capacity Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#013E51]/5 text-[#013E51] text-xs font-semibold mb-3">
          <FiUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>{vehicle.capacity}</span>
        </div>

        {/* Vehicle Title */}
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors leading-snug mb-2">
          {vehicle.name}
        </h3>

        {/* Short Description */}
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] leading-relaxed mb-4">
          {vehicle.description}
        </p>

        {/* Key Features */}
        <ul className="space-y-1.5 mb-6 text-xs text-[#013E51]/80 font-medium">
          {vehicle.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <FiCheck className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Inquire Transfer Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className="w-full bg-[#F7EDE1] hover:bg-[#ebd9c7] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 sm:py-4 rounded-2xl transition-colors text-center cursor-pointer shadow-xs"
      >
        Inquire Now
      </button>
    </article>
  );
}
