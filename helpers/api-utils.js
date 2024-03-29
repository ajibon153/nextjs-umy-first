// rn-shop-udemy by ajicwgkng@gmail.com
// https://teseatit.firebaseio.com/
let url = process.env.DB_FIRE;

export async function getAllEvents() {
  const response = await fetch(url + 'events.json');
  const data = await response.json();
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  console.log('events', events);
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  const filteredEvents = getFilter(allEvents);
  return filteredEvents;
}

export function getFilter(allEvents) {
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
