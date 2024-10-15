import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Users from '@/models/users';
import jwt from 'jsonwebtoken';

export async function GET(req) {
    try {
        await connectDB();
        const users = await Users.find({}).select('name points registeredEvents').sort({ points: -1 });

        let loggedInUserId = null;
        const authHeader = req.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                loggedInUserId = decoded.userId;
            } catch (error) {
                console.error('Token verification failed:', error);
            }
        }

        const leaderboardData = users.map((user, index) => ({
            _id: user._id.toString(),
            name: user.name,
            points: user.points,
            registeredEvents: user.registeredEvents ? user.registeredEvents.length : 0,
            rank: index + 1
        }));

        const response = { users: leaderboardData, loggedInUserId };
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ message: 'Error fetching leaderboard' }, { status: 500 });
    }
}
