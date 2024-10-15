// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { useRouter, usePathname } from "next/navigation";
// // import { motion, AnimatePresence } from "framer-motion";
// // import CartIcon from '../components/cart/CartIcon';
// // import { useCart } from '../context/CartContext';
// // import {
// //   LogOut,
// //   User,
// //   Menu,
// //   X,
// //   ShoppingBag,
// //   Calendar,
// //   Phone,
// //   Info,
// // } from "lucide-react";

// // export default function Navbar() {
// //   const { isLoggedIn, setIsLoggedIn, clearCart } = useCart();
// //   // const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const router = useRouter();
// //   const pathname = usePathname();

// //   const navItems = [
// //     { name: "Shop", icon: ShoppingBag, href: "/products" },
// //     { name: "Events", icon: Calendar, href: "/event" },
// //     { name: "Leaderboard", icon: Phone, href: "/leaderboard" },
// //     { name: "Contact us", icon: Phone, href: "/contact-us" },
// //   ];

// //   useEffect(() => {
// //     const checkLoginStatus = () => {
// //       const token = localStorage.getItem("token");
// //       setIsLoggedIn(!!token);
// //     };

// //     checkLoginStatus();
// //     window.addEventListener("storage", checkLoginStatus);
// //     return () => window.removeEventListener("storage", checkLoginStatus);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     setIsLoggedIn(false);
// //     clearCart();
// //     router.push("/");
// //   };

// //   return (
// //     <header className="bg-white text-gray-600 shadow-md">
// //       <nav className="container mx-auto px-6 py-2">
// //         <div className="flex justify-between items-center">
// //           <Link
// //             href="/"
// //             className="text-2xl font-shadows font-bold text-green-800"
// //           >
// //             GreenHope
// //           </Link>

// //           {/* Desktop Menu */}
// //           <div className="hidden md:flex space-x-6 items-center">
// //             {navItems.map((item) => (
// //               <Link
// //                 key={item.name}
// //                 href={item.href}
// //                 className={`flex items-center hover:text-green-500 transition duration-300 ${
// //                   pathname === item.href ? "border-b-2 border-green-500" : ""
// //                 }`}
// //               >
// //                 {item.name}
// //               </Link>
// //             ))}
// //             {isLoggedIn && (
// //               <Link
// //                 href="/profile"
// //                 className="flex items-center hover:text-green-700 transition duration-300"
// //               >
// //                 {/* <User className="w-5 h-5 mr-2" /> */}
// //                 Profile
// //               </Link>
// //             )}
// //              {/* إضافة أيقونة السلة هنا */}
// //   <CartIcon className="w-6 h-6 text-gray-600 hover:text-green-700 transition duration-300" />
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <div className="md:hidden">
// //             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
// //               {isMenuOpen ? (
// //                 <X className="w-6 h-6" />
// //               ) : (
// //                 <Menu className="w-6 h-6" />
// //               )}
// //             </button>
// //           </div>

// //           {/* Login/Logout Buttons */}
// //           <div className="hidden md:flex items-center space-x-4">
// //             {isLoggedIn ? (
// //               <motion.button
// //                 onClick={handleLogout}
// //                 className=" hover:bg-red-600 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300 flex items-center"
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 <LogOut size={18} className="mr-2" /> Logout
// //               </motion.button>
// //             ) : (
// //               <>
// //                 <Link href="/login">
// //                   <motion.button
// //                     className=" hover:bg-green-700 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300 flex items-center"
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <User size={18} className="mr-2" /> Login
// //                   </motion.button>
// //                 </Link>
// //                 <Link href="/signup">
// //                   <motion.button
// //                     className=" hover:bg-blue-700 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300"
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     Sign Up
// //                   </motion.button>
// //                 </Link>
// //               </>
// //             )}
// //           </div>

// //         </div>

