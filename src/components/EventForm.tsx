export const EventForm = ({
  eventInput,
  name,
  handleEventInputChange,
  handleSubmitForm,
}) => {
  return (
    <form className="flex flex-col gap-2 p-2 mt-3" onSubmit={handleSubmitForm}>
      <input
        placeholder="Title"
        type="text"
        name="title"
        value={eventInput.title}
        onChange={handleEventInputChange}
        className="p-2 border-2 rounded-md"
        required
      ></input>
      <textarea
        placeholder="Description"
        name="description"
        value={eventInput.description}
        onChange={handleEventInputChange}
        className="p-2 border-2 rounded-md"
        required
      ></textarea>
      <input
        placeholder="YYYY-MM-DDTHH:00:00"
        type="datetime-local"
        name="startTime"
        value={eventInput.startTime}
        onChange={handleEventInputChange}
        className="p-2 border-2 rounded-md"
        required
      ></input>
      <input
        placeholder="Location"
        type="text"
        name="location"
        value={eventInput.location}
        onChange={handleEventInputChange}
        className="p-2 border-2 rounded-md"
        required
      ></input>
      <input
        placeholder="Image URL"
        name="image"
        value={eventInput.image}
        onChange={handleEventInputChange}
        className="p-2 border-2 rounded-md"
        required
      ></input>
      <button className="bg-secodary text-white p-3 rounded-md mt-5 cursor-pointer">
        {name}
      </button>
    </form>
  );
};

export default EventForm;
