export type Event = {
  title: string
  image: string
  slug: string
  location: string
  date: string
  time: string
  url?: string
}

export const events: Event[] = [
  {
    title: "React Summit 2026",
    image: "/images/event1.png",
    slug: "react-summit-2026",
    location: "Amsterdam, NL",
    date: "2026-11-05",
    time: "09:00",
    url: "https://reactsummit.com/"
  },
  {
    title: "JSConf EU 2026",
    image: "/images/event2.png",
    slug: "jsconf-eu-2026",
    location: "Lisbon, PT",
    date: "2026-10-16",
    time: "09:30",
    url: "https://jsconf.com/"
  },
  {
    title: "PyCon US 2026",
    image: "/images/event3.png",
    slug: "pycon-us-2026",
    location: "Chicago, IL, USA",
    date: "2026-09-21",
    time: "10:00",
    url: "https://us.pycon.org/"
  },
  {
    title: "GitHub Universe 2026",
    image: "/images/event4.png",
    slug: "github-universe-2026",
    location: "San Francisco, CA, USA",
    date: "2026-12-02",
    time: "11:00",
    url: "https://githubuniverse.com/"
  },
  {
    title: "DevFest Berlin 2026",
    image: "/images/event5.png",
    slug: "devfest-berlin-2026",
    location: "Berlin, DE",
    date: "2026-08-14",
    time: "13:00",
    url: "https://devfest.withgoogle.com/"
  },
  {
    title: "Hack the North 2026",
    image: "/images/event6.png",
    slug: "hack-the-north-2026",
    location: "Waterloo, ON, Canada",
    date: "2026-11-20",
    time: "18:00",
    url: "https://hackthenorth.com/"
  },
  
]
