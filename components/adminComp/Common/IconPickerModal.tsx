"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FiCheck, FiSearch, FiX } from "react-icons/fi";
import {
  APP_ICON_CATALOG,
  DEFAULT_ICON_NAME,
  getIconOptionByName,
  ICON_CATEGORIES,
  IconCategory,
  isKnownIconName,
  normalizeIconName,
} from "@/shared/utils/iconRegistry";
import DynamicIcon from "./DynamicIcon";

export interface IconPickerModalProps {
  isOpen: boolean;
  selectedName?: string | null;
  title?: string;
  onSelect: (iconName: string) => void;
  onClose: () => void;
}

export default function IconPickerModal({
  isOpen,
  selectedName,
  title = "Select Facility Icon",
  onSelect,
  onClose,
}: IconPickerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [tempSelected, setTempSelected] = useState<string>(
    normalizeIconName(selectedName)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTempSelected(normalizeIconName(selectedName));
      setSearchQuery("");
      setActiveCategory("All");
    }
  }, [isOpen, selectedName]);

  // Handle Escape key cleanly without bubbling to parent drawers
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, onClose]);

  const filteredIcons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return APP_ICON_CATALOG.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;
      if (!matchCategory) return false;

      if (!q) return true;

      const matchName = item.name.toLowerCase().includes(q);
      const matchLabel = item.label.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));

      return matchName || matchLabel || matchKeywords;
    });
  }, [searchQuery, activeCategory]);

  if (!isOpen || !mounted) return null;

  const currentOption = getIconOptionByName(tempSelected);
  const isCustomFallback = Boolean(selectedName && !isKnownIconName(selectedName));

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-[#01232e]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-white rounded-[28px] shadow-2xl border border-[#013E51]/10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#013E51]/10 bg-white shrink-0 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] leading-tight">
              {title}
            </h3>
            <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] mt-0.5">
              Choose from 48+ curated hospitality icons or use the default icon.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close icon picker"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#013E51]/10 bg-[#FAF7F2]/40 space-y-3 shrink-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search icons (e.g. pool, beach, gym, wifi, coffee, transfer)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", ...ICON_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#013E51] text-[#E8B34A] shadow-xs"
                    : "bg-white text-[#013E51] border border-gray-200 hover:bg-[#FAF7F2]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Grid (Scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 overscroll-contain">
          {filteredIcons.length === 0 ? (
            <div className="py-16 text-center text-xs text-gray-400">
              No icons matching &quot;{searchQuery}&quot;. Try another search term.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredIcons.map((item) => {
                const isSelected = tempSelected === item.name;
                const IconComp = item.icon;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTempSelected(item.name)}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-1.5 transition cursor-pointer min-h-[112px] ${
                      isSelected
                        ? "bg-[#013E51] text-[#E8B34A] border-[#013E51] ring-2 ring-[#013E51]/30 shadow-xs"
                        : "bg-white border-gray-200 text-[#013E51] hover:border-[#013E51]/40 hover:bg-[#FAF7F2]/60"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-white/10" : "bg-[#FAF7F2]"
                      }`}
                    >
                      <IconComp
                        className={`w-5 h-5 ${
                          isSelected ? "text-[#E8B34A]" : "text-[#013E51]"
                        }`}
                      />
                    </div>
                    <span className="text-xs font-bold line-clamp-2 leading-snug px-1">
                      {item.label}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-white/10 text-white/80"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#013E51]/10 bg-[#FAF7F2]/60 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-2xs">
              <DynamicIcon name={tempSelected} className="w-5 h-5 text-[#013E51]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#013E51] block">
                {currentOption?.label || "Default Icon"}
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                Key: &quot;{tempSelected}&quot;
              </span>
              {isCustomFallback && (
                <span className="ml-2 text-[10px] text-amber-600 font-semibold">
                  (Original unknown &quot;{selectedName}&quot; will be replaced)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTempSelected(DEFAULT_ICON_NAME)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-[#FAF7F2] transition cursor-pointer"
            >
              Use Default
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSelect(tempSelected);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              <FiCheck className="w-4 h-4 text-[#E8B34A]" />
              <span>Confirm Icon</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
