"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ShopSection = () => {
  const router = useRouter();

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      <Image
        src="/images/eco-friendly-products.jpg"
        alt="Eco-friendly products"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6 font-shadows"
        >
          Shop Green, Live Green: Every Purchase Plants Hope
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-center mb-8 max-w-2xl"
        >
          Discover eco-friendly products that not only enhance your life but
          also contribute to a greener planet. With every purchase, you're
          planting seeds of change.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/products">
            <motion.button
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/shop")}
            >
              Shop Now and Plant Trees
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSection;
