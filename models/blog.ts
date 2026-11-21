export interface BlogSectionApiItem {
  id: number;
  sectionNumber: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  blogId?: number;
}

export interface BlogApiItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  blogSections: BlogSectionApiItem[];
  createdAt?: string;
  updatedAt?: string | null;
}

export interface CreateBlogSectionPayload {
  sectionNumber: number;
  title: string;
  content: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  blogSections: CreateBlogSectionPayload[];
}

export interface UpdateBlogSectionPayload {
  id: number;
  sectionNumber: number;
  title: string;
  content: string;
}

export interface UpdateBlogPayload {
  id: number;
  title: string;
  content: string;
  blogSections: UpdateBlogSectionPayload[];
}

export interface BlogsQueryParams {
  PageNumber?: number;
  PageSize?: number;
}

// Backward compatibility with public components
export interface BlogPostItem {
  id: string;
  tag: string;
  readTime: string;
  publishDate: string;
  title: string;
  excerpt: string;
  image: string;
  href?: string;
}
