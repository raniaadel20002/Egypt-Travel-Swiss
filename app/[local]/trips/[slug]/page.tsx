import TripDetailPage from "@/components/UserComp/Trips/Details/TripDetailPage";

interface TripDetailRouteProps {
  params: Promise<{ local: string; slug: string }>;
}

export default async function TripDetailRoute({
  params,
}: TripDetailRouteProps) {
  const { local, slug } = await params;
  return <TripDetailPage slug={slug} locale={local} />;
}
