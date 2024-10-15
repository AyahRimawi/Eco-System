// File: src/app/api/dashboard/stats/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Orders from '../../../models/orders';
import Users from '../../../models/users';
import Products from '../../../models/products';

export async function GET() {
    try {
      await connectDB();
  
      // Fetch total orders
      const totalOrders = await Orders.countDocuments();
  
      // Fetch total users
      const totalUsers = await Users.countDocuments();
  
      // Fetch total products
      const totalProducts = await Products.countDocuments();
  
      // Fetch total sales
      const salesAggregation = await Orders.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } }
      ]);
      const totalSales = salesAggregation.length > 0 ? salesAggregation[0].totalSales : 0;
  
      // Fetch product sales
      const productSales = await Orders.aggregate([
        { $match: { status: 'paid' } },
        { $unwind: '$products' },
        { $group: { 
          _id: '$products.product', 
          totalSales: { $sum: { $multiply: ['$products.quantity', { $divide: ['$totalAmount', { $sum: '$products.quantity' }] }] } },
          totalQuantity: { $sum: '$products.quantity' }
        } },
        { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productInfo' } },
        { $unwind: '$productInfo' },
        { $project: { 
          name: '$productInfo.title', 
          sales: { $round: ['$totalSales', 2] }, 
          quantity: '$totalQuantity' 
        } },
        { $sort: { sales: -1 } },
        { $limit: 10 }
      ]);
  
      // Fetch monthly sales for the past 12 months
      const currentDate = new Date();
      const twelveMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 12));
      const monthlySales = await Orders.aggregate([
        { $match: { status: 'paid', createdAt: { $gte: twelveMonthsAgo } } },
        { $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            sales: { $sum: '$totalAmount' }
          }
        },
        { $sort: { _id: 1 } },
        { $project: { 
          month: '$_id', 
          sales: { $round: ['$sales', 2] }, 
          _id: 0 
        } }
      ]);
  
      return NextResponse.json({
        totalOrders,
        totalUsers,
        totalProducts,
        totalSales: parseFloat(totalSales.toFixed(2)),
        productSales,
        monthlySales
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
    }
  }
