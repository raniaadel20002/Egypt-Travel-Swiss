"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiLoader, FiX, FiRotateCcw } from "react-icons/fi";
import { toast } from "sonner";
import {
  useCreateQuestion,
  useUpdateQuestion,
  useQuestionTranslations,
} from "@/features/faq/useFaq";
import { isApiSuccess, extractApiMessage } from "@/clientApi/questionsApi";
import {
  QuestionItem,
  QuestionLocalizedField,
  emptyLocalizedField,
} from "@/models/question";
import FaqLanguageSection from "./FaqLanguageSection";

export const FAQ_LANG_CONFIG: {
  key: keyof QuestionLocalizedField;
  label: string;
  nativeLabel: string;
  isRequired?: boolean;
}[] = [
  { key: "en", label: "English", nativeLabel: "English", isRequired: true },
  { key: "fr", label: "French", nativeLabel: "Français" },
  { key: "ru", label: "Russian", nativeLabel: "Русский" },
  { key: "ro", label: "Romanian", nativeLabel: "Română" },
  { key: "it", label: "Italian", nativeLabel: "Italiano" },
];

interface FaqSidebarFormProps {
  isOpen: boolean;
  editTarget: QuestionItem | null;
  onClose: () => void;
}

export default function FaqSidebarForm({
  isOpen,
  editTarget,
  onClose,
}: FaqSidebarFormProps) {
  const isEdit = Boolean(editTarget);

  const [text, setText] = useState<QuestionLocalizedField>(emptyLocalizedField());
  const [answer, setAnswer] = useState<QuestionLocalizedField>(emptyLocalizedField());

  const translationsQuery = useQuestionTranslations(editTarget?.id);

  const createMutation = useCreateQuestion();
  const updateMutation = useUpdateQuestion();
  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    translationsQuery.isFetching;

  // Initialize form when editTarget changes
  useEffect(() => {
    if (editTarget) {
      setText({ en: editTarget.text || "", fr: "", ru: "", ro: "", it: "" });
      setAnswer({ en: editTarget.answer || "", fr: "", ru: "", ro: "", it: "" });
    } else {
      setText(emptyLocalizedField());
      setAnswer(emptyLocalizedField());
    }
  }, [editTarget]);

  // Load and preserve existing translations from server for all languages
  useEffect(() => {
    if (translationsQuery.data && editTarget) {
      setText(translationsQuery.data.text);
      setAnswer(translationsQuery.data.answer);
    }
  }, [translationsQuery.data, editTarget]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEnglish = (langKey: keyof QuestionLocalizedField) => {
    if (langKey === "en") return;
    if (!text.en.trim() && !answer.en.trim()) {
      toast.error("Please enter English question or answer first.");
      return;
    }
    setText((prev) => ({ ...prev, [langKey]: prev.en }));
    setAnswer((prev) => ({ ...prev, [langKey]: prev.en }));
    const langLabel = FAQ_LANG_CONFIG.find((l) => l.key === langKey)?.label;
    toast.info(`Copied English content to ${langLabel}.`);
  };

  const handleReset = () => {
    if (translationsQuery.data) {
      setText(translationsQuery.data.text);
      setAnswer(translationsQuery.data.answer);
    } else if (editTarget) {
      setText({ en: editTarget.text || "", fr: "", ru: "", ro: "", it: "" });
      setAnswer({ en: editTarget.answer || "", fr: "", ru: "", ro: "", it: "" });
    } else {
      setText(emptyLocalizedField());
      setAnswer(emptyLocalizedField());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enText = text.en.trim();
    const enAnswer = answer.en.trim();

    if (!enText || !enAnswer) {
      toast.error("English question and answer are required.");
      return;
    }

    // Send the exact independent values for every language without overwriting with English
    const payload = {
      text: {
        en: enText,
        fr: text.fr.trim(),
        ru: text.ru.trim(),
        ro: text.ro.trim(),
        it: text.it.trim(),
      },
      answer: {
        en: enAnswer,
        fr: answer.fr.trim(),
        ru: answer.ru.trim(),
        ro: answer.ro.trim(),
        it: answer.it.trim(),
      },
    };

    try {
      if (isEdit && editTarget) {
        const questionId = Number(editTarget.id);
        if (!questionId || isNaN(questionId)) {
          toast.error("Invalid question ID.");
          return;
        }

        const res = await updateMutation.mutateAsync({
          id: questionId,
          text: payload.text,
          answer: payload.answer,
        });

        if (!res || !isApiSuccess(res)) {
          throw new Error(extractApiMessage(res, "Update was not confirmed by server."));
        }

        toast.success(extractApiMessage(res, "Question updated successfully."));
      } else {
        const res = await createMutation.mutateAsync(payload);
        if (!res || !isApiSuccess(res)) {
          throw new Error(extractApiMessage(res, "Creation was not confirmed by server."));
        }
        toast.success(extractApiMessage(res, "Question created successfully."));
      }

      setText(emptyLocalizedField());
      setAnswer(emptyLocalizedField());
      onClose();
    } catch (err: unknown) {
      const errResponse = (
        err as {
          response?: { data?: unknown };
        }
      )?.response?.data;

      const errorMessage =
        extractApiMessage(errResponse, "") ||
        (err as Error)?.message ||
        "Failed to save question. Please try again.";

      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#013E51]/30 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      <aside className="fixed inset-y-0 right-0 w-full sm:w-[500px] md:w-[540px] max-w-full bg-white shadow-2xl flex flex-col h-full border-l border-[#013E51]/10 z-10 animate-in slide-in-from-right duration-300">
        <div className="p-5 sm:p-6 border-b border-[#013E51]/10 bg-[#FAF7F2]/60 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
                {isEdit ? <FiEdit2 className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] leading-tight">
                    {isEdit ? "Edit Question" : "Add FAQ Question"}
                  </h2>
                  {translationsQuery.isFetching && (
                    <FiLoader className="w-3.5 h-3.5 text-[#E8B34A] animate-spin" />
                  )}
                </div>
                <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] mt-0.5">
                  {translationsQuery.isFetching
                    ? "Loading all saved translations from server..."
                    : isEdit
                    ? `Modifying question #${editTarget?.id} (all translations loaded)`
                    : "Enter content for each language independently"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-2 rounded-xl text-[#888888] hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
            {FAQ_LANG_CONFIG.map((lang) => (
              <FaqLanguageSection
                key={lang.key}
                langKey={lang.key}
                label={lang.label}
                nativeLabel={lang.nativeLabel}
                isRequired={lang.isRequired}
                questionValue={text[lang.key]}
                answerValue={answer[lang.key]}
                onQuestionChange={(val) => setText((prev) => ({ ...prev, [lang.key]: val }))}
                onAnswerChange={(val) => setAnswer((prev) => ({ ...prev, [lang.key]: val }))}
                canCopyEnglish={lang.key !== "en"}
                onCopyEnglish={() => handleCopyEnglish(lang.key)}
              />
            ))}
          </div>

          <div className="p-5 sm:p-6 border-t border-[#013E51]/10 bg-white flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] border border-[#013E51]/15 transition cursor-pointer disabled:opacity-50"
            >
              <FiRotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#013E51] hover:bg-[#025670] text-white transition cursor-pointer disabled:opacity-60 shadow-xs"
            >
              {isPending ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : isEdit ? (
                <FiEdit2 className="w-4 h-4 text-[#E8B34A]" />
              ) : (
                <FiPlus className="w-4 h-4 text-[#E8B34A]" />
              )}
              <span>{isEdit ? "Save Changes" : "Save Question"}</span>
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
