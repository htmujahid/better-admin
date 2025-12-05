import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="w-full border-t py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Building?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Clone the repository and have your project running in minutes. Free
            forever, no strings attached.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Try the Demo</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link
                href="https://github.com/htmujahid/next-bard"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
