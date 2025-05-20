import { AppBreadcrumbs } from "@/components/app-breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { OrganizationSidebar } from "./_components/organization-sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import pathsConfig from "@/config/paths.config"
import { headers } from "next/headers"

export default async function OrganizationLayout({
  children
}: {
  children: React.ReactNode
}) {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  if (!data) {
    redirect(pathsConfig.auth.signIn)
  }

  const user = data.user

  return (
    <SidebarProvider>
      <OrganizationSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppBreadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
