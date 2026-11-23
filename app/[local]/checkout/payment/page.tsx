import { Suspense } from "react";
import CheckoutPaymentPage from "@/components/UserComp/Payments/CheckoutPaymentPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-[#F7EDE1] min-h-screen py-16 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#013E51] border-t-transparent animate-spin" />
        </div>
      }
    >
      <CheckoutPaymentPage />
    </Suspense>
  );
}
