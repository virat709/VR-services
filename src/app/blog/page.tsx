import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — V4 Virtual Services",
  description: "Guides on hotel automation, restaurant QR ordering, PG property management, marketing and automations from the V4Stay team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — V4 Virtual Services",
    description: "Guides on hotel automation, restaurant QR ordering, PG property management, marketing and automations from the V4Stay team.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "V4 Virtual Services blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — V4 Virtual Services",
    description: "Guides on hotel automation, restaurant QR ordering, PG property management, marketing and automations.",
    images: [OG_IMAGE],
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="bg-layer absolute inset-0 bg-gradient-to-b from-night-950 via-night-900 to-night-950" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Blog</span>
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-heading gradient-text mb-4">
            Insights & Resources
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends in hospitality software, marketing strategies, and automation technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group glass-panel rounded-2xl overflow-hidden border border-night-700/50 hover:border-sky-500/30 transition-colors flex flex-col h-full">
              <div className="relative h-48 w-full overflow-hidden border-b border-night-700/50">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-night-950/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sky-400 text-xs font-semibold mb-3 tracking-widest uppercase">{blog.date}</p>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {blog.excerpt}
                </p>
                <div className="flex items-center text-sky-400 text-sm font-semibold mt-auto">
                  Read Article
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
