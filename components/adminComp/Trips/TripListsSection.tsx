"use client";

import { TripTranslationInput } from "@/models/trip";
import TripLocalizedListEditor from "./TripLocalizedListEditor";

interface TripListsSectionProps {
  highlights: TripTranslationInput[];
  onHighlightsChange: (items: TripTranslationInput[]) => void;
  includes: TripTranslationInput[];
  onIncludesChange: (items: TripTranslationInput[]) => void;
  excludes: TripTranslationInput[];
  onExcludesChange: (items: TripTranslationInput[]) => void;
  whatToBring: TripTranslationInput[];
  onWhatToBringChange: (items: TripTranslationInput[]) => void;
}

export default function TripListsSection({
  highlights,
  onHighlightsChange,
  includes,
  onIncludesChange,
  excludes,
  onExcludesChange,
  whatToBring,
  onWhatToBringChange,
}: TripListsSectionProps) {
  return (
    <div className="space-y-4">
      <TripLocalizedListEditor
        label="Highlights"
        placeholder="e.g. Visit Abu Dabbab Beach"
        items={highlights}
        onChange={onHighlightsChange}
      />

      <TripLocalizedListEditor
        label="Inclusions"
        placeholder="e.g. Round-trip transfer"
        items={includes}
        onChange={onIncludesChange}
      />

      <TripLocalizedListEditor
        label="Exclusions"
        placeholder="e.g. Personal expenses"
        items={excludes}
        onChange={onExcludesChange}
      />

      <TripLocalizedListEditor
        label="What to Bring"
        placeholder="e.g. Swimwear & Sunscreen"
        items={whatToBring}
        onChange={onWhatToBringChange}
      />
    </div>
  );
}
