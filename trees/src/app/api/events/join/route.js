// src/app/api/events/join/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/events";
import User from "@/models/users";
import { authMiddleware } from "@/middlewares/auth";
/////////////////
//------- المنطق الخاص بانضمام المستخدم إلى حدث -------------
async function joinEventHandler(req) {
  await connectDB();

  const { eventId } = await req.json(); //هلأ انا بدي اعمل post بالتالي بستخدم لحتى استخرج eventid يعني افرض الطلب يحتوي على json يرسل ال eventid الي بمثل ال event الي بيرغب المستخدم بالانضمام اليه

  const userId = req.userId; // هون بناخد ال userid من الطلب واساسا احنا جبناه من authMiddleware لأتحقق من هوية المستخدم

  try {
    const event = await Event.findById(eventId); //دور بقاعدة البيانات عن الevent الي اختاره المستخدم
    //?---------------- في حال كان ال event غير موجود
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    //?---------------- في حال كان ال event عدد المشتركين في full
    if (event.participants.length >= 12) {
      //participants من قاعدة البيانات
      return NextResponse.json({ message: "Event is full" }, { status: 400 });
    }
    //?---------------- في حال كان ال event المستخدم مسجل في
    if (event.participants.includes(userId)) {
      return NextResponse.json(
        { message: "Already registered for this event" },
        { status: 400 }
      );
    }
    //?---------------- في حال كان ال event المستخدم مش مسجل بال event يسجل فيها
    event.participants.push(userId);
    await event.save(); // event  حفظ ال
    //?------------- حفظ ال event بال registeredEvents
    await User.findByIdAndUpdate(userId, {
      $push: { registeredEvents: eventId },
    });
    //?--------
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
