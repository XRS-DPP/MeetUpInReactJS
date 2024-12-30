import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { AuthContext } from '../contexts/Auth';
import { MapPin } from 'lucide-react';

declare var google: any;

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
  endTime: string;
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

type TokenResponseType = {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
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
  const [loading, setLoading] = useState<boolean>(false);

  const [isEventAddedToCalendar, setIsEventAddedToCalendar] =
    useState<boolean>(false);
  const [errMsg, setErrMsg] = useState('');

  const event = eventList.find((item) => item.id === +id!);
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

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const SCOPES = import.meta.env.VITE_SCOPES;
  console.log(CLIENT_ID);

  const handleButtonClick = async () => {
    setErrMsg('');
    setLoading(true);

    // Google OAuth implicit grant model
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse: TokenResponseType) => {
        //tokenResponse is an object and token is saved on access_token
        postEventToCalendar(tokenResponse.access_token);
      },
    });

    client.requestAccessToken();
    setLoading(false);
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

  const postEventToCalendar = (accessToken: string) => {
    const startTimeISO = new Date(event!.startTime).toISOString();
    const endTimeISO = new Date(event!.endTime).toISOString();
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

    if (accessToken.length > 0) {
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
          if (data.error) {
            setErrMsg(
              data.error.errors
                .map((errObj: { message: string }) => errObj.message)
                .join('\n'),
            );
          } else setIsEventAddedToCalendar(true);
        })
        .catch((error) => {
          alert('Error');
          setErrMsg(error.messeage);
        });
    }
  };

  if (!event && isDeleted)
    return (
      <p className="p-2 mt-5">Event deleted. Redirecting to home page....</p>
    );

  if (!event && !isDeleted) return <p className="p-2 mt-5">Event not found</p>;
  if (event)
    return (
      <div className="p-3 w-full flex flex-col  font-Poppins">
        <div className="flex flex-col gap-2 flex-1">
          <img
            src={event.image}
            alt="event image"
            className="rounded-lg aspect-video "
          ></img>

          <p className="font-semibold text-m text-primary">{event.title}</p>
          <p className="text-xs">{event?.description}</p>
          <div className="text-xs flex items-start gap-1">
            <span className="inline-block">
              <MapPin color="gray" size={22} />
            </span>
            <span>{event.location}</span>
          </div>
          <p className="font-xs text-secodary font-semibold">
            {format(new Date(event.startTime), 'EEEE, d LLL H:00')}
          </p>
          {auth && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleUpdate}
                className="px-2 text-xxs bg-secodary rounded-lg text-white"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(+id!)}
                className="px-3 py-2 text-xxs bg-red-500 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {confirmGoing && (
          <p className="text-xs mt-2 text-orange-600">You are going!</p>
        )}
        {loading && <p>Loading...</p>}
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
            className="bg-secodary text-white font-normal text-xs py-3 rounded-lg absolute bottom-1 left-2 right-2 cursor-pointer"
          >
            Add Event To Calendar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-secodary text-white font-normal text-xs py-3 rounded-lg absolute bottom-1 left-2 right-2 cursor-pointer "
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
