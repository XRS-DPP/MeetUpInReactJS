import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { AuthContext } from '../contexts/Auth';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
};
type Event = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  location: string;
  image: string;
  status: string;
  interestedCount: number;
  attendees: User[];
};
type Props = {
  eventList: Event[];
  setEventList: React.Dispatch<SetStateAction<Event[]>>;
};

const EventPage = ({ setEventList, eventList }: Props) => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [confirmGoing, setConfirmGoing] = useState<Boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
  });
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  //states for google calendar API communication
  const [accessToken, setAccessToken] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEventAddedToCalendar, setIsEventAddedToCalendar] =
    useState<boolean>(false);
  const [errMsg, setErrMsg] = useState('');

  const event = eventList.find((item) => item.id === +id);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => {
        navigate('/events');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isDeleted]);

  const handleDelete = (id: number) => {
    const updatedEventList = eventList.filter((item) => +item.id !== id);
    setEventList(updatedEventList);
    setIsDeleted(true);
  };

  const handleUpdate = () => {
    navigate(`/events/${id}/edit`, { state: event });
  };

  const API_KEY = 'AIzaSyAO1dO9cA22oxiCS97q5gwF1rpomtoiTJM';
  const CLIENT_ID =
    '929827744667-cdretqteanj9r4r62kjddl9umu4mt9ns.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
  const DISCOVERY_DOCS =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

  const handleButtonClick = async () => {
    setErrMsg('');
    setLoading(true);

    // Google OAuth implicit grant model
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope:
        'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/contacts.readonly',
      callback: (tokenResponse) => {
        //tokenResponse is an object and token is saved on access_token
        setAccessToken(tokenResponse.access_token);
        postEventToCalendar(tokenResponse.access_token);
      },
    });

    client.requestAccessToken();
  };

  // const loadCalendar = (accessToken) => {
  //   if (accessToken) {
  //     fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('Calendar events:', data.items);
  //       })
  //       .catch((error) => {
  //         console.error('Error loading calendar:', error);
  //       });
  //   }
  // };

  const postEventToCalendar = (accessToken) => {
    const startTimeISO = new Date(event?.startTime).toISOString();
    const endTimeISO = new Date(event?.endTime).toISOString();
    const eventToAdd = {
      summary: event?.title,
      location: event?.location,
      description: event?.description,
      start: {
        // Use ISO 8601 format for the start date and time
        // dateTime: '2024-12-27T09:00:00-07:00',
        dateTime: startTimeISO,
        // timeZone: 'Europe/London',
      },
      end: {
        dateTime: endTimeISO,
        timeZone: 'Europe/London',
      },
      attendees: [{ email: user.email }],
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 10 }],
      },
    };

    // Send POST request to create the event
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('google api replied:', data);
        if (data.error) {
          setErrMsg(
            data.error.errors.map((errObj) => errObj.message).join('\n'),
          );
        } else setIsEventAddedToCalendar(true);
      })
      .catch((error) => {
        alert('Error');
        setErrMsg(error.messeage);
      });
  };

  if (!event && isDeleted)
    return (
      <p className="p-2 mt-5">Event deleted. Redirecting to home page....</p>
    );

  if (!event && !isDeleted) return <p className="p-2 mt-5">Event not found</p>;
  if (event)
    return (
      <div className="p-3 w-full flex flex-col">
        <div className="flex flex-col gap-2 flex-1">
          <img
            src={event.image}
            alt="event image"
            className="rounded-l aspect-video "
          ></img>

          <p className="font-semibold text-m text-primary">{event.title}</p>
          <p className="text-xs">{event?.description}</p>
          <p className="text-xs">{event.location}</p>
          <p className="font-xs text-secodary font-semibold">
            {format(new Date(event.startTime), 'EEEE, d LLL H:00')}
          </p>
          {auth && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleUpdate}
                className="px-3 py-2  text-xs bg-secodary rounded-lg text-white"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(+id)}
                className="px-3 py-2 text-xs bg-red-500 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {confirmGoing && (
          <p className="text-xs mt-2 text-orange-600">You are going!</p>
        )}
        {errMsg && <p>Event can't be added to calendar due to {errMsg}</p>}
        {isEventAddedToCalendar && (
          <p className="text-xs mt-2 text-orange-600">
            Event is added to calendar
          </p>
        )}

        {confirmGoing ? (
          <button
            type="button"
            onClick={() => handleButtonClick()}
            className="bg-secodary text-white font-normal text-s py-3 rounded-lg absolute bottom-6 left-2 right-2 cursor-pointer"
          >
            Add Event To Calendar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-secodary text-white font-normal text-s py-3 rounded-lg absolute bottom-6 left-2 right-2 cursor-pointer "
          >
            Join & RSVP
          </button>
        )}
        {isModalOpen && (
          <Modal
            user={user}
            setUser={setUser}
            setIsModalOpen={setIsModalOpen}
            setConfirmGoing={setConfirmGoing}
            setEventList={setEventList}
          ></Modal>
        )}
      </div>
    );
};
export default EventPage;
