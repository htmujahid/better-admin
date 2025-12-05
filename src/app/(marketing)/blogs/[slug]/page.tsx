import { notFound } from 'next/navigation';

import { Footer } from '@/components/marketing/footer';
import { Header } from '@/components/marketing/header';
import { Badge } from '@/components/ui/badge';
import { getContentItemBySlug, getContentItems } from '@/lib/keystatic/reader';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const { items: blogs } = await getContentItems({
    collection: 'blogs',
    status: 'published',
  });
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getContentItemBySlug(slug, { collection: 'blogs' });

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getContentItemBySlug(slug, { collection: 'blogs' });

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <Header />
      <article className="py-12">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {blog.tags?.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="text-muted-foreground text-xl">{blog.description}</p>
          )}

          <div className="mt-8 flex items-center justify-center gap-4">
            {blog.publishedAt && (
              <time
                dateTime={blog.publishedAt}
                className="text-muted-foreground"
              >
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>
        </header>

        {blog.image && (
          <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-lg">
            <img src={blog.image} alt={blog.title} className="h-auto w-full" />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
          {blog.content}
        </div>
      </article>
      <Footer />
    </div>
  );
}
