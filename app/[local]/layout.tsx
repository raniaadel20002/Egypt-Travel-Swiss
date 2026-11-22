import { notFound } from "next/navigation";
import LocaleProvider from "@/shared/providers/LocaleProvider";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import { isValidLocale, SupportedLocale } from "@/features/i18n/i18nConfig";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ local: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.local;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale as SupportedLocale}>
      <div className="flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
