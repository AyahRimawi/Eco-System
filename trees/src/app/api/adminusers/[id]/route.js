import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/users';
import { authMiddleware } from '../../../../middlewares/auth';

export async function GET(request, { params }) {
  return authMiddleware(async (req) => {
    try {
      await connectDB();
      const user = await User.findById(params.id, '-password');
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
  })(request);
}

// PUT update user
export async function PUT(request, { params }) {
  return authMiddleware(async (req) => {
    try {
      const userData = await request.json();
      await connectDB();
      const updatedUser = await User.findByIdAndUpdate(params.id, userData, { new: true, select: '-password' });
      if (!updatedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
  })(request);
}

// DELETE user
export async function DELETE(request, { params }) {
  return authMiddleware(async (req) => {
    try {
      await connectDB();
      const deletedUser = await User.findByIdAndDelete(params.id);
      if (!deletedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Failed to delete user:', error);
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
  })(request);
}



