import { Dispatch, SetStateAction, useState } from 'react';

type Event = {
  id: number;
  title: string;
  description: string;
  datetime: string;
  location: string;
  image: string;
  status: string;
  interestedCount: number;
};

type Props = {
  eventList: Event[];
  setEventList: Dispatch<SetStateAction<Event[]>>;
};

const CreateEvent = ({ eventList, setEventList }: Props) => {
  const [eventAdded, setEventAdded] = useState(false);
  const [eventInput, SetEventInput] = useState({
    id: 0,
    title: '',
    description: '',
    datetime: '',
    location: '',
    image: '',
    status: 'live',
    interestedCount: 0,
  });

  const handleEventInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEventAdded(false);
    const { name, value } = e.target;
    SetEventInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEvent = () => {
    const maxId = eventList.reduce((max, obj) => {
      return +obj.id > max ? obj.id : max;
    }, 0);
    setEventList((prev) => [...prev, { ...eventInput, id: maxId * 1 + 1 }]);
  };

  return (
    <section className="text-center mt-6 p-3 ">
      <h2 className="text-secodary font-semibold text-s">Add a new event</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitEvent();
          setEventAdded(true);
          SetEventInput({
            id: 0,
            title: '',
            description: '',
            datetime: '',
            location: '',
            image: '',
            status: 'live',
            interestedCount: 0,
          });
        }}
        className="flex flex-col gap-2 p-2 mt-3"
      >
        <input
          placeholder="Title"
          type="text"
          name="title"
          value={eventInput.title}
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <textarea
          placeholder="Description"
          name="description"
          value={eventInput.description}
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></textarea>

        <input
          placeholder="YYYY-MM-DDTHH:00:00"
          type="datetime-local"
          name="datetime"
          value={eventInput.datetime}
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>

        <input
          placeholder="Location"
          type="text"
          name="location"
          value={eventInput.location}
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <input
          placeholder="Image URL"
          name="image"
          value={eventInput.image}
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <button className="bg-secodary text-white p-3 rounded-md mt-5 cursor-pointer">
          CREATE
        </button>
      </form>
      {eventAdded && <p>Event added</p>}
    </section>
  );
};

export default CreateEvent;
