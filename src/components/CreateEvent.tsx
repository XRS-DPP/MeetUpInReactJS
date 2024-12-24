import { useState } from 'react';

const [eventInput, SetEventInput] = useState({
  title: '',
  description: '',
  startTime: '',
  location: '',
  url: '',
});

const CreateEvent = () => {
  return (
    <section className="text-center mt-6 p-3 ">
      <h2 className="text-secodary font-semibold text-s">Add a new event</h2>
      <form className="flex flex-col gap-2 p-2 mt-3">
        <input
          placeholder="Title"
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <textarea
          placeholder="Description"
          className="p-2 border-2 rounded-md"
          required
        ></textarea>
        <input
          placeholder="Start time"
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <input
          placeholder="End time"
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <input
          placeholder="Location"
          className="p-2 border-2 rounded-md"
          required
        ></input>
        <input
          placeholder="Image URL"
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
