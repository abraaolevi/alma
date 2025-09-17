'use client';

import { usePathname } from 'next/navigation';
import {
  AdminLabel,
  Avatar,
  Logo,
  NavItem,
  Navigation,
  SidebarContainer,
  SidebarFooter,
  SidebarHeader,
} from './AdminSidebar.styles';

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo>alma</Logo>
      </SidebarHeader>

      <Navigation>
        <NavItem
          href="/admin/dashboard"
          $active={pathname === '/admin/dashboard'}
        >
          Leads
        </NavItem>
        <NavItem
          href="/admin/dashboard/settings"
          $active={pathname === '/admin/settings'}
        >
          Settings
        </NavItem>
      </Navigation>

      <SidebarFooter>
        <Avatar>A</Avatar>
        <AdminLabel>Admin</AdminLabel>
      </SidebarFooter>
    </SidebarContainer>
  );
}
