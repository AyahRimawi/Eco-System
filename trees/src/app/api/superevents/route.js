// File: src/app/api/events/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Event from '../../../models/events';

export async function GET(request) {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}