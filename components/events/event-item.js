import React from 'react';
import Image from 'next/image'; // Optimizing image = cache, compress size, multiple screen size
import classes from './event-item.module.css';
import Button from '../UI/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableData = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formatedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />
      {/* <img src={'/' + image} alt={title} /> */}
      <div className={classes.content}>
        <div className={classes.sumary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableData}</time>
          </div>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formatedAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
