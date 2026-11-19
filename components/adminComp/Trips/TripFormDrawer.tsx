"use client";

import { FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { DestinationApiItem } from "@/models/destination";
import { TripTypeItem } from "@/models/tripType";
import { TripApiItem } from "@/models/trip";
import {
  useCreateTripMutation,
  useTripMultiLangQuery,
  useUpdateTripMutation,
  useUploadTripImagesMutation,
} from "@/features/trips/useTrips";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import TripGeneralFields from "./TripGeneralFields";
import TripTranslationsSection from "./TripTranslationsSection";
import TripListsSection from "./TripListsSection";
import TripInitialPhotosPicker from "./TripInitialPhotosPicker";
import { useTripFormState } from "./useTripFormState";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface TripFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  item: TripApiItem | null;
  destinations: DestinationApiItem[];
  tripTypes: TripTypeItem[];
  onClose: () => void;
}

export default function TripFormDrawer({
  isOpen,
  mode,
  item,
  destinations,
  tripTypes,
  onClose,
}: TripFormDrawerProps) {
  const isEdit = mode === "edit";

  const multiLangQuery = useTripMultiLangQuery(
    isEdit && item ? item.id : null,
    isOpen && isEdit
  );

  const form = useTripFormState({
    isOpen,
    isEdit,
    item,
    detailsData: multiLangQuery.data,
    destinations,
    tripTypes,
  });

  const createMutation = useCreateTripMutation();
  const updateMutation = useUpdateTripMutation();
  const uploadImagesMutation = useUploadTripImagesMutation();

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    uploadImagesMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.destinationId) {
      toast.error("Please select a destination.");
      return;
    }
    if (!form.tripTypeId) {
      toast.error("Please select a trip type.");
      return;
    }
    if (!form.name.en.trim()) {
      toast.error("English excursion title is required.");
      return;
    }

    const payload = form.buildPayload();

    try {
      if (isEdit && item) {
        await updateMutation.mutateAsync({ ...payload, id: item.id });
        toast.success("Excursion details updated successfully.");
      } else {
        const created = await createMutation.mutateAsync(payload);
        if (created?.id && form.initialFiles.length > 0) {
          try {
            await uploadImagesMutation.mutateAsync({
              tripId: created.id,
              images: form.initialFiles,
            });
          } catch {
            toast.warning("Excursion created, but some photos failed to upload.");
          }
        }
        toast.success("Excursion created successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save excursion."));
    }
  };

  const isLoadingDetails = isEdit && multiLangQuery.isLoading;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      eyebrow={isEdit ? `ID #${item?.id}` : "Excursions"}
      title={isEdit ? "Edit Excursion" : "Create Excursion"}
      subtitle={
        isEdit
          ? "Update itinerary, pricing, and 5-language translations."
          : "Publish a new excursion with pricing and translations."
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
              form="trip-form-drawer"
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
                  <span>{isEdit ? "Update Changes" : "Save Excursion"}</span>
                </>
              )}
            </button>
          </div>
        )
      }
    >
      {isLoadingDetails ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-sm text-[#013E51]">
          <FiLoader className="w-7 h-7 animate-spin text-[#E8B34A]" />
          <span>Loading excursion details across 5 languages...</span>
        </div>
      ) : (
        <form id="trip-form-drawer" onSubmit={handleSubmit} className="space-y-6">
          <TripGeneralFields
            destinationId={form.destinationId}
            onDestinationChange={form.setDestinationId}
            tripTypeId={form.tripTypeId}
            onTripTypeChange={form.setTripTypeId}
            category={form.category}
            onCategoryChange={form.setCategory}
            timeFrom={form.timeFrom}
            onTimeFromChange={form.setTimeFrom}
            durationValue={form.durationValue}
            onDurationValueChange={form.setDurationValue}
            durationType={form.durationType}
            onDurationTypeChange={form.setDurationType}
            adultPrice={form.adultPrice}
            onAdultPriceChange={form.setAdultPrice}
            childPrice={form.childPrice}
            onChildPriceChange={form.setChildPrice}
            infPrice={form.infPrice}
            onInfPriceChange={form.setInfPrice}
            availabilityDayNo={form.availabilityDayNo}
            onAvailabilityDayToggle={form.handleDayToggle}
            destinations={destinations}
            tripTypes={tripTypes}
          />

          <TripTranslationsSection
            name={form.name}
            onNameChange={(k, v) =>
              form.setName((prev) => ({ ...prev, [k]: v }))
            }
            description={form.description}
            onDescriptionChange={(k, v) =>
              form.setDescription((prev) => ({ ...prev, [k]: v }))
            }
          />

          <TripListsSection
            highlights={form.highlights}
            onHighlightsChange={form.setHighlights}
            includes={form.includes}
            onIncludesChange={form.setIncludes}
            excludes={form.excludes}
            onExcludesChange={form.setExcludes}
            whatToBring={form.whatToBring}
            onWhatToBringChange={form.setWhatToBring}
          />

          {!isEdit && (
            <TripInitialPhotosPicker
              initialFiles={form.initialFiles}
              onFilesChange={form.setInitialFiles}
            />
          )}
        </form>
      )}
    </AdminDrawer>
  );
}
