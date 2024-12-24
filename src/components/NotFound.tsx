import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="mt-6 p-3 text-slate-600 ">
        <h2 className="text-xs mb-4">Ooops! This page can not be found. </h2>
        <Link to="/events" className="underline">
          Go back to home page
        </Link>
      </div>
    </>
  );
};

export default NotFound;
