"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Youtube, href: "#" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Events", href: "/event" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <footer className="bg-white text-gray-600 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mt-2">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <h3 className="text-3xl font-bold text-green-800">GreenHope</h3>
            </div>
            <p className="text-gray-600 max-w-xs">
              Together we plant a greener future for generations to come. Join us in our mission to create a sustainable world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-green-700">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.slice(0, 3).map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-green-500 transition duration-300"
                >
                  {item.name}
                </Link>
              ))}
              {quickLinks.slice(3).map((item, index) => (
                <Link
                  key={index + 3}
                  href={item.href}
                  className="hover:text-green-500 transition duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6 text-green-700">Follow Us</h4>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  aria-label={label}
                  className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 hover:text-green-800 transition duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-green-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {new Date().getFullYear()} GreenHope. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

