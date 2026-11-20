"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import {
  createEmptyHotelTranslation,
  CreateHotelPayload,
  HotelApiItem,
  HotelFacilityPayload,
  HotelTranslationInput,
} from "@/models/hotel";
import {
  useCreateHotelMutation,
  useHotelMultiLangQuery,
  useUpdateHotelMutation,
} from "@/features/hotels/useHotels";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import HotelStarRatingPicker from "./HotelStarRatingPicker";
import HotelTranslationsSection from "./HotelTranslationsSection";
import HotelFacilitiesEditor from "./HotelFacilitiesEditor";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface HotelFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  item: HotelApiItem | null;
  onClose: () => void;
}

export default function HotelFormDrawer({
  isOpen,
  mode,
  item,
  onClose,
}: HotelFormDrawerProps) {
  const isEdit = mode === "edit";

  const [rate, setRate] = useState<number>(5);
  const [name, setName] = useState<HotelTranslationInput>(
    createEmptyHotelTranslation()
  );
  const [location, setLocation] = useState<HotelTranslationInput>(
    createEmptyHotelTranslation()
  );
  const [description, setDescription] = useState<HotelTranslationInput>(
    createEmptyHotelTranslation()
  );
  const [facilities, setFacilities] = useState<HotelFacilityPayload[]>([]);

  const multiLangQuery = useHotelMultiLangQuery(
    isEdit && item ? item.id : null,
    isOpen && isEdit
  );

  const createMutation = useCreateHotelMutation();
  const updateMutation = useUpdateHotelMutation();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setRate(5);
      setName(createEmptyHotelTranslation());
      setLocation(createEmptyHotelTranslation());
      setDescription(createEmptyHotelTranslation());
      setFacilities([]);
      return;
    }

    if (isEdit && multiLangQuery.data) {
      const data = multiLangQuery.data;
      setRate(data.rate || 5);
      setName(data.name);
      setLocation(data.location);
      setDescription(data.description);
      setFacilities(
        data.facilities.map((fac) => ({
          id: fac.id,
          icon: fac.icon || "waves",
          order: fac.order,
          name: fac.name,
          values: fac.values,
        }))
      );
    } else if (isEdit && item) {
      setRate(item.rate || 5);
      setName({
        en: item.name || "",
        fr: "",
        ru: "",
        ro: "",
        it: "",
      });
      setLocation({
        en: item.location || "",
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
      setFacilities(
        (item.facilities || []).map((fac, i) => ({
          id: fac.id,
          icon: fac.icon || "waves",
          order: fac.order ?? i + 1,
          name: {
            en: fac.name || "",
            fr: "",
            ru: "",
            ro: "",
            it: "",
          },
          values: (fac.values || []).map((v) => ({
            en: v || "",
            fr: "",
            ru: "",
            ro: "",
            it: "",
          })),
        }))
      );
    } else if (!isEdit) {
      setRate(5);
      setName(createEmptyHotelTranslation());
      setLocation(createEmptyHotelTranslation());
      setDescription(createEmptyHotelTranslation());
      setFacilities([]);
    }
  }, [isOpen, isEdit, item, multiLangQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.en.trim()) {
      toast.error("English hotel name is required.");
      return;
    }
    if (!location.en.trim()) {
      toast.error("English hotel location is required.");
      return;
    }

    const payload: CreateHotelPayload = {
      name: {
        en: name.en.trim(),
        fr: (name.fr || name.en).trim(),
        ru: (name.ru || name.en).trim(),
        ro: (name.ro || name.en).trim(),
        it: (name.it || name.en).trim(),
      },
      location: {
        en: location.en.trim(),
        fr: (location.fr || location.en).trim(),
        ru: (location.ru || location.en).trim(),
        ro: (location.ro || location.en).trim(),
        it: (location.it || location.en).trim(),
      },
      description: {
        en: description.en.trim(),
        fr: (description.fr || description.en).trim(),
        ru: (description.ru || description.en).trim(),
        ro: (description.ro || description.en).trim(),
        it: (description.it || description.en).trim(),
      },
      rate: Number(rate) || 5,
      facilities: facilities.map((fac, idx) => ({
        id: fac.id,
        icon: fac.icon || "waves",
        order: fac.order || idx + 1,
        name: {
          en: fac.name.en.trim(),
          fr: (fac.name.fr || fac.name.en).trim(),
          ru: (fac.name.ru || fac.name.en).trim(),
          ro: (fac.name.ro || fac.name.en).trim(),
          it: (fac.name.it || fac.name.en).trim(),
        },
        values: fac.values.map((v) => ({
          en: v.en.trim(),
          fr: (v.fr || v.en).trim(),
          ru: (v.ru || v.en).trim(),
          ro: (v.ro || v.en).trim(),
          it: (v.it || v.en).trim(),
        })),
      })),
    };

    try {
      if (isEdit && item) {
        await updateMutation.mutateAsync({
          ...payload,
          id: item.id,
        });
        toast.success("Hotel updated successfully.");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Hotel created successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save hotel."));
    }
  };

  const isLoadingDetails = isEdit && multiLangQuery.isLoading;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      eyebrow={isEdit ? `Hotel #${item?.id}` : "Accommodations"}
      title={isEdit ? "Edit Hotel / Resort" : "New Hotel / Resort"}
      subtitle={
        isEdit
          ? "Update resort details, ratings, and multilingual facilities."
          : "Add a partner hotel or resort to the booking and accommodation system."
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
              form="hotel-form-drawer"
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
                  <span>{isEdit ? "Save Changes" : "Create Hotel"}</span>
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
          <span>Loading hotel details across 5 languages...</span>
        </div>
      ) : (
        <form
          id="hotel-form-drawer"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Star Rating Selector */}
          <HotelStarRatingPicker rate={rate} onRateChange={setRate} />

          {/* 5-Language Translations */}
          <HotelTranslationsSection
            name={name}
            onNameChange={(k, v) => setName((prev) => ({ ...prev, [k]: v }))}
            location={location}
            onLocationChange={(k, v) =>
              setLocation((prev) => ({ ...prev, [k]: v }))
            }
            description={description}
            onDescriptionChange={(k, v) =>
              setDescription((prev) => ({ ...prev, [k]: v }))
            }
          />

          {/* Facilities Editor */}
          <HotelFacilitiesEditor
            facilities={facilities}
            onChange={setFacilities}
          />
        </form>
      )}
    </AdminDrawer>
  );
}
