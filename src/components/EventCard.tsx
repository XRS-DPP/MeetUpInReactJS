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
    <div className="p-3 w-full">
      <div key={index} className="flex flex-row items-start">
        <div className="flex-1">
          <p>{event.datetime}</p>
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
  );
};
