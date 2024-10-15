// import { NextResponse } from 'next/server';
// import dbConnect from '../../../../lib/mongodb';
// import Order from '../../../../models/orders';
// import { authMiddleware } from '../../../../middlewares/auth';

// async function GET(request, { params }) {
//   await dbConnect();

//   try {
//     const orderId = params.id;
//     const userId = request.userId; // This comes from the authMiddleware

//     const order = await Order.findOne({ _id: orderId, user: userId }).populate('products.product');

//     if (!order) {
//       return NextResponse.json({ message: 'Order not found' }, { status: 404 });
//     }

//     return NextResponse.json(order, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }

// export default authMiddleware(GET);
// src/app/api/orders/[id]/route.js

// import { NextResponse } from 'next/server';
// import dbConnect from '../../../../lib/mongodb';
// import Order from '../../../../models/orders';
// import { authMiddleware } from '../../../../middlewares/auth';

// export const GET = authMiddleware(async function(request, { params }) {
//   await dbConnect();

//   try {
//     const orderId = params.id;
//     const userId = request.userId; // This comes from the authMiddleware

//     console.log("Fetching order:", orderId, "for user:", userId);

//     if (!orderId) {
//       console.error("Order ID is missing");
//       return NextResponse.json({ message: 'Order ID is required' }, { status: 400 });
//     }

//     const order = await Order.findOne({ _id: orderId, user: userId }).populate('products.product');
    
//     if (!order) {
//       console.log("Order not found:", orderId);
//       return NextResponse.json({ message: 'Order not found' }, { status: 404 });
//     }

//     console.log("Order found:", order._id);
//     return NextResponse.json(order, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
//   }
// });
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/orders';
import { authMiddleware } from '@/middlewares/auth';

async function handler(request) {
  await dbConnect();

  try {
    // Extract the orderId from the URL
    const url = new URL(request.url);
    const orderId = url.pathname.split('/').pop();
    const userId = request.userId; // This comes from the authMiddleware

    console.log("API route: Fetching order:", orderId, "for user:", userId);

    if (!orderId) {
      console.error("API route: Order ID is missing");
      return NextResponse.json({ message: 'Order ID is required' }, { status: 400 });
    }

    console.log("API route: Attempting to find order in database");
    const order = await Order.findOne({ _id: orderId, user: userId }).populate('products.product');

    if (!order) {
      console.log("API route: Order not found:", orderId);
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    console.log("API route: Order found:", order._id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("API route: Error fetching order:", error);
    return NextResponse.json({ message: 'Server error', error: error.toString() }, { status: 500 });
  }
}

export const GET = authMiddleware(handler);