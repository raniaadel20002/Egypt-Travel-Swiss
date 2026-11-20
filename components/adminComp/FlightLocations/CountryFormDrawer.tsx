"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { getCountryAllLanguages } from "@/clientApi/flightLocationsApi";
import {
  useCreateCountryMutation,
  useUpdateCountryMutation,
} from "@/features/flightLocations/useFlightLocations";
import {
  CountryApiItem,
  LocalizedLocationName,
} from "@/models/flightLocation";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import LocalizedNameFields from "./LocalizedNameFields";

interface CountryFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  item: CountryApiItem | null;
  onClose: () => void;
}

const emptyNames: LocalizedLocationName = {
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
};

export default function CountryFormDrawer({
  isOpen,
  mode,
  item,
  onClose,
}: CountryFormDrawerProps) {
  const [names, setNames] = useState<LocalizedLocationName>(emptyNames);
  const [activeLang, setActiveLang] = useState<keyof LocalizedLocationName>("en");
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);

  const createMutation = useCreateCountryMutation();
  const updateMutation = useUpdateCountryMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setNames(emptyNames);
      setActiveLang("en");
      setIsLoadingTranslations(false);
      return;
    }

    if (mode === "edit" && item) {
      setIsLoadingTranslations(true);
      getCountryAllLanguages(item.id)
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
    }
  }, [isOpen, mode, item]);

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
    const enName = names.en.trim();
    if (!enName) {
      toast.error("English country name is required.");
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
        await createMutation.mutateAsync({ name: payloadName });
        toast.success("Country created successfully.");
      } else if (item) {
        await updateMutation.mutateAsync({
          id: item.id,
          name: payloadName,
        });
        toast.success("Country updated successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save country."));
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow="Flight Transfers"
      title={mode === "create" ? "Add Flight Country" : "Edit Flight Country"}
      subtitle="Define country name across all 5 supported languages."
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
            form="country-form"
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
                <span>{mode === "create" ? "Create Country" : "Save Changes"}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <form id="country-form" onSubmit={handleSubmit} className="space-y-5">
        {isLoadingTranslations && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
            <span>Loading translations from server...</span>
          </div>
        )}

        <LocalizedNameFields
          names={names}
          activeLang={activeLang}
          labelPrefix="Country"
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
