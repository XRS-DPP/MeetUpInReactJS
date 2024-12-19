import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Bookmark, Share } from 'lucide-react';

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
          <div className="flex-1 gap-2">
            <p className="text-xs">
              {format(new Date(event.datetime), 'EEEE, d LLL H:00')}
            </p>
            <p className="font-semibold text-s">{event.title}</p>
            <p className="line-clamp-2 text-xxs">{event.description}</p>
            <p className="text-xxs">{event.location}</p>
          </div>

          <img
            src={event.image}
            alt="event image"
            className="ml-2 w-[36%] aspect-video hover:aspect-square"
          ></img>
        </div>
        {/*footer*/}
        <div className="flex gap-2 mt-3 items-center">
          <p className="mr-auto text-gray-600 text-xxs">
            {event.interestedCount} going
          </p>
          <button className="text-xxs">More Info</button>
          <Bookmark size={20} color="gray"></Bookmark>
          {/* <Share size={20} color="gray" /> */}
        </div>
      </div>
    </Link>
  );
};
