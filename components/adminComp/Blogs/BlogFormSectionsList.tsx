import { FiLayers, FiPlus } from "react-icons/fi";
import { BlogLocalizedText } from "@/models/blog";
import BlogSectionFormCard, { BlogSectionDraft } from "./BlogSectionFormCard";

interface BlogFormSectionsListProps {
  activeLang: keyof BlogLocalizedText;
  sections: BlogSectionDraft[];
  onAddSection: () => void;
  onUpdateSection: (idx: number, updated: BlogSectionDraft) => void;
  onRemoveSection: (idx: number) => void;
  onDeleteExistingImage: (idx: number, sectionId: number) => void;
}

export default function BlogFormSectionsList({
  activeLang,
  sections,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
  onDeleteExistingImage,
}: BlogFormSectionsListProps) {
  return (
    <div className="space-y-3 pt-2 border-t border-gray-100 font-[family-name:var(--font-lato)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Article Sections
          </h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#013E51] text-white text-[11px] font-bold">
            <FiLayers className="w-3 h-3 text-[#E8B34A]" />
            <span>{sections.length}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onAddSection}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#013E51]/5 hover:bg-[#013E51]/10 text-[#013E51] text-xs font-bold transition-colors cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>Add Section</span>
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <BlogSectionFormCard
            key={idx}
            index={idx}
            activeLang={activeLang}
            section={sec}
            canRemove={true}
            onChange={(updated) => onUpdateSection(idx, updated)}
            onRemove={() => onRemoveSection(idx)}
            onDeleteExistingImage={
              sec.id
                ? () => onDeleteExistingImage(idx, sec.id!)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
