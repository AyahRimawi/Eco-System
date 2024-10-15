"use client";

import React from "react";
import { motion } from "framer-motion";

const ShopFeaturesSection = () => {
  const features = [
    {
      emoji: "🛍️",
      title: "Shop for a Greener Tomorrow",
      description:
        "Your purchases help us plant trees and nurture our planet's future.",
    },
    {
      emoji: "🌱",
      title: "Plant Trees with Every Purchase",
      description:
        "Every item you buy contributes to our mission of reforesting the Earth.",
    },
    {
      emoji: "🌍",
      title: "Make an Impact Through Shopping",
      description:
        "Support our marketplace and join us in creating a healthier environment for all.",
    },
    {
      emoji: "🍃",
      title: "Every Purchase Counts",
      description:
        "Together, we can turn shopping into a powerful tool for environmental change.",
    },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotate: -10,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hover: {
      scale: 1.05,
      rotate: 2,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-800 font-shadows"
        >
          Shop with Purpose
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 text-center">
                <motion.div
                  className="flex justify-center items-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 + index * 0.1,
                  }}
                >
                  <span className="text-6xl">{feature.emoji}</span>
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-3 text-green-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopFeaturesSection;
