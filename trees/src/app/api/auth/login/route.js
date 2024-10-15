// api/auth/Login/Route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/users';

export async function POST(request) {
    try {
      const { email, password } = await request.json();
      await connectDB();
  
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      return NextResponse.json({ token, message: "Login successful" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "An error occurred while logging in" }, { status: 500 });
    }
  }