import BlogDetailPage from "@/components/UserComp/Blog/BlogDetailPage";

interface BlogDetailRouteProps {
  params: Promise<{ local: string; slug: string }>;
}

export default async function BlogDetailRoute({
  params,
}: BlogDetailRouteProps) {
  const { local, slug } = await params;
  return <BlogDetailPage slug={slug} locale={local} />;
}
