// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const OrderConfirmationPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState(null);

//   useEffect(() => {
//     const orderId = localStorage.getItem('lastOrderId');
//     if (orderId) {
//       fetchOrderDetails(orderId);
//     }
//   }, []);

//   const fetchOrderDetails = async (orderId) => {
//     try {
//       const response = await fetch(`/api/orders/${orderId}`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setOrderDetails(data);
//       } else {
//         console.error('Failed to fetch order details');
//       }
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//     }
//   };

//   if (!orderDetails) {
//     return <div>Loading order details...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//       <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
//         <p className="font-bold">Thank you for your order!</p>
//         <p>Your order has been successfully placed and is being processed.</p>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Order Details</h2>
//         <p>Order ID: {orderDetails._id}</p>
//         <p>Total Amount: ${orderDetails.totalAmount.toFixed(2)}</p>
//         <p>Status: {orderDetails.status}</p>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
//         <p>{orderDetails.shippingAddress.street}</p>
//         <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</p>
//         <p>{orderDetails.shippingAddress.country}</p>
//       </div>
//       <button 
//         onClick={() => router.push('/orders')} 
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         View All Orders
//       </button>
//     </div>
//   );
// };

// export default OrderConfirmationPage;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// const OrderConfirmationPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const orderId = searchParams.get('orderId') || localStorage.getItem('lastOrderId');
//     if (orderId) {
//       fetchOrderDetails(orderId);
//     } else {
//       setError('No order ID found. Please try again or contact support.');
//     }
//   }, [searchParams]);

//   const fetchOrderDetails = async (orderId) => {

//     if (!orderId) {
//       console.error('Order ID is undefined');
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You must be logged in to view order details.');
//         return;
//       }

//       const response = await fetch(`/api/orders/${orderId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOrderDetails(data);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to fetch order details');
//       }
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       setError('An unexpected error occurred. Please try again later.');
//     }
//   };


//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//         <button 
//           onClick={() => router.push('/')} 
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Return to Home
//         </button>
//       </div>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//         <div>Loading order details...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//       <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
//         <p className="font-bold">Thank you for your order!</p>
//         <p>Your order has been successfully placed and is being processed.</p>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Order Details</h2>
//         <p>Order ID: {orderDetails._id}</p>
//         <p>Total Amount: ${orderDetails.totalAmount.toFixed(2)}</p>
//         <p>Status: {orderDetails.status}</p>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
//         <p>{orderDetails.shippingAddress.street}</p>
//         <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</p>
//         <p>{orderDetails.shippingAddress.country}</p>
//       </div>
//       <button 
//         onClick={() => router.push('/orders')} 
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         View All Orders
//       </button>
//     </div>
//   );
// };

// export default OrderConfirmationPage;
//////////////////////////////////////////////////////////////////////////////////////////
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// const OrderConfirmationPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const orderId = searchParams.get('orderId') || localStorage.getItem('lastOrderId');
//     if (orderId) {
//       fetchOrderDetails(orderId);
//     } else {
//       setError('No order ID found. Please try again or contact support.');
//       setIsLoading(false);
//     }
//   }, [searchParams]);

