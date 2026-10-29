import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import GoldFall from "@/components/GoldFall";
import ThreeBackgroundClient from "@/components/ThreeBackgroundClient";
import CursorGlow from "@/components/CursorGlow";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  ORG_LOGO,
  OG_IMAGE,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "V4 Virtual Services — Automation & SaaS in Ahmedabad",
  description: SITE_DESCRIPTION,
  keywords: [
    "automation services Ahmedabad",
    "business automation Gujarat",
    "hotel automation software",
    "restaurant QR ordering system",
    "PG management software India",
    "hospitality SaaS",
    "V4Stay",
    "digital marketing Ahmedabad",
    "V4 Virtual Services",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "V4 Virtual Services — Automation & SaaS in Ahmedabad",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "V4 Virtual Services — SaaS dashboards for hotels, restaurants and PGs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "V4 Virtual Services — Automation & SaaS in Ahmedabad",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: { icon: "/v4logo.png" },
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "lxAeXKf9BIxlNVTHVEJVnJvpr1Yzn0GJi8tvBr5y2C4",
  },
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
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": ORG_LOGO,
        },
        "description":
          "V4 Virtual Services provides automation services in Ahmedabad and Gujarat — hotel automation, restaurant QR ordering, and PG management software — plus digital marketing and business automation services.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ahmedabad",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 23.0225,
          "longitude": 72.5714
        },
        "areaServed": [
          { "@type": "City", "name": "Ahmedabad" },
          { "@type": "State", "name": "Gujarat" },
          { "@type": "Country", "name": "India" }
        ],
        "knowsAbout": [
          "Hotel automation",
          "Restaurant QR ordering",
          "PG property management software",
          "Digital marketing",
          "Business process automation"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/106299753/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-97140-56759",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": SITE_NAME,
        "description": SITE_DESCRIPTION,
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "inLanguage": "en"
      },
      {
        "@type": "SoftwareApplication",
        "name": "V4Stay",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "description": "Cloud-based SaaS platform for hotel automation, restaurant QR ordering, and PG management. No hardware required.",
        "featureList": [
          "Hotel automation with QR room service",
          "Restaurant QR menu ordering",
          "PG rent tracking and tenant portal",
          "Live manager dashboard and analytics"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "publisher": { "@id": `${SITE_URL}/#organization` }
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
