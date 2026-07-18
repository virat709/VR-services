import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";

export const metadata = {
  title: "Blog — V4 Virtual Services",
  description: "Read the latest insights on hotel automation, restaurant QR ordering, and PG property management.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="bg-layer absolute inset-0 bg-gradient-to-b from-night-950 via-night-900 to-night-950" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
