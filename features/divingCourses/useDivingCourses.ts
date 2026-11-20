import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createDivingCourse,
  deleteDivingCourse,
  getDivingCourseById,
  getDivingCourseAllLanguages,
  getDivingCourses,
  reorderDivingCourseFacilities,
  updateDivingCourse,
} from "@/clientApi/divingCoursesApi";
import {
  CreateDivingCoursePayload,
  DivingCoursesQueryParams,
  ReorderCourseItemPayload,
  UpdateDivingCoursePayload,
} from "@/models/divingCourse";

export const DIVING_COURSES_QUERY_KEY = "divingCourses";

export function useDivingCoursesQuery(params?: DivingCoursesQueryParams) {
  return useQuery({
    queryKey: [DIVING_COURSES_QUERY_KEY, params],
    queryFn: () => getDivingCourses(params),
  });
}

export function useDivingCourseByIdQuery(id?: string, language = "en") {
  return useQuery({
    queryKey: [DIVING_COURSES_QUERY_KEY, "detail", id, language],
    queryFn: () => getDivingCourseById(id!, language),
    enabled: Boolean(id),
  });
}

export function useDivingCourseMultiLangQuery(id?: string, enabled = true) {
  return useQuery({
    queryKey: [DIVING_COURSES_QUERY_KEY, "multiLang", id],
    queryFn: () => getDivingCourseAllLanguages(id!),
    enabled: Boolean(id) && enabled,
    staleTime: 0,
  });
}

export function useCreateDivingCourseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDivingCoursePayload) =>
      createDivingCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Diving course created successfully");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to create diving course";
      toast.error(msg);
    },
  });
}

export function useUpdateDivingCourseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateDivingCoursePayload) =>
      updateDivingCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Diving course updated successfully");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update diving course";
      toast.error(msg);
    },
  });
}

export function useDeleteDivingCourseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDivingCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Diving course deleted successfully");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete diving course";
      toast.error(msg);
    },
  });
}

export function useReorderDivingCourseFacilitiesMutation(courseId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: ReorderCourseItemPayload[]) =>
      reorderDivingCourseFacilities(courseId!, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Facilities order updated");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update facilities order";
      toast.error(msg);
    },
  });
}
