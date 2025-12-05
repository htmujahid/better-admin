import Link from 'next/link';

import { Button } from '@/components/ui/button';

const techStack = [
  {
    name: 'Next.js 16',
    description: 'React framework with Turbopack and Server Components',
  },
  {
    name: 'React 19',
    description: 'Latest React with concurrent features',
  },
  {
    name: 'Better Auth',
    description: 'Authentication with sessions, OAuth, and 2FA',
  },
  {
    name: 'Drizzle ORM',
    description: 'Type-safe ORM with migrations',
  },
  {
    name: 'oRPC',
    description: 'End-to-end typesafe RPC',
  },
  {
    name: 'Shadcn UI',
    description: '50+ accessible components',
  },
  {
    name: 'TanStack Query',
    description: 'Data fetching and caching',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first styling',
  },
  {
    name: 'TypeScript',
    description: 'Full type safety',
  },
  {
    name: 'PostgreSQL',
    description: 'Relational database',
  },
  {
    name: 'Zod',
    description: 'Schema validation',
  },
  {
    name: 'React Hook Form',
    description: 'Form handling',
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About Next Bard
            </h1>
            <p className="text-muted-foreground text-lg">
              A production-ready Next.js boilerplate for building modern web
              applications
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 text-2xl font-semibold">What is this?</h2>
              <p className="text-muted-foreground mb-4">
                Next Bard is a comprehensive, production-ready boilerplate
                designed to help developers skip weeks of initial setup. It
                combines authentication, user management, admin dashboards, and
                a complete UI component library into a single, well-organized
                codebase.
              </p>
              <p className="text-muted-foreground">
                Whether you&apos;re building a SaaS product, internal tool, or
                any full-stack application, this boilerplate provides everything
                you need from day one.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Why Next Bard?</h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  <strong className="text-foreground">Save time.</strong> Stop
                  rebuilding authentication, user management, and admin panels
                  for every project. Start with a working foundation.
                </p>
                <p>
                  <strong className="text-foreground">Modern stack.</strong>{' '}
                  Built with Next.js 16, React 19, and the latest tools. No
                  legacy code, no deprecated dependencies.
                </p>
                <p>
                  <strong className="text-foreground">Type-safe.</strong> Full
                  TypeScript coverage from database to UI. Catch errors at
                  compile time, not runtime.
                </p>
                <p>
                  <strong className="text-foreground">Production-ready.</strong>{' '}
                  Security best practices, proper error handling, and
                  performance optimizations included.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Tech Stack</h2>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {techStack.map((tech) => (
                  <div key={tech.name} className="rounded-lg border p-4">
                    <h3 className="font-medium">{tech.name}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-medium">Authentication</h3>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>Email/password authentication</li>
                    <li>OAuth providers (GitHub, Google)</li>
                    <li>Email verification</li>
                    <li>Password reset</li>
                    <li>Two-factor authentication</li>
                    <li>Session management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Admin Panel</h3>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>User management</li>
                    <li>Role assignment</li>
                    <li>Ban/unban users</li>
                    <li>Session tracking</li>
                    <li>User impersonation</li>
                    <li>Bulk actions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">User Dashboard</h3>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>Profile management</li>
                    <li>Security settings</li>
                    <li>Active sessions</li>
                    <li>2FA configuration</li>
                    <li>Account deletion</li>
                    <li>Image upload</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Developer Experience</h3>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>TypeScript strict mode</li>
                    <li>ESLint & Prettier</li>
                    <li>Database migrations</li>
                    <li>API documentation</li>
                    <li>Docker support</li>
                    <li>Environment setup</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Open Source</h2>
              <p className="text-muted-foreground mb-4">
                Next Bard is completely free and open source under the MIT
                license. Use it for personal or commercial projects, modify it
                to fit your needs, and contribute back to the community.
              </p>
              <Button asChild>
                <Link
                  href="https://github.com/htmujahid/next-bard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Link>
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
