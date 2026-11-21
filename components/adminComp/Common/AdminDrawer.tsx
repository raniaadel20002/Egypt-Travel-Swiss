"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  widthClassName?: string;
  disableClose?: boolean;
}

export default function AdminDrawer({
  isOpen,
  onClose,
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  widthClassName = "max-w-lg sm:max-w-xl",
  disableClose = false,
}: AdminDrawerProps) {
  useEffect(() => {
    if (!isOpen || disableClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, disableClose, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-[#01232e]/45 backdrop-blur-xs transition-opacity"
      />

      {/* Right-Docked Drawer Sidebar */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-y-0 right-0 z-50 w-full ${widthClassName} h-screen h-dvh bg-white border-l border-[#013E51]/10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out translate-x-0`}
      >
        {/* Pinned Header */}
        <div className="p-6 sm:p-7 border-b border-[#013E51]/10 bg-white shrink-0 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {eyebrow && (
              <span className="font-[family-name:var(--font-lato)] text-[10px] font-bold uppercase tracking-[0.22em] text-[#E8B34A] block mb-1">
                {eyebrow}
              </span>
            )}
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={disableClose}
            aria-label="Close drawer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50 shrink-0"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-7">
          {children}
        </div>

        {/* Optional Pinned Footer */}
        {footer && (
          <div className="p-5 sm:p-6 border-t border-[#013E51]/10 bg-[#FAF7F2]/60 shrink-0">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
