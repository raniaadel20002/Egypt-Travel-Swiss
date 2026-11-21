import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  BlogApiItem,
  BlogsQueryParams,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "@/models/blog";

export async function getBlogs(
  params?: BlogsQueryParams
): Promise<BlogApiItem[]> {
  const response = await apiClient.get<ApiResponse<BlogApiItem[]>>(
    "/api/Blogs",
    {
      params: {
        PageNumber: params?.PageNumber ?? 1,
        PageSize: params?.PageSize ?? 20,
      },
    }
  );
  return response.data?.data || [];
}

export async function getBlogById(id: number): Promise<BlogApiItem> {
  const response = await apiClient.get<ApiResponse<BlogApiItem>>(
    `/api/Blogs/${id}`
  );
  return response.data.data;
}

export async function createBlog(
  payload: CreateBlogPayload
): Promise<BlogApiItem> {
  const response = await apiClient.post<ApiResponse<BlogApiItem>>(
    "/api/Blogs",
    payload
  );
  return response.data.data;
}

export async function updateBlog(
  id: number,
  payload: UpdateBlogPayload
): Promise<BlogApiItem> {
  const response = await apiClient.put<ApiResponse<BlogApiItem>>(
    `/api/Blogs/${id}`,
    payload
  );
  return response.data.data;
}

export async function deleteBlog(id: number): Promise<void> {
  await apiClient.delete(`/api/Blogs/${id}`);
}

export async function uploadBlogImage(
  blogId: number,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<string>>(
    "/api/Blogs/image",
    formData,
    {
      params: { blogid: blogId },
    }
  );
  return response.data.data;
}

export async function uploadBlogSectionImage(
  blogId: number,
  sectionId: number,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<string>>(
    "/api/Blogs/section/image",
    formData,
    {
      params: { blogid: blogId, sectionid: sectionId },
    }
  );
  return response.data.data;
}

export async function deleteBlogImage(id: number): Promise<void> {
  await apiClient.delete(`/api/Blogs/${id}/image`);
}

export async function deleteBlogSectionImage(sectionId: number): Promise<void> {
  await apiClient.delete(`/api/Blogs/section/${sectionId}/image`);
}
