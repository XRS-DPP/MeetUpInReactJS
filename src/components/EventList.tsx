import { EventCard } from './EventCard';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
};
type Event = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  image: string;
  status: string;
  interestedCount: number;
  attendees: User[];
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
