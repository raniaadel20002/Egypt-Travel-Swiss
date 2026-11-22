import { useEffect, useState } from "react";
import { FiX, FiSave, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { BlogApiItem, BlogLocalizedText } from "@/models/blog";
import {
  useBlogMultiLangQuery,
  useCreateBlogMutation,
  useDeleteBlogImageMutation,
  useDeleteBlogSectionImageMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useUploadBlogSectionImageMutation,
} from "@/features/blogs/useBlogs";
import { buildBlogDraftState, emptyBlogLocalizedText } from "./blogHelpers";
import BlogFormCoverCard from "./BlogFormCoverCard";
import BlogFormSectionsList from "./BlogFormSectionsList";
import { BlogSectionDraft } from "./BlogSectionFormCard";

interface BlogFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingBlog: BlogApiItem | null;
}

export default function BlogFormDrawer({
  isOpen,
  onClose,
  editingBlog,
}: BlogFormDrawerProps) {
  const [activeLang, setActiveLang] = useState<keyof BlogLocalizedText>("en");
  const [title, setTitle] = useState<BlogLocalizedText>(emptyBlogLocalizedText());
  const [content, setContent] = useState<BlogLocalizedText>(emptyBlogLocalizedText());
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [sections, setSections] = useState<BlogSectionDraft[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = Boolean(editingBlog?.id);
  const { data: multiLangBlog, isLoading: isLoadingMultiLang } =
    useBlogMultiLangQuery(editingBlog?.id, isOpen && isEdit);

  const createMutation = useCreateBlogMutation();
  const updateMutation = useUpdateBlogMutation();
  const uploadCoverMutation = useUploadBlogImageMutation();
  const uploadSectionImageMutation = useUploadBlogSectionImageMutation();
  const deleteCoverMutation = useDeleteBlogImageMutation();
  const deleteSectionImageMutation = useDeleteBlogSectionImageMutation();

  useModalDismiss({ isOpen, onClose, disabled: isSubmitting });

  useEffect(() => {
    if (!isOpen) return;
    setActiveLang("en");
    const draft = buildBlogDraftState(editingBlog, multiLangBlog);
    setTitle(draft.title);
    setContent(draft.content);
    setCoverImageFile(null);
    setSections(draft.sections);
  }, [isOpen, editingBlog, multiLangBlog]);

  if (!isOpen) return null;

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        sectionNumber: prev.length + 1,
        title: emptyBlogLocalizedText(),
        content: emptyBlogLocalizedText(),
        newImageFile: null,
      },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    setSections((prev) =>
      prev.filter((_, i) => i !== idx).map((s, i) => ({ ...s, sectionNumber: i + 1 }))
    );
  };

  const handleDeleteSectionImage = async (idx: number, sectionId: number) => {
    try {
      await deleteSectionImageMutation.mutateAsync(sectionId);
      toast.success("Section image removed.");
      setSections((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, existingImageUrl: null } : s))
      );
    } catch {
      toast.error("Failed to delete section image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.en.trim() || !content.en.trim()) {
      setActiveLang("en");
      toast.error("Please provide both an English article title and English content.");
      return;
    }

    const invalidSection = sections.find((s) => !s.title.en.trim() || !s.content.en.trim());
    if (invalidSection) {
      setActiveLang("en");
      toast.error(
        `Please provide an English title and content for Section #${invalidSection.sectionNumber}.`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const savedBlog = editingBlog
        ? await updateMutation.mutateAsync({
            id: editingBlog.id,
            payload: {
              id: editingBlog.id,
              title,
              content,
              blogSections: sections.map((s) => ({
                id: s.id || 0,
                sectionNumber: s.sectionNumber,
                title: s.title,
                content: s.content,
              })),
            },
          })
        : await createMutation.mutateAsync({
            title,
            content,
            blogSections: sections.map((s) => ({
              sectionNumber: s.sectionNumber,
              title: s.title,
              content: s.content,
            })),
          });

      toast.success(
        editingBlog
          ? `Article #${editingBlog.id} updated across all languages.`
          : "New multi-language article published successfully."
      );

      if (coverImageFile && savedBlog?.id) {
        try {
          await uploadCoverMutation.mutateAsync({ blogId: savedBlog.id, file: coverImageFile });
        } catch {
          toast.error("Article saved, but cover image upload failed.");
        }
      }

      const createdSections = savedBlog?.blogSections || [];
      for (const draftSec of sections) {
        if (draftSec.newImageFile && savedBlog?.id) {
          const matched = createdSections.find(
            (cs) => cs.sectionNumber === draftSec.sectionNumber
          );
          if (matched?.id) {
            try {
              await uploadSectionImageMutation.mutateAsync({
                blogId: savedBlog.id,
                sectionId: matched.id,
                file: draftSec.newImageFile,
              });
            } catch {
              toast.error(`Failed to upload image for Section ${draftSec.sectionNumber}.`);
            }
          }
        }
      }

      onClose();
    } catch {
      toast.error("Failed to save article. Please verify inputs.");
    } finally {
      setIsSubmitting(false);
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
          <div className="px-6 py-5 bg-[#013E51] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B34A] font-bold block">
                Multi-Language Travel Editor
              </span>
              <h2 className="text-lg font-bold">
                {editingBlog ? `Edit Article #${editingBlog.id}` : "Draft New Article"}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {isEdit && isLoadingMultiLang ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400">
              <FiLoader className="w-6 h-6 animate-spin text-[#013E51]" />
              <span className="text-xs font-medium">
                Loading article translations across 5 languages...
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <BlogFormCoverCard
                activeLang={activeLang}
                onActiveLangChange={setActiveLang}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                existingImageUrl={multiLangBlog?.imageUrl ?? editingBlog?.imageUrl}
                coverImageFile={coverImageFile}
                setCoverImageFile={setCoverImageFile}
                onDeleteExistingCover={
                  editingBlog?.id
                    ? async () => {
                        try {
                          await deleteCoverMutation.mutateAsync(editingBlog.id);
                          toast.success("Cover image removed.");
                        } catch {
                          toast.error("Failed to delete cover image.");
                        }
                      }
                    : undefined
                }
              />

              <BlogFormSectionsList
                activeLang={activeLang}
                sections={sections}
                onAddSection={handleAddSection}
                onUpdateSection={(idx, updated) =>
                  setSections((prev) => prev.map((s, i) => (i === idx ? updated : s)))
                }
                onRemoveSection={handleRemoveSection}
                onDeleteExistingImage={handleDeleteSectionImage}
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
                >
                  <FiSave className="w-4 h-4 text-[#E8B34A]" />
                  <span>
                    {isSubmitting
                      ? "Saving & Uploading..."
                      : editingBlog
                      ? "Update Article"
                      : "Publish Article"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
