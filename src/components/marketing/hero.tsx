import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-muted-foreground mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm">
            Free & Open Source
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Production-Ready Next.js SaaS Boilerplate
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg md:text-xl">
            Skip weeks of setup. Authentication, admin dashboard, user
            management, and 50+ UI components ready to go. Built with Next.js
            16, Better Auth, Drizzle, and Shadcn UI.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
          <div className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            <span>Next.js 16</span>
            <span className="hidden sm:inline">·</span>
            <span>React 19</span>
            <span className="hidden sm:inline">·</span>
            <span>Better Auth</span>
            <span className="hidden sm:inline">·</span>
            <span>Drizzle ORM</span>
            <span className="hidden sm:inline">·</span>
            <span>oRPC</span>
            <span className="hidden sm:inline">·</span>
            <span>Shadcn UI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
