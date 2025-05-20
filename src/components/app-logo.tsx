import Link from 'next/link';

export function AppLogo({ path }: { path?: string }) {
  return (
    <Link
      href={path ?? '/'}
      className="flex items-center gap-2 self-center font-medium"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        ~
      </div>
      Better Admin
    </Link>
  )
}