// //         {/* Mobile Menu */}
// //         <AnimatePresence>
// //           {isMenuOpen && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: "auto" }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="md:hidden mt-4"
// //             >
// //               {navItems.map((item) => (
// //                 <Link
// //                   key={item.name}
// //                   href={item.href}
// //                   className={`block py-2 px-4 hover:bg-green-50 ${
// //                     pathname === item.href ? "bg-green-50 text-green-500" : ""
// //                   }`}
// //                   onClick={() => setIsMenuOpen(false)}
// //                 >
// //                   <div className="flex items-center">
// //                     {/* <item.icon className="w-5 h-5 mr-2" /> */}
// //                     {item.name}
// //                   </div>
// //                 </Link>
// //               ))}
// //               {isLoggedIn && (
// //                 <Link
// //                   href="/profile"
// //                   className="block py-2 px-4 hover:bg-green-50"
// //                   onClick={() => setIsMenuOpen(false)}
// //                 >
// //                   <div className="flex items-center">
// //                     {/* <User className="w-5 h-5 mr-2" /> */}
// //                     Profile
// //                   </div>
// //                 </Link>
// //               )}
// //                {/* إضافة أيقونة السلة هنا */}
// //       <div className="flex justify-center mt-4">
// //         <CartIcon className="w-6 h-6 text-gray-600 hover:text-green-700 transition duration-300" />
// //       </div>
// //               <div className="mt-4">
// //                 {isLoggedIn ? (
// //                   <button
// //                     onClick={() => {
// //                       handleLogout();
// //                       setIsMenuOpen(false);
// //                     }}
// //                     className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
// //                   >
// //                     <LogOut size={18} className="mr-2" /> Logout
// //                   </button>
// //                 ) : (
// //                   <>
// //                     <Link href="/login" onClick={() => setIsMenuOpen(false)}>
// //                       <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center mb-2">
// //                         <User size={18} className="mr-2" /> Login
// //                       </button>
// //                     </Link>
// //                     <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
// //                       <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
// //                         Sign Up
// //                       </button>
// //                     </Link>
// //                   </>
// //                 )}
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </nav>
// //     </header>
// //   );
// // }

// // // <div className="container mx-auto flex justify-between items-center">
// // // <Link href="/" className="text-xl font-bold">Your Store</Link>
// // // <CartIcon />
// // // </div>

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import CartIcon from "../components/cart/CartIcon";
// import { useCart } from "../context/CartContext";
// import {
//   LogOut,
//   User,
//   Menu,
//   X,
//   ShoppingBag,
//   Calendar,
//   Phone,
//   Info,
//   Award,
//   Leaf,
// } from "lucide-react";

// export default function Navbar() {
//   const { isLoggedIn, setIsLoggedIn, clearCart } = useCart();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const navItems = [
//     { name: "Shop", icon: ShoppingBag, href: "/products" },
//     { name: "Events", icon: Calendar, href: "/event" },
//     { name: "Leaderboard", icon: Phone, href: "/leaderboard" },
//     { name: "Contact us", icon: Phone, href: "/contact-us" },
//   ];

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };

//     checkLoginStatus();
//     window.addEventListener("storage", checkLoginStatus);
//     return () => window.removeEventListener("storage", checkLoginStatus);
//   }, [setIsLoggedIn]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     clearCart();
//     router.push("/");
//   };

//   return (
//     <header className="bg-white text-gray-600 shadow-lg sticky top-0 z-50">
//       <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <Link href="/" className="flex items-center space-x-2">
//             <Leaf className="w-8 h-8 text-white" />
//             <span className="text-2xl font-extrabold tracking-tight">
//               GreenHope
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-1 items-center">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`flex items-center px-3 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-green-500 transition duration-300 ${
//                   pathname === item.href ? "bg-white text-green-500" : ""
//                 }`}
//               >
//                 <item.icon className="w-4 h-4 mr-2" />
//                 {item.name}
//               </Link>
//             ))}
//             {isLoggedIn && (
//               <Link
//                 href="/profile"
//                 className="flex items-center px-3 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-green-500 transition duration-300"
//               >
//                 Profile
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>

