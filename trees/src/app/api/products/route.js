import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Product from '../../../models/products';


export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 9;

    let filter = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') {
      filter.category = category;
    }

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 