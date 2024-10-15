// File: src/app/dashboard/page.js
import Link from 'next/link';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Link href="/dashboard/events" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center text-green-600">
          <FaCalendarAlt size={24} className="mr-4" />
          <h2 className="text-xl font-semibold">Manage Events</h2>
        </div>
        <p className="mt-2 text-gray-600">Add, edit, or remove tree planting events.</p>
      </Link>
      <Link href="/dashboard/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center text-green-600">
          <FaUsers size={24} className="mr-4" />
          <h2 className="text-xl font-semibold">Manage Users</h2>
        </div>
        <p className="mt-2 text-gray-600">View and manage TreeVerse users.</p>
      </Link>
    </div>
  );
}