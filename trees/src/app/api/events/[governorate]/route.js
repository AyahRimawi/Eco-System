// src/app/api/events/[governorate]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/events";

export async function GET(request, { params }) {
  await connectDB();
  const { governorate } = params;
  const currentDate = new Date();

  try {
    const events = await Event.find({
      governorate: governorate,
      date: { $gte: currentDate },
    }).select("imageUrl name date description location category participants");

    const formattedEvents = events.map((event) => ({
      ...event.toObject(),
      isFull: event.participants.length >= 12,
    }));

    return NextResponse.json(formattedEvents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
