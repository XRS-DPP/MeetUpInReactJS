import { EventCard } from './EventCard';

type EventProps = {
  id: string;
  title: string;
  description: string;
  datetime: string;
  location: string;
  image: string;
  status: string;
  interestedCount: number;
};

type EventListProps = { eventList: EventProps[] };

const EventList = ({ eventList }: EventListProps) => {
  return (
    <>
      {eventList.map((event: EventProps, index: number) => {
        return <EventCard event={event} index={index} key={index} />;
      })}
    </>
  );
};

export default EventList;
