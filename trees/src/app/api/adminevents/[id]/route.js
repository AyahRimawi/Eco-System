import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Event from '../../../../models/events';
import { authMiddleware } from '../../../../middlewares/auth';

export async function GET(request, { params }) {
    try {
      await connectDB();
      const event = await Event.findById(params.id);
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
      return NextResponse.json(event);
    } catch (error) {
      console.error('Failed to fetch event:', error);
      return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
  }
  
  // PUT update event
  export async function PUT(request, { params }) {
    return authMiddleware(async (req) => {
      try {
        const eventData = await request.json();
        await connectDB();
        const updatedEvent = await Event.findByIdAndUpdate(params.id, eventData, { new: true });
        if (!updatedEvent) {
          return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }
        return NextResponse.json(updatedEvent);
      } catch (error) {
        console.error('Failed to update event:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
      }
    })(request);
  }
  
  // DELETE (soft delete) event
  export async function DELETE(request, { params }) {
    return authMiddleware(async (req) => {
      try {
        await connectDB();
        const deletedEvent = await Event.findByIdAndUpdate(params.id, { deleted: true }, { new: true });
        if (!deletedEvent) {
          return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Event deleted successfully' });
      } catch (error) {
        console.error('Failed to delete event:', error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
      }
    })(request);
  }