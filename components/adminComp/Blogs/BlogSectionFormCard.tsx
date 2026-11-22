import Image from "next/image";
import { FiTrash2, FiUpload, FiImage } from "react-icons/fi";
import { BlogLocalizedText } from "@/models/blog";
import { BLOG_LANGUAGES, resolveBlogImageUrl } from "./blogHelpers";

export interface BlogSectionDraft {
  id?: number;
  sectionNumber: number;
  title: BlogLocalizedText;
  content: BlogLocalizedText;
  existingImageUrl?: string | null;
  newImageFile?: File | null;
}

interface BlogSectionFormCardProps {
  index: number;
  activeLang: keyof BlogLocalizedText;
  section: BlogSectionDraft;
  canRemove: boolean;
  onChange: (updated: BlogSectionDraft) => void;
  onRemove: () => void;
  onDeleteExistingImage?: () => void;
}

export default function BlogSectionFormCard({
  activeLang,
  section,
  canRemove,
  onChange,
  onRemove,
  onDeleteExistingImage,
}: BlogSectionFormCardProps) {
  const existingUrl = resolveBlogImageUrl(section.existingImageUrl);
  const previewUrl = section.newImageFile
    ? URL.createObjectURL(section.newImageFile)
    : existingUrl;

  const currentLangMeta =
    BLOG_LANGUAGES.find((l) => l.key === activeLang) || BLOG_LANGUAGES[0];
  const isEn = activeLang === "en";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...section, newImageFile: file });
    }
  };

  const handleClearNewImage = () => {
    onChange({ ...section, newImageFile: null });
  };

  return (
    <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-gray-200 space-y-3 font-[family-name:var(--font-lato)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#013E51]">
            Section #{section.sectionNumber}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#013E51]/10 text-[#013E51] text-[10px] font-bold">
            Editing {currentLangMeta.code}
          </span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>Remove Section</span>
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-[11px] text-gray-500 font-bold uppercase">
            Section Title ({currentLangMeta.label}) {isEn && "*"}
          </label>
          {!isEn &&
            !section.title[activeLang]?.trim() &&
            section.title.en?.trim() && (
              <span className="text-[10px] text-amber-600 font-medium">
                Fallback: {section.title.en.slice(0, 32)}
              </span>
            )}
        </div>
        <input
          type="text"
          value={section.title[activeLang] || ""}
          onChange={(e) =>
            onChange({
              ...section,
              title: { ...section.title, [activeLang]: e.target.value },
            })
          }
          placeholder={
            isEn
              ? "e.g. Diving Gear & Coral Reefs"
              : `Section title in ${currentLangMeta.label} (optional)...`
          }
          required={isEn}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white font-semibold"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-[11px] text-gray-500 font-bold uppercase">
            Section Content ({currentLangMeta.label}) {isEn && "*"}
          </label>
          {!isEn &&
            !section.content[activeLang]?.trim() &&
            section.content.en?.trim() && (
              <span className="text-[10px] text-amber-600 font-medium">
                Auto-falls back to EN
              </span>
            )}
        </div>
        <textarea
          rows={3}
          value={section.content[activeLang] || ""}
          onChange={(e) =>
            onChange({
              ...section,
              content: { ...section.content, [activeLang]: e.target.value },
            })
          }
          placeholder={
            isEn
              ? "Detailed insights, paragraphs, and descriptions..."
              : `Section content in ${currentLangMeta.label} (optional)...`
          }
          required={isEn}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white leading-relaxed"
        />
      </div>

      {/* Section Image Selector */}
      <div className="pt-2 border-t border-gray-200/80 space-y-2">
        <label className="block text-[11px] text-gray-500 font-bold uppercase">
          Section Image (Optional)
        </label>
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center shrink-0">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={section.title.en || "Section"}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <FiImage className="w-6 h-6 text-gray-300" />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#013E51] hover:bg-gray-50 cursor-pointer transition-colors shadow-2xs">
              <FiUpload className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>{previewUrl ? "Change Image" : "Upload Image"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {section.newImageFile && (
              <button
                type="button"
                onClick={handleClearNewImage}
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
              >
                Clear Selected
              </button>
            )}

            {!section.newImageFile &&
              section.existingImageUrl &&
              onDeleteExistingImage && (
                <button
                  type="button"
                  onClick={onDeleteExistingImage}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FiTrash2 className="w-3 h-3" />
                  <span>Delete Image</span>
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