//           {/* Login/Logout Buttons and Cart Icon */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn ? (
//               <>
//                 <CartIcon className="w-6 h-6 text-gray-600 hover:text-green-700 transition duration-300" />
//                 <motion.button
//                   onClick={handleLogout}
//                   className="hover:bg-red-600 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300 flex items-center"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <LogOut size={18} className="mr-2" /> Logout
//                 </motion.button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login">
//                   <motion.button
//                     className="hover:bg-green-700 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300 flex items-center"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <User size={16} className="mr-2" /> Login
//                   </motion.button>
//                 </Link>
//                 <Link href="/signup">
//                   <motion.button
//                     className="hover:bg-blue-700 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Sign Up
//                   </motion.button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden"
//             >
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`block py-2 px-4 hover:bg-green-50 ${
//                     pathname === item.href ? "bg-green-50 text-green-500" : ""
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <div className="flex items-center">{item.name}</div>
//                 </Link>
//               ))}
//               {isLoggedIn && (
//                 <Link
//                   href="/profile"
//                   className="block py-2 px-4 hover:bg-green-50"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <div className="flex items-center">Profile</div>
//                 </Link>
//               )}
//               {isLoggedIn && (
//                 <div className="flex justify-center mt-4">
//                   <CartIcon className="w-6 h-6 text-gray-600 hover:text-green-700 transition duration-300" />
//                 </div>
//               )}
//               <div className="mt-4">
//                 {isLoggedIn ? (
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition duration-300 flex items-center justify-center"
//                   >
//                     <LogOut size={18} className="mr-2" /> Logout
//                   </button>
//                 ) : (
//                   <>
//                     <Link href="/login" onClick={() => setIsMenuOpen(false)}>
//                       <button className="w-full bg-white text-green-500 hover:bg-green-100 font-medium py-2 px-4 rounded-full transition duration-300 flex items-center justify-center mb-2">
//                         <User size={18} className="mr-2" /> Login
//                       </button>
//                     </Link>
//                     <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
//                       <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-full transition duration-300">
//                         Sign Up
//                       </button>
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </header>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "../components/cart/CartIcon";
import { useCart } from "../context/CartContext";
import {
  LogOut,
  User,
  Menu,
  X,
  ShoppingBag,
  Calendar,
  Phone,
  Info,
} from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, clearCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Shop", icon: ShoppingBag, href: "/products" },
    { name: "Events", icon: Calendar, href: "/event" },
    { name: "Leaderboard", icon: Phone, href: "/leaderboard" },
    { name: "Contact us", icon: Phone, href: "/contact-us" },
  ];

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    clearCart();
    router.push("/");
  };

  return (
    <header className="bg-white text-gray-600 shadow-md">
      <nav className="container mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-shadows font-bold text-green-800"
          >
            GreenHope
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center hover:text-green-500 transition duration-300 ${
                  pathname === item.href ? "border-b-2 border-green-500" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                href="/profile"
                className="flex items-center hover:text-green-700 transition duration-300"
              >
                Profile
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Login/Logout Buttons and Cart Icon */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <CartIcon className="w-6 h-6 text-gray-600 hover:text-green-700 transition duration-300" />
                <motion.button
                  onClick={handleLogout}
                  className="hover:bg-red-600 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <motion.button
                    className="hover:bg-green-700 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User size={18} className="mr-2" /> Login
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    className="hover:bg-blue-700 text-gray-600 font-shadows font-bold py-2 px-4 rounded transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 px-4 hover:bg-green-50 ${
                    pathname === item.href ? "bg-green-50 text-green-500" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">{item.name}</div>
                </Link>
              ))}
              {isLoggedIn && (
                <Link
                  href="/profile"
                  className="block py-2 px-4 hover:bg-green-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">Profile</div>
                </Link>
              )}
              {isLoggedIn && (
                <div className="flex justify-center mt-4">
                  <CartIcon className="w-6 h-6 text-gray-600 hover:text-green-700 transition duration-300" />
                </div>
              )}
              <div className="mt-4">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
                  >
                    <LogOut size={18} className="mr-2" /> Logout
                  </button>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center mb-2">
                        <User size={18} className="mr-2" /> Login
                      </button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}