// //! src/app/event/page.js ..

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import JordanMap from "@/components/EventComponents/JordanMap";
import EventCard from "@/components/EventComponents/EventCard";
import ConfirmationPage from "@/components/EventComponents/ConfirmationPage";
import RegistrationSuccess from "@/components/EventComponents/RegistrationSucces";

import { getToken, isAuthenticated } from "@/middlewares/auth";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClipboardCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EventPage() {
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();

  const fetchEvents = async (region) => {
    try {
      const response = await axios.get(`/api/events/${region}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    fetchEvents(region);
    setStep(2);
  };

  const handleEventRegister = async (event) => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    setSelectedEvent(event);
    setStep(3);
  };

  const confirmRegistration = async () => {
    try {
      const token = getToken();
      const response = await axios.post(
        "/api/events/join",
        { eventId: selectedEvent._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("Successfully registered for the event!", {
          icon: "🎉",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setStep(4);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (
              error.response.data.message ===
              "Already registered for this event"
            ) {
              toast("You are already registered for this event.", {
                icon: "⚠️",
                style: {
                  borderRadius: "10px",
                  background: "#FFA500",
                  color: "#fff",
                },
              });
            } else {
              toast.error("Failed to register. The event might be full.", {
                icon: "❌",
                style: {
                  borderRadius: "10px",
                  background: "#FF4136",
                  color: "#fff",
                },
              });
            }
            break;
          case 404:
            toast.error("Event not found.", {
              icon: "🔍",
              style: {
                borderRadius: "10px",
                background: "#FF4136",
                color: "#fff",
              },
            });
            break;
          default:
            toast.error("An error occurred while registering for the event.", {
              icon: "❗",
              style: {
                borderRadius: "10px",
                background: "#FF4136",
                color: "#fff",
              },
            });
        }
      } else {
        toast.error("An error occurred while registering for the event.", {
          icon: "❗",
          style: {
            borderRadius: "10px",
            background: "#FF4136",
            color: "#fff",
          },
        });
      }
    }
  };

  const StepIcon = ({ step: currentStep, isActive, isCompleted }) => {
    const icons = [
      <FaMapMarkerAlt key="map" />,
      <FaCalendarAlt key="calendar" />,
      <FaClipboardCheck key="clipboard" />,
      <FaCheckCircle key="check" />,
    ];
    return (
      
      <div
        className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${
          isActive
            ? "bg-green-500 text-white border-white animate-pulse"
            : isCompleted
            ? "bg-green-500 text-white border-white"
            : "bg-gray-300 text-gray-600 border-white"
        } shadow-lg`}
      >
        {icons[currentStep - 1]}
      </div>
    );
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <>
      <Navbar/>
    <div className="m-4 sm:m-8 md:m-16 lg:m-28">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[650px] relative">
        {/* Left section (1/3) */}
        <div className="w-full lg:w-1/3 bg-[#E9F1EE] overflow-y-auto p-4 pt-8 lg:pt-48 z-0 order-2 lg:order-1">
          <img
            src="/images/farmer.png"
            alt="Farmer"
            className="w-[200px] h-[400px] mx-auto lg:mx-0 hidden lg:block"
          />
        </div>

        {/* Right section (2/3) */}
        <div className="w-full lg:w-2/3 bg-[#3e943d] overflow-y-auto p-4 order-3 lg:order-2">
          {/* Improved Stepper with Back button */}
          <div className="relative mb-8">
            {/* Back button */}
            {step > 1 &&
              step < 4 && ( // Hide back button on success page
                <button
                  onClick={goToPreviousStep}
                  className="absolute -top-2 left-0 bg-white text-green-700 p-2 mt-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md z-20 transform -translate-x-3"
                >
                  <IoIosArrowBack size={20} />
                </button>
              )}

            {/* Stepper */}
            <div className="flex justify-between items-center relative px-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center z-10">
                  <StepIcon
                    step={s}
                    isActive={s === step}
                    isCompleted={s < step}
                  />
                  <div className="mt-2 text-xs text-white font-semibold">
                    {s === 1
                      ? "Select Region"
                      : s === 2
                      ? "Choose Event"
                      : s === 3
                      ? "Confirm"
                      : "Complete"}
                  </div>
                </div>
              ))}
              {/* Thinner white line not visible on edges */}
              <div
                className="absolute top-6 left-[5%] right-[5%] h-0.5 bg-white"
                style={{ zIndex: 0 }}
              ></div>
            </div>
          </div>

          {/* Step content */}
          {step === 1 && (
            <div className="mt-4">
              <JordanMap onRegionSelect={handleRegionSelect} />
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onRegister={handleEventRegister}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center">
                  <p>No events currently available in this region.</p>
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <ConfirmationPage
              event={selectedEvent}
              onConfirm={confirmRegistration}
              onCancel={() => setStep(2)}
            />
          )}
          {step === 4 && <RegistrationSuccess event={selectedEvent} />}
        </div>

        {/* Box above the dividing line */}
        <div className="lg:absolute lg:left-[26%] lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 mt-4 w-full lg:w-[350px] h-auto lg:h-[400px] bg-white shadow-lg z-10 p-8 rounded order-1 lg:order-3">
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold mb-2">
                Welcome to the Green Hope Initiatives!
              </h2>
              <p>Our mission is to cultivate a greener future for all.</p>
              <p>Together for a Greener Tomorrow!</p>
              <p>
                Please select the area where you would like to join us in our
                quest for a more sustainable and vibrant life.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold mb-2">
                Become a Valued Contributor!
              </h2>
              <p>
                Choose the event you wish to take part in and collaborate with
                us to transform our environment into a flourishing green haven.
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-xl font-bold mb-2">
                Confirm Your Registration
              </h2>
              <p>Are you sure you want to register for this event?</p>
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="text-xl font-bold mb-2">
                Thank You, Dear Friend!
              </h2>
              <p>
                We are excited to have you with us as we embark on this journey
                to create a more sustainable and beautiful world together.
              </p>
            </>
          )}
          <br />
          <div className="relative flex items-end mt-11">
            <img
              src="/images/Plant.png"
              alt="Plant"
              className="w-[100px] h-[120px] ml-auto transform -translate-y-14"
            />
          </div>
        </div>
      </div>
      </div>
    <Footer/>
    </>
  );
}