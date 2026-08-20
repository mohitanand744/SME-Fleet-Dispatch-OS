import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/templates/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SME Fleet & Dispatch OS",
  description: "Manage your fleet and dispatch operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.className} bg-[#0E1528] text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
