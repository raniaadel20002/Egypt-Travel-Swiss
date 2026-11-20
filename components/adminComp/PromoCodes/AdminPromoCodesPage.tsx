"use client";

import { useMemo, useState } from "react";
import { FiCompass, FiPlus, FiSearch, FiTag, FiUsers } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import {
  PromoCodeFilterType,
  usePromoCodesQuery,
} from "@/features/promoCodes/usePromoCodes";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import PromoCodeFormDrawer from "./PromoCodeFormDrawer";
import PromoCodesTable from "./PromoCodesTable";
import PromoCodeSuccessModal from "./PromoCodeSuccessModal";

export default function AdminPromoCodesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<PromoCodeFilterType>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [createdCode, setCreatedCode] = useState<number | null>(null);

  const promoCodesQuery = usePromoCodesQuery(activeTab);

  const tabs: { id: PromoCodeFilterType; label: string }[] = [
    { id: "all", label: "All Codes" },
    { id: "general", label: "General Vouchers" },
    { id: "trip-specific", label: "Trip-Specific" },
  ];

  const items = promoCodesQuery.data || [];

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const matchCode = String(item.code).includes(q);
      const matchTrip = item.tripName?.toLowerCase().includes(q);
      const matchCreator = item.createdBy?.toLowerCase().includes(q);
      return matchCode || matchTrip || matchCreator;
    });
  }, [items, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = items.length;
    const generalCount = items.filter((i) => !i.tripId || i.tripId === 0).length;
    const tripSpecificCount = items.filter((i) => Number(i.tripId || 0) > 0).length;
    return { total, generalCount, tripSpecificCount };
  }, [items]);

  return (
    <AdminShell
      eyebrow="Marketing & Discounts"
      title="Promo Codes & Vouchers"
      subtitle="Generate seasonal coupons, percentage discounts, and trip-specific campaign codes."
      action={
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Promo Code</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
              <FiTag className="w-5 h-5 text-[#E8B34A]" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Filtered Total
              </span>
              <span className="text-xl font-extrabold text-[#013E51]">
                {stats.total}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
              <FiUsers className="w-5 h-5 text-[#013E51]" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                General Vouchers
              </span>
              <span className="text-xl font-extrabold text-[#013E51]">
                {stats.generalCount}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
              <FiCompass className="w-5 h-5 text-[#013E51]" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Trip-Specific Codes
              </span>
              <span className="text-xl font-extrabold text-[#013E51]">
                {stats.tripSpecificCount}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, trip title, or creator..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#013E51] text-white"
                    : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Banner */}
        {promoCodesQuery.isError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
            {extractErrorMessage(
              promoCodesQuery.error,
              "Failed to load promo codes from server."
            )}
          </div>
        )}

        {/* Table */}
        <PromoCodesTable
          items={filteredItems}
          isLoading={promoCodesQuery.isLoading}
        />

        {/* Create Drawer */}
        <PromoCodeFormDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onCreated={(code) => setCreatedCode(code)}
        />

        {/* Success Modal */}
        <PromoCodeSuccessModal
          isOpen={Boolean(createdCode)}
          code={createdCode}
          onClose={() => setCreatedCode(null)}
        />
      </div>
    </AdminShell>
  );
}
