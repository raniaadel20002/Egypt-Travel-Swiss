"use client";

import { resolveIconComponent } from "@/shared/utils/iconRegistry";

export interface DynamicIconProps {
  name?: string | null;
  className?: string;
  title?: string;
}

export default function DynamicIcon({
  name,
  className = "w-4 h-4",
  title,
}: DynamicIconProps) {
  const IconComp = resolveIconComponent(name);

  return <IconComp className={className} title={title || name || "icon"} />;
}
