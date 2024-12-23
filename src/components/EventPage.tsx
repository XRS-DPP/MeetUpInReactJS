import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import Modal from './Modal';
import { AuthContext } from '../contexts/Auth';

type Event = {
  id: string;
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
  const event = eventList.find((item) => item.id === id);
  const handleDelete = (id: number) => {
    const eventIndex = eventList.findIndex((item) => +item.id === id);
    const updatedEventList = eventList.filter((item) => +item.id !== id);
    setEventList(updatedEventList);
  };

  const gapi = window.gapi;
  const CLIENT_ID =
    '929827744667-cdretqteanj9r4r62kjddl9umu4mt9ns.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAO1dO9cA22oxiCS97q5gwF1rpomtoiTJM';
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  /*
  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('bam!'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: 'Awesome Event!',
            location: '800 Howard St., San Francisco, CA 94103',
            description: 'Really great refreshments',
            start: {
              dateTime: '2020-06-28T09:00:00-07:00',
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: '2020-06-28T17:00:00-07:00',
              timeZone: 'America/Los_Angeles',
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            attendees: [
              { email: 'lpage@example.com' },
              { email: 'sbrin@example.com' },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute((eventToAdd) => {
            console.log(eventToAdd);
            window.open(eventToAdd.htmlLink);
          });

          // get events
          gapi.client.calendar.events
            .list({
              calendarId: 'primary',
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: 'startTime',
            })
            .then((response) => {
              const events = response.result.items;
              console.log('EVENTS: ', events);
            });
        });
    });
  };
  */

  if (!event) return <>Event not found</>;
  else
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
            {format(new Date(event.datetime), 'EEEE, d LLL H:00')}
          </p>
          {isDeleted && <p> Item is deleted</p>}
          {auth && (
            <div className="flex gap-3 mt-3">
              <button className="px-3 py-2  text-xs bg-secodary rounded-md">
                Update
              </button>
              <button
                onClick={() => handleDelete(+id)}
                className="px-3 py-2 text-xs bg-red-500 rounded-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {confirmGoing && (
          <p className="text-xs mt-2 text-orange-600">You are going!</p>
        )}

        {confirmGoing ? (
          <button
            type="button"
            onClick={() => handleClick()}
            className="bg-secodary text-white font-semibold text-s py-4 rounded-xl absolute bottom-6 left-2 right-2"
          >
            Add Event To Calendar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-secodary text-white font-semibold text-s py-4 rounded-xl absolute bottom-6 left-2 right-2 "
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
          ></Modal>
        )}
      </div>
    );
};
export default EventPage;
