// File: src/app/api/events/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Event from '../../../../models/events';
import User from '../../../../models/users';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const event = await Event.findById(params.id).populate('participants', 'name email points');
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { userId, points } = await request.json();
    await connectDB();

    // First, check if the user is a participant in this event
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.participants.includes(userId)) {
      return NextResponse.json({ error: 'User is not a participant in this event' }, { status: 400 });
    }

    // Update user points
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: points } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch updated event data
    const updatedEvent = await Event.findById(params.id).populate('participants', 'name email points');

    return NextResponse.json({
      message: 'Points updated successfully',
      user,
      event: updatedEvent
    });
  } catch (error) {
    console.error('Failed to update points:', error);
    return NextResponse.json({ error: 'Failed to update points' }, { status: 500 });
  }
}