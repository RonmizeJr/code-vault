'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Code2, Compass, Home, Plus, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export function DashboardSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      label: 'Create Snippet',
      href: '/dashboard/snippets/create',
      icon: Plus,
    },
    {
      label: 'All Snippets',
      href: '/dashboard/snippets',
      icon: Code2,
    },
    {
      label: 'Explore',
      href: '/dashboard/explore',
      icon: Compass,
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      {/* --- Header ---*/}
      <SidebarHeader>
        <Link
          href='/dashbard'
          className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
        >
          <div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center'>
            <Code2 className='w-5 h-5 dark:text-foreground' />
          </div>
          <span className='text-lg font-bold text-foreground'>CodeVault</span>
        </Link>
      </SidebarHeader>

      {/* --- Main Navigation Content --- */}
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className='text-base'
                >
                  <Link href={item.href}>
                    <Icon className='w-5 h-5' />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* --- Footer --- */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='flex items-center justify-between w-full px-2 py-2'>
              <span className='text-sm text-muted-foreground'>Account</span>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-8 h-8',
                  },
                }}
              />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
