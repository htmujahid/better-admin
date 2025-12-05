import Link from 'next/link';

import { Footer } from '@/components/marketing/footer';
import { Header } from '@/components/marketing/header';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getContentItems } from '@/lib/keystatic/reader';

export default async function BlogsPage() {
  const { items: publishedBlogs } = await getContentItems({
    collection: 'blogs',
    status: 'published',
  });

  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Insights, updates, and stories from our team
          </p>
        </div>

        {publishedBlogs.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedBlogs.map((blog) => (
              <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
                <Card className="h-full pt-0">
                  {blog.image && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {blog.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-2">
                      {blog.tags?.map((tag) => (
                        <Badge key={tag.id} variant="secondary">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    {blog.publishedAt && (
                      <p className="text-muted-foreground mt-4 text-sm">
                        {new Date(blog.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
