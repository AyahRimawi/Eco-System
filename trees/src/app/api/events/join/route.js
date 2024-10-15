// src/app/api/events/join/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/events";
import User from "@/models/users";
import { authMiddleware } from "@/middlewares/auth";

async function joinEventHandler(req) {
  await connectDB();
  const { eventId } = await req.json();
  const userId = req.userId; // Set by authMiddleware

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (event.participants.length >= 12) {
      return NextResponse.json({ message: "Event is full" }, { status: 400 });
    }

    if (event.participants.includes(userId)) {
      return NextResponse.json(
        { message: "Already registered for this event" },
        { status: 400 }
      );
    }

    event.participants.push(userId);
    await event.save();

    await User.findByIdAndUpdate(userId, {
      $push: { registeredEvents: eventId },
    });

    return NextResponse.json({ message: "Successfully joined the event" });
  } catch (error) {
    console.error("Error joining event:", error);
    return NextResponse.json(
      { message: "Failed to join event" },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(joinEventHandler);
