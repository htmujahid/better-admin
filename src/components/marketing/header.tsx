import { headers } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

import { NavUser } from './nav-user';

export async function Header() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const user = data?.user;

  return (
    <header className="flex h-14 items-center justify-between">
      <Link href="/" className="flex-1">
        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
          ~
        </div>
      </Link>
      <div className="flex items-center">
        <Link href="/">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer hover:no-underline"
          >
            Home
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer hover:no-underline"
          >
            About
          </Button>
        </Link>
        <Link href="/pricing">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer hover:no-underline"
          >
            Pricing
          </Button>
        </Link>
        <Link href="/blogs">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer hover:no-underline"
          >
            Blogs
          </Button>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        {user ? (
          <NavUser user={user} />
        ) : (
          <>
            <Link href="/auth/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
