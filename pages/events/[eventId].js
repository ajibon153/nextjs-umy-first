import { Fragment } from 'react';
// import { useRouter } from 'next/router';

// import { getEventById } from '../../dummy-data';
import { getEventById, getAllEvents } from '../../helpers/api-utils';

import EventSummary from '../../components/event-detail/event-summary';
import EventLoginstics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';

import ErrorAlert from '../../components/UI/error-alert';

function EventDetailPage(props) {
  const { event } = props;

  if (!event)
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );

  return (
    <Fragment>
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
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  // console.log('paths', paths);
  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
