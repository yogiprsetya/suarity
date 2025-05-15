'use client';

import { User, Settings, Gem, CircleUserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';

const items = [
  {
    title: 'Profile Info',
    url: '/app/setting',
    icon: User
  },
  {
    title: 'Avatar',
    url: '/app/setting/avatar',
    icon: CircleUserRound
  },
  {
    title: 'Plans',
    url: '/app/plans',
    icon: Gem
  },
  {
    title: 'Account',
    url: '/app/account',
    icon: Settings
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === item.url}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
