"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";

export default function EventDetailsPage({ params }) {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const res = await fetch(`/api/superevents/${params.id}`);
      if (!res.ok) throw new Error("Failed to fetch event details");
      const data = await res.json();
      setEvent(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPoints = async (userId, points) => {
    try {
      const res = await fetch(`/api/superevents/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, points }),
      });
      if (!res.ok) throw new Error("Failed to update points");
      const data = await res.json();
      setEvent(data.event);
    } catch (error) {
      console.error("Error updating points:", error);
      alert("Failed to update points. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );

  if (!event)
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Not Found</h2>
          <p className="text-gray-700">Event not found</p>
        </div>
      </div>
    );

  const googleMapsUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
    event.location
  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <Image
                src={event.imageUrl || "/placeholder-event.jpg"}
                alt={event.name}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                {event.name}
              </h1>
              <p className="text-green-600 text-lg mb-4">{event.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-green-700">
                  <Calendar className="mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-green-700">
                  <Clock className="mr-2" />
                  <span>
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-green-700">
                  <Tag className="mr-2" />
                  <span>{event.category}</span>
                </div>
                <div className="flex items-center text-green-700">
                  <MapPin className="mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Location
              </h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-between mb-4"
              >
                <span className="text-lg font-semibold">Participants</span>
                {showParticipants ? <ChevronUp /> : <ChevronDown />}
              </button>

              {showParticipants && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {event.participants.map((participant) => (
                    <div
                      key={participant._id}
                      className="bg-green-100 rounded-lg p-4 flex flex-col"
                    >
                      <div className="flex items-center mb-2">
                        <Users className="text-green-600 mr-2" />
                        <span className="font-semibold">
                          {participant.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">
                          {participant.points} points
                        </span>
                        <button
                          onClick={() => handleAddPoints(participant._id, 10)}
                          className="bg-green-500 text-white hover:bg-green-600 font-bold py-2 px-4 rounded-full transition-colors duration-200 flex items-center"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          <span>10</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}