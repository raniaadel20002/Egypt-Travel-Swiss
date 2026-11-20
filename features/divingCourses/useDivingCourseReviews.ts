import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createDivingCourseReview,
  getDivingCourseReviews,
  getDivingCourseReviewsAverage,
  updateDivingCourseReviewStatus,
} from "@/clientApi/divingCoursesApi";
import {
  CreateDivingCourseReviewPayload,
  DivingCourseReviewsQueryParams,
} from "@/models/divingCourse";
import { DIVING_COURSES_QUERY_KEY } from "./useDivingCourses";

export const DIVING_REVIEWS_QUERY_KEY = "divingCourseReviews";

export function useDivingCourseReviewsQuery(
  courseId?: string,
  params?: DivingCourseReviewsQueryParams,
  enabled = true
) {
  return useQuery({
    queryKey: [DIVING_REVIEWS_QUERY_KEY, courseId, params],
    queryFn: () => getDivingCourseReviews(courseId!, params),
    enabled: Boolean(courseId) && enabled,
  });
}

export function useDivingCourseReviewsAverageQuery(
  courseId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: [DIVING_REVIEWS_QUERY_KEY, "average", courseId],
    queryFn: () => getDivingCourseReviewsAverage(courseId!),
    enabled: Boolean(courseId) && enabled,
  });
}

export function useCreateDivingCourseReviewMutation(courseId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDivingCourseReviewPayload) =>
      createDivingCourseReview(courseId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DIVING_REVIEWS_QUERY_KEY, courseId],
      });
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Review submitted successfully");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to submit review";
      toast.error(msg);
    },
  });
}

export function useUpdateDivingCourseReviewStatusMutation(courseId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reviewId,
      status,
    }: {
      reviewId: string;
      status: number;
    }) => updateDivingCourseReviewStatus(reviewId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DIVING_REVIEWS_QUERY_KEY, courseId],
      });
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Review status updated");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update review status";
      toast.error(msg);
    },
  });
}
