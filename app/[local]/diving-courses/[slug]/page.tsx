import SingleDivingCoursePage from "@/components/UserComp/DivingCourses/Details/SingleDivingCoursePage";

interface SingleDivingCourseRouteProps {
  params: Promise<{ local: string; slug: string }>;
}

export default async function SingleDivingCourseRoute({
  params,
}: SingleDivingCourseRouteProps) {
  const { local, slug } = await params;
  return <SingleDivingCoursePage slug={slug} locale={local} />;
}
