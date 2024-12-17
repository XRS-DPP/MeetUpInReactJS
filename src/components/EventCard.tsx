import { Link } from 'react-router-dom';
import { format } from 'date-fns';

type Props = {
  event: {
    id: string;
    title: string;
    description: string;
    datetime: string;
    location: string;
    image: string;
    status: string;
    interestedCount: number;
  };
  index: number;
};

export const EventCard = ({ event, index }: Props) => {
  return (
    <Link to={`/events/${index + 1}`}>
      <div className="p-3 w-full border-b-2 border-b-gray-200 ">
        <div key={index} className="flex flex-row items-start">
          <div className="flex-1">
            <p>{format(new Date(event.datetime), 'EEEE, d LLL H:00')}</p>
            <p>{event.title}</p>
            <p>{event.location}</p>
          </div>

          <img
            src={event.image}
            alt="event image"
            className="ml-2 w-[36%] aspect-video hover:aspect-square"
          ></img>
        </div>
      </div>
    </Link>
  );
};
