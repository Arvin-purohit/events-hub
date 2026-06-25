import mongoose, { type Document, Schema, type Types } from "mongoose"
import { Event } from "./event.model"

export interface IBooking extends Document {
  eventId: Types.ObjectId
  email: string
  createdAt: Date
  updatedAt: Date
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Booking must reference an event"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Booking email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
  },
  {
    timestamps: true,
  }
)

bookingSchema.pre<IBooking>("save", async function () {
  // Email field uses `trim` and `lowercase` setters at the schema level;
  // avoid duplicating normalization here.

  if (this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId })
    if (!eventExists) {
      throw new Error("Referenced event does not exist")
    }
  }
})

// Enforce one booking per user (email) per event
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true })

export const Booking =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema)
