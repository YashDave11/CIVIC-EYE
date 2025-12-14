import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civic Eye | Smart Surveillance Initiative",
  description: "Government of Rajasthan Smart Cities Mission Initiative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-slate-600 bg-white selection:bg-navy-100 selection:text-navy-900 flex flex-col min-h-screen`}>{children}</body>
    </html>
  );
}
