import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { SITE_URL, SITE_NAME, ORG_LOGO } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  if (!blog) return { title: "Blog Not Found" };

  const url = `${SITE_URL}/blog/${blog.slug}`;

  return {
    title: `${blog.title} — V4 Virtual Services`,
    description: blog.excerpt,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      images: [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${blog.slug}`;
  const publishedDate = new Date(blog.date).toISOString();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: `${SITE_URL}${blog.coverImage}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: postUrl,
      },
    ],
  };

  // Convert basic markdown-like content to HTML structure safely (just for our hardcoded data)
  const renderInline = (text: string, keys: string) => {
    // Parse simple [label](url) links inside a paragraph
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
    return parts.map((part, i) => {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, href] = match;
        const isInternal = href.startsWith("/");
        return (
          <Link
            key={`${keys}-${i}`}
            href={href}
            {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="text-sky-400 hover:text-sky-300 underline decoration-sky-500/40 underline-offset-2"
          >
            {label}
          </Link>
        );
      }
      return <span key={`${keys}-${i}`}>{part}</span>;
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.trim().startsWith('###')) {
        return <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 font-heading">{paragraph.replace('###', '').trim()}</h2>;
      }
      if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
        return <h3 key={idx} className="text-xl font-bold text-sky-400 mt-8 mb-3">{paragraph.replace(/\*\*/g, '').trim()}</h3>;
      }

      // Handle simple lists
      if (paragraph.trim().startsWith('- ')) {
        const items = paragraph.split('\n').map(item => item.replace('- ', '').trim());
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 mb-6 text-gray-300">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }

      return <p key={idx} className="mb-6 leading-relaxed text-gray-300 text-lg">{renderInline(paragraph.trim(), `p${idx}`)}</p>;
    });
  };

  const relatedPosts = blogs.filter((b) => b.slug !== blog.slug);

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="bg-layer absolute inset-0 bg-night-950" />
      <div className="bg-orb absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl" />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-sky-400 transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{blog.title}</span>
        </nav>

        <Link href="/blog" className="inline-flex items-center text-sky-400 text-sm font-semibold mb-10 hover:text-sky-300 transition-colors">
          ← Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-semibold uppercase tracking-widest">
            <time dateTime={publishedDate}>{blog.date}</time>
            <span>•</span>
            <span>{blog.author}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-tight font-heading">
            {blog.title}
          </h1>

          {/* Quick answer summary — direct answer for AI/answer engines */}
          <div className="glass-panel rounded-2xl p-6 border border-sky-500/10 mb-10">
            <p className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-2">Quick Answer</p>
            <p className="text-gray-300 leading-relaxed">{blog.excerpt}</p>
          </div>

          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-night-700/50 shadow-2xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        </header>

        <div className="prose prose-invert prose-sky max-w-none">
          {formatContent(blog.content)}
        </div>

        {/* Related articles — internal links */}
        <section aria-label="Related articles" className="mt-16 border-t border-night-700/50 pt-10">
          <h2 className="text-2xl font-bold text-white mb-6 font-heading">Related Articles</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-panel rounded-2xl p-6 border border-night-700/50 hover:border-sky-500/30 transition-colors group flex flex-col"
              >
                <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-sky-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <span className="text-sky-400 text-sm font-semibold mt-4">
                  Read article
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </article>
    </div>
  );
}
