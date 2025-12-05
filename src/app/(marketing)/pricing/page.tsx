import Link from 'next/link';

import { Check, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  'Next.js 16 with Turbopack',
  'React 19 with Server Components',
  'Authentication with Better Auth',
  'Database with Drizzle ORM',
  'Type-safe APIs with oRPC',
  '50+ Shadcn UI components',
  'Dark mode support',
  'Role-based access control',
  'Two-factor authentication',
  'Admin dashboard',
  'User management',
  'Advanced data tables',
];

export default function PricingPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
            100% Free & Open Source
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            No Pricing. Just Code.
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            This is a free, open-source boilerplate. Clone it, fork it, build
            with it. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <Card className="border-primary relative border-2">
            <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-sm font-medium">
              <Heart className="h-3 w-3" />
              Forever Free
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Open Source</CardTitle>
              <CardDescription>
                Everything you need to build modern web apps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" asChild>
                <Link
                  href="https://github.com/htmujahid/next-bard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clone from GitHub
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/auth/sign-up">Try the Demo</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Like this project? Consider giving it a star on{' '}
            <Link
              href="https://github.com/htmujahid/next-bard"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
