import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "سیستم مدیریت نگهداری و تعمیرات | CMMS",
  description: "سیستم حرفه‌ای مدیریت نگهداری و تعمیرات تجهیزات",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full font-[family-name:var(--font-vazirmatn)] bg-gray-50">
        {children}
      </body>
    </html>
  );
}
