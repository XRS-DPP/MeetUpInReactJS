import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-4 py-1 px-1 text-xxs bg-gray-600 text-white">
      <div className="mx-auto">
        <p>
          MeetUpInReactJS is a platform that allows users to browse and sign up
          for events, and add these events directly to their Google Calendar.{' '}
          <Link to="/help" className="text-blue-400 underline">
            Privacy Policy
          </Link>
        </p>

        <p className="mt-4 text-xxs text-gray-400 text-center">
          © {new Date().getFullYear()} MeetUpInReactJS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
