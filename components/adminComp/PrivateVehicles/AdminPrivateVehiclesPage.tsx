"use client";

import { useState } from "react";
import { FiCompass, FiDollarSign, FiPlus } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { usePrivateVehiclesQuery } from "@/features/privateVehicles/usePrivateVehicles";
import { usePrivateVehicleTransfersQuery } from "@/features/privateVehicles/usePrivateVehicleTransfers";
import PrivateVehiclesSection from "./PrivateVehiclesSection";
import PrivateTransfersSection from "./PrivateTransfersSection";

export type PrivateTripPricingTab = "vehicles" | "transfers";

export default function AdminPrivateVehiclesPage() {
  const [activeTab, setActiveTab] = useState<PrivateTripPricingTab>("transfers");

  const vehiclesQuery = usePrivateVehiclesQuery({ language: "EN" });
  const transfersQuery = usePrivateVehicleTransfersQuery({ language: "EN" });

  const vehiclesCount = vehiclesQuery.data?.length || 0;
  const transfersCount = transfersQuery.data?.length || 0;

  return (
    <AdminShell
      eyebrow="Tours & Content"
      title="Private Trip Pricing"
      subtitle="Configure private vehicle classes and excursion transfer rates across passenger tiers in EUR (&euro;)."
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-[20px] p-2.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("transfers")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === "transfers"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
              }`}
            >
              <FiDollarSign
                className={`w-4 h-4 ${
                  activeTab === "transfers"
                    ? "text-[#E8B34A]"
                    : "text-[#013E51]/60"
                }`}
              />
              <span>Trip Transfer Pricing ({transfersCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("vehicles")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === "vehicles"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
              }`}
            >
              <FaCar
                className={`w-4 h-4 ${
                  activeTab === "vehicles" ? "text-[#E8B34A]" : "text-[#013E51]/60"
                }`}
              />
              <span>Vehicle Classes ({vehiclesCount})</span>
            </button>
          </div>
        </div>

        {/* Tab Sections */}
        {activeTab === "transfers" && <PrivateTransfersSection />}
        {activeTab === "vehicles" && <PrivateVehiclesSection />}
      </div>
    </AdminShell>
  );
}
