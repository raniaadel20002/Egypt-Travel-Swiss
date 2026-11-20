"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  DEFAULT_ICON_NAME,
  getIconOptionByName,
  isKnownIconName,
} from "@/shared/utils/iconRegistry";
import DynamicIcon from "./DynamicIcon";
import IconPickerModal from "./IconPickerModal";

export interface IconPickerFieldProps {
  value?: string | null;
  onChange: (iconName: string) => void;
  label?: string;
  disabled?: boolean;
  compact?: boolean;
  modalTitle?: string;
}

export default function IconPickerField({
  value,
  onChange,
  label,
  disabled = false,
  compact = false,
  modalTitle = "Choose Facility Icon",
}: IconPickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const effectiveKey = value || DEFAULT_ICON_NAME;
  const currentOption = getIconOptionByName(effectiveKey);
  const isRecognized = isKnownIconName(value);

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        className={`w-full inline-flex items-center justify-between gap-2.5 rounded-xl border border-gray-200 bg-white text-left transition cursor-pointer hover:border-[#013E51]/40 hover:bg-[#FAF7F2]/40 focus:outline-none focus:ring-1 focus:ring-[#013E51] disabled:opacity-50 disabled:cursor-not-allowed ${
          compact ? "px-3 py-1.5" : "px-3.5 py-2.5"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#013E51]/10 flex items-center justify-center shrink-0">
            <DynamicIcon name={effectiveKey} className="w-3.5 h-3.5 text-[#013E51]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-bold text-[#013E51] truncate">
              {currentOption?.label || "Default Icon"}
            </span>
            {!compact && (
              <span className="block text-[10px] font-mono text-gray-400">
                Key: &quot;{effectiveKey}&quot;
                {!isRecognized && Boolean(value) && " (using fallback)"}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-gray-400">
          <span className="text-[11px] font-bold text-[#013E51] hidden sm:inline">
            Choose
          </span>
          <FiChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>

      <IconPickerModal
        isOpen={isOpen}
        selectedName={value}
        title={modalTitle}
        onSelect={(newIcon) => {
          onChange(newIcon);
          setIsOpen(false);
        }}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
