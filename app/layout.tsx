import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "../public/fonts/cormorant-400.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/cormorant-500.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/cormorant-600.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/cormorant-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = localFont({
  src: [
    { path: "../public/fonts/lato-300.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/lato-400.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/lato-700.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/lato-900.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Egypt Dreams Travel",
  description: "Egypt Dreams Travel Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable} overflow-x-clip`}>
      <body className="font-sans antialiased overflow-x-clip min-h-screen text-[#013E51] bg-white">
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
