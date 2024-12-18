import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/events" element={<EventList />}></Route>
        <Route path="/events/:id" element={<EventPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
