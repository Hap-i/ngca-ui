import { Metadata } from 'next';
import { AdminNav } from '@/components/admin/admin-nav';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Next Gen Cricket Academy',
  description: 'Manage bookings, resources, and inquiries',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}