// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Navbar from "../Navbar";
// import Link from "next/link";

// const carouselItems = [
//   {
//     image: "/images/bg3.png",
//     author: "Aya",
//     title: "Seeds of Change",
//     topic: "Impact",
//     description: `By planting trees, we’re not just creating beautiful landscapes; we’re fostering environmental health and resilience. Each tree contributes to carbon sequestration, combats soil erosion, and enhances water quality. Together, we can cultivate lush ecosystems that support wildlife and provide essential resources for our communities.`,
//     thumbnailTitle: "Name Slider",
//     thumbnailDescription: "Description",
//   },
//   {
//     image: "/images/bg2.png",
//     author: "Aya",
//     title: "Green Futures",
//     topic: "Sustainability",
//     description:
//       "Join the movement to plant trees and nurture a sustainable world. Each sapling we plant is an investment in our collective future, enhancing biodiversity and combating climate change. As these trees mature, they will provide habitats for countless species, enrich our air, and create spaces for community connection and recreation.",
//     thumbnailTitle: "Name Slider",
//     thumbnailDescription: "Description",
//   },
//   {
//     image: "/images/img3.png",
//     author: "Aya",
//     title: "Every Heartbeat",
//     topic: "Health",
//     description:
//       "Every heartbeat echoes a need for a greener planet. By planting trees, we are giving life to our environment and ourselves. Each tree absorbs carbon, releases oxygen, and offers shelter to wildlife. This simple act can spark a chain reaction of positive change, leading to healthier communities and a more balanced ecosystem.",
//     thumbnailTitle: "Name Slider",
//     thumbnailDescription: "Description",
//   },
//   {
//     image: "/images/img4.png",
//     author: "Aya",
//     title: "Better Tomorrow",
//     topic: "Stewardship",
//     description:
//       "When we plant trees, we are planting hope for a more sustainable future. Trees are vital to our planet’s health, providing clean air, reducing urban heat, and enhancing the beauty of our surroundings. By taking part in tree planting initiatives, we become stewards of the Earth, ensuring that our natural heritage thrives for future generations.",
//     thumbnailTitle: "Name Slider",
//     thumbnailDescription: "Description",
//   },
// ];

// const CurvedSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const carouselRef = useRef(null);
//   const autoSlideRef = useRef(null);

//   const showSlider = (type, index = null) => {
//     setIsTransitioning(true);
//     if (index !== null) {
//       setCurrentIndex(index);
//     } else if (type === "next") {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//     } else {
//       setCurrentIndex(
//         (prevIndex) =>
//           (prevIndex - 1 + carouselItems.length) % carouselItems.length
//       );
//     }
//   };

//   useEffect(() => {
//     const transitionDuration = 3000;
//     const autoSlideDuration = 5000;

//     if (carouselRef.current) {
//       carouselRef.current.classList.add("transitioning");
//       setTimeout(() => {
//         setIsTransitioning(false);
//         carouselRef.current.classList.remove("transitioning");
//       }, transitionDuration);
//     }

//     autoSlideRef.current = setTimeout(() => {
//       showSlider("next");
//     }, autoSlideDuration);

//     return () => {
//       clearTimeout(autoSlideRef.current);
//     };
//   }, [currentIndex]);

