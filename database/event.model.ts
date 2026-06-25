import mongoose, { Schema, type Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Event image URL is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, "Event mode is required"],
      trim: true,
    },
    audience: {
      type: String,
      required: [true, "Event audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) && value.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) && value.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ slug: 1 }, { unique: true });

const generateSlug = (title: string): string =>
  title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid event date");
  }

  return date.toISOString();
};

const normalizeTime = (value: string): string => {
  const input = value.trim().toUpperCase();

  const match = input.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/);

  if (!match) {
    throw new Error(
      "Time must be in format HH:mm or h:mm AM/PM"
    );
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] ?? "0");
  const period = match[3];

  if (minute > 59) {
    throw new Error("Invalid minutes");
  }

  if (period) {
    if (hour < 1 || hour > 12) {
      throw new Error("Invalid hour");
    }

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }
  }

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

const requiredFields = [
  "title",
  "description",
  "overview",
  "venue",
  "location",
  "organizer",
] as const;

eventSchema.pre("save", function () {
  const event = this as IEvent;

  for (const field of requiredFields) {
    const value = event[field];

    if (!value || value.trim().length === 0) {
      throw new Error(`${field} cannot be empty`);
    }
  }

  if (event.isModified("title")) {
    event.slug = generateSlug(event.title);
  }

  if (event.isModified("date")) {
    event.date = normalizeDate(event.date);
  }

  if (event.isModified("time")) {
    event.time = normalizeTime(event.time);
  }
});

export const Event =
  mongoose.models.Event ||
  mongoose.model<IEvent>("Event", eventSchema);