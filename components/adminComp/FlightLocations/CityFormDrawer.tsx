"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiGlobe, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { getCityAllLanguages } from "@/clientApi/flightLocationsApi";
import {
  useCitiesQuery,
  useCountriesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
} from "@/features/flightLocations/useFlightLocations";
import {
  CityApiItem,
  LocalizedLocationName,
} from "@/models/flightLocation";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import LocalizedNameFields from "./LocalizedNameFields";

interface CityFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  item: CityApiItem | null;
  defaultCountryId?: number;
  onClose: () => void;
}

const emptyNames: LocalizedLocationName = {
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
};

export default function CityFormDrawer({
  isOpen,
  mode,
  item,
  defaultCountryId,
  onClose,
}: CityFormDrawerProps) {
  const [countryId, setCountryId] = useState<number | "">("");
  const [names, setNames] = useState<LocalizedLocationName>(emptyNames);
  const [activeLang, setActiveLang] = useState<keyof LocalizedLocationName>("en");
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);

  const countriesQuery = useCountriesQuery();
  const countries = countriesQuery.data?.data || [];

  const createMutation = useCreateCityMutation();
  const updateMutation = useUpdateCityMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setNames(emptyNames);
      setCountryId("");
      setActiveLang("en");
      setIsLoadingTranslations(false);
      return;
    }

    if (mode === "edit" && item) {
      setCountryId(item.countryId);
      setIsLoadingTranslations(true);
      getCityAllLanguages(item.id)
        .then((loaded) => {
          if (!loaded.en) loaded.en = item.name;
          setNames(loaded);
        })
        .catch(() => {
          setNames({ ...emptyNames, en: item.name });
        })
        .finally(() => {
          setIsLoadingTranslations(false);
        });
    } else {
      setNames(emptyNames);
      if (defaultCountryId) {
        setCountryId(defaultCountryId);
      } else if (countries.length > 0) {
        setCountryId(countries[0].id);
      }
    }
  }, [isOpen, mode, item, defaultCountryId, countries]);

  const handleCopyEnToAll = () => {
    const enVal = names.en.trim();
    if (!enVal) {
      toast.error("Please enter the English name first.");
      return;
    }
    setNames({
      en: enVal,
      fr: names.fr.trim() || enVal,
      ru: names.ru.trim() || enVal,
      ro: names.ro.trim() || enVal,
      it: names.it.trim() || enVal,
    });
    toast.success("Applied English name to untranslated fields.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryId) {
      toast.error("Please select a country.");
      return;
    }

    const enName = names.en.trim();
    if (!enName) {
      toast.error("English city name is required.");
      setActiveLang("en");
      return;
    }

    const payloadName: LocalizedLocationName = {
      en: enName,
      fr: names.fr.trim() || enName,
      ru: names.ru.trim() || enName,
      ro: names.ro.trim() || enName,
      it: names.it.trim() || enName,
    };

    try {
      if (mode === "create") {
        await createMutation.mutateAsync({
          countryId: Number(countryId),
          name: payloadName,
        });
        toast.success("City created successfully.");
      } else if (item) {
        await updateMutation.mutateAsync({
          id: item.id,
          countryId: Number(countryId),
          name: payloadName,
        });
        toast.success("City updated successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save city."));
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow="Flight Transfers"
      title={mode === "create" ? "Add Flight City" : "Edit Flight City"}
      subtitle="Link a destination city to a country across 5 languages."
      disableClose={isPending}
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="city-form"
            disabled={isPending || isLoadingTranslations}
            className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <>
                <FiLoader className="w-3.5 h-3.5 animate-spin text-[#E8B34A]" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiCheck className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>{mode === "create" ? "Create City" : "Save Changes"}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <form id="city-form" onSubmit={handleSubmit} className="space-y-5">
        {isLoadingTranslations && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
            <span>Loading translations from server...</span>
          </div>
        )}

        {/* Country Selector */}
        <div>
          <label className="block text-xs font-bold text-[#013E51] mb-1.5">
            Parent Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={countryId}
              onChange={(e) => setCountryId(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer"
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (#{c.id})
                </option>
              ))}
            </select>
          </div>
          {countries.length === 0 && (
            <p className="text-[11px] text-amber-700 mt-1">
              No countries available yet. Please create a country first.
            </p>
          )}
        </div>

        <LocalizedNameFields
          names={names}
          activeLang={activeLang}
          labelPrefix="City"
          onChangeActiveLang={setActiveLang}
          onChangeName={(lang, val) =>
            setNames((prev) => ({ ...prev, [lang]: val }))
          }
          onCopyEnToAll={handleCopyEnToAll}
        />
      </form>
    </AdminDrawer>
  );
}
