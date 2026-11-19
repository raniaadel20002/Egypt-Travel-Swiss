import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  QuestionItem,
  QuestionLocalizedField,
  CreateQuestionDto,
  UpdateQuestionDto,
  QuestionsQueryParams,
  emptyLocalizedField,
} from "@/models/question";

export function isApiSuccess(res: unknown): boolean {
  if (!res || typeof res !== "object") return false;
  const obj = res as Record<string, unknown>;
  return obj.success === true || obj.Success === true;
}

export function extractApiMessage(res: unknown, fallback: string): string {
  if (!res || typeof res !== "object") return fallback;
  const obj = res as Record<string, unknown>;
  return (
    (typeof obj.message === "string" ? obj.message : null) ||
    (typeof obj.Message === "string" ? obj.Message : null) ||
    (typeof obj.title === "string" ? obj.title : null) ||
    (typeof obj.detail === "string" ? obj.detail : null) ||
    fallback
  );
}

export async function getQuestions(
  params?: QuestionsQueryParams,
  lang?: string
): Promise<ApiResponse<QuestionItem[]>> {
  const headers: Record<string, string> = {};
  if (lang) {
    headers["Accept-Language"] = lang;
  }
  const response = await apiClient.get<ApiResponse<QuestionItem[]>>(
    "/api/Questions",
    { params, headers }
  );
  return response.data;
}

export async function getQuestionById(
  id: number,
  lang?: string
): Promise<ApiResponse<QuestionItem>> {
  const headers: Record<string, string> = {};
  if (lang) {
    headers["Accept-Language"] = lang;
  }
  const response = await apiClient.get<ApiResponse<QuestionItem>>(
    `/api/Questions/${id}`,
    { headers }
  );
  return response.data;
}

export async function getQuestionAllTranslations(
  id: number
): Promise<{ text: QuestionLocalizedField; answer: QuestionLocalizedField }> {
  const langs: (keyof QuestionLocalizedField)[] = ["en", "fr", "ru", "ro", "it"];
  const text: QuestionLocalizedField = emptyLocalizedField();
  const answer: QuestionLocalizedField = emptyLocalizedField();

  await Promise.all(
    langs.map(async (lang) => {
      try {
        const response = await getQuestionById(id, lang);
        const data =
          response?.data ||
          (response as unknown as { Data?: QuestionItem })?.Data;
        if (data) {
          text[lang] = data.text || "";
          answer[lang] = data.answer || "";
        }
      } catch {
        // Fallback for individual language fetch
      }
    })
  );

  return { text, answer };
}

export async function createQuestion(
  payload: CreateQuestionDto
): Promise<ApiResponse<QuestionItem>> {
  const response = await apiClient.post<ApiResponse<QuestionItem>>(
    "/api/Questions",
    payload
  );
  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to create question.")
    );
  }
  return response.data;
}

export async function updateQuestion(
  payload: UpdateQuestionDto
): Promise<ApiResponse<QuestionItem>> {
  const response = await apiClient.put<ApiResponse<QuestionItem>>(
    "/api/Questions",
    payload
  );
  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to update question.")
    );
  }
  return response.data;
}

export async function deleteQuestion(
  id: number
): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/Questions/${id}`
  );
  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to delete question.")
    );
  }
  return response.data;
}
