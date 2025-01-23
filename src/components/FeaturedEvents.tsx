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

type FeaturedEventsProps = { featuredEvents: Event[] };

const FeaturedEvents = ({ featuredEvents }: FeaturedEventsProps) => {
  return (
    <>
      <h2>Featured Events</h2>
      <div className="flex items-center justify-between flex-wrap p-3">
        {featuredEvents.map((event: Event, index: number) => {
          return (
            <div className="flex-grow mr-auto w-[33%]">
              <img
                src={event.image}
                alt="event image"
                className="aspect-video rounded-lg"
              ></img>
              <p className="line-clamp-2 text-xxs mt-2">{event.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeaturedEvents;
