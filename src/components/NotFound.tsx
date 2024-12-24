import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h2>Ooops! This page can not be found. </h2>
      <Link to="/events" className="underline">
        Go back to home page
      </Link>
    </>
  );
};

export default NotFound;
