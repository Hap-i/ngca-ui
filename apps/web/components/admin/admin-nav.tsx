'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { href: '/admin/resources', label: 'Resources', icon: '🏏' },
  { href: '/admin/blocked-slots', label: 'Blocked Slots', icon: '🚫' },
  { href: '/admin/group-sessions', label: 'Group Sessions', icon: '👥' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: '💬' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                NGCA Admin
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-primary text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              View Website →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}