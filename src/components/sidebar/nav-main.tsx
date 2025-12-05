'use client';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useAccessControl } from '@/components/providers/auth-provider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { Permissions, Role } from '@/lib/auth/roles';

export type NavMainItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Array<{
    title: string;
    url: string;
    role?: Role;
    permission?: Permissions;
    disabled?: boolean;
  }>;
  permission?: Permissions;
  role?: Role;
  disabled?: boolean;
};

export function NavMain({ items }: { items: Array<NavMainItem> }) {
  const { hasPermission, hasRole } = useAccessControl();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.permission && !hasPermission(item.permission, 'OR')) {
            return null;
          }
          if (item.role && !hasRole(item.role)) {
            return null;
          }
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <Link href={item.url} aria-disabled={item.disabled}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      disabled={item.disabled}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </Link>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      if (
                        subItem.permission &&
                        !hasPermission(subItem.permission, 'OR')
                      ) {
                        return null;
                      }
                      if (subItem.role && !hasRole(subItem.role)) {
                        return null;
                      }
                      return (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          aria-disabled={subItem.disabled}
                        >
                          <SidebarMenuSubButton
                            aria-disabled={subItem.disabled}
                            asChild
                          >
                            <Link
                              href={subItem.url}
                              aria-disabled={subItem.disabled}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
