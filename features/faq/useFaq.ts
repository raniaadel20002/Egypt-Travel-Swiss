import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuestions,
  getQuestionAllTranslations,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@/clientApi/questionsApi";
import { ApiResponse } from "@/models/api";
import {
  QuestionItem,
  CreateQuestionDto,
  UpdateQuestionDto,
  QuestionsQueryParams,
} from "@/models/question";

export const FAQ_QUERY_KEYS = {
  list: (params?: QuestionsQueryParams, lang?: string) =>
    ["questions", "list", params, lang] as const,
  translations: (id?: number) =>
    ["questions", "detail", id, "translations"] as const,
};

export function useFaqList(params?: QuestionsQueryParams, lang?: string) {
  return useQuery({
    queryKey: FAQ_QUERY_KEYS.list(params, lang),
    queryFn: () => getQuestions(params, lang),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useQuestionTranslations(id?: number) {
  return useQuery({
    queryKey: FAQ_QUERY_KEYS.translations(id),
    queryFn: () => getQuestionAllTranslations(id!),
    enabled: Boolean(id && id > 0),
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateQuestionDto) => createQuestion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateQuestionDto) => updateQuestion(payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.setQueriesData(
        { queryKey: ["questions", "list"] },
        (old: ApiResponse<QuestionItem[]> | undefined) => {
          if (!old || !Array.isArray(old.data)) return old;
          return {
            ...old,
            data: old.data.map((item) =>
              item.id === variables.id
                ? {
                    ...item,
                    text: response?.data?.text || variables.text.en,
                    answer: response?.data?.answer || variables.answer.en,
                  }
                : item
            ),
          };
        }
      );
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
