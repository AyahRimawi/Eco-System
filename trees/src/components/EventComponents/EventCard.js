// // // src/components/EventComponents/EventCard.js

// export default EventCard;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaUsers } from "react-icons/fa";

const EventCard = ({ event, onRegister }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-20 border rounded-lg overflow-hidden bg-white p-4 text-center shadow-lg"
      >
        <p className="text-gray-600">
          No events currently available in this region.
        </p>
      </motion.div>
    );
  }

  const isFullyBooked = event.participants.length >= 12;

  const getMonthName = (date) => {
    return new Date(date).toLocaleString("default", { month: "short" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ml-20 relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{ width: "calc(100% - 2rem)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-black bg-opacity-50 px-3 py-1 rounded-bl-lg">
          <div className="text-2xl font-bold text-white">
            {new Date(event.date).getDate()}
          </div>
          <div className="text-sm font-semibold text-white">
            {getMonthName(event.date)}
          </div>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{event.name}</h3>
        <div className="flex items-center mb-2 text-gray-600">
          <FaMapMarkerAlt className="mr-2" />
          <p className="text-sm">{event.location}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRegister(event)}
          disabled={isFullyBooked}
          className={`w-full py-2 px-4 rounded font-semibold border-2 border-white ${
            isFullyBooked
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isFullyBooked ? "Event Full" : "Register"}
        </motion.button>
      </div>

      {/* Hover effect content */}
      <motion.div
        className="absolute inset-0 bg-[#3e943d] p-4 flex flex-col justify-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-bold text-xl mb-4 text-center ">{event.name}</h3>
        <p className="text-sm mb-3">{event.description}</p>
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="mr-2" />
          <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center mb-2">
          <FaTag className="mr-2" />
          <p className="text-sm">{event.category}</p>
        </div>
        <div className="flex items-center mb-4">
          <FaUsers className="mr-2" />
          <p className="text-sm">
            {event.participants.length} / 12 Participants
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRegister(event)}
          disabled={isFullyBooked}
          className={`w-full py-2 px-4 rounded font-semibold border-2 border-white ${
            isFullyBooked
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-white bg-opacity-0 text-white hover:bg-[#fff] hover:text-black"
          }`}
        >
          {isFullyBooked ? "Event Full" : "Register"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
