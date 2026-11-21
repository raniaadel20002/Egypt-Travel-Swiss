import AccommodationDetailPage from "@/components/UserComp/Accommodation/AccommodationDetailPage";

interface AccommodationDetailRouteProps {
  params: Promise<{ local: string; slug: string }>;
}

export default async function AccommodationDetailRoute({
  params,
}: AccommodationDetailRouteProps) {
  const { local, slug } = await params;
  return <AccommodationDetailPage slug={slug} locale={local} />;
}
