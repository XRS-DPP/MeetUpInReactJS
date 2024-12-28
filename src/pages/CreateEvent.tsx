import { SetStateAction, useState } from 'react';
import EventForm from '../components/EventForm';

type Event = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  location: string;
  image: string;
  status: string;
  interestedCount: number;
};

type Props = {
  eventList: Event[];
  setEventList: React.Dispatch<SetStateAction<Event[]>>;
};

const CreateEvent = ({ eventList, setEventList }: Props) => {
  const [eventAdded, setEventAdded] = useState(false);
  const [eventInput, SetEventInput] = useState({
    id: 0,
    title: '',
    description: '',
    startTime: '',
    location: '',
    image: '',
    status: 'live',
    interestedCount: 0,
  });

  const handleEventInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEventAdded(false);
    const { name, value } = e.target;
    SetEventInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const maxId = eventList.reduce((max, obj) => {
      return +obj.id > max ? obj.id : max;
    }, 0);

    setEventList((prev) => [...prev, { ...eventInput, id: maxId * 1 + 1 }]);
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
  };

  return (
    <section>
      <h2 className="text-secodary font-semibold text-s">Add a new event</h2>
      <EventForm
        eventInput={eventInput}
        handleSubmitForm={handleCreateEvent}
        name="Create"
        handleEventInputChange={handleEventInputChange}
      />
      {eventAdded && <p>Event added</p>}
    </section>
  );
};

export default CreateEvent;
