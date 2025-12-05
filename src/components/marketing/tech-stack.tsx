const technologies = [
  {
    name: 'Next.js 16',
    description:
      'Latest React framework with Turbopack, Server Components, and Server Actions.',
  },
  {
    name: 'React 19',
    description:
      'Latest React with concurrent features, transitions, and improved performance.',
  },
  {
    name: 'Better Auth',
    description:
      'Modern auth library with sessions, OAuth, 2FA, and admin plugins built-in.',
  },
  {
    name: 'Drizzle ORM',
    description:
      'Type-safe ORM with automatic migrations, schema generation, and PostgreSQL support.',
  },
  {
    name: 'oRPC',
    description:
      'End-to-end typesafe RPC with TanStack Query integration and OpenAPI generation.',
  },
  {
    name: 'Shadcn UI',
    description:
      '50+ accessible components built with Radix UI primitives and Tailwind CSS.',
  },
  {
    name: 'TanStack Query',
    description:
      'Powerful data synchronization with caching, background updates, and optimistic UI.',
  },
  {
    name: 'Tailwind CSS',
    description:
      'Utility-first CSS framework with dark mode support and custom design system.',
  },
  {
    name: 'TypeScript',
    description:
      'Full type safety from database to UI with strict mode and Zod validation.',
  },
];

export function TechStack() {
  return (
    <section className="w-full border-t py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Modern Tech Stack
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Built with the latest stable technologies. No experimental features,
            no breaking changes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <div key={tech.name} className="rounded-lg border p-6">
              <h3 className="font-semibold">{tech.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
