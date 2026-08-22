import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/templates/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0E1528",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fleetdispatch.io"),
  title: {
    default: "Apex Fleet OS | SME Fleet & Dispatch Operating System",
    template: "%s | Apex Fleet OS",
  },
  description:
    "Next-Generation Commercial Fleet Management, Live GPS Telemetry, Multi-Desk Dispatching, and Carrier Compliance Platform.",
  keywords: [
    "Fleet Management",
    "Dispatch OS",
    "Commercial Trucking",
    "Telematics",
    "Route Optimization",
    "IFTA Fuel Tax",
    "Carrier Compliance",
    "Freight Logistics",
  ],
  authors: [{ name: "Apex Fleet Technologies" }],
  icons: {
    icon: [
      { url: "/LOGO.png", type: "image/png" },
      { url: "/LOGO.png", sizes: "32x32", type: "image/png" },
      { url: "/LOGO.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/LOGO.png",
    apple: [
      { url: "/LOGO.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Apex Fleet OS | SME Fleet & Dispatch Operating System",
    description:
      "Next-Generation Commercial Fleet Management, Live GPS Telemetry, Multi-Desk Dispatching, and Carrier Compliance Platform.",
    url: "https://fleetdispatch.io",
    siteName: "Apex Fleet & Dispatch OS",
    images: [
      {
        url: "/LOGO.png",
        width: 800,
        height: 800,
        alt: "Apex Fleet OS Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Fleet OS | SME Fleet & Dispatch Operating System",
    description:
      "Next-Generation Commercial Fleet Management, Live GPS Telemetry, Multi-Desk Dispatching, and Carrier Compliance Platform.",
    images: ["/LOGO.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="icon" href="/LOGO.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/LOGO.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/LOGO.png?v=2" />
      </head>
      <body className={`${inter.className} bg-[#0E1528] text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
