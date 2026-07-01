import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { getEvents } from "@/lib/events";
import { cacheLife } from "next/cache";

export default async function Home() {
  'use cache';
  cacheLife('hours')
  const events = await getEvents();

  return (
    <main>
      <h1 className="text-center" >
       The Hub for Every Dev <br /> Events you cant miss
      </h1>
      <p className="text-center mt-5">Hackathons , Meetups , Conferences. In a Single Place</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event : IEvent) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>

      </div>
    </main>
  );}