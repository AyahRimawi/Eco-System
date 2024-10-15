import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Event from '../../../models/events';
import { authMiddleware } from '../../../middlewares/auth';

export async function GET(request) {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database. Fetching events...');
    const events = await Event.find({ deleted: { $ne: true } });
    console.log('Events fetched successfully');
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events', details: error.message }, { status: 500 });
  }
}

// POST new event
export async function POST(request) {
  return authMiddleware(async (req) => {
    try {
      console.log('Parsing request body...');
      const eventData = await request.json();
      console.log('Connecting to database...');
      await connectDB();
      console.log('Creating new event...');
      const newEvent = new Event(eventData);
      await newEvent.save();
      console.log('New event created successfully');
      return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
      console.error('Failed to create event:', error);
      return NextResponse.json({ error: 'Failed to create event', details: error.message }, { status: 500 });
    }
  })(request);
}