import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vicky | Data Analyst Portfolio",
  description: "Turning raw chaos into clean insights. A Gen-Z dark rave aesthetic portfolio showcasing data analysis expertise.",
  keywords: ["data analyst", "portfolio", "data visualization", "machine learning", "python", "sql"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
