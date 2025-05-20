import Link from "next/link";
import { headers } from "next/headers";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { NavUser } from "./nav-user";

export async function Header() {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  const user = data?.user;

  return (
    <header className="flex items-center justify-between h-14">
      <Link href="/" className="flex-1">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          ~
        </div>
      </Link>
      <div className="flex items-center">
        <Link href="/">
          <Button variant="link" className="cursor-pointer text-muted-foreground hover:no-underline hover:text-primary">
            Home
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="link" className="cursor-pointer text-muted-foreground hover:no-underline hover:text-primary">
            About
          </Button>
        </Link>
        <Link href="/pricing">
          <Button variant="link" className="cursor-pointer text-muted-foreground hover:no-underline hover:text-primary">
            Pricing
          </Button>
        </Link>
        <Link href="/docs">
          <Button variant="link" className="cursor-pointer text-muted-foreground hover:no-underline hover:text-primary">
            Docs
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2 flex-1 justify-end">
        {
          user ? (
            <NavUser user={user} />
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button variant="outline">
                  Login
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>
                  Sign Up
                </Button>
              </Link>
            </>
          )
        }
      </div>
    </header>
  )
}