//   return (
//     <>
//       <div className="relative">
//         <Navbar
//           textColor="text-white"
//           bgColor="bg-transparent"
//           className="absolute top-0 left-0 right-0 z-50"
//         />
//         <style jsx global>{`
//           .carousel .item {
//             opacity: 0;
//             transition: opacity 3s ease-in-out;
//           }
//           .carousel .item.active {
//             opacity: 1;
//           }
//           .carousel.transitioning .item.active {
//             animation: zoomAndSlide 3s ease-in-out;
//           }
//           @keyframes zoomAndSlide {
//             0% {
//               transform: scale(1.1) translateX(5%);
//             }
//             100% {
//               transform: scale(1) translateX(0);
//             }
//           }
//           .carousel .content > * {
//             opacity: 0;
//             transform: translateY(20px);
//             transition: opacity 0.5s ease-out, transform 0.5s ease-out;
//           }
//           .carousel .item.active .content > * {
//             opacity: 1;
//             transform: translateY(0);
//           }
//           .carousel .item.active .content .author {
//             transition-delay: 0.5s;
//           }
//           .carousel .item.active .content .title {
//             transition-delay: 0.7s;
//           }
//           .carousel .item.active .content .topic {
//             transition-delay: 0.9s;
//           }
//           .carousel .item.active .content .des {
//             transition-delay: 1.1s;
//           }
//           .carousel .item.active .content .buttons {
//             transition-delay: 1.3s;
//           }
//           .carousel .thumbnail .item {
//             transition: transform 0.3s ease-out;
//           }
//           .carousel .thumbnail .item:hover {
//             transform: scale(1.05);
//           }
//           .carousel .thumbnail .item.active {
//             transform: scale(1.1);
//           }
//           .carousel .thumbnail .item img {
//             transition: all 0.3s ease-out;
//           }
//           .carousel .thumbnail .item:hover img,
//           .carousel .thumbnail .item.active img {
//             filter: brightness(1.2);
//           }
//         `}</style>
//         <div
//           ref={carouselRef}
//           className="carousel relative h-screen -mt-[50px] w-screen overflow-hidden bg-black"
//         >
//           <div className="list w-full h-full relative">
//             {carouselItems.map((item, index) => (
//               <div
//                 key={index}
//                 className={`item absolute inset-0 ${
//                   index === currentIndex ? "active" : ""
//                 }`}
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fill
//                   style={{ objectFit: "cover" }}
//                   priority={index === currentIndex}
//                 />
//                 <div
//                   className="content absolute top-[20%] left-1/2 transform -translate-x-1/2 w-[1140px] max-w-[80%] pr-[30%] box-border text-white"
//                   style={{ textShadow: "0 5px 10px rgba(0, 0, 0, 0.2)" }}
//                 >
//                   {/* <div className="author font-bold tracking-[10px]">
//                     {item.author}
//                   </div> */}
//                   <div className="title text-[5em] font-bold leading-[1.3em]">
//                     {item.title}
//                   </div>
//                   <div className="topic text-[5em] font-bold leading-[1.3em] text-[#f1683a]">
//                     {item.topic}
//                   </div>
//                   <div className="des my-4">{item.description}</div>
//                   <div className="buttons grid grid-cols-2 gap-[5px] mt-5 w-[265px]">
//                     <Link href="/event">
//                       <button className="bg-white text-black py-2 px-4 tracking-[3px] font-medium">
//                         JOIN US
//                       </button>
//                     </Link>

//                     <Link href="/products">
//                       <button className="border border-white text-white py-2 px-4 tracking-[3px] font-medium">
//                         SHOP
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="arrows absolute top-[5%] right-[5%] z-20 flex gap-[10px] items-center">
//             <button
//               onClick={() => showSlider("prev")}
//               className="w-[40px] h-[40px] rounded-full bg-white bg-opacity-30 text-white font-bold transition duration-500 hover:bg-white hover:text-black"
//             >
//               &lt;
//             </button>
//             <button
//               onClick={() => showSlider("next")}
//               className="w-[40px] h-[40px] rounded-full bg-white bg-opacity-30 text-white font-bold transition duration-500 hover:bg-white hover:text-black"
//             >
//               &gt;
//             </button>
//           </div>
// {/* ---------------------------------- */}
//           {/* <div className="thumbnail absolute bottom-[50px] right-[50px] flex gap-5 z-20">
//             {carouselItems.map((item, index) => (
//               <div
//                 key={index}
//                 className={`item w-[150px] h-[220px] flex-shrink-0 relative cursor-pointer overflow-hidden
//                    ${
//                   index === currentIndex ? "active" : ""
//                 }
//                 `}
//                 onClick={() => showSlider("next", index)}
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.thumbnailTitle}
//                   fill
//                   style={{ objectFit: "cover" }}
//                   className="rounded-[20px]"
//                 />
//                 <div className="content absolute bottom-[10px] left-[10px] right-[10px] text-white">
//                   <div className="title font-medium">{item.thumbnailTitle}</div>
//                   <div className="description font-light">
//                     {item.thumbnailDescription}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div> */}
// {/* ----------------------------- */}
//           {/* <div
//             className="time absolute top-0 left-0 h-[3px] bg-[#f1683a] z-30 transition-all duration-[3000ms] ease-linear"
//             style={{
//               width: `${((currentIndex + 1) / carouselItems.length) * 100}%`,
//             }} */}
//           {/* ></div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CurvedSlider;
// // ----------------------------------------------
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Image from "next/image";
// // import { motion, AnimatePresence } from "framer-motion";

