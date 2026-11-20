import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteDivingCourseImage,
  getDivingCourseImages,
  reorderDivingCourseImages,
  uploadDivingCourseImage,
} from "@/clientApi/divingCoursesApi";
import { ReorderCourseItemPayload } from "@/models/divingCourse";
import { DIVING_COURSES_QUERY_KEY } from "./useDivingCourses";

export const DIVING_IMAGES_QUERY_KEY = "divingCourseImages";

export function useDivingCourseImagesQuery(courseId?: string, enabled = true) {
  return useQuery({
    queryKey: [DIVING_IMAGES_QUERY_KEY, courseId],
    queryFn: () => getDivingCourseImages(courseId!),
    enabled: Boolean(courseId) && enabled,
  });
}

export function useUploadDivingCourseImageMutation(courseId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadDivingCourseImage(courseId!, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DIVING_IMAGES_QUERY_KEY, courseId],
      });
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Image uploaded successfully");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to upload image";
      toast.error(msg);
    },
  });
}

export function useDeleteDivingCourseImageMutation(courseId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId: string) =>
      deleteDivingCourseImage(courseId!, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DIVING_IMAGES_QUERY_KEY, courseId],
      });
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Image deleted successfully");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete image";
      toast.error(msg);
    },
  });
}

export function useReorderDivingCourseImagesMutation(courseId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: ReorderCourseItemPayload[]) =>
      reorderDivingCourseImages(courseId!, items),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DIVING_IMAGES_QUERY_KEY, courseId],
      });
      queryClient.invalidateQueries({ queryKey: [DIVING_COURSES_QUERY_KEY] });
      toast.success("Images order saved");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update images order";
      toast.error(msg);
    },
  });
}
