'use client'

import Link from 'next/link'

import type { Permissions, Role } from '@/lib/roles'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAccessControl } from '@/components/auth-provider'

export type NavResourceItem = {
  title: string
  url: string
  icon: React.ElementType
  permission?: Permissions
  role?: Role
  disabled?: boolean
}

export function NavResources({
  resource,
  items,
}: {
  resource: string
  items: Array<NavResourceItem>
}) {
  const { hasPermission, hasRole } = useAccessControl()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{resource}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.permission && !hasPermission(item.permission, 'OR')) {
            return null
          }
          if (item.role && !hasRole(item.role)) {
            return null
          }
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild disabled={item.disabled}>
                <Link href={item.url} aria-disabled={item.disabled}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}