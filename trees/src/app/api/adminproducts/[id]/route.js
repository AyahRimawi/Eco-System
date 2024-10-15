import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Products from '../../../../models/products';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const product = await Products.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    await connectDB();
    const updatedProduct = await Products.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deletedProduct = await Products.findByIdAndDelete(params.id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
