"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import {
  CreateServicePayload,
  ServiceApiItem,
  ServiceTranslationInput,
} from "@/models/service";
import {
  useCreateServiceMutation,
  useServiceMultiLangQuery,
  useUpdateServiceMutation,
  useUploadServiceImagesMutation,
} from "@/features/services/useServices";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import ServicePricingFields from "./ServicePricingFields";
import ServiceTranslationsSection from "./ServiceTranslationsSection";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface ServiceFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  item: ServiceApiItem | null;
  onClose: () => void;
}

const emptyTranslations: ServiceTranslationInput = {
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
};

export default function ServiceFormDrawer({
  isOpen,
  mode,
  item,
  onClose,
}: ServiceFormDrawerProps) {
  const isEdit = mode === "edit";

  const [name, setName] = useState<ServiceTranslationInput>(emptyTranslations);
  const [description, setDescription] =
    useState<ServiceTranslationInput>(emptyTranslations);
  const [adultPrice, setAdultPrice] = useState<number>(0);
  const [childPrice, setChildPrice] = useState<number>(0);
  const [infPrice, setInfPrice] = useState<number>(0);
  const [initialFiles, setInitialFiles] = useState<File[]>([]);

  const multiLangQuery = useServiceMultiLangQuery(
    isEdit && item ? item.id : null,
    isOpen && isEdit
  );

  const createMutation = useCreateServiceMutation();
  const updateMutation = useUpdateServiceMutation();
  const uploadImagesMutation = useUploadServiceImagesMutation();

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    uploadImagesMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setName(emptyTranslations);
      setDescription(emptyTranslations);
      setAdultPrice(0);
      setChildPrice(0);
      setInfPrice(0);
      setInitialFiles([]);
      return;
    }

    if (isEdit && multiLangQuery.data) {
      setName(multiLangQuery.data.name);
      setDescription(multiLangQuery.data.description);
      setAdultPrice(multiLangQuery.data.adultPrice);
      setChildPrice(multiLangQuery.data.childPrice);
      setInfPrice(multiLangQuery.data.infPrice);
      setInitialFiles([]);
    } else if (isEdit && item) {
      setName({
        en: item.name || "",
        fr: "",
        ru: "",
        ro: "",
        it: "",
      });
      setDescription({
        en: item.description || "",
        fr: "",
        ru: "",
        ro: "",
        it: "",
      });
      setAdultPrice(item.adultPrice || 0);
      setChildPrice(item.childPrice || 0);
      setInfPrice(item.infPrice || 0);
      setInitialFiles([]);
    } else if (!isEdit) {
      setName(emptyTranslations);
      setDescription(emptyTranslations);
      setAdultPrice(0);
      setChildPrice(0);
      setInfPrice(0);
      setInitialFiles([]);
    }
  }, [isOpen, isEdit, item, multiLangQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.en.trim()) {
      toast.error("English service title is required.");
      return;
    }

    const payload: CreateServicePayload = {
      name: {
        en: name.en.trim(),
        fr: (name.fr || name.en).trim(),
        ru: (name.ru || name.en).trim(),
        ro: (name.ro || name.en).trim(),
        it: (name.it || name.en).trim(),
      },
      description: {
        en: description.en.trim(),
        fr: (description.fr || description.en).trim(),
        ru: (description.ru || description.en).trim(),
        ro: (description.ro || description.en).trim(),
        it: (description.it || description.en).trim(),
      },
      adultPrice: Number(adultPrice) || 0,
      childPrice: Number(childPrice) || 0,
      infPrice: Number(infPrice) || 0,
    };

    try {
      if (isEdit && item) {
        await updateMutation.mutateAsync({
          ...payload,
          id: item.id,
        });
        toast.success("Service updated successfully.");
      } else {
        const created = await createMutation.mutateAsync(payload);
        if (created?.id && initialFiles.length > 0) {
          try {
            await uploadImagesMutation.mutateAsync({
              serviceId: created.id,
              images: initialFiles,
            });
          } catch {
            toast.warning("Service created, but some photos failed to upload.");
          }
        }
        toast.success("Service created successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save service."));
    }
  };

  const isLoadingDetails = isEdit && multiLangQuery.isLoading;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      eyebrow={isEdit ? `ID #${item?.id}` : "Private Services"}
      title={isEdit ? "Edit Private Service" : "New Private Service"}
      subtitle={
        isEdit
          ? "Update service pricing, translations, and details."
          : "Create an add-on service for private excursion bookings."
      }
      widthClassName="max-w-2xl sm:max-w-3xl"
      footer={
        isLoadingDetails ? undefined : (
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="service-form-drawer"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                  <span>{isEdit ? "Save Changes" : "Create Service"}</span>
                </>
              )}
            </button>
          </div>
        )
      }
    >
      {isLoadingDetails ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-sm text-[#013E51]">
          <FiLoader className="w-6 h-6 animate-spin text-[#E8B34A]" />
          <span>Loading service details across 5 languages...</span>
        </div>
      ) : (
        <form
          id="service-form-drawer"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Pricing Grid */}
          <ServicePricingFields
            adultPrice={adultPrice}
            childPrice={childPrice}
            infPrice={infPrice}
            onAdultPriceChange={setAdultPrice}
            onChildPriceChange={setChildPrice}
            onInfPriceChange={setInfPrice}
          />

          {/* 5-Language Translations */}
          <ServiceTranslationsSection
            name={name}
            onNameChange={(k, v) => setName((prev) => ({ ...prev, [k]: v }))}
            description={description}
            onDescriptionChange={(k, v) =>
              setDescription((prev) => ({ ...prev, [k]: v }))
            }
          />

          {/* Initial Photos Picker (Create mode only) */}
          {!isEdit && (
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Initial Service Photos (Optional)
              </label>
              <div className="p-4 rounded-xl border border-dashed border-[#013E51]/20 bg-[#FAF7F2]/60 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {initialFiles.length > 0
                    ? `${initialFiles.length} photos ready to upload`
                    : "Add gallery photos now or anytime later"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="service-initial-photos"
                  onChange={(e) =>
                    setInitialFiles(
                      e.target.files ? Array.from(e.target.files) : []
                    )
                  }
                  className="hidden"
                />
                <label
                  htmlFor="service-initial-photos"
                  className="px-3 py-1.5 rounded-lg border border-[#013E51]/20 bg-white text-xs font-bold text-[#013E51] hover:bg-gray-100 transition cursor-pointer flex items-center gap-1.5"
                >
                  <FiUploadCloud className="w-3.5 h-3.5" />
                  <span>
                    {initialFiles.length > 0 ? "Change Photos" : "Pick Photos"}
                  </span>
                </label>
              </div>
            </div>
          )}
        </form>
      )}
    </AdminDrawer>
  );
}
