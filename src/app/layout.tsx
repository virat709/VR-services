import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import GoldFall from "@/components/GoldFall";
import ThreeBackgroundClient from "@/components/ThreeBackgroundClient";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "V4 Virtual Services — Marketing, SaaS & Automations",
  description: "V4 Virtual Services delivers SaaS management platforms including V4Stay for hotel automation, restaurant QR ordering, and PG management. Also offering marketing and automation services.",
  icons: { icon: "/v4logo.png" },
  metadataBase: new URL("https://v4services.in"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.variable} antialiased`}>
        <ThreeBackgroundClient />
        <GoldFall />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
