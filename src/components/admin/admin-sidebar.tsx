'use client';

import { User } from 'better-auth';
import { Search } from 'lucide-react';

import { AppLogo } from '@/components/app-logo';
import { SearchCommandDialog } from '@/components/search-command-dialog';
import { NavDocuments } from '@/components/sidebar/nav-documents';
import { NavPrimary } from '@/components/sidebar/nav-primary';
import { NavResources } from '@/components/sidebar/nav-resources';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import pathsConfig from '@/config/paths.config';

import {
  navDocumentsData,
  navPrimaryData,
  navResourceShopData,
  navSecondaryData,
  searchCommandData,
} from './admin-sidebar-data';

export function AdminSidebar({ user }: { user: User }) {
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
                  <kbd className="bg-muted text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">⌘</span>J
                  </kbd>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SearchCommandDialog>
        </NavSecondary>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: user.image ?? undefined,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
