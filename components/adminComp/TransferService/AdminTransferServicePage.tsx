"use client";

import { useState } from "react";
import {
  FiDollarSign,
  FiGlobe,
  FiMapPin,
  FiNavigation,
  FiPlus,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { TransferServiceTab } from "@/models/transferService";
import { useTransferLocationsQuery } from "@/features/transfers/useTransferLocations";
import { useVehicleTypeTransfersQuery } from "@/features/transfers/useTransferVehicles";
import { useTransferVehiclePricesQuery } from "@/features/transfers/useTransferPrices";
import { useCountryTransfersQuery } from "@/features/transfers/useCountryTransfers";
import TransferLocationsSection from "./TransferLocationsSection";
import TransferVehiclesSection from "./TransferVehiclesSection";
import TransferPricesSection from "./TransferPricesSection";
import CountryTransfersSection from "./CountryTransfersSection";

export default function AdminTransferServicePage() {
  const [activeTab, setActiveTab] = useState<TransferServiceTab>("countries");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const countriesQuery = useCountryTransfersQuery({ language: "en" });
  const fromQuery = useTransferLocationsQuery("from", { language: "en" });
  const toQuery = useTransferLocationsQuery("to", { language: "en" });
  const vehiclesQuery = useVehicleTypeTransfersQuery({ language: "en" });
  const pricesQuery = useTransferVehiclePricesQuery({ language: "en" });

  const countriesCount = countriesQuery.data?.length || 0;
  const fromCount = fromQuery.data?.data?.length || 0;
  const toCount = toQuery.data?.data?.length || 0;
  const vehiclesCount = vehiclesQuery.data?.data?.length || 0;
  const pricesCount = pricesQuery.data?.data?.length || 0;

  const getAddButtonConfig = () => {
    switch (activeTab) {
      case "countries":
        return { label: "Add Country", onClick: () => setIsFormOpen(true) };
      case "from":
        return { label: "Add Pick-up Point", onClick: () => setIsFormOpen(true) };
      case "to":
        return { label: "Add Drop-off Point", onClick: () => setIsFormOpen(true) };
      case "vehicles":
        return { label: "Add Vehicle", onClick: () => setIsFormOpen(true) };
      case "prices":
        return { label: "Add Route Price", onClick: () => setIsFormOpen(true) };
    }
  };

  const actionConfig = getAddButtonConfig();

  return (
    <AdminShell
      eyebrow="Transfers & Transport"
      title="Transfer Service"
      subtitle="Manage countries, pick-up & drop-off locations, vehicle fleet types, and route pricing across Egypt in EUR (&euro;)."
      action={
        <button
          type="button"
          onClick={actionConfig.onClick}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>{actionConfig.label}</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-[20px] p-2.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab("countries");
                setIsFormOpen(false);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "countries"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
              }`}
            >
              <FiGlobe
                className={`w-4 h-4 ${
                  activeTab === "countries" ? "text-[#E8B34A]" : "text-[#013E51]/60"
                }`}
              />
              <span className="truncate">Countries ({countriesCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("from");
                setIsFormOpen(false);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "from"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
              }`}
            >
              <FiNavigation
                className={`w-4 h-4 ${
                  activeTab === "from" ? "text-[#E8B34A]" : "text-[#013E51]/60"
                }`}
              />
              <span className="truncate">Pick-up ({fromCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("to");
                setIsFormOpen(false);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "to"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
              }`}
            >
              <FiMapPin
                className={`w-4 h-4 ${
                  activeTab === "to" ? "text-[#E8B34A]" : "text-[#013E51]/60"
                }`}
              />
              <span className="truncate">Drop-off ({toCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("vehicles");
                setIsFormOpen(false);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "vehicles"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
              }`}
            >
              <FaCar
                className={`w-4 h-4 ${
                  activeTab === "vehicles"
                    ? "text-[#E8B34A]"
                    : "text-[#013E51]/60"
                }`}
              />
              <span className="truncate">Vehicles ({vehiclesCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("prices");
                setIsFormOpen(false);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "prices"
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
              }`}
            >
              <FiDollarSign
                className={`w-4 h-4 ${
                  activeTab === "prices"
                    ? "text-[#E8B34A]"
                    : "text-[#013E51]/60"
                }`}
              />
              <span className="truncate">Route Prices ({pricesCount})</span>
            </button>
          </div>
        </div>

        {/* Tab Content Sections */}
        {activeTab === "countries" && (
          <CountryTransfersSection
            isFormOpen={isFormOpen}
            onOpenCreate={() => setIsFormOpen(true)}
            onCloseForm={() => setIsFormOpen(false)}
          />
        )}

        {activeTab === "from" && (
          <TransferLocationsSection
            key="from"
            type="from"
            isFormOpen={isFormOpen}
            onOpenCreate={() => setIsFormOpen(true)}
            onCloseForm={() => setIsFormOpen(false)}
          />
        )}

        {activeTab === "to" && (
          <TransferLocationsSection
            key="to"
            type="to"
            isFormOpen={isFormOpen}
            onOpenCreate={() => setIsFormOpen(true)}
            onCloseForm={() => setIsFormOpen(false)}
          />
        )}

        {activeTab === "vehicles" && (
          <TransferVehiclesSection
            key="vehicles"
            isFormOpen={isFormOpen}
            onOpenCreate={() => setIsFormOpen(true)}
            onCloseForm={() => setIsFormOpen(false)}
          />
        )}

        {activeTab === "prices" && (
          <TransferPricesSection
            key="prices"
            isFormOpen={isFormOpen}
            onOpenCreate={() => setIsFormOpen(true)}
            onCloseForm={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </AdminShell>
  );
}
