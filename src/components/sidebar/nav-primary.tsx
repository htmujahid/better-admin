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

export type NavPrimaryItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  permission?: Permissions;
  role?: Role;
  disabled?: boolean;
};

export function NavPrimary({ items }: { items: Array<NavPrimaryItem> }) {
  const { hasPermission, hasRole } = useAccessControl();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
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
                <Link href={item.url} aria-disabled={item.disabled}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    disabled={item.disabled}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
