"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AppLogo } from "@/components/app-logo"
import pathsConfig from "@/config/paths.config"
import { SearchCommandDialog } from "@/components/search-command-dialog"
import { NavPrimary } from "@/components/sidebar/nav-primary"
import { navPrimaryData, navResourceShopData, navSecondaryData, searchCommandData, navDocumentsData } from "./organization-sidebar-data"
import { NavResources } from "@/components/sidebar/nav-resources"
import { NavDocuments } from "@/components/sidebar/nav-documents"
import { User } from "@/components/auth-provider"

export function OrganizationSidebar({ user }: { user: User }) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <AppLogo path={pathsConfig.app.home} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPrimary items={navPrimaryData} />
        {/* <NavMain items={navMainData} /> */}
        <NavResources resource="Shop" items={navResourceShopData} />
        <NavDocuments items={navDocumentsData} />
        <NavSecondary items={navSecondaryData} className="mt-auto">
          <SearchCommandDialog commandsData={searchCommandData}>
            {({ open, setOpen }) => (
              <SidebarMenuItem
                className="bg-sidebar"
                onClick={() => setOpen(!open)}
              >
                <SidebarMenuButton>
                  <Search />
                  <span>Search</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-auto">
                    <span className="text-xs">⌘</span>J
                  </kbd>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SearchCommandDialog>
        </NavSecondary>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user.name,
          email: user.email,
          avatar: user.image ?? undefined,
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
