// src/app/api/events/join/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const governorates = [
    "Amman",
    "Irbid",
    "Zarqa",
    "Mafraq",
    "Ajloun",
    "Jerash",
    "Balqa",
    "Madaba",
    "Karak",
    "Tafilah",
    "Ma'an",
    "Aqaba",
  ];
  return NextResponse.json(governorates);
}
