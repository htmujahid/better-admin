'use client';

import * as React from 'react';

import Link from 'next/link';

import { useAccessControl } from '@/components/providers/auth-provider';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { Permissions, Role } from '@/lib/auth/roles';

export type NavSecondaryItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  permission?: Permissions;
  role?: Role;
  disabled?: boolean;
  target?: '_blank';
};

export function NavSecondary({
  items,
  children,
  ...props
}: React.PropsWithChildren<{
  items: Array<NavSecondaryItem>;
}> &
  React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { hasPermission, hasRole } = useAccessControl();
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            if (item.permission && !hasPermission(item.permission, 'OR')) {
              return null;
            }
            if (item.role && !hasRole(item.role)) {
              return null;
            }
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild disabled={item.disabled}>
                  <Link
                    href={item.url}
                    target={item.target}
                    aria-disabled={item.disabled}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          {children}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
