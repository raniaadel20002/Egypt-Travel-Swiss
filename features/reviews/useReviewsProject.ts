import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsProject,
  createReviewProject,
  deleteReviewProject,
} from "@/clientApi/reviewsProjectApi";
import {
  CreateReviewProjectDto,
  ReviewsProjectQueryParams,
} from "@/models/reviewsProject";

export const REVIEWS_PROJECT_QUERY_KEYS = {
  list: (params?: ReviewsProjectQueryParams) =>
    ["reviewsProject", "list", params] as const,
  detail: (id: number) => ["reviewsProject", "detail", id] as const,
};

export function useReviewsProjectList(params?: ReviewsProjectQueryParams) {
  return useQuery({
    queryKey: REVIEWS_PROJECT_QUERY_KEYS.list(params),
    queryFn: () => getReviewsProject(params),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useCreateReviewProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewProjectDto) =>
      createReviewProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsProject"] });
    },
  });
}

export function useDeleteReviewProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteReviewProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewsProject"] });
    },
  });
}
