import Image from "next/image";
import { FiUpload, FiImage, FiTrash2, FiCopy } from "react-icons/fi";
import { BlogLocalizedText } from "@/models/blog";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";
import { BLOG_LANGUAGES, resolveBlogImageUrl } from "./blogHelpers";

interface BlogFormCoverCardProps {
  activeLang?: keyof BlogLocalizedText;
  onActiveLangChange?: (lang: keyof BlogLocalizedText) => void;
  title: BlogLocalizedText;
  setTitle: (val: BlogLocalizedText) => void;
  content: BlogLocalizedText;
  setContent: (val: BlogLocalizedText) => void;
  existingImageUrl?: string | null;
  coverImageFile: File | null;
  setCoverImageFile: (file: File | null) => void;
  onDeleteExistingCover?: () => void;
}

export default function BlogFormCoverCard({
  title,
  setTitle,
  content,
  setContent,
  existingImageUrl,
  coverImageFile,
  setCoverImageFile,
  onDeleteExistingCover,
}: BlogFormCoverCardProps) {
  const existingUrl = resolveBlogImageUrl(existingImageUrl);
  const previewUrl = coverImageFile
    ? URL.createObjectURL(coverImageFile)
    : existingUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImageFile(file);
  };

  const handleCopyEnToAll = () => {
    const enTitle = title.en?.trim();
    const enContent = content.en?.trim();
    if (!enTitle && !enContent) return;
    setTitle({
      en: title.en,
      fr: title.fr?.trim() || enTitle,
      ru: title.ru?.trim() || enTitle,
      ro: title.ro?.trim() || enTitle,
      it: title.it?.trim() || enTitle,
    });
    setContent({
      en: content.en,
      fr: content.fr?.trim() || enContent,
      ru: content.ru?.trim() || enContent,
      ro: content.ro?.trim() || enContent,
      it: content.it?.trim() || enContent,
    });
  };

  return (
    <div className="space-y-5 font-[family-name:var(--font-lato)]">
      {/* Cover Image Picker */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Main Article Cover Image
        </label>
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={title.en || "Cover preview"}
              fill
              sizes="600px"
              className="object-cover"
            />
          ) : (
            <div className="text-center text-gray-400">
              <FiImage className="w-8 h-8 mx-auto mb-1 opacity-50" />
              <span className="text-xs font-semibold">
                No cover image chosen
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#013E51]/5 hover:bg-[#013E51]/10 text-xs font-bold text-[#013E51] cursor-pointer transition-colors">
            <FiUpload className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>
              {previewUrl ? "Change Cover Image" : "Select Cover Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {coverImageFile && (
            <button
              type="button"
              onClick={() => setCoverImageFile(null)}
              className="text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
            >
              Clear Selected
            </button>
          )}

          {!coverImageFile && existingImageUrl && onDeleteExistingCover && (
            <button
              type="button"
              onClick={onDeleteExistingCover}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline cursor-pointer"
            >
              <FiTrash2 className="w-3 h-3" />
              <span>Delete Existing Cover</span>
            </button>
          )}
        </div>
      </div>

      {/* Translations Section - Vertical Layout matching Transfer Service */}
      <div className="space-y-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-bold text-[#013E51] uppercase tracking-wider block">
              Article Content Across All 5 Languages
            </label>
            <span className="text-[11px] text-[#888888]">
              English is required; other languages auto-fallback to English if left blank.
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyEnToAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
          >
            <FiCopy className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>Fill Empty from EN</span>
          </button>
        </div>

        <div className="space-y-3">
          {BLOG_LANGUAGES.map((lang) => {
            const isEn = lang.key === "en";
            return (
              <div
                key={lang.key}
                className={`p-3.5 rounded-2xl border space-y-2.5 transition ${
                  isEn
                    ? "border-[#013E51]/30 bg-[#FAF7F2]/60 ring-1 ring-[#013E51]/10"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LanguageFlag code={lang.code} size="sm" />
                    <span className="text-xs font-bold text-[#013E51]">
                      {lang.label} ({lang.code})
                    </span>
                    {isEn && <span className="text-red-500 font-bold">*</span>}
                  </div>
                  {!isEn && (
                    <span className="text-[10px] text-gray-400 font-medium">
                      Auto-falls back to EN
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#013E51] block">
                    Article Title ({lang.code}) {isEn && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    required={isEn}
                    value={title[lang.key] || ""}
                    onChange={(e) =>
                      setTitle({ ...title, [lang.key]: e.target.value })
                    }
                    placeholder={
                      isEn
                        ? "e.g. Red Sea Diving: The Ultimate Guide for Travelers"
                        : `Article title in ${lang.label}...`
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] font-bold placeholder-gray-400 focus:outline-hidden focus:border-[#013E51]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#013E51] block">
                    Article Overview / Content ({lang.code}) {isEn && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    rows={3}
                    required={isEn}
                    value={content[lang.key] || ""}
                    onChange={(e) =>
                      setContent({ ...content, [lang.key]: e.target.value })
                    }
                    placeholder={
                      isEn
                        ? "Introduction and core body of the travel article..."
                        : `Article overview in ${lang.label}...`
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] placeholder-gray-400 focus:outline-hidden focus:border-[#013E51] leading-relaxed"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
