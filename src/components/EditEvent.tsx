import { useLocation } from 'react-router-dom';

const EditEvent = () => {
  const location = useLocation();
  const event = location.state;
  if (!event) return <p>Event not found</p>;
  return (
    <section>
      <h2>Edit Event</h2>
    </section>
  );
};

export default EditEvent;
