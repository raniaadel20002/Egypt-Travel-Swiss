import { Suspense } from "react";
import BookingFormPage from "@/components/UserComp/Bookings/BookingFormPage";

export default function CheckoutRoute() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#F7EDE1] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#013E51] border-t-transparent animate-spin" />
        </div>
      }
    >
      <BookingFormPage />
    </Suspense>
  );
}
