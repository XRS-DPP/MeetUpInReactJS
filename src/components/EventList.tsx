import { EventCard } from './EventCard';

type Event = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  location: string;
  image: string;
  status: string;
  interestedCount: number;
};

type EventListProps = { eventList: Event[] };

const EventList = ({ eventList }: EventListProps) => {
  return (
    <>
      {eventList.map((event: Event, index: number) => {
        return <EventCard event={event} index={index} key={index} />;
      })}
    </>
  );
};

export default EventList;