//   const fetchOrderDetails = async (orderId) => {
//     if (!orderId) {
//       console.error('Order ID is undefined');
//       setError('Invalid order ID');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You must be logged in to view order details.');
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch(`/api/orders/${orderId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOrderDetails(data);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to fetch order details');
//       }
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       setError('An unexpected error occurred. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//         <div>Loading order details...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//         <button
//           onClick={() => router.push('/')}
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Return to Home
//         </button>
//       </div>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//         <div>No order details available.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
//       <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
//         <p className="font-bold">Thank you for your order!</p>
//         <p>Your order has been successfully placed and is being processed.</p>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Order Details</h2>
//         <p>Order ID: {orderDetails._id}</p>
//         <p>Total Amount: ${orderDetails.totalAmount.toFixed(2)}</p>
//         <p>Status: {orderDetails.status}</p>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
//         <p>{orderDetails.shippingAddress.street}</p>
//         <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</p>
//         <p>{orderDetails.shippingAddress.country}</p>
//       </div>
//       <button
//         onClick={() => router.push('/orders')}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         View All Orders
//       </button>
//     </div>
//   );
// };

// export default OrderConfirmationPage;
//////////////////////////////////////////////////////////////////////////////////////////////////
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Leaf, Check, ChevronRight } from 'lucide-react';

// const OrderConfirmationPage = () => {
//   const router = useRouter();
//   const [treeGrowth, setTreeGrowth] = useState(0);

//   useEffect(() => {
//     const growthInterval = setInterval(() => {
//       setTreeGrowth(prev => (prev < 100 ? prev + 1 : 100));
//     }, 50);

//     return () => clearInterval(growthInterval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#FFFFFF] text-[#333333] flex flex-col items-center justify-center p-4">
//       <div className="max-w-4xl w-full bg-gradient-to-b from-[#8BD2A0] to-[#55B76B] rounded-lg shadow-xl p-8 text-center">
//         <h1 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
//           <Leaf className="mr-2" /> Thank You for Your Order!
//         </h1>
        
//         <div className="mb-8">
//           <svg width="200" height="200" viewBox="0 0 100 100" className="mx-auto">
//             <rect x="45" y={100 - treeGrowth} width="10" height={treeGrowth} fill="#8B4513" />
//             <circle cx="50" cy={80 - treeGrowth * 0.7} r={treeGrowth * 0.3} fill="#55B76B" />
//           </svg>
//         </div>

//         <p className="text-xl text-white mb-6">
//           Your purchase has helped plant a tree in our community!
//         </p>

//         <div className="bg-white rounded-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold text-[#55B76B] mb-4">Order Confirmation</h2>
//           {/* <p className="text-lg mb-2"><span className="font-semibold">Order ID:</span> #123456</p> */}
//           <p className="text-lg mb-2"><span className="font-semibold">Status:</span> Paid</p>
//           <p className="text-lg"><span className="font-semibold">Estimated Delivery:</span> 3-5 business days</p>
//         </div>

//         <p className="text-white text-lg mb-6">
//           We'll be in touch soon with your order details and tracking information.
//         </p>

//         <div className="flex justify-center space-x-4">
//           <button
//             onClick={() => router.push('/orders')}
//             className="bg-[#333333] text-white py-2 px-4 rounded hover:bg-[#555555] transition duration-300 flex items-center"
//           >
//             View All Orders <ChevronRight className="ml-2" />
//           </button>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-white text-[#55B76B] py-2 px-4 rounded hover:bg-[#f0f0f0] transition duration-300 flex items-center"
//           >
//             Continue Shopping <Check className="ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;
/////////////////////////////////////////////////////////////////////////////
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Leaf, Check, ChevronRight, Package } from 'lucide-react';
// import { getToken, isAuthenticated } from '../../middlewares/auth';
// import Image from 'next/image';

// const OrderConfirmationPage = () => {
//   const router = useRouter();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [treeGrowth, setTreeGrowth] = useState(0);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       if (!isAuthenticated()) {
//         router.push('/login');
//         return;
//       }
//       try {
//         const token = getToken();
//         const response = await fetch('/api/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch order');
//         }
//         const data = await response.json();
//         setOrder(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrder();
//   }, []);

//   useEffect(() => {
//     const growthInterval = setInterval(() => {
//       setTreeGrowth(prev => (prev < 100 ? prev + 1 : 100));
//     }, 50);
//     return () => clearInterval(growthInterval);
//   }, []);

//   if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;
//   if (!order) return null;

//   return (
//     <div className="min-h-screen bg-[#FFFFFF] text-[#333333] flex flex-col items-center justify-center p-4">
//       <div className="max-w-4xl w-full bg-gradient-to-b from-[#8BD2A0] to-[#55B76B] rounded-lg shadow-xl p-8 text-center">
//         <h1 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
//           <Leaf className="mr-2" /> Thank You for Your Order!
//         </h1>
        
//         <div className="mb-8">
//           <svg width="200" height="200" viewBox="0 0 100 100" className="mx-auto">
//             <rect x="45" y={100 - treeGrowth} width="10" height={treeGrowth} fill="#8B4513" />
//             <circle cx="50" cy={80 - treeGrowth * 0.7} r={treeGrowth * 0.3} fill="#55B76B" />
//           </svg>
//         </div>
//         <p className="text-xl text-white mb-6">
//           Your purchase has helped plant a tree in our community!
//         </p>
//         <div className="bg-white rounded-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold text-[#55B76B] mb-4">Order Confirmation</h2>
//           <p className="text-lg mb-2"><span className="font-semibold">Order ID:</span> {order._id.substr(-6)}</p>
//           <p className="text-lg mb-2"><span className="font-semibold">Status:</span> {order.status}</p>
//           <p className="text-lg mb-2"><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
//           <p className="text-lg"><span className="font-semibold">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
//         </div>
//         <div className="bg-white rounded-lg p-6 mb-6">
//           <h3 className="text-xl font-semibold text-[#55B76B] mb-4">Order Details</h3>
//           <ul className="space-y-4">
//             {/* {order.products.map((item, index) => (
//               <li key={index} className="flex items-center space-x-4">
//                 <div className="w-16 h-16 relative">
//                   <Image
//                     src={item.product.imageUrl}
//                     alt={item.product.title}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-md"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium">{item.product.title}</p>
//                   <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                   <p className="text-sm text-gray-600">Price: ${item.product.price.toFixed(2)}</p>
//                 </div>
//               </li>
//             ))} */}
//           </ul>
//         </div>
//         <p className="text-white text-lg mb-6">
//           We'll be in touch soon with your order details and tracking information.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <button
//             onClick={() => router.push('/profile')}
//             className="bg-[#333333] text-white py-2 px-4 rounded hover:bg-[#555555] transition duration-300 flex items-center"
//           >
//             View All Orders <ChevronRight className="ml-2" />
//           </button>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-white text-[#55B76B] py-2 px-4 rounded hover:bg-[#f0f0f0] transition duration-300 flex items-center"
//           >
//             Continue Shopping <Check className="ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;
///////////////////////////////////////////////////////////////////////
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Leaf, Check, ChevronRight, Package } from 'lucide-react';
// import { getToken, isAuthenticated } from '../../middlewares/auth';
// import Image from 'next/image';

// const OrderConfirmationPage = () => {
//   const router = useRouter();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [treeGrowth, setTreeGrowth] = useState(0);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       if (!isAuthenticated()) {
//         router.push('/login');
//         return;
//       }
//       try {
//         const token = getToken();
//         const response = await fetch('/api/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch order');
//         }
//         const data = await response.json();
//         setOrder(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrder();
//   }, []);

//   useEffect(() => {
//     const growthInterval = setInterval(() => {
//       setTreeGrowth(prev => (prev < 100 ? prev + 1 : 100));
//     }, 50);
//     return () => clearInterval(growthInterval);
//   }, []);

//   if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;
//   if (!order) return null;

//   return (
//     <div className="min-h-screen bg-[#FFFFFF] text-[#333333] flex flex-col items-center justify-center p-4">
//       <div className="max-w-4xl w-full bg-gradient-to-b from-[#8BD2A0] to-[#55B76B] rounded-lg shadow-xl p-8 text-center">
//         <h1 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
//           <Leaf className="mr-2" /> Thank You for Your Order!
//         </h1>
        
//         <div className="mb-8">
//           <svg width="200" height="200" viewBox="0 0 100 100" className="mx-auto">
//             <rect x="45" y={100 - treeGrowth} width="10" height={treeGrowth} fill="#8B4513" />
//             <circle cx="50" cy={80 - treeGrowth * 0.7} r={treeGrowth * 0.3} fill="#55B76B" />
//           </svg>
//         </div>
//         <p className="text-xl text-white mb-6">
//           Your purchase has helped plant a tree in our community!
//         </p>
//         <div className="bg-white rounded-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold text-[#55B76B] mb-4">Order Confirmation</h2>
//           <p className="text-lg mb-2"><span className="font-semibold">Order ID:</span> {order._id?.substr(-6) || 'N/A'}</p>
//           <p className="text-lg mb-2"><span className="font-semibold">Status:</span> {order.status || 'Paid'}</p>
//           <p className="text-lg mb-2"><span className="font-semibold">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
//           {order.totalAmount && (
//             <p className="text-lg"><span className="font-semibold">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
//           )}
//         </div>
//         <div className="bg-white rounded-lg p-6 mb-6">
//           <h3 className="text-xl font-semibold text-[#55B76B] mb-4">Order Details</h3>
//           {order.products && order.products.length > 0 ? (
//             <ul className="space-y-4">
//               {order.products.map((item, index) => (
//                 <li key={index} className="flex items-center space-x-4">
//                   <div className="w-16 h-16 relative">
//                     <Image
//                       src={item.product?.imageUrl || '/placeholder.jpg'}
//                       alt={item.product?.title || 'Product'}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-md"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium">{item.product?.title || 'Unknown Product'}</p>
//                     <p className="text-sm text-gray-600">Quantity: {item.quantity || 'N/A'}</p>
//                     <p className="text-sm text-gray-600">Price: ${item.product?.price?.toFixed(2) || 'N/A'}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No products found in this order.</p>
//           )}
//         </div>
//         <p className="text-white text-lg mb-6">
//           We'll be in touch soon with your order details and tracking information.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <button
//             onClick={() => router.push('/profile')}
//             className="bg-[#333333] text-white py-2 px-4 rounded hover:bg-[#555555] transition duration-300 flex items-center"
//           >
//             View All Orders <ChevronRight className="ml-2" />
//           </button>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-white text-[#55B76B] py-2 px-4 rounded hover:bg-[#f0f0f0] transition duration-300 flex items-center"
//           >
//             Continue Shopping <Check className="ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Check, ChevronRight, Package } from 'lucide-react';
import { getToken, isAuthenticated } from '../../middlewares/auth';
import Image from 'next/image';

const OrderConfirmationPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [treeGrowth, setTreeGrowth] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!isAuthenticated()) {
        router.push('/login');
        return;
      }
      try {
        const token = getToken();
        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    const growthInterval = setInterval(() => {
      setTreeGrowth(prev => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(growthInterval);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#333333] flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-gradient-to-b from-[#8BD2A0] to-[#55B76B] rounded-lg shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <Leaf className="mr-2" /> Thank You for Your Order!
        </h1>
        
        <div className="mb-6">
          <svg width="150" height="150" viewBox="0 0 100 100" className="mx-auto">
            <rect x="45" y={100 - treeGrowth} width="10" height={treeGrowth} fill="#8B4513" />
            <circle cx="50" cy={80 - treeGrowth * 0.7} r={treeGrowth * 0.3} fill="#55B76B" />
          </svg>
        </div>
        <p className="text-lg text-white mb-4">
          Your purchase has helped plant a tree in our community!
        </p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold text-[#55B76B] mb-3">Order Confirmation</h2>
          <p className="text-base mb-1"><span className="font-semibold">Order ID:</span> {order._id?.substr(-6) || 'N/A'}</p>
          <p className="text-base mb-1"><span className="font-semibold">Status:</span> {order.status || 'Paid'}</p>
          <p className="text-base mb-1"><span className="font-semibold">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
          {order.totalAmount && (
            <p className="text-base mb-1"><span className="font-semibold">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
          )}
          <p className="text-base"><span className="font-semibold">Estimated Delivery:</span> 3-5 business days</p>
        </div>
        {/* <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-[#55B76B] mb-3">Order Details</h3>
          {order.products && order.products.length > 0 ? (
            <ul className="space-y-3">
              {order.products.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={item.product?.imageUrl || '/placeholder.jpg'}
                      alt={item.product?.title || 'Product'}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{item.product?.title || 'Unknown Product'}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity || 'N/A'} | Price: ${item.product?.price?.toFixed(2) || 'N/A'}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">No products found in this order.</p>
          )}
        </div> */}
        <p className="text-white text-base mb-4">
          We'll be in touch soon with your order details and tracking information.
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => router.push('/profile')}
            className="bg-[#333333] text-white py-2 px-3 rounded text-sm hover:bg-[#555555] transition duration-300 flex items-center"
          >
            View All Orders <ChevronRight className="ml-1 w-4 h-4" />
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-[#55B76B] py-2 px-3 rounded text-sm hover:bg-[#f0f0f0] transition duration-300 flex items-center"
          >
            Continue Shopping <Check className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;