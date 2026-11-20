"use client";

import { useMemo, useState } from "react";
import { FiCompass, FiGlobe, FiMapPin, FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import {
  useCitiesQuery,
  useCountriesQuery,
  useDeleteCityMutation,
  useDeleteCountryMutation,
} from "@/features/flightLocations/useFlightLocations";
import {
  CityApiItem,
  CountryApiItem,
} from "@/models/flightLocation";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import CountriesTable from "./CountriesTable";
import CitiesTable from "./CitiesTable";
import CountryFormDrawer from "./CountryFormDrawer";
import CityFormDrawer from "./CityFormDrawer";

export default function AdminFlightLocationsPage() {
  const [activeTab, setActiveTab] = useState<"countries" | "cities">("countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<number | "all">("all");

  const [countryDrawer, setCountryDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    item: CountryApiItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [cityDrawer, setCityDrawer] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    item: CityApiItem | null;
  }>({
    isOpen: false,
    mode: "create",
    item: null,
  });

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "country" | "city";
    id: number;
    name: string;
  } | null>(null);

  const countriesQuery = useCountriesQuery({
    Language: "en",
    Search: activeTab === "countries" ? searchQuery : undefined,
  });

  const citiesQuery = useCitiesQuery({
    Language: "en",
    CountryId: selectedCountryFilter === "all" ? undefined : selectedCountryFilter,
    Search: activeTab === "cities" ? searchQuery : undefined,
  });

  const deleteCountryMutation = useDeleteCountryMutation();
  const deleteCityMutation = useDeleteCityMutation();
  const isDeleting =
    deleteCountryMutation.isPending || deleteCityMutation.isPending;

  const countries = countriesQuery.data?.data || [];
  const cities = citiesQuery.data?.data || [];

  const handleCreate = () => {
    if (activeTab === "countries") {
      setCountryDrawer({ isOpen: true, mode: "create", item: null });
    } else {
      setCityDrawer({ isOpen: true, mode: "create", item: null });
    }
  };

  const handleEditCountry = (item: CountryApiItem) => {
    setCountryDrawer({ isOpen: true, mode: "edit", item });
  };

  const handleEditCity = (item: CityApiItem) => {
    setCityDrawer({ isOpen: true, mode: "edit", item });
  };

  const handleViewCitiesForCountry = (countryId: number) => {
    setSelectedCountryFilter(countryId);
    setActiveTab("cities");
    setSearchQuery("");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "country") {
        await deleteCountryMutation.mutateAsync(deleteTarget.id);
        toast.success(`Country "${deleteTarget.name}" deleted successfully.`);
      } else {
        await deleteCityMutation.mutateAsync(deleteTarget.id);
        toast.success(`City "${deleteTarget.name}" deleted successfully.`);
      }
      setDeleteTarget(null);
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          `Failed to delete ${deleteTarget.type}. It may have dependent data.`
        )
      );
    }
  };

  return (
    <AdminShell
      eyebrow="Flight Transfers"
      title="Flight Countries & Cities"
      subtitle="Configure origin and destination points for upcoming chartered flight transfers across 5 languages."
      action={
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>Add {activeTab === "countries" ? "Country" : "City"}</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Controls Card */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col gap-4">
          {/* Main Tab Toggle: Countries vs Cities */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#013E51]/10 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("countries");
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "countries"
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
                }`}
              >
                <FiGlobe className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Countries ({countries.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("cities");
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "cities"
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
                }`}
              >
                <FiMapPin className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Cities ({cities.length})</span>
              </button>
            </div>

            <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#013E51]/10 self-start sm:self-auto">
              Total {activeTab === "countries" ? "Countries" : "Cities"}:{" "}
              <strong className="font-bold">
                {activeTab === "countries" ? countries.length : cities.length}
              </strong>
            </div>
          </div>

          {/* Search Bar & Country Filter on Cities Tab */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {activeTab === "cities" && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <FiCompass className="w-4 h-4 text-[#013E51]/60 shrink-0" />
                <select
                  value={selectedCountryFilter}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedCountryFilter(val === "all" ? "all" : Number(val));
                  }}
                  className="w-full sm:w-60 px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer"
                >
                  <option value="all">All Countries</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (#{c.id})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Tables */}
        {activeTab === "countries" ? (
          <CountriesTable
            items={countries}
            isLoading={countriesQuery.isLoading}
            onEdit={handleEditCountry}
            onDelete={(c) =>
              setDeleteTarget({ type: "country", id: c.id, name: c.name })
            }
            onViewCities={handleViewCitiesForCountry}
          />
        ) : (
          <CitiesTable
            items={cities}
            isLoading={citiesQuery.isLoading}
            onEdit={handleEditCity}
            onDelete={(c) =>
              setDeleteTarget({ type: "city", id: c.id, name: c.name })
            }
          />
        )}

        {/* Drawers */}
        <CountryFormDrawer
          isOpen={countryDrawer.isOpen}
          mode={countryDrawer.mode}
          item={countryDrawer.item}
          onClose={() =>
            setCountryDrawer({ isOpen: false, mode: "create", item: null })
          }
        />

        <CityFormDrawer
          isOpen={cityDrawer.isOpen}
          mode={cityDrawer.mode}
          item={cityDrawer.item}
          defaultCountryId={
            selectedCountryFilter !== "all" ? selectedCountryFilter : undefined
          }
          onClose={() =>
            setCityDrawer({ isOpen: false, mode: "create", item: null })
          }
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteDialog
          isOpen={Boolean(deleteTarget)}
          title={`Delete ${deleteTarget?.type === "country" ? "Country" : "City"}`}
          description={
            deleteTarget
              ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
              : undefined
          }
          isPending={isDeleting}
          onConfirm={handleDeleteConfirm}
          onClose={() => {
            if (!isDeleting) setDeleteTarget(null);
          }}
        />
      </div>
    </AdminShell>
  );
}
