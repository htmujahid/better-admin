export function QuickStart() {
  return (
    <section className="w-full border-t py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Clone, configure, and deploy. Three steps to your next project.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
          <div className="flex gap-4">
            <div className="text-muted-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-sm font-medium">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Clone the repository</h3>
              <div className="bg-muted mt-3 rounded-lg p-4">
                <code className="text-sm">
                  git clone https://github.com/htmujahid/next-bard.git
                </code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-muted-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-sm font-medium">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">
                Install dependencies & configure
              </h3>
              <div className="bg-muted mt-3 space-y-2 rounded-lg p-4">
                <code className="block text-sm">npm install</code>
                <code className="block text-sm">cp example.env .env</code>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Update .env with your database URL and OAuth credentials.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-muted-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-sm font-medium">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Run migrations & start</h3>
              <div className="bg-muted mt-3 space-y-2 rounded-lg p-4">
                <code className="block text-sm">npm run db:push</code>
                <code className="block text-sm">npm run dev</code>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Open http://localhost:3000 and start building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
