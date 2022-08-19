import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';
import EventList from '../components/events/event-list';
// import { getFeaturedEvents } from '../dummy-data';
import { getFeaturedEvents } from '../helpers/api-utils';
import styles from '../styles/Home.module.css';

export default function HomePage(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS Event</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
