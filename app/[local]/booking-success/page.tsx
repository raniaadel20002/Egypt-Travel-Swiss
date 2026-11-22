import { Suspense } from "react";
import BookingSuccessPage from "@/components/UserComp/BookingSuccess/BookingSuccessPage";

interface PageProps {
  params: Promise<{ local: string }>;
}

export default async function Page({ params }: PageProps) {
  const { local } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF8F3] flex items-center justify-center p-8">
          <div className="w-8 h-8 border-4 border-[#013E51]/20 border-t-[#013E51] rounded-full animate-spin" />
        </div>
      }
    >
      <BookingSuccessPage locale={local} />
    </Suspense>
  );
}
