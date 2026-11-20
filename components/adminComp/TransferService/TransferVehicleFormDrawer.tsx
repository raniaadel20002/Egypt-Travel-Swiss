"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import {
  TransferLocationLocalizedName,
} from "@/models/transferLocation";
import {
  VehicleTypeTransferApiItem,
} from "@/models/transferService";
import {
  useCreateVehicleTypeTransferMutation,
  useUpdateVehicleTypeTransferMutation,
  useVehicleTypeTransferMultiLangQuery,
} from "@/features/transfers/useTransferVehicles";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import TransferVehicleNameFields from "./TransferVehicleNameFields";

interface TransferVehicleFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  item: VehicleTypeTransferApiItem | null;
  onClose: () => void;
}

const emptyNames: TransferLocationLocalizedName = {
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
};

export default function TransferVehicleFormDrawer({
  isOpen,
  mode,
  item,
  onClose,
}: TransferVehicleFormDrawerProps) {
  const [names, setNames] = useState<TransferLocationLocalizedName>(emptyNames);
  const [fromPerson, setFromPerson] = useState<number>(1);
  const [toPerson, setToPerson] = useState<number>(4);
  const [additionalHoursUsd, setAdditionalHoursUsd] = useState<number>(15);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const isEdit = mode === "edit" && Boolean(item);

  const { data: multiLangData, isLoading: isLoadingMultiLang } =
    useVehicleTypeTransferMultiLangQuery(item?.id || null, isOpen && isEdit);

  const createMutation = useCreateVehicleTypeTransferMutation();
  const updateMutation = useUpdateVehicleTypeTransferMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setNames(emptyNames);
      setFromPerson(1);
      setToPerson(4);
      setAdditionalHoursUsd(15);
      setDiscountPercentage(0);
      return;
    }

    if (isEdit && multiLangData) {
      setNames(multiLangData.name || emptyNames);
      setFromPerson(multiLangData.fromPerson ?? 1);
      setToPerson(multiLangData.toPerson ?? 4);
      setAdditionalHoursUsd(multiLangData.additionalHoursUsd ?? 0);
      setDiscountPercentage(multiLangData.discountPercentage ?? 0);
    } else if (!isEdit) {
      setNames(emptyNames);
      setFromPerson(1);
      setToPerson(4);
      setAdditionalHoursUsd(15);
      setDiscountPercentage(0);
    }
  }, [isOpen, isEdit, multiLangData]);

  const handleCopyEnToAll = () => {
    const enVal = names.en.trim();
    if (!enVal) {
      toast.error("Please enter the English vehicle name first.");
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
      toast.error("English vehicle name is required.");
      return;
    }

    if (fromPerson < 1 || toPerson < fromPerson) {
      toast.error(
        "Maximum passengers must be greater than or equal to minimum passengers."
      );
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
        await createMutation.mutateAsync({
          name: payloadName,
          fromPerson,
          toPerson,
          additionalHoursUsd,
          discountPercentage,
        });
        toast.success("Vehicle type created successfully.");
      } else if (item) {
        await updateMutation.mutateAsync({
          id: item.id,
          name: payloadName,
          fromPerson,
          toPerson,
          additionalHoursUsd,
          discountPercentage,
        });
        toast.success("Vehicle type updated successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(
        extractErrorMessage(err, "Failed to save vehicle type transfer.")
      );
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow="Transfer Service & Fleet"
      title={mode === "create" ? "Add Vehicle Type" : "Edit Vehicle Type"}
      subtitle="Configure passenger limits, extra hour rates in EUR, and multi-language titles."
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
            form="transfer-vehicle-form"
            disabled={isPending || isLoadingMultiLang}
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
                  {mode === "create" ? "Create Vehicle" : "Save Changes"}
                </span>
              </>
            )}
          </button>
        </div>
      }
    >
      <form
        id="transfer-vehicle-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {isLoadingMultiLang && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
            <span>Loading vehicle translations from server...</span>
          </div>
        )}

        {/* Capacity & Rates Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-gray-200 bg-[#FAF7F2]/50">
          <div>
            <label className="text-xs font-bold text-[#013E51] block mb-1">
              Min Passengers <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              required
              value={fromPerson}
              onChange={(e) => setFromPerson(parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#013E51] block mb-1">
              Max Passengers <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={fromPerson}
              required
              value={toPerson}
              onChange={(e) => setToPerson(parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#013E51] block mb-1">
              Extra Hour Rate (EUR / &euro;) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={additionalHoursUsd}
              onChange={(e) =>
                setAdditionalHoursUsd(parseFloat(e.target.value) || 0)
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#013E51] block mb-1">
              Round-Trip Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={discountPercentage}
              onChange={(e) =>
                setDiscountPercentage(parseFloat(e.target.value) || 0)
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
            />
            <span className="block text-[10px] text-gray-500 mt-1">
              Applied automatically to round trips.
            </span>
          </div>
        </div>

        {/* Multi-language Vehicle Name Component */}
        <TransferVehicleNameFields
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
