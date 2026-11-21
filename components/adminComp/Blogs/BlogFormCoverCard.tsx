import Image from "next/image";
import { FiUpload, FiImage, FiTrash2 } from "react-icons/fi";
import { resolveBlogImageUrl } from "./blogHelpers";

interface BlogFormCoverCardProps {
  title: string;
  setTitle: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
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
              alt={title || "Cover preview"}
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
            <span>{previewUrl ? "Change Cover Image" : "Select Cover Image"}</span>
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

      {/* Main Headline */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Article Title *
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Red Sea Diving: The Ultimate Guide for Travelers"
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] font-bold focus:outline-hidden focus:border-[#013E51]"
        />
      </div>

      {/* Main Excerpt */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Article Overview / Content *
        </label>
        <textarea
          rows={4}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Introduction and core body of the travel article..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] leading-relaxed focus:outline-hidden focus:border-[#013E51]"
        />
      </div>
    </div>
  );
}
