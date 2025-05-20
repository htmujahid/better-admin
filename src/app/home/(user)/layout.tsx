import { AppBreadcrumbs } from "@/components/app-breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserSidebar } from "./_components/user-sidebar"
import { redirect } from "next/navigation"
import pathsConfig from "@/config/paths.config"
import { getSession } from "./_lib/actions/get-session"

export default async function UserLayout({
  children
}: {
  children: React.ReactNode
}) {
  const data = await getSession();

  if (!data) {
    redirect(pathsConfig.auth.signIn);
  }

  const user = data.user

  return (
    <SidebarProvider>
      <UserSidebar user={user} />
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
