'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '~/contexts';
import {
  AdminLabel,
  Avatar,
  Logo,
  LogoutButton,
  NavItem,
  Navigation,
  SidebarContainer,
  SidebarFooter,
  SidebarHeader,
} from './AdminSidebar.styles';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

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
        <div>
          <AdminLabel>Admin</AdminLabel>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </SidebarFooter>
    </SidebarContainer>
  );
}
