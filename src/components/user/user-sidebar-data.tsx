import {
  Clipboard,
  Database,
  File,
  HelpCircle,
  LayoutDashboard,
  List,
  Package,
  Table,
  Users,
  Users2,
} from 'lucide-react';

import type { NavDocumentItem } from '@/components/sidebar/nav-documents';
import type { NavPrimaryItem } from '@/components/sidebar/nav-primary';
import type { NavResourceItem } from '@/components/sidebar/nav-resources';
import type { NavSecondaryItem } from '@/components/sidebar/nav-secondary';

export const navPrimaryData: Array<NavPrimaryItem> = [
  {
    title: 'Dashboard',
    url: '/home',
    icon: LayoutDashboard,
  },
  {
    title: 'Tasks',
    url: '/home/tasks',
    icon: List,
    permission: { task: ['read'] },
  },
];

// export const navMainData: Array<NavMainItem> = [
//   {
//     title: 'Playground',
//     url: '#',
//     icon: SquareTerminal,
//     isActive: false,
//     items: [
//       {
//         title: 'History',
//         url: '#',
//       },
//       {
//         title: 'Starred',
//         url: '#',
//       },
//       {
//         title: 'Settings',
//         url: '#',
//       },
//     ],
//   },
//   {
//     title: 'Models',
//     url: '#',
//     icon: Bot,
//     items: [
//       {
//         title: 'Genesis',
//         url: '#',
//       },
//       {
//         title: 'Explorer',
//         url: '#',
//       },
//       {
//         title: 'Quantum',
//         url: '#',
//       },
//     ],
//   },
//   {
//     title: 'Documentation',
//     url: '#',
//     icon: BookOpen,
//     items: [
//       {
//         title: 'Introduction',
//         url: '#',
//       },
//       {
//         title: 'Get Started',
//         url: '#',
//       },
//       {
//         title: 'Tutorials',
//         url: '#',
//       },
//       {
//         title: 'Changelog',
//         url: '#',
//       },
//     ],
//   },
//   {
//     title: 'Settings',
//     url: '#',
//     icon: Settings2,
//     items: [
//       {
//         title: 'General',
//         url: '#',
//       },
//       {
//         title: 'Team',
//         url: '#',
//       },
//       {
//         title: 'Billing',
//         url: '#',
//       },
//       {
//         title: 'Limits',
//         url: '#',
//       },
//     ],
//   },
// ]

export const navResourceShopData: Array<NavResourceItem> = [
  {
    title: 'Products',
    url: '#',
    icon: Table,
    disabled: true,
  },
  {
    title: 'Orders',
    url: '#',
    icon: Package,
    disabled: true,
  },
  {
    title: 'Customers',
    url: '#',
    icon: Users2,
    disabled: true,
  },
];

export const navSecondaryData: Array<NavSecondaryItem> = [
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
    permission: { user: ['list'] },
  },
  {
    title: 'Get Help',
    url: 'https://github.com/htmujahid/next-bard',
    target: '_blank',
    icon: HelpCircle,
  },
];

export const navDocumentsData: Array<NavDocumentItem> = [
  {
    name: 'Data Library',
    url: '#',
    icon: Database,
    disabled: true,
  },
  {
    name: 'Reports',
    url: '#',
    icon: Clipboard,
    disabled: true,
  },
  {
    name: 'Assets',
    url: '#',
    icon: File,
    disabled: true,
  },
];

export const searchCommandData: Record<string, Array<NavPrimaryItem>> = {
  Suggestions: navPrimaryData,
  Shop: navResourceShopData,
};
