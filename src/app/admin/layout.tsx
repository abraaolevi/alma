'use client';

import { ProtectedRoute } from '~/components';
import { AdminSidebar } from './components';
import { AdminContainer, AdminContent, AdminMain } from './layout.styles';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AdminContainer>
        <AdminSidebar />
        <AdminMain>
          <AdminContent>{children}</AdminContent>
        </AdminMain>
      </AdminContainer>
    </ProtectedRoute>
  );
}
