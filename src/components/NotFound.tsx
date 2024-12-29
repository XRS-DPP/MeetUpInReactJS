import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <section className="text-slate-600 ">
        <h2 className="text-xs mb-4">Ooops! This page can not be found. </h2>
        <Link to="/events" className="underline">
          Go back to home page
        </Link>
      </section>
    </>
  );
};

export default NotFound;
