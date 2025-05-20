import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-16 md:py-28 lg:py-36 xl:py-44 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Welcome to Our Platform</span>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mt-5">
              Transform Your Digital Experience
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-5">
              Beautifully designed solutions that help you stand out in today&apos;s competitive landscape.
            </p>
          <div className="space-x-4 mt-8">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
