import Image from "next/image";
import { FiUpload, FiImage, FiTrash2 } from "react-icons/fi";
import { BlogLocalizedText } from "@/models/blog";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";
import { BLOG_LANGUAGES, resolveBlogImageUrl } from "./blogHelpers";

interface BlogFormCoverCardProps {
  activeLang: keyof BlogLocalizedText;
  onActiveLangChange: (lang: keyof BlogLocalizedText) => void;
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
  activeLang,
  onActiveLangChange,
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

  const currentLangMeta =
    BLOG_LANGUAGES.find((l) => l.key === activeLang) || BLOG_LANGUAGES[0];
  const isEn = activeLang === "en";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImageFile(file);
  };

  return (
    <div className="space-y-4 font-[family-name:var(--font-lato)]">
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

      {/* Multi-Language Tab Bar */}
      <div className="pt-2 border-t border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Article Language Translations
          </label>
          <span className="text-[11px] text-gray-400">
            English required; others auto-fallback to EN
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-[#F8F9FA] p-1.5 rounded-2xl border border-gray-200">
          {BLOG_LANGUAGES.map((lang) => {
            const isActive = activeLang === lang.key;
            const hasContent = Boolean(
              title[lang.key]?.trim() && content[lang.key]?.trim()
            );
            return (
              <button
                key={lang.key}
                type="button"
                onClick={() => onActiveLangChange(lang.key)}
                className={`flex-1 min-w-[92px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "bg-transparent text-[#013E51] hover:bg-white"
                }`}
              >
                <LanguageFlag code={lang.code} size="sm" />
                <span>{lang.code}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    hasContent
                      ? "bg-emerald-400"
                      : lang.key === "en"
                      ? "bg-rose-400"
                      : "bg-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Headline for Active Language */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Article Title ({currentLangMeta.label}) {isEn && "*"}
          </label>
          {!isEn && !title[activeLang]?.trim() && title.en?.trim() && (
            <span className="text-[11px] text-amber-600 font-medium">
              Will fallback to EN title
            </span>
          )}
        </div>
        <input
          type="text"
          required={isEn}
          value={title[activeLang] || ""}
          onChange={(e) =>
            setTitle({ ...title, [activeLang]: e.target.value })
          }
          placeholder={
            isEn
              ? "e.g. Red Sea Diving: The Ultimate Guide for Travelers"
              : `Translated title in ${currentLangMeta.label} (optional)...`
          }
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] font-bold focus:outline-hidden focus:border-[#013E51]"
        />
      </div>

      {/* Main Content for Active Language */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Article Overview / Content ({currentLangMeta.label}) {isEn && "*"}
          </label>
          {!isEn && !content[activeLang]?.trim() && content.en?.trim() && (
            <span className="text-[11px] text-amber-600 font-medium">
              Will fallback to EN content
            </span>
          )}
        </div>
        <textarea
          rows={4}
          required={isEn}
          value={content[activeLang] || ""}
          onChange={(e) =>
            setContent({ ...content, [activeLang]: e.target.value })
          }
          placeholder={
            isEn
              ? "Introduction and core body of the travel article..."
              : `Translated overview/content in ${currentLangMeta.label} (optional)...`
          }
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] leading-relaxed focus:outline-hidden focus:border-[#013E51]"
        />
      </div>
    </div>
  );
}
