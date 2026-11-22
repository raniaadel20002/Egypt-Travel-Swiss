export interface BlogLocalizedText {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

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
  title: BlogLocalizedText;
  content: BlogLocalizedText;
}

export interface CreateBlogPayload {
  title: BlogLocalizedText;
  content: BlogLocalizedText;
  blogSections: CreateBlogSectionPayload[];
}

export interface UpdateBlogSectionPayload {
  id: number;
  sectionNumber: number;
  title: BlogLocalizedText;
  content: BlogLocalizedText;
}

export interface UpdateBlogPayload {
  id: number;
  title: BlogLocalizedText;
  content: BlogLocalizedText;
  blogSections: UpdateBlogSectionPayload[];
}

export interface BlogsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  language?: string;
}

export interface BlogMultiLangSectionItem {
  id: number;
  sectionNumber: number;
  title: BlogLocalizedText;
  content: BlogLocalizedText;
  imageUrl?: string | null;
}

export interface BlogMultiLangDetails {
  id: number;
  title: BlogLocalizedText;
  content: BlogLocalizedText;
  imageUrl?: string | null;
  blogSections: BlogMultiLangSectionItem[];
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
