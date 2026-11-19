export interface QuestionItem {
  id: number;
  text: string;
  answer: string;
}

export interface QuestionLocalizedField {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface CreateQuestionDto {
  text: QuestionLocalizedField;
  answer: QuestionLocalizedField;
}

export interface UpdateQuestionDto {
  id: number;
  text: QuestionLocalizedField;
  answer: QuestionLocalizedField;
}

export interface QuestionsQueryParams {
  PageNumber?: number;
  PageSize?: number;
}

export function emptyLocalizedField(): QuestionLocalizedField {
  return { en: "", fr: "", ru: "", ro: "", it: "" };
}
