'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  totalInquiries: number;
  newInquiries: number;
  totalRevenue: string;
  period: string;
}

interface Booking {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_email: string;
  start_at: string;
  end_at: string;
  status: string;
  amount: string;
  resource: { name: string; type: string };
}

interface ResourceUtil {
  id: string;
  name: string;
  type: string;
  active: boolean;
  bookings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [todaysBookings, setTodaysBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [resources, setResources] = useState<ResourceUtil[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setTodaysBookings(data.todaysBookings || []);
          setUpcomingBookings(data.upcomingBookings || []);
          setResources(data.resourceUtilization || []);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          label="Total Bookings"
          value={stats?.totalBookings || 0}
          color="bg-blue-500"
        />
        <StatCard
          label="Confirmed"
          value={stats?.confirmedBookings || 0}
          color="bg-green-500"
        />
        <StatCard
          label="Pending"
          value={stats?.pendingBookings || 0}
          color="bg-yellow-500"
        />
        <StatCard
          label="Total Inquiries"
          value={stats?.totalInquiries || 0}
          color="bg-purple-500"
        />
        <StatCard
          label="New Inquiries"
          value={stats?.newInquiries || 0}
          color="bg-red-500"
        />
        <StatCard
          label="Revenue (30d)"
          value={`£${stats?.totalRevenue || '0'}`}
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Schedule</h2>
          {todaysBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No bookings today</p>
          ) : (
            <div className="space-y-3">
              {todaysBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{booking.resource.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                      {new Date(booking.end_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resource Utilization */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resource Utilization</h2>
          <div className="space-y-3">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    resource.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                  <span className="text-gray-900">{resource.name}</span>
                  <span className="ml-2 text-xs text-gray-500 capitalize">({resource.type.replace('_', ' ')})</span>
                </div>
                <span className="text-sm text-gray-600">{resource.bookings} bookings</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings (Next 7 Days)</h2>
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming bookings</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {upcomingBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.booking_reference}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{booking.customer_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{booking.resource?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(booking.start_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">£{booking.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className={`${color} rounded-lg p-4 text-white`}>
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}