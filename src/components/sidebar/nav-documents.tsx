'use client'

import Link from 'next/link'

import type { Permissions, Role } from '@/lib/roles'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAccessControl } from '@/components/auth-provider'
import { Ellipsis, FolderOpen, Share, Trash } from 'lucide-react'

export type NavDocumentItem = {
  name: string
  url: string
  icon: React.ElementType
  permission?: Permissions
  role?: Role
  disabled?: boolean
}

export function NavDocuments({ items }: { items: Array<NavDocumentItem> }) {
  const { isMobile } = useSidebar()
  const { hasPermission, hasRole } = useAccessControl()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.permission && !hasPermission(item.permission, 'OR')) {
            return null
          }
          if (item.role && !hasRole(item.role)) {
            return null
          }
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild disabled={item.disabled}>
                <Link href={item.url} aria-disabled={item.disabled}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm"
                  >
                    <Ellipsis />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  <DropdownMenuItem disabled={item.disabled}>
                    <FolderOpen />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={item.disabled}>
                    <Share />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={item.disabled}
                    variant="destructive"
                  >
                    <Trash />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )
        })}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-sidebar-foreground/70"
            disabled={items.every((item) => item.disabled)}
          >
            <Ellipsis className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}