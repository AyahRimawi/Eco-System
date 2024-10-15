// src/app/api/events/[governorate]/route.js
//? القصة الي بتصير انو المستخدم كالعادة بيبعت طلب http لل server هلأ حكينا انو اللغة بين المتصفح وال server هي json الي بصير انو وجدت ال NextResponse لحتى تعمل تحويل تلقائي من json الى js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/events";
// ----------------
//* خد ملاحظة مهمة انا اساسا كنت ب node بستخدم لإدارة طلب المستخدم على req res في حين انا ب next
//* لاحظ عند اخد الطلب بس بحط ال req الي في معلومات الطلب اما استجابة الطلب بتم عن طريق NextResponse
// -----------------
// * خليني احكي الهدف والغاية من استخدام params بال next شايف الدالة الي بدي امررها هاي تمريرها بتم من خلال استخدام params
// يعني كأنو params تلتقط القيمة الي بدي احطها بال url
//*-------------------
export async function GET(request, { params }) {
  await connectDB();
  const { governorate } = params;
  // استخدمنا object الي هو date  لحتى اتعامل مع وقت وتاريخ اليوم
  const currentDate = new Date();

  try {
    //* find هي دالة من mongoose تستخدم لترجع كل البيانات 
    //todoo هون تبحث عن كل البيانات افي مجموعة event الي بتحتوي خاصية governorate تساوي governorate
    const events = await Event.find({
      //*الشروط:-
      governorate: governorate,
      date: { $gte: currentDate }, //$gte يعني اكبر من او يساوي 
    }).select("imageUrl name date description location category participants");//الاشياء الي بدي اياها من db

    const formattedEvents = events.map((event) => ({
      ...event.toObject(), //عملية التفكيك للمصفوفة 
      isFull: event.participants.length >= 12, //اضافة خاصية isfull تحدد عدد المشاركين
    }));

    return NextResponse.json(formattedEvents);//انشاء استجابة لطلب بصيغة json
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
