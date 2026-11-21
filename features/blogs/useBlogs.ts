import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlog,
  deleteBlog,
  deleteBlogImage,
  deleteBlogSectionImage,
  getBlogById,
  getBlogs,
  updateBlog,
  uploadBlogImage,
  uploadBlogSectionImage,
} from "@/clientApi/blogsApi";
import {
  BlogApiItem,
  BlogsQueryParams,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "@/models/blog";

export const BLOGS_QUERY_KEY = ["blogs"] as const;

export function useBlogsQuery(params?: BlogsQueryParams) {
  return useQuery<BlogApiItem[]>({
    queryKey: [...BLOGS_QUERY_KEY, "list", params],
    queryFn: () => getBlogs(params),
  });
}

export function useBlogDetailQuery(id?: number) {
  return useQuery<BlogApiItem>({
    queryKey: [...BLOGS_QUERY_KEY, "detail", id],
    queryFn: () => getBlogById(id!),
    enabled: Boolean(id && id > 0),
  });
}

export function useCreateBlogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBlogPayload) => createBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateBlogPayload }) =>
      updateBlog(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useUploadBlogImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blogId, file }: { blogId: number; file: File }) =>
      uploadBlogImage(blogId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useDeleteBlogImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBlogImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useUploadBlogSectionImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      blogId,
      sectionId,
      file,
    }: {
      blogId: number;
      sectionId: number;
      file: File;
    }) => uploadBlogSectionImage(blogId, sectionId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useDeleteBlogSectionImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sectionId: number) => deleteBlogSectionImage(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}
