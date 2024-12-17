import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventList from './components/EventList';

function App() {
  return (
    <div>
      <header>I am header</header>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Event page</Link>
        </li>
      </ul> */}
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/events" element={<EventList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
