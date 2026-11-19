"use client";

import { useState } from "react";
import { FiCalendar, FiSearch, FiCheckCircle } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";

export default function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Bookings" },
    { id: "pending", label: "Pending" },
    { id: "confirmed", label: "Confirmed" },
    { id: "finished", label: "Finished" },
  ];

  return (
    <AdminShell
      eyebrow="Reservations"
      title="Tour Bookings & Excursions"
      subtitle="Review, confirm, or modify traveler bookings across Egyptian tours and marine safaris."
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name or tour..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === tab.id
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
            <FiCalendar className="w-8 h-8 text-[#013E51]" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            No Tour Bookings Recorded
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-2 mb-4 leading-relaxed">
            There are currently no tour reservations matching this filter. Excursion bookings submitted through trip checkout flows will appear here.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#888888] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#013E51]/10">
            <FiCheckCircle className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>Connected to Touristy Bookings API</span>
          </span>
        </div>
      </div>
    </AdminShell>
  );
}
