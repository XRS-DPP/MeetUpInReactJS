import { useState } from 'react';

const [eventInput, SetEventInput] = useState({
  title: '',
  description: '',
  startTime: '',
  location: '',
  ImgUrl: '',
});

const handleEventInput = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  SetEventInput((prev) => ({ ...prev, [name]: value }));
};

const CreateEvent = () => {
  return (
    <section className="text-center mt-6 p-3 ">
      <h2 className="text-secodary font-semibold text-s">Add a new event</h2>
      <form className="flex flex-col gap-2 p-2 mt-3">
        <input
          placeholder="Title"
          name="title"
          value={eventInput.title}
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <textarea
          placeholder="Description"
          name="descritpion"
          value={eventInput.description}
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></textarea>
        <input
          placeholder="Start time"
          name="startTime"
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <input
          placeholder="End time"
          name="endTime"
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <input
          placeholder="Location"
          name="location"
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <input
          placeholder="Image URL"
          name="ImgUrl"
          onChange={handleEventInput}
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <button className="bg-secodary text-white p-3 rounded-md mt-5">
          CREATE
        </button>
      </form>
    </section>
  );
};

export default CreateEvent;
