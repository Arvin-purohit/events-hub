'use server';

import { Booking } from "@/database";
import { connectDB } from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    console.log("Checking booking:", { eventId, email });

    const existingBooking = await Booking.findOne({
      eventId,
      email,
    });

    console.log("Existing booking:", existingBooking);

    

    await Booking.create({
      eventId,
      slug,
      email,
    });

    return {
      success: true,
    
    };
  } catch (error) {
    console.error("Create booking failed:", error);
    return {
      success: false,
     
    };
  }
};