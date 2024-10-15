import React from "react";
import { motion } from "framer-motion";
import { FaTree, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ConfirmationPage = ({ event, onConfirm, onCancel }) => {
  const handleConfirmClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to register for this event. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, register me!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, loop: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <FaTree className="text-5xl text-green-500 mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Confirm Your Registration
          </h2>
          <p className="text-gray-600">
            Are you sure you want to register for:
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            {event.name}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6 text-center">
          By confirming, you agree to participate in this event and contribute
          to a greener future.
        </p>

        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirmClick}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Confirm Registration
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;