// // const slides = [
// //   {
// //     title: "Plant a Tree, Plant Hope",
// //     description: "Join our mission to create a greener world",
// //     image: "/images/img1.png",
// //   },
// //   {
// //     title: "Every Tree Counts",
// //     description: "Make a difference with every sapling you plant",
// //     image: "/images/img2.png",
// //   },
// //   {
// //     title: "Green Future, Bright Future",
// //     description: "Investing in nature is investing in our future",
// //     image: "/images/img3.png",
// //   },
// // ];

// // const CurvedSlider = () => {
// //   const [currentSlide, setCurrentSlide] = useState(0);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
// //     }, 5000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   return (
// //     <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden">
// //       <AnimatePresence mode="wait">
// //         <motion.div
// //           key={currentSlide}
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           transition={{ duration: 0.5 }}
// //           className="absolute inset-0 shadow-lg" // Add shadow class here
// //           // style={{
// //           //   clipPath:
// //           //     "polygon(0 0, 100% 0, 100% 70%, 100% 80%, 90% 73%, 87% 80%, 80% 74%, 75% 77%, 70% 74%, 65% 78%, 60% 76%, 55% 79%, 50% 77%, 45% 80%, 40% 76%, 35% 79%, 30% 75%, 25% 78%, 20% 76%, 15% 79%, 10% 75%, 5% 78%, 0 80%)",
// //           // }}
// //         >
// //           <Image
// //             src={slides[currentSlide].image}
// //             alt={slides[currentSlide].title}
// //             layout="fill"
// //             objectFit="cover"
// //             quality={100}
// //           />
// //           <div className="absolute inset-0 bg-black bg-opacity-40" />
// //         </motion.div>
// //       </AnimatePresence>
// //       <div className="absolute inset-0 flex items-center justify-center">
// //         <div className="text-center text-white z-10 px-4">
// //           <motion.h2
// //             key={`title-${currentSlide}`}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -20 }}
// //             transition={{ duration: 0.5 }}
// //             className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
// //           >
// //             {slides[currentSlide].title}
// //           </motion.h2>
// //           <motion.p
// //             key={`desc-${currentSlide}`}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -20 }}
// //             transition={{ duration: 0.5, delay: 0.2 }}
// //             className="text-lg md:text-xl lg:text-2xl"
// //           >
// //             {slides[currentSlide].description}
// //           </motion.p>
// //         </div>
// //       </div>
// //       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
// //         {slides.map((_, index) => (
// //           <button
// //             key={index}
// //             className={`w-3 h-3 rounded-full ${
// //               index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
// //             }`}
// //             onClick={() => setCurrentSlide(index)}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CurvedSlider;
// // ---------------------------------------------


"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../Navbar";
import Link from "next/link";

const carouselItems = [
  {
    image: "/images/bg7.png",
    author: "Aya",
    title: "Seeds of Change",
    topic: "Impact",
    description: `By planting trees, we're not just creating beautiful landscapes; we're fostering environmental health and resilience. Each tree contributes to carbon sequestration, combats soil erosion, and enhances water quality. Together, we can cultivate lush ecosystems that support wildlife and provide essential resources for our communities.`,
    thumbnailTitle: "Name Slider",
    thumbnailDescription: "Description",
  },
  {
    image: "/images/bg2.png",
    author: "Aya",
    title: "Green Futures",
    topic: "Sustainability",
    description:
      "Join the movement to plant trees and nurture a sustainable world. Each sapling we plant is an investment in our collective future, enhancing biodiversity and combating climate change. As these trees mature, they will provide habitats for countless species, enrich our air, and create spaces for community connection and recreation.",
    thumbnailTitle: "Name Slider",
    thumbnailDescription: "Description",
  },
  {
    image: "/images/bg5.png",
    author: "Aya",
    title: "Every Heartbeat",
    topic: "Health",
    description:
      "Every heartbeat echoes a need for a greener planet. By planting trees, we are giving life to our environment and ourselves. Each tree absorbs carbon, releases oxygen, and offers shelter to wildlife. This simple act can spark a chain reaction of positive change, leading to healthier communities and a more balanced ecosystem.",
    thumbnailTitle: "Name Slider",
    thumbnailDescription: "Description",
  },
  {
    image: "/images/img4.png",
    author: "Aya",
    title: "Better Tomorrow",
    topic: "Stewardship",
    description:
      "When we plant trees, we are planting hope for a more sustainable future. Trees are vital to our planet's health, providing clean air, reducing urban heat, and enhancing the beauty of our surroundings. By taking part in tree planting initiatives, we become stewards of the Earth, ensuring that our natural heritage thrives for future generations.",
    thumbnailTitle: "Name Slider",
    thumbnailDescription: "Description",
  },
];

const CurvedSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideRef = useRef(null);

  const showSlider = (type, index = null) => {
    setIsTransitioning(true);
    if (index !== null) {
      setCurrentIndex(index);
    } else if (type === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    } else {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + carouselItems.length) % carouselItems.length
      );
    }
  };

  useEffect(() => {
    const transitionDuration = 3000;
    const autoSlideDuration = 5000;

    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);

    autoSlideRef.current = setTimeout(() => {
      showSlider("next");
    }, autoSlideDuration);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(autoSlideRef.current);
    };
  }, [currentIndex]);

  return (
    <>
      <div className="relative">
        <Navbar
          textColor="text-white"
          bgColor="bg-transparent"
          className="absolute top-0 left-0 right-0 z-50"
        />
        <style jsx global>{`
          .carousel .item {
            opacity: 0;
            transition: opacity 3s ease-in-out;
          }
          .carousel .item.active {
            opacity: 1;
          }
          .carousel.transitioning .item.active {
            animation: zoomAndSlide 3s ease-in-out;
          }
          @keyframes zoomAndSlide {
            0% {
              transform: scale(1.1) translateX(5%);
            }
            100% {
              transform: scale(1) translateX(0);
            }
          }
          .carousel .content > * {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }
          .carousel .item.active .content > * {
            opacity: 1;
            transform: translateY(0);
          }
          .carousel .item.active .content .author {
            transition-delay: 0.5s;
          }
          .carousel .item.active .content .title {
            transition-delay: 0.7s;
          }
          .carousel .item.active .content .topic {
            transition-delay: 0.9s;
          }
          .carousel .item.active .content .des {
            transition-delay: 1.1s;
          }
          .carousel .item.active .content .buttons {
            transition-delay: 1.3s;
          }
          .carousel .thumbnail .item {
            transition: transform 0.3s ease-out;
          }
          .carousel .thumbnail .item:hover {
            transform: scale(1.05);
          }
          .carousel .thumbnail .item.active {
            transform: scale(1.1);
          }
          .carousel .thumbnail .item img {
            transition: all 0.3s ease-out;
          }
          .carousel .thumbnail .item:hover img,
          .carousel .thumbnail .item.active img {
            filter: brightness(1.2);
          }
        `}</style>
        <div
          className={`carousel relative h-screen -mt-[50px] w-screen overflow-hidden bg-black ${
            isTransitioning ? "transitioning" : ""
          }`}
        >
          <div className="list w-full h-full relative">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`item absolute inset-0 ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === currentIndex}
                />
                <div
                  className="content absolute top-[20%] left-1/2 transform -translate-x-1/2 w-[1140px] max-w-[80%] pr-[30%] box-border text-white"
                  style={{ textShadow: "0 5px 10px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="title text-[5em] font-bold leading-[1.3em]">
                    {item.title}
                  </div>
                  <div className="topic text-[5em] font-bold leading-[1.3em] text-[#f1683a]">
                    {item.topic}
                  </div>
                  <div className="des my-4">{item.description}</div>
                  <div className="buttons grid grid-cols-2 gap-[5px] mt-5 w-[357px]">
                    <Link href="/event">
                      <button className="bg-white text-black py-2 px-4 tracking-[3px] font-medium">
                        Plant with Us{" "}
                      </button>
                    </Link>

                    <Link href="/products">
                      <button className="border border-white text-white py-2 px-4 tracking-[3px] font-medium">
                        SHOP
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="arrows absolute top-[5%] right-[5%] z-20 flex gap-[10px] items-center">
            <button
              onClick={() => showSlider("prev")}
              className="w-[40px] h-[40px] rounded-full bg-white bg-opacity-30 text-white font-bold transition duration-500 hover:bg-white hover:text-black"
            >
              &lt;
            </button>
            <button
              onClick={() => showSlider("next")}
              className="w-[40px] h-[40px] rounded-full bg-white bg-opacity-30 text-white font-bold transition duration-500 hover:bg-white hover:text-black"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurvedSlider;