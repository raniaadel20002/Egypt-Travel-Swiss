import { useState } from "react";
import Image from "next/image";
import {
  FiX,
  FiEdit2,
  FiLayers,
  FiTrash2,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { BlogApiItem, BlogLocalizedText } from "@/models/blog";
import {
  useBlogDetailQuery,
  useDeleteBlogImageMutation,
  useDeleteBlogSectionImageMutation,
  useUploadBlogImageMutation,
} from "@/features/blogs/useBlogs";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";
import {
  BLOG_LANGUAGES,
  resolveBlogImageUrl,
  sortBlogSections,
} from "./blogHelpers";

interface BlogDetailsDrawerProps {
  blog: BlogApiItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: BlogApiItem) => void;
}

export default function BlogDetailsDrawer({
  blog,
  isOpen,
  onClose,
  onEdit,
}: BlogDetailsDrawerProps) {
  useModalDismiss({ isOpen, onClose });
  const [previewLang, setPreviewLang] =
    useState<keyof BlogLocalizedText>("en");

  const { data: freshBlog } = useBlogDetailQuery(
    isOpen && blog?.id ? blog.id : undefined,
    previewLang
  );
  const activeBlog = freshBlog || blog;

  const deleteCoverMutation = useDeleteBlogImageMutation();
  const deleteSectionImageMutation = useDeleteBlogSectionImageMutation();
  const uploadCoverMutation = useUploadBlogImageMutation();

  if (!isOpen || !activeBlog) return null;

  const coverUrl = resolveBlogImageUrl(activeBlog.imageUrl);
  const sections = sortBlogSections(activeBlog.blogSections);

  const handleDeleteCover = async () => {
    try {
      await deleteCoverMutation.mutateAsync(activeBlog.id);
      toast.success("Cover image removed.");
    } catch {
      toast.error("Failed to delete cover image.");
    }
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadCoverMutation.mutateAsync({ blogId: activeBlog.id, file });
      toast.success("Cover image updated.");
    } catch {
      toast.error("Failed to upload cover image.");
    }
  };

  const handleDeleteSectionImage = async (sectionId: number) => {
    try {
      await deleteSectionImageMutation.mutateAsync(sectionId);
      toast.success("Section image removed.");
    } catch {
      toast.error("Failed to delete section image.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-[family-name:var(--font-lato)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#013E51] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B34A] font-bold block">
                Article Preview
              </span>
              <h2 className="text-lg font-bold font-mono">
                Blog #{activeBlog.id}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(activeBlog);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8B34A] text-[#013E51] text-xs font-bold hover:bg-[#d9a43d] transition-colors cursor-pointer"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Language Preview Switcher */}
          <div className="px-6 py-3 bg-[#F8F9FA] border-b border-gray-200 flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
              Preview Language
            </span>
            <div className="flex items-center gap-1.5">
              {BLOG_LANGUAGES.map((lang) => (
                <button
                  key={lang.key}
                  type="button"
                  onClick={() => setPreviewLang(lang.key)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    previewLang === lang.key
                      ? "bg-[#013E51] text-white"
                      : "bg-white border border-gray-200 text-[#013E51] hover:bg-gray-50"
                  }`}
                >
                  <LanguageFlag code={lang.code} size="sm" />
                  <span>{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Cover Image & Upload */}
            <div className="space-y-2">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={activeBlog.title}
                    fill
                    sizes="600px"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <FiImage className="w-10 h-10 mx-auto mb-1 opacity-50" />
                    <span className="text-xs font-semibold">No cover image uploaded</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#013E51] cursor-pointer transition-colors">
                  <FiUpload className="w-3.5 h-3.5" />
                  <span>{coverUrl ? "Change Cover Image" : "Upload Cover Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCover}
                    className="hidden"
                  />
                </label>
                {coverUrl && (
                  <button
                    type="button"
                    onClick={handleDeleteCover}
                    disabled={deleteCoverMutation.isPending}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>

            {/* Title & Main Content */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#013E51]">
                {activeBlog.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                {activeBlog.content}
              </p>
            </div>

            {/* Blog Sections */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-2">
                  <FiLayers className="w-4 h-4 text-[#E8B34A]" />
                  <span>Article Sections ({sections.length})</span>
                </h3>
              </div>

              {sections.length > 0 ? (
                <div className="space-y-4">
                  {sections.map((section) => {
                    const secImgUrl = resolveBlogImageUrl(section.imageUrl);
                    return (
                      <div
                        key={section.id}
                        className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#013E51]/10 text-[#013E51] font-bold text-xs">
                            Section {section.sectionNumber}
                          </span>
                          {secImgUrl && (
                            <button
                              type="button"
                              onClick={() => handleDeleteSectionImage(section.id)}
                              disabled={deleteSectionImageMutation.isPending}
                              className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:underline cursor-pointer"
                            >
                              <FiTrash2 className="w-3 h-3" />
                              <span>Delete Image</span>
                            </button>
                          )}
                        </div>

                        <h4 className="font-bold text-[#013E51] text-sm sm:text-base">
                          {section.title}
                        </h4>

                        {secImgUrl && (
                          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <Image
                              src={secImgUrl}
                              alt={section.title}
                              fill
                              sizes="500px"
                              className="object-cover"
                            />
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No structured sections added to this article yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
