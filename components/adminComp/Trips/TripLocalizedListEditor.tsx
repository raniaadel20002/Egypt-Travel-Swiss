"use client";

import { FiPlus, FiTrash2 } from "react-icons/fi";
import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import { TripTranslationInput } from "@/models/trip";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";

interface TripLocalizedListEditorProps {
  label: string;
  placeholder: string;
  items: TripTranslationInput[];
  onChange: (newItems: TripTranslationInput[]) => void;
}

export default function TripLocalizedListEditor({
  label,
  placeholder,
  items,
  onChange,
}: TripLocalizedListEditorProps) {
  const handleAddItem = () => {
    const newItem: TripTranslationInput = {
      en: "",
      fr: "",
      ru: "",
      ro: "",
      it: "",
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleFieldChange = (
    index: number,
    langKey: keyof TripTranslationInput,
    value: string
  ) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [langKey]: value } : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-3 pt-3 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
            {label} ({items.length})
          </label>
          <span className="text-[11px] text-[#888888]">
            All 5 languages visible with flags per entry.
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Add {label.replace(/s$/, "")}</span>
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-gray-400 italic py-1">
          No entries added yet. Click &quot;Add {label.replace(/s$/, "")}&quot; to configure.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-[#FAF7F2]/40 p-3.5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#013E51]">
                  #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  title="Remove Item"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              {/* Primary English Input */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <LanguageFlag code="EN" size="xs" />
                  <span className="text-[11px] font-bold text-[#013E51]">
                    English (EN) *
                  </span>
                </div>
                <input
                  type="text"
                  value={item.en}
                  onChange={(e) =>
                    handleFieldChange(index, "en", e.target.value)
                  }
                  placeholder={`${placeholder} in English`}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#013E51]"
                />
              </div>

              {/* All other 4 languages displayed at once in a 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {TRIP_TYPE_LANGUAGES.filter((l) => l.code !== "EN").map(
                  (lang) => {
                    const key =
                      lang.code.toLowerCase() as keyof TripTranslationInput;

                    return (
                      <div key={lang.code} className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <LanguageFlag code={lang.code} size="xs" />
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            {lang.label}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={item[key] || ""}
                          onChange={(e) =>
                            handleFieldChange(index, key, e.target.value)
                          }
                          placeholder={`${placeholder} in ${lang.code}`}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#013E51]"
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
