"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Tree Planting",
    description:
      "Our mission is to plant trees to enhance the environment and combat climate change.",
    image: "/images/Group 1.png",
    bgColor: "bg-green-100",
  },
  {
    title: "Community Efforts",
    description:
      "We are building a dedicated community of volunteers committed to preserving and improving our planet.",
    image: "/images/Group 3.png",
    bgColor: "bg-blue-100",
  },
  {
    title: "Global Impact",
    description:
      "We aim to create a positive impact worldwide through our local initiatives.",
    image: "/images/Group 2.png",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Rewards and Discounts",
    description:
      "Participants receive rewards and discounts as a recognition of their valuable contributions.",
    image: "/images/Group 4.png",
    bgColor: "bg-purple-100",
  },
];

const FeatureCard = ({ title, description, image, bgColor }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-6 rounded-lg shadow-lg ${bgColor} bg-opacity-30 backdrop-blur-sm`}
  >
    <div className="flex justify-center mb-4">
      <div className="w-20 h-20 relative overflow-hidden shadow-md">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
    <p className="text-sm text-gray-600 text-center">{description}</p>
  </motion.div>
);

const FeatureCards = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
          Together for a Greener Future
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
