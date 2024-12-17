import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Events from './components/Events';

function App() {
  return (
    <div>
      <header>I am header</header>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/events" element={<Events />}></Route>
      </Routes>
    </div>
  );
}

export default App;
