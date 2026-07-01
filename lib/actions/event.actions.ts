import { Event } from "@/database/event.model";
import { connectDB } from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  await connectDB();

  const event = await Event.findOne({ slug });

  console.log("Current event:", event);

  const similarEvents = await Event.find({
    _id: { $ne: event?._id },
    tags: { $in: event?.tags ?? [] },
  }).lean();


return similarEvents;
};