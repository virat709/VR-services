import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import GoldFall from "@/components/GoldFall";
import ThreeBackgroundClient from "@/components/ThreeBackgroundClient";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "V4 Virtual Services — Marketing, SaaS & Automations",
  description: "V4 Virtual Services delivers SaaS management platforms including V4Stay for hotel automation, restaurant QR ordering, and PG management. Also offering marketing and automation services.",
  keywords: ["Hospitality Software", "Hotel Automation", "Restaurant QR Menu", "PG Management Software", "SaaS", "V4Stay", "Digital Marketing"],
  openGraph: {
    title: "V4 Virtual Services — SaaS & Automations",
    description: "Cloud-based SaaS platforms for hotels, restaurants, and PGs. Manage your property and orders with zero hardware requirements.",
    url: "https://v4services.in",
    siteName: "V4 Virtual Services",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "V4 Virtual Services — SaaS & Automations",
    description: "Cloud-based SaaS platforms for hotels, restaurants, and PGs.",
  },
  icons: { icon: "/v4logo.png" },
  metadataBase: new URL("https://v4services.in"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "V4 Virtual Services",
        "url": "https://v4services.in",
        "logo": "https://v4services.in/v4logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-97140-56759",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "V4Stay",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${orbitron.variable} antialiased`}>
        <ThreeBackgroundClient />
        <CursorGlow />
        <GoldFall />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
