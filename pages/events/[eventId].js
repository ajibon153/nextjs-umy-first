import { Fragment } from 'react';
import Comment from '../../components/input/comments';
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from '../../helpers/api-utils';

import EventSummary from '../../components/event-detail/event-summary';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';

import ErrorAlert from '../../components/UI/error-alert';
import Head from 'next/head';

function EventDetailPage(props) {
  const { event } = props;

  if (!event)
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comment eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  // console.log('eventId', eventId);
  // console.log('event', event);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  // console.log('paths', paths);
  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetailPage;
