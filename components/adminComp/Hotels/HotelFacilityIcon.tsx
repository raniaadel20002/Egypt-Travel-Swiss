"use client";

import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface HotelFacilityIconProps {
  iconKey?: string | null;
  className?: string;
  title?: string;
}

export default function HotelFacilityIcon({
  iconKey,
  className = "w-3.5 h-3.5",
  title,
}: HotelFacilityIconProps) {
  return <DynamicIcon name={iconKey} className={className} title={title} />;
}
