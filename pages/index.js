import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  console.log('featuredEvents', featuredEvents);

  return (
    <div className={styles.container}>
      <EventList items={featuredEvents} />
    </div>
  );
}
