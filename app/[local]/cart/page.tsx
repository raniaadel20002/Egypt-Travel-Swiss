import { Suspense } from "react";
import CartPage from "@/components/UserComp/Cart/CartPage";

export default function CartRoute() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#F7EDE1] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#013E51] border-t-transparent animate-spin" />
        </div>
      }
    >
      <CartPage />
    </Suspense>
  );
}
