'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdEmojiEvents } from "react-icons/md";
import { FaTree, FaCalendarAlt, FaUsers, FaBars, FaTimes, FaBox, FaChartBar } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const links = [
    { href: '/dashboard', icon: FaChartBar, label: 'Dashboard' },
    { href: '/dashboard/products', icon: FaBox, label: 'Manage Products' },
    { href: '/dashboard/events', icon: FaCalendarAlt, label: 'Manage Events' },
    { href: '/dashboard/sevents', icon: MdEmojiEvents,  },
    { href: '/dashboard/users', icon: FaUsers, label: 'Manage Users' },
  ];

  return (
    <div className={`bg-green-800 text-white h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0 md:w-16'} overflow-x-hidden`}>
      <div className="flex justify-end p-4 md:hidden">
        <button onClick={toggleSidebar} className="text-white">
          <FaTimes size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`flex items-center p-4 hover:bg-green-700 ${pathname === link.href ? 'bg-green-700' : ''}`}>
            <link.icon className="mr-4" size={24} />
            <span className={`${isOpen ? 'block' : 'hidden md:block'}`}></span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <Icon size={32} className="text-green-500" />
    </div>
  </div>
);

const DashboardContent = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    productSales: [],
    monthlySales: [],
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/adminstats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  return (
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Orders" value={stats.totalOrders} icon={FaBox} />
      <StatCard title="Total Users" value={stats.totalUsers} icon={FaUsers} />
      <StatCard title="Total Sales" value={`$${stats.totalSales.toFixed(2)}`} icon={FaChartBar} />
      <StatCard title="Total Products" value={stats.totalProducts} icon={FaTree} />
    </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4CAF50" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4">Top 10 Product Sales</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={stats.productSales}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" orientation="left" stroke="#4CAF50" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="sales" fill="#4CAF50" name="Sales ($)" />
      <Bar yAxisId="right" dataKey="quantity" fill="#82ca9d" name="Quantity Sold" />
    </BarChart>
  </ResponsiveContainer>
</div>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-green-800 md:hidden">
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-bold text-green-800">TreeVerse Dashboard</h1>
          <div>{/* Add user menu or logout button here */}</div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {pathname === '/dashboard' ? <DashboardContent /> : children}
        </main>
      </div>
    </div>
  );
}
