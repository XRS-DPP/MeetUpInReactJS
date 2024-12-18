import { useParams } from 'react-router-dom';
import events from '../assets/events.json';

const EventPage = () => {
  const { id } = useParams();
  const event = events.find((item) => item.id === id);
  if (!event) return <>Event not found</>;
  else
    return (
      <>
        <div className="p-2">
          <img
            src={event.image}
            alt="event image"
            className="ml-2 w-[36%] aspect-video hover:aspect-square"
          ></img>
          <p className="font-semibold">{event.title}</p>
          <p>{event?.description}</p>
          <p>{event.location}</p>
          <button
            type="button"
            onClick={() => console.log('button')}
            className="bg-secodary p-4 rounded-md"
          >
            Add Event
          </button>
        </div>
      </>
    );
};

export default EventPage;
