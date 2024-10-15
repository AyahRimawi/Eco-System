"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const imagePaths = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/soil.jpg",
];

const EarthSection = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center font-sans text-sm text-black overflow-hidden py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 text-green-800"
      >
        Memorable Moments from Our Tree Planting Campaigns
      </motion.h2>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        .swiper-container {
          width: 100%;
          max-width: 100vw;
          padding-top: 50px;
          padding-bottom: 80px;
          overflow: hidden;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          height: 300px;
          -webkit-box-reflect: below 1px
            linear-gradient(transparent, transparent, #0006);
        }
        .image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .image-wrapper::after {
          content: "";
          position: absolute;
          bottom: -100%;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            transparent,
            rgba(0, 0, 0, 0.4)
          );
          transform: translateY(100%);
          transition: transform 0.3s ease-in-out;
        }
        .swiper-slide-active .image-wrapper::after {
          transform: translateY(0);
        }
        .image-wrapper img {
          transition: transform 3s ease-in-out, opacity 3s ease-in-out;
        }
        .swiper-slide-active .image-wrapper img {
          transform: scale(1.1);
        }
      `}</style>
      {domLoaded && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          loop={true}
          className="swiper-container"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {imagePaths.map((path, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="image-wrapper">
                <Image
                  src={path}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 300px) 100vw, 300px"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default EarthSection;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Canvas } from "@react-three/fiber";
// import Earth from "./Earth";
// import { ArrowRight } from "lucide-react";

// const EarthSection = () => {
//   return (
//     <section className="min-h-screen bg-white flex items-center justify-center">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center justify-between">
//           {/* Left side: Text content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10"
//           >
//             <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-green-800 leading-tight">
//               Nurture the Earth,
//               <br />
//               Grow the Future
//             </h1>
//             <p className="text-lg mb-8 text-gray-600 leading-relaxed">
//               Rise up and be a catalyst for change—join us in the exhilarating
//               journey of agriculture, where your passion can ignite a
//               revolution, sowing seeds of hope and nurturing a thriving,
//               sustainable world for generations to come!
//             </p>
//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 0 15px rgba(85,183,107,0.5)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-[#55B76B] hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 flex items-center"
//             >
//               Join the Green Mission
//               <ArrowRight className="ml-2 w-5 h-5" />
//             </motion.button>
//           </motion.div>

//           {/* Right side: Earth */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="lg:w-1/2 h-[400px] lg:h-[600px]"
//           >
//             <Canvas>
//               <ambientLight intensity={1.0} /> {/* Increased intensity */}
//               <pointLight position={[10, 10, 10]} intensity={2.0} />{" "}
//               {/* Increased intensity */}
//               <Earth />
//             </Canvas>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EarthSection;

// -----------------------------------------------

// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// import { motion } from "framer-motion";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// const imagePaths = [
//   "/images/img1.jpg",
//   "/images/img2.jpg",
//   "/images/img3.jpg",
//   "/images/img4.jpg",
//   "/images/img1.jpg",
//   "/images/img2.jpg",
//   "/images/img3.jpg",
//   "/images/img4.jpg",
// ];

// const EarthSection = () => {
//   const [domLoaded, setDomLoaded] = useState(false);

//   useEffect(() => {
//     setDomLoaded(true);
//   }, []);

//   return (
//     <div className="w-full min-h-screen flex flex-col justify-center items-center font-sans text-sm text-black overflow-hidden py-16">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-3xl font-bold text-center mb-12 text-green-800"
//       >
//         Frequently Asked Questions
//       </motion.h2>

//       <style jsx global>{`
//         body {
//           margin: 0;
//           padding: 0;
//           overflow-x: hidden;
//         }
//         .swiper-container {
//           width: 100%;
//           max-width: 100vw;
//           padding-top: 50px;
//           padding-bottom: 80px;
//           overflow: hidden;
//         }
//         .swiper-slide {
//           background-position: center;
//           background-size: cover;
//           width: 300px;
//           height: 300px;
//         }
//         .image-wrapper {
//           width: 100%;
//           height: 100%;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
//           border-radius: 10px;
//         }
//         .image-wrapper::after {
//           content: "";
//           position: absolute;
//           bottom: -100%;
//           left: 0;
//           right: 0;
//           height: 100%;
//           background: linear-gradient(
//             to bottom,
//             transparent,
//             transparent,
//             rgba(0, 0, 0, 0.4)
//           );
//           transform: translateY(100%);
//           transition: transform 0.3s ease-in-out;
//         }
//         .swiper-slide-active .image-wrapper::after {
//           transform: translateY(0);
//         }
//         .image-wrapper img {
//           transition: transform 3s ease-in-out, opacity 3s ease-in-out;
//           border-radius: 10px;
//         }
//         .swiper-slide-active .image-wrapper img {
//           transform: scale(1.1);
//         }
//         .swiper-slide-shadow-left,
//         .swiper-slide-shadow-right {
//           background-image: none;
//         }
//       `}</style>
//       {domLoaded && (
//         <Swiper
//           effect={"coverflow"}
//           grabCursor={true}
//           centeredSlides={true}
//           slidesPerView={"auto"}
//           coverflowEffect={{
//             rotate: 20,
//             stretch: 0,
//             depth: 200,
//             modifier: 1,
//             slideShadows: true,
//           }}
//           pagination={true}
//           modules={[EffectCoverflow, Pagination, Autoplay]}
//           loop={true}
//           className="swiper-container"
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//         >
//           {imagePaths.map((path, index) => (
//             <SwiperSlide key={index} className="swiper-slide">
//               <div className="image-wrapper">
//                 <Image
//                   src={path}
//                   alt={`Slide ${index + 1}`}
//                   fill
//                   style={{ objectFit: "cover" }}
//                   sizes="(max-width: 300px) 100vw, 300px"
//                   priority={index === 0}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </div>
//   );
// };

// export default EarthSection;
