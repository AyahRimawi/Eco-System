import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Products from '../../../models/products';

export async function GET() {
  try {
    await connectDB();
    const products = await Products.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    const newProduct = new Products(body);
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
