import { Suspense } from "react";
import FlightsPage from "@/components/UserComp/Flights/FlightsPage";

export default function FlightsRoutePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <FlightsPage />
    </Suspense>
  );
}
