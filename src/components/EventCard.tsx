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
      <div
        key={index}
        className="md:flex-row md:flex  md:items-start flex-col-reverse flex"
      >
        <div className="flex-1">
          <p className="text-xs text-orange-500">
            {format(new Date(event.startTime), 'EEEE, d LLL H:00')}
          </p>
          <p className="font-medium text-xs">{event.title}</p>
          <p className="line-clamp-2 text-xxs leading-relaxed md:mt-2">
            {event.description}
          </p>
          <p className="text-xxs md:mt-2">@ {event.location}</p>
        </div>
        <img
          src={event.image}
          alt="event image"
          className="md:ml-2 md:w-[36%] md: aspect-video rounded-lg w-full mb-2"
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
