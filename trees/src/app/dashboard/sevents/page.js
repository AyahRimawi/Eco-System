// File: src/app/events/page.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/superevents');
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <Link href={`/dashboard/sevents/${event._id}`} key={event._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Image
                src={event.imageUrl || '/placeholder-event.jpg'}
                alt={event.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}