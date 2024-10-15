// api/auth/signup/Route.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/users';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    // Log the received data (remove in production)
    console.log('Received signup data:', { name, email, password: '****' });

    await connectDB();
    console.log('Connected to database');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log('New user saved');

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: "An error occurred while registering the user", error: error.message }, { status: 500 });
  }
}