"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How do our tree-planting initiatives help the environment?",
    answer:
      "Our initiatives reduce CO2 levels, enhance biodiversity, and improve overall environmental health. Each tree acts as a natural carbon sink and provides habitat for wildlife.",
  },
  {
    question: "What rewards can I earn by participating?",
    answer:
      "Participants earn points for planting trees or attending events. These points can be redeemed for discounts at partner stores, eco-friendly products, or to sponsor more trees.",
  },
  {
    question: "How often do you organize tree-planting events?",
    answer:
      "We organize events regularly throughout the year, with increased frequency during optimal planting seasons. Check our calendar for upcoming events in your area.",
  },
  {
    question: "Can I participate if I have no prior experience?",
    answer:
      "Absolutely! No experience is necessary. We provide all tools and guidance on-site, teaching proper planting techniques and sharing knowledge about the trees.",
  },
  {
    question: "How do you ensure the long-term survival of planted trees?",
    answer:
      "We select native species suited to the local environment and partner with communities for ongoing care. We use sustainable techniques and provide care instructions to volunteers and local caretakers.",
  },
];

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgb(243, 244, 246)" }}
      >
        <span className="font-medium text-gray-800">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4"
          >
            <p className="text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section className=" bg-white w-full overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-green-800"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 relative h-[400px] w-full lg:h-[375px]"
          >
            <Image
              src="/images/img4.jpg"
              alt="Farmer planting a tree"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 w-full"
          >
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
