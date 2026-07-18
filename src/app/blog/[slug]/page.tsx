import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} — V4 Virtual Services`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    }
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

  // Convert basic markdown-like content to HTML structure safely (just for our hardcoded data)
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.trim().startsWith('###')) {
        return <h3 key={idx} className="text-2xl font-bold text-white mt-10 mb-4 font-heading">{paragraph.replace('###', '').trim()}</h3>;
      }
      if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
        return <h4 key={idx} className="text-xl font-bold text-sky-400 mt-8 mb-3">{paragraph.replace(/\*\*/g, '').trim()}</h4>;
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

      return <p key={idx} className="mb-6 leading-relaxed text-gray-300 text-lg">{paragraph.trim()}</p>;
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="bg-layer absolute inset-0 bg-night-950" />
      <div className="bg-orb absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl" />
      
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/blog" className="inline-flex items-center text-sky-400 text-sm font-semibold mb-10 hover:text-sky-300 transition-colors">
          ← Back to Blog
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-semibold uppercase tracking-widest">
            <time>{blog.date}</time>
            <span>•</span>
            <span>{blog.author}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-tight font-heading">
            {blog.title}
          </h1>
          
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-night-700/50 shadow-2xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        <div className="prose prose-invert prose-sky max-w-none">
          {formatContent(blog.content)}
        </div>
      </article>
    </div>
  );
}
