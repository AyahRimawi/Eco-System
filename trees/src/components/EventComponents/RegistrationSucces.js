import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const RegistrationSuccess = ({ event }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  const bookPages = [
    {
      image: "/images/location.jpg",
      text: "Choose the right location for your plant. Consider sunlight, soil type, and space.",
    },
    {
      image: "/images/soil.jpg",
      text: "Prepare the soil carefully. Ensure it's rich in nutrients and well-drained.",
    },
    {
      image: "/images/plant.jpg",
      text: "Plant with love and care. Water regularly and monitor growth.",
    },
  ];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <div className=" flex items-start justify-center pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-6 pt-4 max-w-2xl w-full text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Registration Successful!
        </h2>

        <p className="text-base text-gray-600 mb-4">
          Thank you for joining {event.name}! Your commitment to a greener
          future is truly inspiring.
        </p>

        <div
          className="book mb-6 relative w-[480px] h-44 mx-auto cursor-pointer perspective-1000"
          onClick={nextPage}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ rotateY: 0, z: 0 }}
              animate={{ rotateY: [0, -90, 0], z: [0, 100, 0] }}
              exit={{ rotateY: 90, z: 100 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-white rounded shadow-lg flex overflow-hidden"
            >
              <div className="w-1/2 h-full">
                <img
                  src={bookPages[currentPage].image}
                  alt="Planting step"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 h-full p-4 flex items-center justify-center bg-green-50">
                <p className="text-sm text-gray-700">
                  {bookPages[currentPage].text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500 mt-2">
            Click to turn page
          </div>
        </div>

        <Link
          href="/"
          className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 inline-block"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;