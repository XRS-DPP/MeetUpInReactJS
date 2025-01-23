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
    <div>
      {featuredEvents.map((event: Event, index: number) => {
        return (
          <div>
            <img
              src={event.image}
              alt="event image"
              className="ml-2 w-[36%] aspect-video"
            ></img>
            <p className="line-clamp-2 text-xxs">{event.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedEvents;
