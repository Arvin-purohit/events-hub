import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({
  agendaItems,
}: {
  agendaItems: string[];
}) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item, index) => {
        const [time, title] = item.split(" | ");

        return (
          <li key={index}>
            <p className="font-semibold">{time}</p>
            <p>{title}</p>
          </li>
        );
      })}
    </ul>
  </div>
);

const EventTags = ({tags} : {tags : string[]}) => (
    <div className="flex flex-row gap-1.5 flex-wrap" >
        {tags.map((tag) => (<div className="pill" key={tag}>{tag}</div>))}
        
    </div>
)

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  
  
  const { slug } = await params;

  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  if (request.status === 404) {
    notFound();
  }
  if (!request.ok) {
    throw new Error("Failed to fetch event");
  }

  const { event } = await request.json();
  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  if (!description) return notFound();
  const agendaItems = Array.isArray(agenda)
    ? agenda[0].split(",\n")
    : agenda.split(",\n");

    const bookings = 10

    const similarEvents : IEvent[] = await getSimilarEventsBySlug(slug);
    console.log(similarEvents);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>

      

      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />

            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={time}
            />

            <EventDetailItem
              icon="/icons/pin.svg"
              alt="pin"
              label={location}
            />

            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={mode}
            />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agendaItems} />
          
          <section className="organizer">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          

          <EventTags tags={tags[0].split(" ")} />
          
        </div>
        

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
              {bookings > 0 ? (
                <p className="text-sm">
                    Join {bookings} people who have already booked their spot!
                </p>
              ) : (
                <p className="text-sm">Be the first to book your spots</p>
              )}
              <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
         {similarEvents.map((similarEvent: any) => {
  console.log("similarEvents:", JSON.stringify(similarEvents, null, 2));

  return (
    <EventCard
      key={String(similarEvent._id)}
      {...similarEvent}
    />
  );
})}

        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;