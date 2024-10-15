'use client';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getToken } from '../../../middlewares/auth';
import EventModal from '../../components/eventmodal/page';

export default function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/adminevents', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const res = await fetch('/api/adminevents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(newEvent)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add event');
      }
      const addedEvent = await res.json();
      setEvents([...events, addedEvent]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
      alert(error.message);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      const res = await fetch(`/api/adminevents/${updatedEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(updatedEvent)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to edit event');
      }
      const editedEvent = await res.json();
      setEvents(events.map(event => event._id === editedEvent._id ? editedEvent : event));
      setEditingEvent(null);
    } catch (error) {
      console.error('Error editing event:', error);
      alert(error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const res = await fetch(`/api/adminevents/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        if (!res.ok) {
          throw new Error('Failed to delete event');
        }
        setEvents(events.filter(event => event._id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };
  
  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Manage Events</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <p>No events found. Add an event to get started.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {/* --Aya-- */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Governorate
                </th>
                {/* ----- */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  {/* --Aya-- */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.governorate}
                  </td>
                  {/* ------ */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(isAddModalOpen || editingEvent) && (
        <EventModal
          event={editingEvent}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingEvent(null);
          }}
          onSave={editingEvent ? handleEditEvent : handleAddEvent}
        />
      )}
    </div>
  );
}

