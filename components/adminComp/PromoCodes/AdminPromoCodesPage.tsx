"use client";

import { useState } from "react";
import { FiTag, FiPlus, FiSearch, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";

export default function AdminPromoCodesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  const tabs = [
    { id: "all", label: "All Codes" },
    { id: "active", label: "Active" },
    { id: "general", label: "General Vouchers" },
    { id: "trip-specific", label: "Trip-Specific" },
  ];

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setCode("");
    setDiscountPercent("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Promo Codes API integration is pending.");
    handleCloseDrawer();
  };

  return (
    <AdminShell
      eyebrow="Marketing & Discounts"
      title="Promo Codes & Vouchers"
      subtitle="Configure seasonal coupons, percentage discounts, and trip-specific campaign codes."
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
        {/* Search & Tabs */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code (e.g. SUMMER26)..."
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

        {/* Empty State Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] p-10 sm:p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mb-4">
            <FiTag className="w-8 h-8 text-[#013E51]" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            No Promo Codes Available
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-2 mb-6">
            There are no discount vouchers active for this filter. Launch a new promotion to boost bookings across your excursions.
          </p>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#013E51] text-[#013E51] hover:text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer border border-[#013E51]/10"
          >
            <FiPlus className="w-4 h-4" />
            <span>Create Promo Code</span>
          </button>
        </div>

        <AdminDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          eyebrow="Marketing & Discounts"
          title="New Promo Code"
          subtitle="Configure a voucher code and percentage discount."
          footer={
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="promo-drawer-form"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                <span>Create Code</span>
              </button>
            </div>
          }
        >
          <form id="promo-drawer-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Voucher Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. SUMMER26"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-semibold uppercase placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Discount Percentage (%) *
              </label>
              <input
                type="number"
                required
                min="1"
                max="100"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="e.g. 15"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>
          </form>
        </AdminDrawer>
      </div>
    </AdminShell>
  );
}
