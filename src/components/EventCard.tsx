import { Link } from 'react-router-dom';
import { format } from 'date-fns';
// import { Bookmark, Share } from 'lucide-react';

type Props = {
  event: {
    id: number;
    title: string;
    description: string;
    startTime: string;
    location: string;
    image: string;
    status: string;
    interestedCount: number;
  };
  index: number;
};

export const EventCard = ({ event, index }: Props) => {
  return (
    <div className="p-3 w-full border-b-2 border-b-gray-200 font-Poppins">
      <div key={index} className="flex items-start">
        <div className="flex-1">
          <p className="text-xs text-primary">
            {format(new Date(event.startTime), 'EEEE, d LLL H:00')}
          </p>
          <p className="font-medium text-xs">{event.title}</p>
          <p className="line-clamp-2 text-xxs">{event.description}</p>
          <p className="text-xxs">@ {event.location}</p>
        </div>

        <img
          src={event.image}
          alt="event image"
          className="ml-2 w-[36%] aspect-video"
        ></img>
      </div>

      {/*footer*/}
      <div className="flex gap-2 mt-3 items-center">
        <p className="mr-auto text-gray-600 text-xxs">
          {event.interestedCount} going
        </p>

        {/* <Bookmark size={20} color="gray"></Bookmark>
          <Share size={20} color="gray" /> */}
        <Link to={`/events/${event.id}`}>
          <button className="text-xxs bg-secodary text-white p-1 rounded-md">
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
};
