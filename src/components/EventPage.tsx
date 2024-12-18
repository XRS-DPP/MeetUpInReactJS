import { useParams } from 'react-router-dom';
import events from '../assets/events.json';

const EventPage = () => {
  const { id } = useParams();
  const event = events.find((item) => item.id === id);
  if (!event) return <>Event not found</>;
  else
    return (
      <>
        <img
          src={event.image}
          alt="event image"
          className="ml-2 w-[36%] aspect-video hover:aspect-square"
        ></img>
        <p className="font-semibold">{event.title}</p>
        <p>{event?.description}</p>
        <p>{event.location}</p>
      </>
    );
};

export default EventPage;
