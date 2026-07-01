import { Event } from "@/database/event.model";
import cloudinary from "@/lib/cloudinary";
import { getEvents } from "@/lib/events";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const event = Object.fromEntries(formData.entries()) as Record<
      string,
      unknown
    >;

    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    const maxBytes = 5 * 1024 * 1024;

    if (!allowedTypes.has(file.type) || file.size > maxBytes) {
      return NextResponse.json(
        { message: "Image must be JPG, PNG, or WebP and <= 5MB" },
        { status: 400 }
      );
    }

const tagsRaw = formData.get("tags");
const agendaRaw = formData.get("agenda");

console.log("tagsRaw =", tagsRaw);
console.log("agendaRaw =", agendaRaw);
    let tags = JSON.parse(formData.get('tags') as string)
    let agenda = JSON.parse(formData.get('agenda') as string)
    

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{
      secure_url: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "EventHub",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(error);
          }

          if (!result) {
            return reject(
              new Error("Cloudinary did not return an upload result.")
            );
          }

          resolve({
            secure_url: result.secure_url,
          });
        }
      );

      stream.end(buffer);
    });

    event.image = uploadResult.secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags : tags,
      agenda : agenda
    });
     
    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/events Error:");
    console.dir(error, { depth: null });

    return NextResponse.json(
      {
        message: "Event creation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
} 

export async function GET() {
  try {
    const events = await getEvents();

    return NextResponse.json(
      { message: "Event fetched successfully", events },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Event fetching failed", error: e },
      { status: 500 }
    );
  }
}