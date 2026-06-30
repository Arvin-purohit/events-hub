import { Event } from "@/database";
import { connectDB } from "@/lib/mongodb";

export async function getEvents() {
  
  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 }).lean();

  console.log("Total events:", events.length);

  return events;
}


