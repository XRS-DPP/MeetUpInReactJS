import { useLocation, useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import { useState } from 'react';

const EditEvent = ({ eventList, setEventList }) => {
  const location = useLocation();
  const event = location.state;
  const navigate = useNavigate();

  const [eventInput, setEventInput] = useState(event || null);
  const [errMsg, setErrMsg] = useState('');

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventInput({ ...eventInput, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const updatedEventList = eventList.map((item) =>
      item.id === eventInput.id ? eventInput : item,
    );
    setEventList(updatedEventList);
    navigate('/events');
  };

  if (!event) {
    setErrMsg('Event not found...');
    return <p>{errMsg}</p>;
  }
  return (
    <section>
      <h2>Edit Event</h2>
      <EventForm
        eventInput={eventInput}
        name={'Update'}
        handleEventInputChange={handleEventInputChange}
        handleSubmitForm={handleSubmitForm}
      />
    </section>
  );
};

export default EditEvent;
