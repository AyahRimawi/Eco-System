'use client'
import React, { useState, useEffect } from 'react';
import { getToken, isAuthenticated } from '../../middlewares/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Mail, Edit2, Save, X, Star, Calendar, Award, Settings, MapPin, ShoppingBag, Package, CreditCard } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [editing, setEditing] = useState({ name: false, email: false });
    const [editedUser, setEditedUser] = useState({ name: '', email: '' });
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated()) {
                router.push('/login');
                return;
            }
            try {
                const token = getToken();
                const response = await fetch('/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setUser(data);
                setEditedUser({ name: data.name, email: data.email });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleEdit = (field) => {
        setEditing(prev => ({ ...prev, [field]: true }));
    };

    const handleSave = async (field) => {
        try {
            const token = getToken();
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: editedUser[field] }),
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            const updatedUser = await response.json();
            setUser(updatedUser);
            setEditing(prev => ({ ...prev, [field]: false }));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = (field) => {
        setEditedUser(prev => ({ ...prev, [field]: user[field] }));
        setEditing(prev => ({ ...prev, [field]: false }));
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
    );
    if (error) return <div className="text-center text-red-500 bg-white p-4">{error}</div>;
    if (!user) return null;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
    ];

    return (
      <>
        <Navbar />
        <div className="min-h-screen mt-16 bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 sm:mb-0">
                    Your Profile
                  </h2>
                  <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                          activeTab === tab.id
                            ? "bg-green-700 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <tab.icon className="h-5 w-5 mr-2" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {activeTab === "profile" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 space-y-6">
                        <ProfileField
                          icon={User}
                          label="Name"
                          value={user.name}
                          editing={editing.name}
                          editedValue={editedUser.name}
                          onEdit={() => handleEdit("name")}
                          onSave={() => handleSave("name")}
                          onCancel={() => handleCancel("name")}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                        <ProfileField
                          icon={Mail}
                          label="Email"
                          value={user.email}
                          editing={editing.email}
                          editedValue={editedUser.email}
                          onEdit={() => handleEdit("email")}
                          onSave={() => handleSave("email")}
                          onCancel={() => handleCancel("email")}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                        <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
                          <Settings className="h-5 w-5 mr-2 text-gray-400" />
                          <span className="text-sm">
                            Member since:{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="md:col-span-1">
                        <div className="bg-green-700 rounded-2xl p-6 text-center text-white shadow-lg">
                          <div className="inline-block p-3 bg-white bg-opacity-20 rounded-full mb-4">
                            <Star className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-semibold mb-2">
                            Your Points
                          </h3>
                          <div className="text-4xl font-bold mb-2">
                            {user.points}
                          </div>
                          <p className="text-sm opacity-80">
                            Keep participating to earn more!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "events" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Events Registered
                    </h3>
                    {user.registeredEvents &&
                    user.registeredEvents.length > 0 ? (
                      <div className="grid gap-6 md:grid-cols-2">
                        {user.registeredEvents.map((event, index) => (
                          <div
                            key={event._id}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center">
                                <Award className="h-6 w-6 text-green-500 mr-2" />
                                <span className="font-semibold text-lg">
                                  {event.name}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="text-sm">
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                              {event.description}
                            </p>
                            <div className="flex items-center text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-600 bg-gray-50 p-8 rounded-lg">
                        You haven't registered for any events yet.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Your Orders
                    </h3>
                    {user.orders && user.orders.length > 0 ? (
                      <div className="space-y-6">
                        {user.orders.map((order, index) => (
                          <div
                            key={order._id}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center">
                                <Package className="h-6 w-6 text-green-500 mr-2" />
                                <span className="font-semibold text-lg">
                                  Order #{order._id.substr(-6)}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="text-sm">
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h4 className="text-lg font-semibold mb-3">
                                Products:
                              </h4>
                              <div className="space-y-4">
                                {order.products.map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
                                  >
                                    <div className="w-16 h-16 relative rounded-md overflow-hidden">
                                      <Image
                                        src={item.product.imageUrl}
                                        alt={item.product.title}
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">
                                        {item.product.title}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Quantity: {item.quantity}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Price: ${item.product.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <span className="text-gray-600">
                                Status:{" "}
                                <span className="font-semibold capitalize">
                                  {order.status}
                                </span>
                              </span>
                              <span className="text-gray-600">
                                Total:{" "}
                                <span className="font-semibold">
                                  ${order.totalAmount.toFixed(2)}
                                </span>
                              </span>
                            </div>
                            <div className="mt-2 flex items-center text-gray-500">
                              <CreditCard className="h-4 w-4 mr-1" />
                              <span className="text-sm capitalize">
                                {order.paymentInfo.method}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-600 bg-gray-50 p-8 rounded-lg">
                        You haven't placed any orders yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
};

const ProfileField = ({ icon: Icon, label, value, editing, editedValue, onEdit, onSave, onCancel, onChange }) => (
    <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
            </div>
            {editing ? (
                <>
                    <input
                        type="text"
                        className="pl-10 pr-20 py-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={editedValue}
                        onChange={onChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button onClick={onSave} className="p-1 text-green-600 hover:text-green-800">
                            <Save className="h-5 w-5" />
                        </button>
                        <button onClick={onCancel} className="p-1 text-red-600 hover:text-red-800 ml-1">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="pl-10 py-2 block w-full sm:text-sm text-gray-900 bg-gray-50 rounded-md">
                        {value}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button onClick={onEdit} className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit2 className="h-5 w-5" />
                        </button>
                    </div>
                </>
            )}
        </div>

    </div>

);

export default Profile;