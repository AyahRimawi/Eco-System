import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/users';

// PUT: Update user profile
export const PUT = verifyToken(async (request) => {
    try {
        const { name, email } = await request.json();
        await connectDB();

        const user = await User.findById(request.userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        // Return updated user without password
        const updatedUser = user.toObject();
        delete updatedUser.password;

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ message: "An error occurred while updating the user profile" }, { status: 500 });
    }
});