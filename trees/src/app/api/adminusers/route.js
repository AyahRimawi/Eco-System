import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/users';
import { authMiddleware } from '../../../middlewares/auth';
// GET all users
export async function GET(request) {
    return authMiddleware(async (req) => {
      try {
        await connectDB();
        const users = await User.find({}, '-password');
        return NextResponse.json(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
      }
    })(request);
  }