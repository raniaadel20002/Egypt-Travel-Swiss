import type { Metadata } from "next";
import NotFoundPage from "@/components/UserComp/Common/NotFoundPage";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Egypt Dreams Travel",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
