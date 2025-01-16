import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EventList from './components/EventList';
import EventPage from './pages/EventPage';
import Header from './components/Header';
import { Login } from './pages/Login';
import events from './assets/events.json';
import { useEffect, useState } from 'react';
import CreateEvent from './pages/CreateEvent';
import NotFound from './components/NotFound';
import EditEvent from './pages/EditEvent';
import './App.css';
import Help from './pages/Help';

function App() {
  const STORE_KEY = 'EVENTS_STORE';
  const storedEvents = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  const [eventList, setEventList] = useState(
    storedEvents.length ? storedEvents : events,
  );

  useEffect(() => {
    if (eventList.length > 0) {
      localStorage.setItem(STORE_KEY, JSON.stringify(eventList));
    }
  }, [eventList]);

  return (
    <div className="w-full max-w-full mx-auto md:max-w-[80%] lg:max-w-[70%] xl:max-w-[50%] px-1 md:py-3">
      <div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/events"
            element={<EventList eventList={eventList} />}
          ></Route>
          <Route
            path="/events/create"
            element={
              <CreateEvent eventList={eventList} setEventList={setEventList} />
            }
          ></Route>
          <Route
            path="/events/:id"
            element={
              <EventPage eventList={eventList} setEventList={setEventList} />
            }
          ></Route>

          <Route
            path="/events/:id/edit"
            element={
              <EditEvent eventList={eventList} setEventList={setEventList} />
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/help" element={<Help />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
