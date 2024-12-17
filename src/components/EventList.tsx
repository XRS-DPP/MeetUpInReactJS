import events from '../assets/events.json';
import { EventCard } from './EventCard';

const EventList = () => {
  return (
    <>
      {events.map((event, index) => {
        return <EventCard event={event} index={index} />;
      })}
    </>
  );
};

export default EventList;
