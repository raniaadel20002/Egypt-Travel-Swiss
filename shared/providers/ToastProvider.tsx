"use client";

import { Toaster } from "sonner";
import { setupToastDeduplication } from "@/shared/utils/toastDeduplication";

setupToastDeduplication();

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans, sans-serif)",
        },
      }}
    />
  );
}
