"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { getTransferLocationById } from "@/clientApi/transferLocationsApi";
import {
  useCreateTransferLocationMutation,
  useUpdateTransferLocationMutation,
} from "@/features/transfers/useTransferLocations";
import {
  TransferLocationItem,
  TransferLocationLocalizedName,
  TransferLocationType,
} from "@/models/transferLocation";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import TransferLocationNameFields from "./TransferLocationNameFields";

interface TransferLocationFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  type: TransferLocationType;
  item: TransferLocationItem | null;
  onClose: () => void;
}

const emptyNames: TransferLocationLocalizedName = {
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
};

export default function TransferLocationFormDrawer({
  isOpen,
  mode,
  type,
  item,
  onClose,
}: TransferLocationFormDrawerProps) {
  const [names, setNames] = useState<TransferLocationLocalizedName>(emptyNames);
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);

  const createMutation = useCreateTransferLocationMutation(type);
  const updateMutation = useUpdateTransferLocationMutation(type);
  const isPending = createMutation.isPending || updateMutation.isPending;

  const typeLabel = type === "from" ? "Pick-up Point" : "Drop-off Point";

  useEffect(() => {
    if (!isOpen) {
      setNames(emptyNames);
      setIsLoadingTranslations(false);
      return;
    }

    if (mode === "edit" && item) {
      setIsLoadingTranslations(true);
      const langs: (keyof TransferLocationLocalizedName)[] = [
        "en",
        "fr",
        "ru",
        "ro",
        "it",
      ];

      Promise.all(
        langs.map((l) =>
          getTransferLocationById(type, item.id, l)
            .then((res) => ({ lang: l, name: res.data?.name || "" }))
            .catch(() => ({ lang: l, name: "" }))
        )
      )
        .then((results) => {
          const loaded: TransferLocationLocalizedName = { ...emptyNames };
          results.forEach((r) => {
            loaded[r.lang] = r.name || (r.lang === "en" ? item.name : "");
          });
          if (!loaded.en) loaded.en = item.name;
          setNames(loaded);
        })
        .finally(() => {
          setIsLoadingTranslations(false);
        });
    } else {
      setNames(emptyNames);
    }
  }, [isOpen, mode, item, type]);

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
      toast.error("English name is required.");
      return;
    }

    const payloadName: TransferLocationLocalizedName = {
      en: enName,
      fr: names.fr.trim() || enName,
      ru: names.ru.trim() || enName,
      ro: names.ro.trim() || enName,
      it: names.it.trim() || enName,
    };

    try {
      if (mode === "create") {
        await createMutation.mutateAsync({ name: payloadName });
        toast.success(`${typeLabel} created successfully.`);
      } else if (item) {
        await updateMutation.mutateAsync({
          id: item.id,
          name: payloadName,
        });
        toast.success(`${typeLabel} updated successfully.`);
      }
      onClose();
    } catch (err) {
      toast.error(
        extractErrorMessage(err, `Failed to save ${typeLabel.toLowerCase()}.`)
      );
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow={`Transfer Management (${type === "from" ? "From" : "To"})`}
      title={mode === "create" ? `Add ${typeLabel}` : `Edit ${typeLabel}`}
      subtitle="Define localized location titles across all 5 supported languages."
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
            form="transfer-location-form"
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
                <span>
                  {mode === "create" ? "Create Location" : "Save Changes"}
                </span>
              </>
            )}
          </button>
        </div>
      }
    >
      <form
        id="transfer-location-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {isLoadingTranslations && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
            <span>Loading translations from server...</span>
          </div>
        )}

        <TransferLocationNameFields
          names={names}
          onChangeName={(lang, val) =>
            setNames((prev) => ({ ...prev, [lang]: val }))
          }
          onCopyEnToAll={handleCopyEnToAll}
        />
      </form>
    </AdminDrawer>
  );
}
