// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart];
//       const existingItem = updatedCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         updatedCart.push({ ...product, quantity: 1 });
//       }
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.filter(item => item.id !== productId);
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart  }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       let updatedCart;
//       if (existingItem) {
//         updatedCart = prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         updatedCart = [...prevCart, { ...product, quantity: 1 }];
//       }
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.filter(item => item.id !== productId);
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.map((item) =>
//         item.id === productId ? { ...item, quantity: newQuantity } : item
//       );
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
/////////////////////////////////////////////////////////////////////////////////////////////
// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import jwt from 'jsonwebtoken';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);

//     if (token) {
//       const userId = getUserIdFromToken(token);
//       if (userId) {
//         const savedCart = localStorage.getItem(`cart_${userId}`);
//         if (savedCart) {
//           setCart(JSON.parse(savedCart));
//         }
//       }
//     } else {
//       setCart([]);
//     }
//   }, []);

//   const saveCart = (updatedCart) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const userId = getUserIdFromToken(token);
//       if (userId) {
//         localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
//       }
//     }
//   };

//   const addToCart = (product) => {
//     if (!isLoggedIn) return;
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       let updatedCart;
//       if (existingItem) {
//         updatedCart = prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         updatedCart = [...prevCart, { ...product, quantity: 1 }];
//       }
//       saveCart(updatedCart);
//       return updatedCart;
//     });
//   };

//   const removeFromCart = (productId) => {
//     if (!isLoggedIn) return;
//     setCart((prevCart) => {
//       const updatedCart = prevCart.filter(item => item.id !== productId);
//       saveCart(updatedCart);
//       return updatedCart;
//     });
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (!isLoggedIn) return;
//     setCart((prevCart) => {
//       const updatedCart = prevCart.map((item) =>
//         item.id === productId ? { ...item, quantity: newQuantity } : item
//       );
//       saveCart(updatedCart);
//       return updatedCart;
//     });
//   };

//   const clearCart = () => {
//     setCart([]);
//     const token = localStorage.getItem('token');
//     if (token) {
//       const userId = getUserIdFromToken(token);
//       if (userId) {
//         localStorage.removeItem(`cart_${userId}`);
//       }
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

// // Helper function to get userId from token
// // function getUserIdFromToken(token) {
// //   try {
// //     const sec = '6b3a55e0261b034c70e5b16d8a572550e05c8c209e3a3c25d5a5db75d2bb2b4' || process.env.JWT_SECRET;
// //     const decoded = jwt.verify(token, sec);
// //     return decoded.userId;
// //   } catch (error) {
// //     console.error('Error decoding token:', error);
// //     return null;
// //   }
// // }
// // Helper function to get userId from token
// ///////////////////////////////////////////////////
// // function getUserIdFromToken(token) {
// //   try {
// //     if (!token) {
// //       throw new Error('Token not provided');
// //     }

// //     // Use process.env.JWT_SECRET as the primary secret key
// //     const secret = process.env.JWT_SECRET || '6b3a55e0261b034c70e5b16d8a572550e05c8c209e3a3c25d5a5db75d2bb2b4';

// //     // Decode the token
// //     const decoded = jwt.verify(token, secret);

// //     // Ensure decoded is a non-null object and has userId
// //     if (decoded && typeof decoded === 'object' && decoded.userId) {
// //       return decoded.userId;
// //     } else {
// //       throw new Error('Invalid token structure or missing userId');
// //     }
// //   } catch (error) {
// //     console.error('Error decoding token:', error.message);
// //     return null;
// //   }
// // }
// /////////////////////////////////////////////////////////
// const getUserIdFromToken = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return null;
//     const decodedToken = jwt.decode(token); // تأكد من استيراد مكتبة jwt
//     return decodedToken.userId;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };
///////////////////////////////////////////////////////////////////////
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      const userId = getUserIdFromToken(token);
      if (userId) {
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    } else {
      setCart([]);
    }
  }, []);

  const saveCart = (updatedCart) => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      }
    }
  };

  const addToCart = (product) => {
    if (!isLoggedIn) return;
    console.log('Adding to cart:', product); // Debug log
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      let updatedCart;
      if (existingItemIndex !== -1) {
        // Product exists, update quantity
        updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Product doesn't exist, add new item
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      console.log('Updated cart:', updatedCart); // Debug log
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    if (!isLoggedIn) return;
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!isLoggedIn) return;
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    const token = localStorage.getItem('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      }
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

const getUserIdFromToken = (token) => {
  try {
    if (!token) return null;
    const decodedToken = jwt.decode(token);
    return decodedToken.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};