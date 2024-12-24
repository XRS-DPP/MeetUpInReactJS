import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import Header from './components/Header';
import { Login } from './components/Login';
import events from './assets/events.json';
import { useEffect, useState } from 'react';
import CreateEvent from './components/CreateEvent';

function App() {
  const STORE_KEY = 'EVENTS_STORE';
  const storedEvents = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  const [eventList, setEventList] = useState(
    storedEvents.length ? storedEvents : events,
  );

  useEffect(() => {
    if (eventList.length > 0) {
      console.log('useEffect', eventList);
      localStorage.setItem(STORE_KEY, JSON.stringify(eventList));
      console.log(
        'localStorage after update:',
        localStorage.getItem('EVENTS_STORE'),
      );
    }
  }, [eventList]);

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/events"
          element={<EventList eventList={eventList} />}
        ></Route>
        <Route path="/create" element={<CreateEvent />}></Route>
        <Route
          path="/events/:id"
          element={
            <EventPage eventList={eventList} setEventList={setEventList} />
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
