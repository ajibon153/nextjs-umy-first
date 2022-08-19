import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// import { getFilteredEvents } from '../../dummy-data';
import { getFilteredEvents, getFilter } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResulTitle from '../../components/events/results-title';
import Button from '../../components/UI/button';
import ErrorAlert from '../../components/UI/error-alert';
import Head from 'next/head';

function FilteredEventsPage(props) {
  const [LoadedEvents, setLoadedEvents] = useState(null);
  const router = useRouter();
  const filterData = router.query.slug;
  // const { filteredEvents, date } = props;

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    'https://teseatit.firebaseio.com/events.json',
    fetcher
  );

  useEffect(() => {
    console.log('useSWR', data);
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  const HeadSection = (
    <Head>
      <title>Filtered Event</title>
      <meta name='description' content={`A list of filtered events.`} />
    </Head>
  );

  if (!LoadedEvents)
    return (
      <Fragment>
        {HeadSection} <p className='center'>Loading...</p>
      </Fragment>
    );

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  )
    return (
      <Fragment>
        {HeadSection}
        <ErrorAlert>
          <p>Invalid filter, please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Event</Button>
        </div>
      </Fragment>
    );

  const filteredEvents = LoadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <Fragment>
        {HeadSection}
        <div className='center'>
          <ErrorAlert>
            <p>No events found for the chosen filter!</p>
          </ErrorAlert>
          <Button link='/events'>Show All Event</Button>
        </div>
      </Fragment>
    );

  const dateParse = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {HeadSection}
      <ResulTitle date={dateParse} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   )
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // },
//     };

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
