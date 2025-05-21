import { AppBreadcrumbs } from "@/components/app-breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "./_components/admin-sidebar"
import { withAuthenticate } from "@/lib/with-authenticate"
import { User } from "@/components/auth-provider"

async function AdminLayout({
  children,
  user
}: {
  children: React.ReactNode
  user: User
}) {
  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
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

export default withAuthenticate(AdminLayout, {
  role: 'admin'
})
