import { EventCard } from '../components/EventCard';
import Footer from '../components/Footer';
import MainBanner from '../components/MainBanner';

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
      <div className="flex flex-col items-center justify-center">
        <MainBanner />
        <h1>All Events</h1>
        {eventList.map((event: Event, index: number) => {
          return <EventCard event={event} index={index} key={index} />;
        })}
        <Footer />
      </div>
    </>
  );
};

export default EventList;
